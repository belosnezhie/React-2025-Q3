import * as yup from 'yup';

export const schema = yup
  .object({
    name: yup
      .string()
      .matches(/^[A-Z][a-z]*$/, 'Name should starts from uppercase letter')
      .required('This field is required'),
    age: yup
      .number()
      .positive('Age should be greater than zero')
      .integer()
      .required('This field is required'),
    email: yup
      .string()
      .email(
        'Email address must be properly formatted (e.g., user@example.com) and should not contain whitespaces.',
      )
      .required('This field is required'),
    password: yup
      .string()
      .required('This field is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{4,25}$/,
        'Password must contain at least one uppercase and one lowercase letter, one digit and one special character.',
      ),
    confirmed_password: yup
      .string()
      .required('This field is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    gender: yup.string().required('This field is required'),
    terms: yup
      .bool()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('This field is required'),
    image: yup.string().required('This field is required'),
    country: yup.string().required('This field is required'),
  })
  .required();
