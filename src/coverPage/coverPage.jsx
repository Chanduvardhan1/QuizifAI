import {React,useState} from 'react';
import "./coverPage.css";
function CoverPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const openModal = (option) => {
        setSelectedOption(option);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOption('');
    };

    const handleSave = () => {
        alert(`File uploaded for ${selectedOption}`);
        closeModal();
    };

    return (
        <div className="App">
            <button onClick={() => openModal('Front Cover Page')}>+</button>
            {isModalOpen && (
                <div className="modal">
                    <h2>{selectedOption}</h2>
                    <input type="file" />
                    <div>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}
            {!isModalOpen && (
                <div className="options">
                    <button onClick={() => openModal('Front Cover Page')}>Front Cover Page</button>
                    <button onClick={() => openModal('Back Cover Page')}>Back Cover Page</button>
                </div>
            )}
        </div>
    );
};



export default CoverPage;