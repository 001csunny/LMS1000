import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, CardBody, Loading, MainLayout } from '../components/ui';
import courseService from '../services/CourseService';

const PublicCourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadCourseData();
    }, [id]);

    const loadCourseData = async () => {
        setLoading(true);
        try {
            const data = await courseService.getPublicCourseById(id);
            setCourse(data);
        } catch (err) {
            setError(err.message || 'ไม่สามารถโหลดข้อมูลคอร์สได้');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loading size="lg" text="กำลังโหลดข้อมูลคอร์ส..." />
                </div>
            </MainLayout>
        );
    }

    if (error || !course) {
        return (
            <MainLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">{error || 'ไม่พบคอร์ส'}</h2>
                    <Link to="/public">
                        <Button>กลับสู่หน้าหลัก</Button>
                    </Link>
                </div>
            </MainLayout>
        );
    }

    const publicLessons = course.getPublicLessons ? course.getPublicLessons() : (course.lessons || []).filter(l => l.isPublic);

    return (
        <MainLayout>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">{course.name}</h1>
                    <p className="text-xl opacity-90">{course.description || 'ไม่มีคำอธิบายสำหรับคอร์สนี้'}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">บทเรียนสาธารณะในคอร์สนี้</h2>
                    <Link to="/public">
                        <Button variant="outline">กลับสู่หน้าหลัก</Button>
                    </Link>
                </div>

                {publicLessons.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <p className="text-gray-500 text-lg mb-4">ยังไม่มีบทเรียนสาธารณะในคอร์สนี้</p>
                        <Link to="/Login">
                            <Button>สมัครสมาชิกเพื่อดูบทเรียนทั้งหมด</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {publicLessons.map((lesson) => (
                            <Card key={lesson.id} hover className="group">
                                <CardBody>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {lesson.name}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {lesson.description || 'ไม่มีคำอธิบาย'}
                                    </p>
                                    <div className="flex justify-end">
                                        <Link to={`/public/lessons/${lesson.id}`}>
                                            <Button size="sm">เริ่มเรียน</Button>
                                        </Link>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default PublicCourseDetail;
