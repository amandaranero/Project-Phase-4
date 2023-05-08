import {useFormik} from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
//need form
//using formik:
// name, email, password, agency or adopter
//should take to page based off answer..
//if formik.value.type == 'agency' route = '/agency'
function SignupAdopter(){
    // const [adopters, setAdopters] = useState([{}]);
    const [refreshPage, setRefreshPage] = useState(false);
    // useEffect(()=>{
    //     fetch('/adopters')
    //     .then((resp)=>resp.json())
    //     .then((data)=>{
    //         setAdopters(data)
    //     })
    // }, [refreshPage])
    const formSchema = yup.object().shape({
        email: yup.string().required("Must enter email"),
        username: yup.string().required("Must enter username"),
        name: yup.string().required("Must enter name"),
        bio: yup.string().required("Must enter bio").min(5).max(50)
    })
    const formik = useFormik({
        initialValues:{
            email: '',
            username: '',
            name: '',
            bio: ''
        },
        validationSchema: formSchema,
        onSubmit: (values)=>{
            fetch('/adopters', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
            body: JSON.stringify(values, null, 2),
            }).then((resp)=>{
                if (resp.status === 200){
                    setRefreshPage(!refreshPage)
                }
            })
        }
    })
    return (
        <form onSubmit= {formik.handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
                id = "email"
                name = "email"
                type = "email"
                {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ?(
                <div>{formik.errors.email} </div>) : null}
            <label htmlFor="username">Username</label>
            <input
                id = "username"
                name = "username"
                type = "text"
                {...formik.getFieldProps('username')}
            />
            {formik.touched.username && formik.errors.username ?(
                <div>{formik.errors.username} </div>) : null}
            <label htmlFor="name">Name</label>
            <input
                id = "name"
                name = "name"
                type = "text"
                {...formik.getFieldProps('name')}
            />
             {formik.touched.name && formik.errors.name ?(
                <div>{formik.errors.name} </div>) : null}
            <label htmlFor="name">Bio</label>
            <input
                id="bio"
                name = "bio"
                type = "text"
                {...formik.getFieldProps('bio')}
            />
            {formik.touched.bio && formik.errors.bio ?(
                <div>{formik.errors.bio} </div>) : null}
            <button type = "submit"> SignUp </button>
        </form>
    )
}
export default SignupAdopter