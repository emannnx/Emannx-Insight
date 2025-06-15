import React from 'react'
import './Chat.css'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from 'react'

const Chat = ({file}) => {

    const genAI = new GoogleGenerativeAI("AIzaSyDoQL71iv9ifvD0Y5YAwJlcq0Rm2NEMTL0");
    const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });
    const [message, setMessage] = useState([]);
    const [input, setInput] = useState("");


    async function handleSendMessage(){
       if(input.length) {
          let chatMessages = [...message, {role: "user",text: input}, {role: "loader",text: ""}];
          setInput("")
          setMessage(chatMessages);

        try {

         const result = await model.generateContent([
        {
            inlineData: {
                data: file.file,
                mimeType: file.type,
            },
        },
         `
         Answer this question about the attached document: ${input}.
         Answer as a chatbot with message and text only {no markdowns, tags or symbols}
         Chat history: ${JSON.stringify(message)}
        `,
      ]);

      chatMessages = [...chatMessages.filter((msg)=>msg.role != 'loader'), {role: "model", text: result.response.text() }]
      setMessage(chatMessages);
        
      } catch (error) {
        chatMessages = [...chatMessages.filter((msg)=>msg.role != 'loader'), {role: "error", text: "Error sending messages, Please try again later" }]
        setMessage(chatMessages);
        console.log('error')
      }
       }
    }

  return (
   <section className='chat-window' >
    <h2>Chat</h2>
    {
        message.length ?
        <div className="chat">
            {
                message.map((msg)=>(
                    <div className={msg.role} key={msg.text}>
                       <p>{msg.text}</p>
                    </div>
                ))
            }
        </div> :
        ''
    }
    
    <div className="input-area">
        <input
        value={input}
        onChange={(e)=> setInput(e.target.value) }
        type="text"
        placeholder="Ask any question about the uploaded document...."
        />
        <button onClick={handleSendMessage} >Send</button>

    </div>
   </section>
  )
}

export default Chat
