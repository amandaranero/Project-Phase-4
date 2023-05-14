import { useFormik } from 'formik';
import * as yup from 'yup';
import {useState} from 'react'
    
function DogForm() {
    const [loading, setLoading] = useState(false)

      const formSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        age: yup.number().required('Age is required'),
        breed: yup.string().required('Breed is required'),
        temperment: yup.string().required('Temperament is required'),
      });
    
      const formik = useFormik({
        initialValues: {
          name: '',
          age: '',
          breed: '',
          temperment: '',
          image: ''
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
        const formData = new FormData()
        for (let value in values) {
          formData.append(value, values[value]);
        }
        console.log(formData.values())
        setLoading(true)
         const response = await fetch('/newdog',{
             method: 'POST',
             body: formData,
         })
            if (response.ok){
              const data = await response.json()
                setLoading(false)
                console.log('form submission successful', data)
            } else{
                setLoading(false)
                console.log('failed')
            }
         }
         })
      
    
      return (
        <div>
          <h1>New Dog Form</h1>
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div>{formik.errors.name}</div>
              )}
            </div>

            <div>
              <label htmlFor="age">Age:</label>
              <input
                id="age"
                name="age"
                type="text"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.age && formik.errors.age && (
                <div>{formik.errors.age}</div>
              )}
            </div>
    
            <div>
              <label htmlFor="breed">Breed:</label>
              <input
                id="breed"
                name="breed"
                type="text"
                value={formik.values.breed}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.breed && formik.errors.breed && (
                <div>{formik.errors.breed}</div>
              )}
            </div>
    
            <div>
              <label htmlFor="temperment">Temperament:</label>
              <input
                id="temperment"
                name="temperment"
                type="text"
                value={formik.values.temperment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.temperment && formik.errors.temperment && (
                <div>{formik.errors.temperment}</div>
              )}
            </div>
            <div>
                <label htmlFor='dogform'>Upload Dog Photo</label>
                <input id = "image" name = "image" type = 'file'  onChange={(e) =>
            formik.setFieldValue('image', e.currentTarget.files[0])
          } />
            </div>
            {loading ? <p>It's loading</p>: null}
            <button type="submit">Submit</button>
          </form>

        </div>
      );
    }
    
    export default DogForm;

    //aysnc (values, helpers) then after everything helpers.resetForm()
