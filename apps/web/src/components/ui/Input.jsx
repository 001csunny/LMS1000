import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Reusable Input Component with consistent styling
 * Supports different variants, sizes, and error states
 */
const Input = React.forwardRef(({
  type = 'text',
  placeholder = '',
  error = '',
  disabled = false,
  required = false,
  label = '',
  helperText = '',
  size = 'md',
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'block w-full rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 focus:bg-white/60';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3 text-sm',
    lg: 'px-6 py-4 text-base'
  };

  const stateClasses = error
    ? 'border-red-400 focus:ring-red-500/10 focus:border-red-500/50'
    : '';

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const classes = cn(
    baseClasses,
    sizeClasses[size],
    stateClasses,
    disabledClasses,
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={classes}
        {...props}
      />
      {helperText && (
        <p className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

/**
 * Textarea Component (extends Input)
 */
const Textarea = React.forwardRef(({
  rows = 4,
  ...props
}, ref) => {
  const baseClasses = 'block w-full rounded-md border-gray-300 shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 resize-vertical';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };

  const stateClasses = props.error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

  const disabledClasses = props.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white';

  const classes = cn(
    baseClasses,
    sizeClasses[props.size || 'md'],
    stateClasses,
    disabledClasses,
    props.className
  );

  return (
    <div className="w-full">
      {props.label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {props.label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={classes}
        {...props}
      />
      {props.helperText && (
        <p className="mt-1 text-sm text-gray-500">
          {props.helperText}
        </p>
      )}
      {props.error && (
        <p className="mt-1 text-sm text-red-600">
          {props.error}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export { Input, Textarea };
export default Input;
