import AWS from 'aws-sdk';
import { useState } from 'react';


function DogImageUpload() {

  // const [imageUrl, setImageUrl] = useState(null);
  // const [loading, setLoading] = useState(false)

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   console.log('dog')
  //   const imageData = new FormData()
  //   imageData.append('image', imageUrl)
  //   setLoading(true)
  //   const response = await fetch('/newdog', {
  //     method: 'POST',
  //     body: imageData
  //   })
  //   if (response.ok){
  //     setLoading(false)
  //     const data = await response.json()
  //     console.log(data)
  //   } else{
  //     setLoading(false)
  //     console.log('failed')
  //   }
  //   }
  

  // const handleChange = (e) =>{
  //   const imageFile = e.target.files[0]
  //   setImageUrl(imageFile)
  // }

 

  return (
    <div >
    {/* //     <input type = 'file'  onChange = {handleChange} /> */}
    //     {/* <button type = 'submit' onClick={handleSubmit}>Upload Image</button> */}
    </div>
  )

}




export default DogImageUpload