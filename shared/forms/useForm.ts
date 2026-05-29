/**
 * Form builder and utilities
 * Provides hooks and utilities for building accessible forms
 */

import { useState, useCallback, useMemo } from 'react';

export type FieldType = 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file';
export type ValidationType = 'required' | 'email' | 'min' | 'max' | 'pattern' | 'custom';

export interface ValidationRule {
  type: ValidationType;
  value?: any;
  message: string;
}

export interface FormField {
  name: string;
  label?: string;
  type?: FieldType;
  value?: any;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  validations?: ValidationRule[];
  options?: Array<{ label: string; value: any }>;
  helperText?: string;
}

export interface FormState {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormTouched {
  [key: string]: boolean;
}

export interface UseFormOptions {
  initialValues: FormState;
  onSubmit: (values: FormState) => void | Promise<void>;
  validate?: (values: FormState) => FormErrors;
}

/**
 * Validate email
 */
function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate single field against rules
 */
function validateField(value: any, rules?: ValidationRule[]): string | null {
  if (!rules || rules.length === 0) return null;

  for (const rule of rules) {
    switch (rule.type) {
      case 'required':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return rule.message;
        }
        break;

      case 'email':
        if (value && !isValidEmail(value)) {
          return rule.message;
        }
        break;

      case 'min':
        if (typeof value === 'string' && value.length < rule.value) {
          return rule.message;
        }
        if (typeof value === 'number' && value < rule.value) {
          return rule.message;
        }
        break;

      case 'max':
        if (typeof value === 'string' && value.length > rule.value) {
          return rule.message;
        }
        if (typeof value === 'number' && value > rule.value) {
          return rule.message;
        }
        break;

      case 'pattern':
        if (value && !rule.value.test(value)) {
          return rule.message;
        }
        break;

      case 'custom':
        if (value && !rule.value(value)) {
          return rule.message;
        }
        break;
    }
  }

  return null;
}

/**
 * useForm hook
 * Provides form state management with validation
 */
export function useForm(options: UseFormOptions) {
  const { initialValues, onSubmit, validate } = options;

  const [values, setValues] = useState<FormState>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = useCallback(
    (formValues: FormState) => {
      const newErrors: FormErrors = {};

      // Run custom validation if provided
      if (validate) {
        const customErrors = validate(formValues);
        Object.assign(newErrors, customErrors);
      }

      return newErrors;
    },
    [validate]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;

      const finalValue =
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

      setValues((prev) => ({ ...prev, [name]: finalValue }));

      // Clear error for this field if it exists
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitError(null);

      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
      setTouched(allTouched);

      // Validate form
      const validationErrors = validateForm(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error: any) {
        setSubmitError(error?.message || 'An error occurred');
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validateForm, onSubmit]
  );

  const setFieldValue = useCallback((name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setFieldError = useCallback((name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitError(null);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitError,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
    getFieldProps: (name: string) => ({
      name,
      value: values[name] || '',
      onChange: handleChange,
      onBlur: handleBlur,
    }),
  };
}
