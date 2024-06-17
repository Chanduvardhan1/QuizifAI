import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import password from "../assets/Images/images/profile/password.png"
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx"
import visible from "../assets/Images/images/profile/visible.png";
import hide from "../assets/Images/images/profile/hide.png";


const oldpassword = () => {
    
    const navigate = useNavigate();
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);

  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };

  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
   
  const [passwordUpdate, setUpdatePassword] = useState(false);

  const toggleUpdatePassword = () =>{
    setUpdatePassword(!passwordUpdate);
  };
  
  const [validationError, setValidationError] = useState('');
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    if (!validatePassword(password)) {
      setValidationError('Password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character.');
    } else {
      setValidationError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const password = e.target.value;
    setConfirmPassword(password);
    if (password !== newPassword) {
      setValidationError('Passwords do not match.');
    } else {
      setValidationError('');
    }
  };

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = async () => {
    const userId = 0; // Replace with actual user ID if available
    const payload = {
      user_id: userId,
      old_password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };

    try {
      const response = await fetch('https://quizifai.com:8010/update_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Password updated successfully');
      } else {
        alert('Failed to update password: ' + data.message);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('An error occurred while updating the password');
    }
  };
  
  return (
    <>
    <div className='flex flex-1'>
    <Navigation/>

        <div className='flex items-center mt-[100px] ml-[10%] flex-col'>
          <img
          src={password}
          alt='password'
          width={50}
          height={50}/>
          <h1 className='font-semibold text-[23px] drop-shadow-md text-blue-900'>Update Account Password</h1>
          <h1 className='text-[#EF5130]'>You have requested a password change!</h1>
          <p className='text-[#EF5130]'>If this was intentional, please confirm the change</p>

          <div className='mt-4 ml-[20px]'>
            <div className='flex gap-[20px]'>
            <div className=''>
            <label className='text-blue-900'>Name</label><br/>
            <input className=' mt-2 h-[35px] text-[13px] w-[250px] bg-gray-100 px-2 border-none' placeholder='Enter Your Name'/>
            </div>

            <div className='ml-[30px]'>
            <label className='text-blue-900'>Email</label><br/>
            <input className=' mt-2 h-[35px] text-[13px] w-[250px] bg-gray-100 px-2 border-none' placeholder='Enter Your Email'/>
            </div>
            </div>

           <div className='mt-[10px]'>
           <label className='text-blue-900'>Password</label>
      <br/>
      <input
        type={passwordVisible ? 'text' : 'password'}
        className=' mt-2 h-[40px] w-[250px] bg-gray-100 px-2 border-none'
        placeholder='Your Old Password'
      />
      <span
        onClick={togglePasswordVisibility}
        className=' cursor-pointer'
      >
        {passwordVisible ? (
          <img className='h-[20px] w-[20px] ml-[220px] -mt-[30px]' src={visible}/>
        ) : (
         <img className='h-[20px] w-[20px] ml-[220px] -mt-[30px]' src={hide}/>
        )}
      </span>
           </div>
        
           
          
          </div>
          <button className='mt-[30px] bg-[#3B61C8] text-[13px] font-semibold text-white py-2 px-2 rounded -ml-[390px] hover:bg-[#EF5130] hover:scale-110 transition-transform duration-300 ease-in-out' onClick={toggleUpdatePassword}>Update password</button>
          {passwordUpdate && (
        <div className='mt-[30px]'>

        <div className='flex'>
        <div className='mr-[30px] ml-[30px]'>
            <label className='text-[14px] text-blue-900'>New Password</label>
          <br />
          <input
            type={newPasswordVisible ? 'text' : 'password'}
            className='mt-2 h-[40px] text-[13px] w-[250px] bg-gray-100 px-2 border-none'
            placeholder='Enter your new password'
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <span
            onClick={toggleNewPasswordVisibility}
            className='cursor-pointer'
          >
            {newPasswordVisible ? (
              <img className='h-[20px] w-[20px] ml-[220px] -mt-[30px]' src={visible} alt='Hide Password' />
            ) : (
              <img className='h-[20px] w-[20px] ml-[220px] -mt-[30px]' src={hide} alt='Show Password' />
            )}
          </span>
            </div>
         
         <div className='ml-[30px]'>
         <label className='text-[14px] text-blue-900'>Repeat New Password</label>
          <br />
          <input
            type={confirmPasswordVisible ? 'text' : 'password'}
            className='mt-2 h-[40px] text-[13px] w-[250px] bg-gray-100 px-2 border-none'
            placeholder='Enter your confirm password'
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <span
            onClick={toggleConfirmPasswordVisibility}
            className='cursor-pointer'
          >
            {confirmPasswordVisible ? (
              <img className='h-[20px] w-[20px] ml-[220px] -mt-[30px]' src={visible} alt='Hide Password' />
            ) : (
              <img className='h-[20px] w-[20px] ml-[220px] -mt-[30px]' src={hide} alt='Show Password' />
            )}
          </span>
         </div>
        </div>
            
          
         
          <button onClick={handleSave} className='bg-[#3B61C8] text-[13px] w-[80px] h-[30px] text-white font-semibold rounded-[20px] ml-[30px] mt-[20px] mb-[20px]
          hover:bg-[#EF5130] hover:scale-110 transition-transform duration-300 ease-in-out'>Save</button>
        </div>
      )}
        </div>
        <div className='ml-auto -mt-[10px]'>
        <LogoutBar/>
        </div>
    </div>
    </>  
  )
}

export default oldpassword