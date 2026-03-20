import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, CardBody, Loading, MainLayout } from '../components/ui';
import lessonService from '../services/LessonService';
import { useAuth } from '../contexts/AuthContext';

const PublicLessonDetail = () => {
    const { id } = useParams();
    const { state } = useAuth();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadLessonData();
    }, [id]);

    const loadLessonData = async () => {
        setLoading(true);
        try {
            const data = await lessonService.getPublicLessonById(id);
            setLesson(data);
        } catch (err) {
            setError(err.message || 'ไม่สามารถโหลดข้อมูลบทเรียนได้');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loading size="lg" text="กำลังโหลดข้อมูลบทเรียน..." />
                </div>
            </MainLayout>
        );
    }

    if (error || !lesson) {
        return (
            <MainLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">{error || 'ไม่พบบทเรียน'}</h2>
                    <Link to="/public">
                        <Button>กลับสู่หน้าหลัก</Button>
                    </Link>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">{lesson.name}</h1>
                    <p className="text-xl opacity-90">{lesson.description || 'ไม่มีคำอธิบายสำหรับบทเรียนนี้'}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">รายละเอียดบทเรียน</h2>
                    <Link to={`/public/courses/${lesson.courseId || ''}`}>
                        <Button variant="outline">กลับไปที่คอร์ส</Button>
                    </Link>
                </div>

                <Card>
                    <CardBody className="text-center py-12">
                        {state.isLoggedIn ? (
                            <>
                                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                                    พร้อมที่จะเปิดใช้งานบทเรียนหรือไม่?
                                </h3>
                                <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                                    คุณเข้าสู่ระบบแล้ว สามารถเริ่มเรียนเพื่อเข้าสู่บทเรียนและบันทึกความคืบหน้าได้ทันที
                                </p>
                                <div className="flex justify-center space-x-4">
                                    <Link to={`/lesson/${id}/play`}>
                                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                                            เริ่มเรียน
                                        </Button>
                                    </Link>
                                    <Link to={`/public/courses/${lesson.courseId || ''}`}>
                                        <Button size="lg" variant="outline">กลับไปที่คอร์ส</Button>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                                    เข้าสู่ระบบเพื่อเริ่มเรียน
                                </h3>
                                <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                                    บทเรียนนี้เป็นส่วนหนึ่งของคอร์สสาธารณะ คุณสามารถเข้าเรียนได้ฟรี แต่จำเป็นต้องสมัครสมาชิกหรือเข้าสู่ระบบเพื่อบันทึกความคืบหน้า
                                </p>
                                <div className="flex justify-center space-x-4">
                                    <Link to="/Login">
                                        <Button size="lg">เข้าสู่ระบบ / สมัครสมาชิก</Button>
                                    </Link>
                                    <Link to="/public">
                                        <Button size="lg" variant="outline">ดูคอร์สอื่นๆ</Button>
                                    </Link>
                                </div>
                            </>
                        )}
                    </CardBody>
                </Card>
            </div>
        </MainLayout>
    );
};

export default PublicLessonDetail;
