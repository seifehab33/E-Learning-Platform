import axios from "axios";
import { useQuery } from "react-query";
import { CourseState } from "./TypesCourse";
import { apiUrl } from "../../../lib/api";
import { ensureArray } from "../../../lib/arrayResponse";

const fetchCourses = async () => {
  const { data } = await axios<CourseState[]>(apiUrl("/Courses"));
  return ensureArray<CourseState>(data);
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
