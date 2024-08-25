import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { myAxios } from './service';

function ViewCourse() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        async function fetchCourse() {
            try {
                const response = await myAxios.get(`/api/courses/${id}`);
                setCourse(response.data);
            } catch (error) {
                console.error('There was an error fetching the course details!', error);
            }
        }
        fetchCourse();
    }, [id]);

    return (
        <div>
            {course ? (
                <div>
                    <div class="view-course-container">
                        <div class="course-title"><h3>{course.title}</h3></div>
                        <div class="course-description">
                            <h3>Course Code:</h3>
                            {course.courseCode}
                        </div>
                        <div class="course-description">
                            <h3>Description:</h3>
                            {course.description}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ViewCourse;
