// import React from 'react'
// import './Chat.css'
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { useState } from 'react'

// const Chat = ({file}) => {

//     const genAI = new GoogleGenerativeAI("AIzaSyDoQL71iv9ifvD0Y5YAwJlcq0Rm2NEMTL0");
//     const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });
//     const [message, setMessage] = useState([]);
//     const [input, setInput] = useState("");


//     async function handleSendMessage(){
//        if(input.length) {
//           let chatMessages = [...message, {role: "user",text: input}, {role: "loader",text: ""}];
//           setInput("")
//           setMessage(chatMessages);

//         try {

//          const result = await model.generateContent([
//         {
//             inlineData: {
//                 data: file.file,
//                 mimeType: file.type,
//             },
//         },
//          `
//          Answer this question about the attached document: ${input}.
//          Answer as a chatbot with message and text only {no markdowns, tags or symbols}
//          Chat history: ${JSON.stringify(message)}
//         `,
//       ]);

//       chatMessages = [...chatMessages.filter((msg)=>msg.role != 'loader'), {role: "model", text: result.response.text() }]
//       setMessage(chatMessages);
        
//       } catch (error) {
//         chatMessages = [...chatMessages.filter((msg)=>msg.role != 'loader'), {role: "error", text: "Error sending messages, Please try again later" }]
//         setMessage(chatMessages);
//         console.log('error')
//       }
//        }
//     }

//   return (
//    <section className='chat-window' >
//     <h2>Chat</h2>
//     {
//         message.length ?
//         <div className="chat">
//             {
//                 message.map((msg)=>(
//                     <div className={msg.role} key={msg.text}>
//                        <p>{msg.text}</p>
//                     </div>
//                 ))
//             }
//         </div> :
//         ''
//     }
    
//     <div className="input-area">
//         <input
//         value={input}
//         onChange={(e)=> setInput(e.target.value) }
//         type="text"
//         placeholder="Ask any question about the uploaded document...."
//         />
//         <button onClick={handleSendMessage} >Send</button>

//     </div>
//    </section>
//   )
// }

// export default Chat


import React, { Component } from 'react';
import './Chat.css';
import { GoogleGenerativeAI } from "@google/generative-ai";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      message: []
    };

    this.genAI = new GoogleGenerativeAI("AIzaSyDoQL71iv9ifvD0Y5YAwJlcq0Rm2NEMTL0");
    this.model = this.genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });
  }

  handleInputChange = (e) => {
    this.setState({ input: e.target.value });
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSendMessage();
    }
  }

  handleSendMessage = async () => {
    const { input, message } = this.state;
    const { file } = this.props;

    if (input.trim().length) {
      let chatMessages = [...message, { role: "user", text: input }, { role: "loader", text: "" }];
      this.setState({ input: '', message: chatMessages });

      try {
        const result = await this.model.generateContent([
          {
            inlineData: {
              data: file.file,
              mimeType: file.type,
            },
          },
          `
          Answer this question about the attached document: ${input}.
          Be very explanatory, clear, and break responses with line spacing if needed.
          No markdowns, tags, or symbols.
          Chat history: ${JSON.stringify(message)}
          `,
        ]);

        const rawText = result.response.text();
        const formattedText = rawText.replace(/\n/g, "<br />");

        chatMessages = [
          ...chatMessages.filter((msg) => msg.role !== 'loader'),
          { role: "model", text: formattedText }
        ];

        this.setState({ message: chatMessages });

      } catch (error) {
        chatMessages = [
          ...chatMessages.filter((msg) => msg.role !== 'loader'),
          { role: "error", text: "Error sending message. Please try again later." }
        ];
        this.setState({ message: chatMessages });
        console.error(error);
      }
    }
  }

  render() {
    const { input, message } = this.state;

    return (
      <section className='chat-window'>
        <h2>Chat</h2>
        {message.length > 0 &&
          <div className="chat">
            {message.map((msg, index) => (
              <div className={msg.role} key={index}>
                <p dangerouslySetInnerHTML={{ __html: msg.text }}></p>
              </div>
            ))}
          </div>
        }

        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            placeholder="Ask any question about the uploaded document...."
          />
          <button onClick={this.handleSendMessage}>Send</button>
        </div>
      </section>
    );
  }
}

export default Chat;
