import React, { useState } from 'react';
import axios from 'axios';
import { myAxios } from './service';
import { ToastContainer, toast } from 'react-toastify';


const AddCourse = () => {
  const [formData, setFormData] = useState({
    title: '',
    courseCode: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  console.log(formData);
    e.preventDefault();
    try {
      const response = await myAxios.post('/api/courses', formData);
      if (response.status === 200) {
        toast("Course created successfully!");
      
        setFormData({ title: '', courseCode: '', description: '' });
      }
    } catch (error) {
      console.error('There was an error creating the course!', error);
      toast('Failed to create course. Please try again.');
    }
  };

  return (
  
    <form className="course-form" onSubmit={handleSubmit}>
      <h1>Add Course</h1>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="courseCode">Course Code:</label>
        <input
          type="text"
          id="courseCode"
          name="courseCode"
          value={formData.courseCode}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddCourse;