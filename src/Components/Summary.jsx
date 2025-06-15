import React, { useState, useEffect } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import Loader from './Loader';

const Summary = ({file}) => {

   const genAI = new GoogleGenerativeAI("AIzaSyDoQL71iv9ifvD0Y5YAwJlcq0Rm2NEMTL0");
   const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });
   const [summary, setSummary] = useState("");
   const [status, setStatus] = useState("idle");

    async function getSummary(){
      setStatus("loading");

      try {

         const result = await model.generateContent([
        {
            inlineData: {
                data: file.file,
                mimeType: file.type,
            },
        },
         `
          Summarize the document.
          Use just plain text with no markdowns or html tags
        `,
      ]);
      setStatus('success');
       setSummary(result.response.text())
        
      } catch (error) {
        setStatus('error')
      }
      
      
    }

    useEffect(()=>{
     if(status === 'idle'){
      getSummary();
     }
    },[status]);


  return (
   <section className="summary">

    <img src={file.imageUrl} alt="Preview Image" />
     <h2>Summary</h2>
     {
      status === 'loading' ?
       <Loader /> :
       status === 'success' ?
        <p>{summary}</p> :
        status === 'error'  ?
         <p>Error getting the summary</p> :
         ''
     }
   </section>
  )
}

export default Summary
