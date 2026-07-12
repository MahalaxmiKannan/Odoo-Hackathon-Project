export const validateSignup = (values) => {

    const errors = {};

    if (!values.name.trim()) {
        errors.name = "Name is required";
    }

    if (!values.email.trim()) {
        errors.email = "Email is required";
    }

    if (!values.password.trim()) {
        errors.password = "Password is required";
    }

    return errors;

};