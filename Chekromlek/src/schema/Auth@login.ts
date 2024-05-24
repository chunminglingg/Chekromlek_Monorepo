import * as Yup from 'yup';

const signupVali = Yup.object().shape({
  username: Yup.string().required('username name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .test('no-spaces', 'Password must not contain spaces', (value) => !value.trim().includes(' ')), // Custom validation test
});

export default signupVali;
