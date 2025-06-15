import React from 'react';
import { Buffer } from 'buffer';
import documentIcon from '../assets/document-icon.png'

const FileUpload = ({ setFile }) => {
    
   async function handleFileUpload(event){
      const fileUpload = await event.target.files[0].arrayBuffer();
      const file = {
        type: event.target.files[0].type,
        file: Buffer.from(fileUpload).toString("base64"),
        imageUrl: event.target.files[0].type.includes("pdf") ? "../assets/document-icon.png" : URL.createObjectURL(event.target.files[0])
      }
      console.log(file);
      setFile(file);
    }

  return (
    <section>
      <h2>Get Started</h2>
     <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png"
        onChange={handleFileUpload}
        id="hiddenFileInput"
        style={{ display: 'none' }} // hides the default input
      />
      <label htmlFor="hiddenFileInput" className="custom-upload-button">
        📎 Choose File
      </label>
    </section>
  );
};

export default FileUpload;
