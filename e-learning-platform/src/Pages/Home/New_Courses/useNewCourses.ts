import axios from "axios";
import { useQuery } from "react-query";
import { apiUrl } from "../../../lib/api";

const fetchNewCourses = async () => {
  const response = await axios.get(apiUrl("/new_courses"));
  return response.data;
};

function useNewCourses() {
  const { data, isLoading, isError } = useQuery("newCourses", fetchNewCourses);
  return { New_Courses: data, isLoading, isError };
}

export default useNewCourses;
