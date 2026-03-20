import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Loading, Modal, ModalHeader, ModalBody, ModalFooter, Input, MainLayout, CourseCard } from '../components/ui';
import { Course as CourseModel } from '../types';
import courseService from '../services/CourseService';
import authService from '../services/AuthService';

/**
 * Course Management Page
 * Displays and manages user's courses with modern UI
 */
function CourseManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courseData, setCourseData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    const currentUser = authService.getCurrentUserInfo();
    const userRole = authService.getCurrentRole();

    const toggleModal = (modalState = !isModalOpen) => {
        setIsModalOpen(modalState);
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            await courseService.deleteCourse(courseId);
            fetchCourseData(); 
        } catch (error) {
            setError(error.message || 'Failed to delete course');
        }
    };

    const handleCreateCourse = async () => {
        try {
            if (!courseName.trim()) {
                setError('กรุณาระบุชื่อคอร์ส');
                return;
            }

            await courseService.createCourse({
                name: courseName,
                description: courseDescription,
                isPublic: isPublic
            });
            
            setCourseName('');
            setCourseDescription('');
            setIsPublic(false);
            toggleModal(false);
            fetchCourseData();
        } catch (error) {
            setError(error.message || 'Failed to create course');
        }
    };

    const fetchCourseData = async () => {
        setIsLoading(true); 
        setError('');
        
        try {
            const data = await courseService.getMyCourses(userRole.toLowerCase(), currentUser?.id); 
            setCourseData(data || []); 
        } catch (error) {
            setError(error.message || 'Failed to fetch courses');
        } finally {
            setIsLoading(false); 
        }
    };

    useEffect(() => {
        if (currentUser?.id) {
            fetchCourseData();
        }
    }, [currentUser?.id]); 

    const isAdmin = userRole === 'ADMIN' || userRole === 'Admin';

    if (isLoading && courseData.length === 0) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loading size="lg" text="กำลังโหลดข้อมูลวิชาเรียน..." />
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Error Alert */}
                {error && (
                    <div className="mb-6">
                        <Card variant="error">
                            <CardBody className="text-red-700">
                                {error}
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="ml-2"
                                    onClick={() => setError('')}
                                >
                                    ✕
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                )}

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div className="text-4xl md:text-5xl font-display font-bold text-gray-900">วิชาเรียนทั้งหมด</div>
                    {isAdmin && (
                        <Button
                            onClick={() => toggleModal(true)}
                            className="mt-4 md:mt-0"
                        >
                            + เพิ่มวิชาใหม่
                        </Button>
                    )}
                </div>

                {/* Course Grid */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {courseData.length > 0 ? (
                            courseData.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    actions={{
                                        onDelete: handleDeleteCourse,
                                        onEdit: (course) => {
                                            // TODO: Implement edit functionality
                                            console.log('Edit course:', course);
                                        }
                                    }}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                <div className="text-lg font-medium mb-2">ยังไม่มีวิชาที่สอน</div>
                                {isAdmin && (
                                    <Button onClick={() => toggleModal(true)}>
                                        + สร้างวิชาแรก
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Create Course Modal */}
                <Modal 
                    isOpen={isModalOpen} 
                    onClose={() => toggleModal(false)}
                    size="md"
                >
                    <ModalHeader>
                        <h3 className="text-lg font-medium text-gray-900">เพิ่มวิชาใหม่</h3>
                    </ModalHeader>
                    <ModalBody>
                        <div className="space-y-4">
                            <Input
                                label="ชื่อวิชา"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                                placeholder="ระบุชื่อวิชา"
                                required
                            />
                            <Input
                                label="คำอธิบาย"
                                value={courseDescription}
                                onChange={(e) => setCourseDescription(e.target.value)}
                                placeholder="คำอธิบายวิชา (ไม่จำเป็นต้อง)"
                            />
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isPublic"
                                    checked={isPublic}
                                    onChange={(e) => setIsPublic(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
                                    ทำให้เป็นสาธารณะ (ผู้ใช้ทั่วไปสามารถเข้าถึงได้)
                                </label>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="flex justify-end space-x-3">
                            <Button 
                                variant="secondary" 
                                onClick={() => toggleModal(false)}
                            >
                                ยกเลิก
                            </Button>
                            <Button 
                                onClick={handleCreateCourse}
                                disabled={!courseName.trim()}
                            >
                                สร้างวิชา
                            </Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        </MainLayout>
    );
}

export default CourseManagement;
