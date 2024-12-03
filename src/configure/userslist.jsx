import React, { useEffect } from "react";
import Navigation from "../navbar/navbar.jsx";
import LogoutBar from "../logoutbar/logoutbar.jsx";
import searchIcon from "../assets/Images/images/dashboard/Search.png";
import { useState } from "react";
import Select from 'react-select';
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
import cancel from "../assets/Images/images/dashboard/cancel.png";
import Plus from "../../src/assets/Images/dashboard/Plus.png";
import Edit from "../../src/assets/Images/Assets/Edit.png";
import Delete from "../../src/assets/Images/Assets/Delete.png";
import Line from "../../src/assets/Images/Assets/Line.png";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const userslist = () => {
 
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('https://dev.quizifai.com:8010/nrml-users/', {
            method: 'GET',
            headers: {
              'accept': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjaGFuZHUgdmFyZGhhbiBrIiwiZXhwIjoyNTM0MDIzMDA3OTl9.iWUpVhKE_YtFj5W_ReJgK6DqPA2rnsS5_j-cTnlQUPw',
            },
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
  
          const data = await response.json();
  
          if (data.response === 'success') {
            setUsers(data.data);
          } else {
            setError(data.response_message || 'Failed to fetch users');
          }
        } catch (err) {
          setError(err.message || 'An unknown error occurred');
        }
      };
  
      fetchUsers();
    }, []);

  return (
    <>
      <div className="flex w-full font-Poppins">
        <Navigation />
        <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#214082]">User List</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <table className="min-w-full bg-white border border-gray-300 shadow rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border-b text-[#214082]">User ID</th>
            <th className="py-2 px-4 border-b text-[#214082]">Name</th>
            <th className="py-2 px-4 border-b text-[#214082]">Active Status</th>
            <th className="py-2 px-4 border-b text-[#214082]">Role ID</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{user.user_id}</td>
              <td className="py-2 px-4 border-b">{user.user_name}</td>
              <td className="py-2 px-4 border-b">
                {user.active_status ? (
                  <span className="text-green-500">Active</span>
                ) : (
                  <span className="text-red-500">Inactive</span>
                )}
              </td>
              <td className="py-2 px-4 border-b">{user.user_role_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
{/* 
        <LogoutBar /> */}
      </div>
    </>
  );
};

export default userslist;
