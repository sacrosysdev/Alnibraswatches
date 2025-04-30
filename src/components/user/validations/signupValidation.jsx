
import * as Yup from 'yup';

const signupValidation = Yup.object({
        fullName: Yup.string()
            .required('Name is required'),

        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),

        phoneNumber: Yup.string()
            .required('Contact number is required'),

        passwordHash: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),

        repeatPassword: Yup.string()
            .oneOf([Yup.ref('passwordHash'), null], 'Passwords must match')
            .required('Please confirm your password'),

        agree: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions')
    });

export default signupValidation