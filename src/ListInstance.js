import React, { useState } from "react";
import { myAxios } from "./service";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoSearchCircleSharp } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';

const CourseList = () => {
    const [year, setYear] = useState("");
    const [semester, setSemester] = useState("");
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    const handleFetchCourses = async () => {
        try {
            const response = await myAxios.get(`/api/instances/${year}/${semester}`);
            setCourses(response.data);
            console.log(courses);
        } catch (error) {
            console.error("Error fetching courses:", error);
            toast("Error fetching courses:", error);
        }
    };

    const handleView = (year, sem, id) => {
        console.log("Year:", year);
        console.log("Semester:", sem);
        console.log("ID:", id);
        navigate(`/instances/${year}/${sem}/${id}`);
    };
    

    const handleDelete = async (year, semester, id) => {
        try {
            const response = await myAxios.delete(`/api/instances/${year}/${semester}/${id}`);
            if (response.status === 200) {
                setCourses(courses.filter(course => course.id !== id));
                toast('Course instance deleted successfully!');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete the course instance.';
            console.error('There was an error deleting the course instance!', errorMessage);
            toast(errorMessage);
        }
    };

    return (
        <div>
            <div className="instance-container">
                <label>
                    Year:
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="Enter year (e.g., 2020)"
                    />
                </label>
                <label>
                    Semester:
                    <select value={semester} onChange={(e) => setSemester(e.target.value)}>
                        <option value="">Select semester</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                </label>
                <button onClick={handleFetchCourses}>Fetch Courses</button>
            </div>

            {courses.length > 0 ? (
                <table className="course-instance-table">
                    <thead>
                        <tr>
                            <th className="course-title">Course Name</th>
                            <th className="year-sem">Year-Sem</th>
                            <th className="course-code">Course Code</th>
                            <th className="actions">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((courseInstance) => (
                            <tr key={courseInstance.id}>
                                <td className="course-title">{courseInstance.course.title}</td>
                                <td className="year-sem">{courseInstance.deliveryYear}-{courseInstance.semester}</td>
                                <td className="course-code">{courseInstance.course.courseCode}</td>
                                <td className="actions">
                                <IoSearchCircleSharp className="action-icon" onClick={() => handleView(courseInstance.deliveryYear, courseInstance.semester, courseInstance.id)} />
                                <MdDelete className="action-icon" onClick={() => handleDelete(courseInstance.deliveryYear, courseInstance.semester, courseInstance.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No records found.</p>
            )}
        </div>
    );
};

export default CourseList;
