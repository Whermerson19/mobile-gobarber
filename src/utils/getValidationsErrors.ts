import { ValidationError } from "yup";


export default function getValidationErrors(err: ValidationError) {
    const validationErrors: { [key: string]: string } = {};

    err.inner.forEach(error => {
        validationErrors[error.path] = error.message
    });

    return validationErrors
}