// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import '../Login.css';

// function Login() {
//   const navigate = useNavigate();

//   const formSchema = yup.object().shape({
//     email: yup.string().required('Email is required').email('Email is invalid'),
//     password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
//   });

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema: formSchema,
//     onSubmit: (values) => {
//       // TODO: Handle login logic here
//       console.log(values);
//       navigate('/adopterpage');
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <label htmlFor="email">Email Address</label>
//       <input
//         id="email"
//         name="email"
//         type="email"
//         {...formik.getFieldProps('email')}
//       />
//       {formik.touched.email && formik.errors.email ? (
//         <div className="error">{formik.errors.email}</div>
//       ) : null}
//       <label htmlFor="password">Password</label>
//       <input
//         id="password"
//         name="password"
//         type="password"
//         {...formik.getFieldProps('password')}
//       />
//       {formik.touched.password && formik.errors.password ? (
//         <div className="error">{formik.errors.password}</div>
//       ) : null}
//       <button type="submit">Log In</button>
//     </form>
//   );
// }

// export default Login;
