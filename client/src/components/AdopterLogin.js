import { useFormik } from 'formik';
import * as yup from 'yup';
import { resolvePath, useNavigate } from 'react-router-dom';
import '../Login.css';
// import {useState} from 'react';

function AdopterLogin({onLogin}) {
  // const [username, setUsername] = useState("")
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    username: yup.string().required('Username is required')
  })

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validationSchema: formSchema,
    onSubmit: (values)=>{
      fetch('/loginadopter',{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2)
      })
      .then((resp)=>{
        if (resp.status ===200){
          resp.json()
          .then((user)=> onLogin(user))
          navigate('/adopterpage')
        }
      })
    }

  })
    // function handleSubmit(e){
    //   e.preventDefault()
    //   fetch('/loginadopt', {
    //     method: 'POST',
    //     headers:{
    //       "Content-Type": "application/json",
    //     },
    //     // body: JSON.stringify({username})
    //   })
    //   .then((resp)=>{
    //     if (resp.status === 201){
    //       resp.json()
    //       .then((user)=> setUsername(user))
    //       navigate('/adopterpage');
    //     }
    //   })
    // }
 

  return (
  
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        value = {formik.values.username}
        onChange ={formik.handleChange}
        onBlur = {formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username ?(
          <div>{formik.errors.username} </div>) : null}
      <button type="submit">Log In</button>
    </form>
  
  )
}

export default AdopterLogin;
