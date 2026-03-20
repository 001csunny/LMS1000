import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for API calls with loading and error states
 * Provides consistent state management across components
 */
export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError('');
    setData(null);

    try {
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  // Reset error when dependencies change
  useEffect(() => {
    setError('');
  }, dependencies);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError('');
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset
  };
};

/**
 * Custom hook for pagination
 */
export const usePagination = (fetchFunction, initialPage = 1, initialLimit = 10) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = useCallback(async (pageNum = page, pageLimit = limit) => {
    setLoading(true);
    setError('');

    try {
      const result = await fetchFunction(pageNum, pageLimit);
      setData(result.data || []);
      setTotal(result.total || 0);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const nextPage = () => {
    if (page * limit < total) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const goToPage = (pageNum) => {
    setPage(pageNum);
  };

  const totalPages = Math.ceil(total / limit);

  return {
    data,
    loading,
    error,
    page,
    limit,
    total,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    refresh: () => fetchData(page, limit)
  };
};

/**
 * Custom hook for debounced search
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Custom hook for local storage
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

/**
 * Custom hook for form state management
 */
export const useForm = (initialValues, validationSchema = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const setError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  }, []);

  const validate = useCallback(() => {
    if (!validationSchema) return { isValid: true, errors: {} };

    const validationErrors = {};
    let isValid = true;

    Object.keys(validationSchema).forEach(field => {
      const fieldValidation = validationSchema[field];
      if (fieldValidation && typeof fieldValidation === 'function') {
        const result = fieldValidation(values[field], values);
        if (!result.isValid) {
          validationErrors[field] = result.error;
          isValid = false;
        }
      }
    });

    setErrors(validationErrors);
    return { isValid, errors: validationErrors };
  }, [values, validationSchema]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const handleSubmit = useCallback((onSubmit) => {
    setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    const validation = validate();
    if (validation.isValid) {
      onSubmit(values);
    }
  }, [values, validate]);

  return {
    values,
    errors,
    touched,
    setValue,
    setError,
    setTouched: setFieldTouched,
    validate,
    reset,
    handleSubmit
  };
};
