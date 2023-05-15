import {useFormik} from 'formik';
import * as yup from 'yup';
import {useNavigate, Link} from "react-router-dom"

function SignupAgency(){
    
    const navigate = useNavigate()

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter name"),
        email: yup.string().required("Must have email"),
        username: yup.string().required("Must have username"),
        address: yup.string().required("Must have address")
    })

    const formik = useFormik({
        initialValues:{
            name: '',
            email: '',
            username: '',
            address: ''
        },
        validationSchema: formSchema,
        onSubmit: (values)=>{
            fetch('/agencies', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            })
            .then((resp)=> {
                if (resp.status === 201){
                    navigate('/agencypage')
                }
            }) 
        }
    })

    return (
        <div>
            <div>
                <header>
                    <nav>
                        <Link to = {'/'}>
                            <button>Back</button>
                        </Link>
                    </nav>
                </header>
            </div>
            <form onSubmit= {formik.handleSubmit}>
            <label htmlFor="name">Agency Name</label>
            <input
                id = "name"
                name = "name"
                type = "text"
                {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name ?(
                <div>{formik.errors.name} </div>) : null}
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
            <label htmlFor="name">Address</label>
            <input
                id="address"
                name = "address"
                type = "text"
                {...formik.getFieldProps('address')}
            />
            {formik.touched.address && formik.errors.address ?(
                <div>{formik.errors.address} </div>) : null}
            <button type = "submit"> SignUp </button>
        </form>
    </div>
)   

}

export default SignupAgency