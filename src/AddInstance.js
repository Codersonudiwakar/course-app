import React, { useState, useEffect } from 'react';
import { myAxios } from './service';
import { ToastContainer, toast } from 'react-toastify';


const AddInstance = () => {
  const [formData, setFormData] = useState({
    deliveryYear: new Date().getFullYear(),
    semester: '',
    course: {
      id: ''
    },
  });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await myAxios.get('/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast('Error fetching courses:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCourseChange = (e) => {
    const selectedCourseId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      course: {
        id: selectedCourseId,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await myAxios.post('/api/instances', formData);
      if (response.status === 200) {
        toast("Delivery created successfully!");
        
        setFormData({ deliveryYear: new Date().getFullYear(), semester: '', course: { id: '' } });
      }
    } catch (error) {
      console.error('There was an error creating the delivery:', error);
      toast('Failed to create delivery. Please try again.');
    }
  };

  return (
    <form className="delivery-form" onSubmit={handleSubmit}>
      <h1>Add Instance</h1>
      <div className="form-group">
        <label htmlFor="courseId">Course:</label>
        <select
          id="courseId"
          name="courseId"
          value={formData.course.id}
          onChange={handleCourseChange}
          required
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.courseCode}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="deliveryYear">Delivery Year:</label>
        <input
          type="number"
          id="deliveryYear"
          name="deliveryYear"
          value={formData.deliveryYear}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="semester">Semester:</label>
        <input
          type="number"
          id="semester"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          required
        />
      </div>
     
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddInstance;
