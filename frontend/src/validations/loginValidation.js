export const validateLogin = (values) => {

    const errors = {};

    if (!values.email.trim()) {
        errors.email = "Email is required";
    }

    else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Invalid email";
    }

    if (!values.password.trim()) {
        errors.password = "Password is required";
    }

    return errors;

};