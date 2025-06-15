import React, { useState } from 'react';
import Header from './Components/Header';
import FileUpload from './Components/FileUpload';
import Summary from './Components/Summary';
import Chat from './Components/Chat';
import MainHeader from './Components/MainHeader';

const App = () => {
  const [uploadedFile, setUploadedFile] = useState(null); // ✅ correct array destructuring

  return (

    
    <div>
      <MainHeader />
      <main className="container">
        <Header />
        {
          uploadedFile ? 
             <>
              <Summary file={uploadedFile} />
              <Chat file={uploadedFile} />
             </>
            :
             <FileUpload setFile={setUploadedFile} />
        }
      </main>
    </div>
  );
};

export default App;
