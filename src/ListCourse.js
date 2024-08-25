import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { myAxios } from './service';
import { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { IoSearchCircleSharp } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';


function ListCourses() {
    const [courses, setCourses] = useState([]);
      const [error, setError] = useState(null);
    const navigate = useNavigate();



    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await myAxios.get('/api/courses');
                console.log(response.data);
                setCourses(response.data);
            } catch (error) {
                console.error('There was an error fetching the courses!', error);
            }
        }
        fetchCourses();
    }, []);
    const handleView = (id) => {
        navigate(`/courses/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            const response = await myAxios.delete(`/api/courses/${id}`);
            if (response.status === 200) {
                setCourses(courses.filter(course => course.id !== id));
                toast('Course deleted successfully!');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete the course because might be link with instance Delete instance first .';
            console.error('There was an error deleting the course instance!', errorMessage);
            toast(errorMessage);  
        }
    };

    return (
        <div>
        <h1>Courses List</h1>
        {error && <p>{error}</p>}
        <table className='course-table'>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Code</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td className='course-title'>{course.title}</td>
                            <td className='course-code'>{course.courseCode}</td>
                            <td className='course-action'>
                                <IoSearchCircleSharp className='action-icon' onClick={() => handleView(course.id)} />
                                <MdDelete className='action-icon' onClick={() => handleDelete(course.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
    );
}

export default ListCourses;
