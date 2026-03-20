import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Reusable Card Component with consistent styling
 * Supports different variants and hover effects
 */
const Card = React.forwardRef(({
  children,
  className = '',
  variant = 'default',
  hover = false,
  padding = 'md',
  ...props
}, ref) => {
  const baseClasses = 'bg-white rounded-lg shadow-md border transition-all duration-200';
  
  const variantClasses = {
    default: 'border-gray-200',
    elevated: 'border-gray-100 shadow-lg',
    outlined: 'border-2 border-gray-300 bg-transparent',
    success: 'border-green-200 bg-green-50',
    warning: 'border-yellow-200 bg-yellow-50',
    error: 'border-red-200 bg-red-50'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const hoverClasses = hover ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer' : '';

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    hoverClasses,
    className
  );

  return (
    <div
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

/**
 * Card Header Component
 */
const CardHeader = ({ children, className = '', ...props }) => {
  const classes = cn('px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg', className);
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

/**
 * Card Body Component
 */
const CardBody = ({ children, className = '', ...props }) => {
  const classes = cn('px-6 py-4', className);
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

/**
 * Card Footer Component
 */
const CardFooter = ({ children, className = '', ...props }) => {
  const classes = cn('px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg', className);
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardBody, CardFooter };
export default Card;
