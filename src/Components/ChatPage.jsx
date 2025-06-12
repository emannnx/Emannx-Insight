// import React from 'react'
import "../Components/ChatPage.css"
import SeachIcon from '../assets/SearchIcon.png'
import React, { useState } from 'react';


const ChatPage = () => {
   const [question, setQuestion] = useState('');
   const [answer, setAnswer] = useState('');  
  const [loading, setLoading] = useState(false); 

   const askQuestion = async() => {
    setLoading(true);
    setAnswer('');

    try {
        const response = await fetch('https://healthhubai.onrender.com/api/qna/ask',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });

      const data = await response.json();
      setAnswer(data.answer || 'No answer received.');
    } catch (error) {
      setAnswer('Error fetching answer.');
      console.error(error);
    }

    setLoading(false);
  };




  return (
    <div className='ChatContainer'>
      <div className="ChatHeader"> 
       Hi, emann
      </div>

      <div className="Chatherocont">
        <div className="ChatHeroWrapper">
            <div className="Chatrecieve">
                {answer &&(
                    <div className="ChatRecieveVIew">
                   <p> {answer} </p>
                </div>
                )}
            </div>

            <div className="ChatInput">
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder='Ask a question' className='ChatInputintut' />
                <button  onClick={askQuestion} disabled={loading || !question.trim()} className='EnterButton' > <img src={SeachIcon} alt="" className='SeachIcon' /> </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
