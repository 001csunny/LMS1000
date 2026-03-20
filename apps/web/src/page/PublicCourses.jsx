import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardHeader, CardBody, Loading, Input, MainLayout } from '../components/ui';
import { Course, Lesson } from '../types';
import courseService from '../services/CourseService';
import lessonService from '../services/LessonService';

/**
 * Public Courses Page - Accessible without authentication
 * Displays public courses and lessons for anyone to browse
 */
const PublicCourses = () => {
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState('courses'); // 'courses' or 'lessons'

  useEffect(() => {
    loadPublicContent();
  }, []);

  const loadPublicContent = async () => {
    setLoading(true);
    setError('');
    
    try {
      const [coursesData, lessonsData] = await Promise.all([
        courseService.getPublicCourses(),
        lessonService.getPublicLessons()
      ]);
      
      setCourses(coursesData);
      setLessons(lessonsData);
    } catch (err) {
      setError(err.message || 'Failed to load public content');
    } finally {
      setLoading(false);
    }
  };

  // Filter content based on search term
  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLessons = lessons.filter(lesson =>
    lesson.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loading size="lg" text="กำลังโหลดคอร์สและบทเรียน..." />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              คอร์สและบทเรียนสาธารณะ
            </h1>
            <p className="text-xl mb-8 opacity-90">
              เรียนรู้ภาษาไทยฟรี - ไม่ต้องสมัครสมาชิก
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/Login">
                <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  เข้าสู่ระบบ
                </Button>
              </Link>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                เรียนรู้เพิ่มเติม
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="ค้นหาคอร์สหรือบทเรียน..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-lg"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant={activeView === 'courses' ? 'primary' : 'outline'}
                onClick={() => setActiveView('courses')}
              >
                คอร์ส ({filteredCourses.length})
              </Button>
              <Button
                variant={activeView === 'lessons' ? 'primary' : 'outline'}
                onClick={() => setActiveView('lessons')}
              >
                บทเรียน ({filteredLessons.length})
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
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

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeView === 'courses' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">คอร์สสาธารณะ</h2>
            
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">
                  {searchTerm ? 'ไม่พบคอร์สที่ตรงกับการค้นหา' : 'ยังไม่มีคอร์สสาธารณะ'}
                </div>
                <Link to="/Login">
                  <Button className="mt-4">
                    สมัครสมาชิกเพื่อเข้าถึงคอร์สเพิ่มเติม
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course.id} hover className="group">
                    <CardBody>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {course.name}
                        </h3>
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          สาธารณะ
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {course.description || 'ไม่มีคำอธิบาย'}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <span>บทเรียน: {course.getLessonCount?.() || 0}</span>
                          <span className="mx-2">•</span>
                          <span>บทเรียนสาธารณะ: {course.getPublicLessons?.().length || 0}</span>
                        </div>
                        
                        <Link to={`/public/courses/${course.id}`}>
                          <Button size="sm">
                            ดูรายละเอียด
                          </Button>
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeView === 'lessons' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">บทเรียนสาธารณะ</h2>
            
            {filteredLessons.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">
                  {searchTerm ? 'ไม่พบบทเรียนที่ตรงกับการค้นหา' : 'ยังไม่มีบทเรียนสาธารณะ'}
                </div>
                <Link to="/Login">
                  <Button className="mt-4">
                    สมัครสมาชิกเพื่อเข้าถึงบทเรียนเพิ่มเติม
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLessons.map((lesson) => (
                  <Card key={lesson.id} hover className="group">
                    <CardBody>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {lesson.name}
                        </h3>
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          สาธารณะ
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {lesson.description || 'ไม่มีคำอธิบาย'}
                      </p>
                      
                      {lesson.course && (
                        <div className="text-sm text-gray-500 mb-4">
                          คอร์ส: {lesson.course.name}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          กิจกรรม: {lesson.getTotalActivities?.() || 0}
                        </div>
                        
                        <Link to={`/public/lessons/${lesson.id}`}>
                          <Button size="sm">
                            เริ่มเรียน
                          </Button>
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            พร้อมเริ่มเรียน?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            สมัครสมาชิกวันนี้เพื่อเข้าถึงคอร์สและบทเรียนทั้งหมด
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/Login">
              <Button size="lg">
                สมัครสมาชิกฟรี
              </Button>
            </Link>
            <Link to="/Login">
              <Button variant="outline" size="lg">
                เรียนรู้เพิ่มเติม
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PublicCourses;
