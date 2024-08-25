import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { myAxios } from './service';

function ViewInstance() {
    const { year,sem,id } = useParams();
    const [instance, setInstance] = useState(null);
    console.log(year);
    console.log(sem);
    console.log(id);

    useEffect(() => {
        async function fetchCourse() {
            try {
                const response = await myAxios.get(`/api/instances/${year}/${sem}/${id}`);
                setInstance(response.data);
            } catch (error) {
                console.error('There was an error fetching the course details!', error);
            }
        }
        fetchCourse();
    }, [id]);

    return (
        <div>
            {instance ? (
                <div>
                    <div class="view-course-container">
                        <div class="course-title"><h3>{instance.course.title}</h3></div>
                        <div class="course-description">
                            <h3>Course Code:</h3>
                            {instance.course.courseCode}
                        </div>
                        <div class="course-description">
                            <h3>Course Instance Year:</h3>
                            {instance.deliveryYear}
                        </div>
                        <div class="course-description">
                            <h3>Course Instance semester:</h3>
                            {instance.semester}
                        </div>
                        <div class="course-description">
                            <h3>Description:</h3>
                            {instance.course.description}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ViewInstance;
