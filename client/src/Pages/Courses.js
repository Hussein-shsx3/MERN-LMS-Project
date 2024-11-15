import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses } from "../Api/courseApi";
import Footer from "../Components/footer";

const Courses = () => {
  const dispatch = useDispatch();

  // Get the courses and status from the Redux store
  const { courses, fetchStatus, error } = useSelector((state) => state.course);

  // Dispatch the fetchCourses action when the component mounts
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (fetchStatus === "loading") return <div>Loading...</div>;
  if (fetchStatus === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      {courses.length > 0 ? (
        courses.map((course) => (
          <div key={course._id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
          </div>
        ))
      ) : (
        <p>No courses available</p>
      )}
      <Footer />
    </div>
  );
};

export default Courses;
