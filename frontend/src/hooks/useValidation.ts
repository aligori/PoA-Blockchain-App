import { useCallback, useState } from 'react';
import { ZodError } from 'zod';

/* Hook that encapsulates form validation logic using zod library */
const useValidation = () => {
    const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});

    const clearError = <T>(key: string, value: string, setFunction: (value: T) => void) => {
        setErrors((prev) => {
            return { ...prev, [key]: undefined };
        });
        if (setFunction) {
            setFunction(value);
        }
    };

    const formatValidationErrors = useCallback((err: ZodError) => {
        const fieldErrors: Record<string, string[]> = {};
        err.errors.forEach((validationError) => {
            const path = validationError.path.join('.');
            if (!fieldErrors[path]) {
                fieldErrors[path] = [];
            }
            fieldErrors[path].push(validationError.message);
        });
        return fieldErrors;
    }, []);

    const clearErrors = useCallback(() => setErrors({}), []);

    // Callback function to be called in case of error
    const onError = useCallback(
        (err: ZodError) => setErrors(formatValidationErrors(err)),
        [formatValidationErrors]
    );

    return { errors, onError, clearError, clearErrors };
};

export default useValidation;
