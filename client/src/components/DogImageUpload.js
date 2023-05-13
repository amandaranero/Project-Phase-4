import AWS from 'aws-sdk';
import { useState } from 'react';

AWS.config.update({
  accessKeyId: 'AKIAVGDY3CU45NNOLILK',
  secretAccessKey: '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',
  region: 'us-east-1',
  signatureVersion: 'v4',
});

function DogImageUpload() {
  const s3 = new AWS.S3();
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  }

  const uploadToS3 = async () => {
    if (!file) {
      return;
    }
    const params = { 
      Bucket: 'doggyimages', 
      Key: `${Date.now()}.${file.name}`, 
      Body: file 
    };
    const { Location } = await s3.upload(params).promise();
    console.log(Data);
    setImageUrl(Location);
    //need some sort of post?
    // maybe this?
    // fetch('/upload',{
    //   method: 'POST',
    //   body : JSON.stringify(imageUrl)
    // }
    // )
}
  return (
    <div >
      <h1>Test Image Upload</h1>
      <input type="file" onChange={handleFileSelect} />
      {file && (
        <div style={{ marginTop: '10px' }}>
          <button onClick={uploadToS3}>Upload</button>
        </div>
      )}
      {imageUrl && (
        <div style={{ marginTop: '10px' }}>
          <img src={imageUrl} alt="uploaded" />
        </div>
      )}
    </div>
  );
}


export default DogImageUpload