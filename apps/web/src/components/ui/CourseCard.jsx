import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from './index';
import { Course } from '../../types';

/**
 * Enhanced Course Card Component with uniform styling
 * Reusable across different pages (Dashboard, Public Courses, etc.)
 */
const CourseCard = ({ 
  course, 
  showActions = true, 
  actions = [], 
  variant = 'default',
  className = '' 
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCode, setDeleteCode] = useState('');
  const [inputCode, setInputCode] = useState('');

  const generateDeleteCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setDeleteCode(code);
    setInputCode('');
  };

  const handleDeleteClick = () => {
    generateDeleteCode();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (inputCode === deleteCode) {
      if (actions.onDelete) {
        actions.onDelete(course.id);
      }
      setShowDeleteModal(false);
    } else {
      alert('รหัสไม่ถูกต้อง!');
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'public':
        return 'border-green-200 hover:border-green-300 hover:shadow-lg';
      case 'private':
        return 'border-gray-200 hover:border-gray-300 hover:shadow-lg';
      default:
        return 'border-gray-200 hover:border-gray-300 hover:shadow-lg';
    }
  };

  if (!course) return null;

  return (
    <>
      <Card 
        hover 
        className={`${getVariantClasses()} ${className}`}
      >
        <CardBody>
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                {course.name}
              </h3>
              {course.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {course.description}
                </p>
              )}
            </div>
            
            {/* Status Badge */}
            <div className="flex flex-col items-end space-y-2">
              {course.isPublic !== undefined && (
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  course.isPublic 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {course.isPublic ? 'สาธารณะ' : 'ส่วนตัว'}
                </span>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <span>บทเรียน: {course.getLessonCount?.() || 0}</span>
            {course.getStudentCount && (
              <>
                <span>•</span>
                <span>นักเรียน: {course.getStudentCount()}</span>
              </>
            )}
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex items-center justify-between">
              <Link 
                to={`/Course/${course.id}`}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
              >
                ดูรายละเอียด →
              </Link>
              
              <div className="flex space-x-2">
                {actions.onView && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => actions.onView(course)}
                  >
                    ดู
                  </Button>
                )}
                
                {actions.onEdit && (
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => actions.onEdit(course)}
                  >
                    แก้ไข
                  </Button>
                )}
                
                {actions.onDelete && (
                  <Button 
                    size="sm" 
                    variant="danger"
                    onClick={handleDeleteClick}
                  >
                    ลบ
                  </Button>
                )}
                
                {actions.onEnroll && (
                  <Button 
                    size="sm"
                    onClick={() => actions.onEnroll(course.id)}
                  >
                    ลงทะเบียน
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)}
        size="sm"
      >
        <ModalHeader>
          <h3 className="text-lg font-medium text-gray-900">ยืนยันการลบคอร์ส</h3>
        </ModalHeader>
        <ModalBody>
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              กรุณากรอกรหัส <span className="font-bold text-red-600">{deleteCode}</span> เพื่อยืนยันการลบ
            </p>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="กรอกรหัสยืนยัน"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-center font-mono text-lg"
              maxLength={8}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end space-x-3">
            <Button 
              variant="secondary" 
              onClick={() => setShowDeleteModal(false)}
            >
              ยกเลิก
            </Button>
            <Button 
              variant="danger" 
              onClick={handleConfirmDelete}
              disabled={inputCode !== deleteCode}
            >
              ยืนยันการลบ
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CourseCard;
