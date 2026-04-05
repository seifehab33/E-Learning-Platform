import axios from "axios";
import { Course } from "../../../features/Cart/CartSlice";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { apiUrl } from "../../../lib/api";

export const fetchCourseDetails = async (courseId: string): Promise<Course> => {
  const response = await axios.get(apiUrl(`/Courses/${courseId}`));
  return response.data;
};
function useCourseDetails() {
  const { courseId } = useParams<{ courseId: string }>();
  const { data, isLoading, isError } = useQuery<Course, Error>(
    ["course-detail", courseId],
    () => fetchCourseDetails(courseId!),
    {
      enabled: !!courseId, // Only fetch if courseId is available
    }
  );
  return { Details: data || undefined, isLoading, isError };
}

export default useCourseDetails;
