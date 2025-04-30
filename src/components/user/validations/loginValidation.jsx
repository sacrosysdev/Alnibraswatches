import * as Yup from 'yup'
 const loginValidation = Yup.object({

    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),

    Password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

export default loginValidation