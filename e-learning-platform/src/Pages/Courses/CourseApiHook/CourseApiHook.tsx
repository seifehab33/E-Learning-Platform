import axios from "axios";
import { useQuery } from "react-query";
import { CourseState } from "./TypesCourse";

const fetchCourses = async () => {
  const { data } = await axios<CourseState[]>("http://localhost:4000/Courses"); // Your JSON Server URL
  return data;
};

function CourseApiHook() {
  const { data, isLoading, isError } = useQuery("Courses-Types", fetchCourses, {
    cacheTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
  return { Courses: data || [], isLoading, isError };
}

export default CourseApiHook;
