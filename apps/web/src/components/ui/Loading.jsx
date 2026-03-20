import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Loading Spinner Component with different sizes and variants
 */
const Loading = ({
  size = 'md',
  variant = 'spinner',
  text = '',
  className = '',
  overlay = false,
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const spinnerClasses = cn(
    'animate-spin rounded-full border-2 border-gray-200 border-t-blue-600',
    sizeClasses[size],
    className
  );

  const dotsClasses = cn('flex space-x-1', className);

  if (variant === 'spinner') {
    const spinner = (
      <div className={spinnerClasses} {...props}>
        <span className="sr-only">Loading...</span>
      </div>
    );

    if (overlay) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            {spinner}
            {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center">
        {spinner}
        {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
      </div>
    );
  }

  if (variant === 'dots') {
    const dots = (
      <div className={dotsClasses}>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    );

    if (overlay) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            {dots}
            {text && <p className="mt-2 text-sm text-gray-600 text-center">{text}</p>}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center">
        {dots}
        {text && <p className="mt-2 text-sm text-gray-600 text-center">{text}</p>}
      </div>
    );
  }

  if (variant === 'skeleton') {
    return (
      <div className={cn('animate-pulse', className)} {...props}>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  return null;
};

/**
 * Page Loading Component (full page overlay)
 */
const PageLoading = ({ text = 'กำลังโหลด...' }) => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <Loading size="lg" text={text} />
      </div>
    </div>
  );
};

/**
 * Card Loading Skeleton
 */
const CardSkeleton = ({ lines = 3 }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        {Array.from({ length: lines }).map((_, index) => (
          <div key={index} className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        ))}
      </div>
    </div>
  );
};

export { Loading, PageLoading, CardSkeleton };
export default Loading;
