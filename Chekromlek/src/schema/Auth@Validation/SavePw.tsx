import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  currentPw: Yup.string().required('Current password is required'),
  newPw: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPw: Yup.string()
    .oneOf([Yup.ref('newPw')], 'Passwords must match')
    .required('Please confirm your password'),
});
export {validationSchema};