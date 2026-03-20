import React, { useEffect } from 'react';
import { cn } from '../../utils/cn';

/**
 * Reusable Modal Component with backdrop and animations
 */
const Modal = ({
  isOpen = false,
  onClose,
  children,
  size = 'md',
  closeOnBackdrop = true,
  showCloseButton = true,
  className = '',
  ...props
}) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget && closeOnBackdrop) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={handleBackdropClick}
      />
      
      {/* Modal Content */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={cn(
            'relative w-full bg-white rounded-lg shadow-xl transform transition-all duration-300',
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {/* Close Button */}
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-md hover:bg-gray-100"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          {/* Modal Content */}
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Modal Header Component
 */
const ModalHeader = ({ children, className = '', ...props }) => {
  const classes = cn('px-6 py-4 border-b border-gray-200', className);
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

/**
 * Modal Body Component
 */
const ModalBody = ({ children, className = '', ...props }) => {
  const classes = cn('px-6 py-4', className);
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

/**
 * Modal Footer Component
 */
const ModalFooter = ({ children, className = '', ...props }) => {
  const classes = cn('px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg', className);
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export { Modal, ModalHeader, ModalBody, ModalFooter };
export default Modal;
