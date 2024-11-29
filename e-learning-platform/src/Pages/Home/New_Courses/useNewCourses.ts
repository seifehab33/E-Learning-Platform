import axios from "axios";
import { useQuery } from "react-query";

const fetchNewCourses = async () => {
  const response = await axios.get("http://localhost:4000/new_courses");
  return response.data;
};

function useNewCourses() {
  const { data, isLoading, isError } = useQuery("newCourses", fetchNewCourses);
  return { New_Courses: data, isLoading, isError };
}

export default useNewCourses;
