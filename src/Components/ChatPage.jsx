// // import React from 'react'
// import "../Components/ChatPage.css";
// import SeachIcon from "../assets/SearchIcon.png";
// import React, { useState } from "react";

// const ChatPage = () => {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   const askQuestion = async () => {
//     setLoading(true); // Set loading to true
//     setAnswer(""); // Clear previous answer

//     try {
//       const response = await fetch(
//         "https://healthhubai.onrender.com/api/qna/ask",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ question }),
//         }
//       );

//       const data = await response.json();
//       console.log("api response", data);

//       // Safely get the text from the response
//       const message =
//         data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//         "No answer received.";
//       setAnswer(message);
//     } catch (error) {
//       setAnswer("Error fetching answer.");
//       console.error(error);
//     }

//     setLoading(false); // Turn off loading
//   };

//   return (
//     <div className="ChatContainer">
//       <div className="ChatHeader">
//         <p> Hi, emann</p>
//       </div>

//       <div className="Chatherocont">
//         <div className="ChatHeroWrapper">
//           <div className="Chatrecieve">
//             {loading ? (
//               <div className="ChatRecieveVIew">
//                 <p>Loading...</p>
//               </div>
//             ) : (
//               answer && (
//                 <div className="ChatRecieveVIew">
//                   <p>{answer}</p>
//                 </div>
//               )
//             )}
//           </div>

//           <div className="ChatInput">
//             <input
//               type="text"
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               placeholder="Ask a question"
//               className="ChatInputintut"
//             />
//             <button
//               onClick={askQuestion}
//               disabled={loading || !question.trim()}
//               className="EnterButton"
//             >
//               <img src={SeachIcon} alt="" className="SeachIcon" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;



// import React from 'react'
import "../Components/ChatPage.css";
import SeachIcon from "../assets/SearchIcon.png";
import React, { useState } from "react";

const ChatPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch(
        "https://healthhubai.onrender.com/api/qna/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        }
      );

      const data = await response.json();
      console.log("api response", data);

      const message =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No answer received.";
      setAnswer(message);
    } catch (error) {
      setAnswer("Error fetching answer.");
      console.error(error);
    }

    setLoading(false);
  };

  // Format: handles **bold** and line breaks
  const formatAnswer = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
      .replace(/\n/g, "<br />"); // New lines
  };

  return (
    <div className="ChatContainer">
      <div className="ChatHeader">
        <p>Hi, emann</p>
      </div>

      <div className="Chatherocont">
        <div className="ChatHeroWrapper">
          <div className="Chatrecieve">
            {loading ? (
              <div className="ChatRecieveVIew">
                <p>Loading...</p>
              </div>
            ) : (
              answer && (
                <div className="ChatRecieveVIew">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: formatAnswer(answer),
                    }}
                  />
                </div>
              )
            )}
          </div>

          <div className="ChatInput">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question"
              className="ChatInputintut"
            />
            <button
              onClick={askQuestion}
              disabled={loading || !question.trim()}
              className="EnterButton"
            >
              <img src={SeachIcon} alt="Search" className="SeachIcon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
