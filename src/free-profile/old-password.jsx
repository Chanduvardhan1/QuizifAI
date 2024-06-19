import React from 'react';
import { useState } from 'react';
import password from "../assets/Images/images/profile/password.png"
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx"
import visible from "../assets/Images/images/profile/visible.png";
import hide from "../assets/Images/images/profile/hide.png";


const oldpassword = () => {
  const [userId, setUserId] = useState(localStorage.getItem("user_id")); 
  const [username, setUsername] = useState(localStorage.getItem("user_name"));
  const [email, setEmail] = useState(localStorage.getItem("user_email")); 
  const [oldPassword, setOldPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordUpdate, setUpdatePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ newPassword: '', confirmPassword: '' });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const toggleUpdatePassword = () =>{
    setUpdatePassword(!passwordUpdate);
  };

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    const passwordErrors = validatePassword(password);
    if (Object.keys(passwordErrors).length > 0) {
      setErrors((prevErrors) => ({ ...prevErrors, newPassword: passwordErrors }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, newPassword: '' }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const password = e.target.value;
    setConfirmPassword(password);
    if (password !== newPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: { match: 'Passwords do not match.' } }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' }));
    }
  };

  const validatePassword = (password) => {
    const errors = {};
    if (password.length < 8) {
      errors.length = 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      errors.alphabet = 'Password must contain at least one Uppercase letter.';
    }
    if (!/\d/.test(password)) {
      errors.digit = 'Password must contain at least one digit.';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.specialChar = 'Password must contain at least one special character.';
    }
    return errors;
  };

  const handleSave = async () => {
    const newPasswordErrors = validatePassword(newPassword);
    const confirmPasswordErrors = {};
    if (confirmPassword !== newPassword) {
      confirmPasswordErrors.match = "Confirm password doesn't match the new password.";
    }
    if (Object.keys(newPasswordErrors).length > 0 || Object.keys(confirmPasswordErrors).length > 0) {
      setErrors({ newPassword: newPasswordErrors, confirmPassword: confirmPasswordErrors });
    } else {
      const payload = {
        user_id: userId,
        username: username,
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      };

      console.log("Payload:", payload); // Debugging line

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
          console.log('Password updated successfully:', data);
          alert('Password updated successfully');
        } else {
          console.error('Failed to update password:', data.message);
          alert('Failed to update password: ' + data.message);
        }
      } catch (error) {
        console.error('Error updating password:', error);
        alert('An error occurred while updating the password');
      }
    }
  };
  return (
    <>
    <div className='flex flex-1'>
    <Navigation/>

    <div className='flex items-center mt-[100px] ml-[10%] flex-col'>
      <img src={password} alt='password' width={50} height={50} />
      <h1 className='font-semibold text-[23px] drop-shadow-md text-blue-900'>Update Account Password</h1>
      <h1 className='text-[#EF5130]'>You have requested a password change!</h1>
      <p className='text-[#EF5130]'>If this was intentional, please confirm the change</p>

      <div className='mt-4 ml-[20px]'>
        <div className='flex gap-[20px]'>
          <div>
            <label className='text-blue-900'>Name</label><br />
            <input 
              className='mt-2 h-[35px] text-[13px] w-[250px] bg-gray-100 px-2 border-none' 
              placeholder='Enter Your Name' 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>

          <div className='ml-[30px]'>
            <label className='text-blue-900'>Email</label><br />
            <input 
              className='mt-2 h-[35px] text-[13px] w-[250px] bg-gray-100 px-2 border-none' 
              placeholder='Enter Your Email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className='mt-[10px]'>
          <label className='text-blue-900'>Password</label>
          <br />
          <input
            type={passwordVisible ? 'text' : 'password'}
            className='mt-2 h-[40px] w-[250px] bg-gray-100 px-2 border-none'
            placeholder='Your Old Password'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <span
            onClick={togglePasswordVisibility}
            className='cursor-pointer'
          >
            {passwordVisible ? (
              <img className='h-[20px] w-[20px] ml-[220px] -mt-[30px]' src={visible} alt='Hide Password' />
            ) : (
              <img className='h-[20px] w-[20px] ml-[220px] -mt-[30px]' src={hide} alt='Show Password' />
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
              {errors.newPassword && (
                <div className='text-red-500 text-[12px] mt-[10px]'>
                  {Object.values(errors.newPassword).map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
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
              {errors.confirmPassword && (
                <div className='text-red-500 text-[12px] mt-[10px]'>
                  {Object.values(errors.confirmPassword).map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </div>

          </div>
          <button
            className='mt-[30px] ml-[35px] bg-[#3B61C8] text-[13px] font-semibold text-white py-[5px] px-2 rounded-[20px] w-[60px] hover:bg-[#EF5130] hover:scale-110 transition-transform duration-300 ease-in-out'
            onClick={handleSave}
          >
            Save
          </button>
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

export default oldpassword;