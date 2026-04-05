import axios from "axios";
import { useQuery } from "react-query";
import { apiUrl } from "../../../lib/api";
import { ensureArray } from "../../../lib/arrayResponse";

interface NewCourseState {
  id: string;
  img_inst: string;
  img_course: string;
  name_inst: string;
  job: string;
  course: string;
  lesson: string;
  hours: string;
  rate: string;
  price: string;
  discount: string;
}

const fetchNewCourses = async (): Promise<NewCourseState[]> => {
  const response = await axios.get(apiUrl("/new_courses"));
  return ensureArray<NewCourseState>(response.data);
};

function useNewCourses() {
  const { data, isLoading, isError } = useQuery("newCourses", fetchNewCourses);
  return { New_Courses: data || [], isLoading, isError };
}

export default useNewCourses;
