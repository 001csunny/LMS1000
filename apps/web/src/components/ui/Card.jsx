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
  const baseClasses = 'glass-card transition-all duration-300';
  
  const variantClasses = {
    default: '',
    elevated: 'shadow-2xl shadow-blue-900/10',
    outlined: 'border-2 border-white/80',
    success: 'bg-green-50/50 border-green-200/50',
    warning: 'bg-yellow-50/50 border-yellow-200/50',
    error: 'bg-red-50/50 border-red-200/50'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const hoverClasses = hover ? 'hover:shadow-2xl hover:shadow-blue-900/10 hover:translate-y-[-4px] cursor-pointer' : '';

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
  const classes = cn('px-6 py-5 border-b border-white/40 bg-white/20 rounded-t-[22px]', className);
  
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
  const classes = cn('px-6 py-5 border-t border-white/40 bg-white/20 rounded-b-[22px]', className);
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardBody, CardFooter };
export default Card;
