import React from 'react'
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx";
import { useState } from 'react';
import Plus from "../../src/assets/Images/dashboard/Plus.png";
import Edit from "../../src/assets/Images/Assets/Edit.png"
import Delete from "../../src/assets/Images/Assets/Delete.png"
import Line from "../../src/assets/Images/Assets/Line.png"
const category = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [createdBy, setCreatedBy] = useState(0); // Assuming a default value for demonstration
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleAddOrUpdateCategory = async () => {
    const categoryData = {
      category: categoryName,
      category_description: categoryDescription,
      parent_category: parentCategory,
      created_by: createdBy,
    };

    if (isEditing) {
      const updatedCategories = categories.map((category, index) =>
        index === editIndex
          ? { ...categoryData, id: categoryId }
          : category
      );
      setCategories(updatedCategories);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      try {
        const response = await fetch('https://quizifai.com:8010/create_category/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoryData),
        });

        if (response.ok) {
          const newCategory = { id: categoryId, ...categoryData };
          setCategories([...categories, newCategory]);
        } else {
          console.error('Failed to create category');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    setCategoryId('');
    setCategoryName('');
    setCategoryDescription('');
    setParentCategory('');
    setIsNavbarOpen(false);
  };

  const handleEdit = (index) => {
    const category = categories[index];
    setCategoryId(category.id);
    setCategoryName(category.category);
    setCategoryDescription(category.category_description);
    setParentCategory(category.parent_category);
    setCreatedBy(category.created_by);
    setIsEditing(true);
    setEditIndex(index);
    setIsNavbarOpen(true);
  };

  const handleDelete = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  return (
    <>
    <div className='flex w-full font-Poppins'>
    <Navigation/> 
    <div className='flex w-full flex-col'>
      <div className='flex justify-end mt-[30px]'>
        <div className='w-[118px] h-[41px] rounded-[10px] bg-[#FFEDCD]'>
          <div className="flex" onClick={toggleNavbar}>
            <img className="w-[25px] h-[25px] ml-2 mt-2" src={Plus} alt="Plus Icon" />
            <a className="hover:underline underline-offset-2 cursor-pointer font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2 mt-3">
              Category
            </a>
          </div>
        </div>
      </div>

      {isNavbarOpen && (
        <div className='h-[60px] mt-[30px] w-fit rounded-md bg-slate-200 flex flex-row gap-[10px] p-4'>
          <input
            type='text'
            placeholder='Category ID'
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className='bg-white w-[120px] text-center rounded-3xl py-4 pl-1 text-[#9696BB]'
          />
          <input
            type='text'
            placeholder='Category Name'
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className='bg-white w-[150px] rounded-3xl text-center py-4 text-[#9696BB]'
          />
          <input
            type='text'
            placeholder='Category Description'
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            className='bg-white w-[190px] rounded-3xl text-center py-4 text-[#9696BB]'
          />
          <input
            type='text'
            placeholder='Parent Category'
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
            className='bg-white w-[150px] rounded-3xl text-center py-4 text-[#9696BB]'
          />
          <button
            onClick={handleAddOrUpdateCategory}
            className='bg-gray-700 w-[80px] text-center rounded-3xl text-white'
          >
            {isEditing ? 'Update' : 'Add'}
          </button>
        </div>
      )}

      <table className='table-auto mt-[30px] w-full text-left bg-[#2a4e9c] text-white'>
        <thead>
          <tr>
            <th className='px-4 py-2'>Category Id</th>
            <th className='px-4 py-2'>Category Name</th>
            <th className='px-4 py-2'>Category Description</th>
            <th className='px-4 py-2'>Parent Category</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index} className='bg-slate-200 text-black'>
              <td className='border px-4 py-2'>{category.id}</td>
              <td className='border px-4 py-2'>{category.category}</td>
              <td className='border px-4 py-2'>{category.category_description}</td>
              <td className='border px-4 py-2'>{category.parent_category}</td>
              <td className='border px-4 py-2 flex gap-2'>
                <img
                  className='h-[20px] w-[20px] cursor-pointer'
                  src={Edit}
                  alt="Edit"
                  onClick={() => handleEdit(index)}
                />
                <img
                  className='h-[20px] w-[15px] cursor-pointer'
                  src={Delete}
                  alt="Delete"
                  onClick={() => handleDelete(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
     

   
    <LogoutBar />
    </div>
    </>
    
    

    
  )
}

export default category