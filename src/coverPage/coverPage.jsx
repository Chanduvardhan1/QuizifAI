// import {React,useState} from 'react';
// import "./coverPage.css";
// function CoverPage() {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedOption, setSelectedOption] = useState('');

//     const openModal = (option) => {
//         setSelectedOption(option);
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setSelectedOption('');
//     };

//     const handleSave = () => {
//         alert(`File uploaded for ${selectedOption}`);
//         closeModal();
//     };

//     return (
//         <div className="App">
//             <button onClick={() => openModal('Front Cover Page')}></button>
//             {isModalOpen && (
//                 <div className="modal">
//                     <h2>{selectedOption}</h2>
//                     <input type="file" />
//                     <div>
//                         <button className='save' onClick={handleSave}>Save</button>
//                         <button onClick={closeModal}>Cancel</button>
//                     </div>
//                 </div>
//             )}
//             {!isModalOpen && (
//                 <div className="options">
//                     <button onClick={() => openModal('Front Cover Page')}>Front Cover Page</button>
//                     <button onClick={() => openModal('Back Cover Page')}>Back Cover Page</button>
//                 </div>
//             )}
//         </div>
//     );
// };



// export default CoverPage;












import React, { useState } from 'react';
import "./coverPage.css";

function CoverPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [frontCoverFile, setFrontCoverFile] = useState(null);
  const [backCoverFile, setBackCoverFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState({
    front: false,
    back: false
  });

  const openModal = (option) => {
    setSelectedOption(option);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOption('');
  };

  const handleFileChange = (event) => {
    if (selectedOption === 'Front Cover Page') {
      setFrontCoverFile(event.target.files[0]);
      setFileUploaded((prev) => ({ ...prev, front: true }));
    } else if (selectedOption === 'Back Cover Page') {
      setBackCoverFile(event.target.files[0]);
      setFileUploaded((prev) => ({ ...prev, back: true }));
    }
  };

  const handleSave = () => {
    if (selectedOption === 'Front Cover Page' && frontCoverFile) {
      alert(`Front cover file uploaded: ${frontCoverFile.name}`);
    } else if (selectedOption === 'Back Cover Page' && backCoverFile) {
      alert(`Back cover file uploaded: ${backCoverFile.name}`);
    }
    closeModal();
  };
  console.log('backCoverFile',backCoverFile);
  console.log('frontCoverFile',frontCoverFile);

  return (
    <div className="App">
      {!isModalOpen && (
        <div className="options">
          <button onClick={() => openModal('Front Cover Page')}>Front Cover Page</button>
          <button onClick={() => openModal('Back Cover Page')}>Back Cover Page</button>
          {fileUploaded.front && <p>Front cover uploaded</p>}
          {fileUploaded.back && <p>Back cover uploaded</p>}
        </div>
      )}
      {isModalOpen && (
        <div className="modal">
          <h2>{selectedOption}</h2>
          <input type="file" onChange={handleFileChange} />
          <div>
            <button className='save' onClick={handleSave}>Save</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverPage;

















