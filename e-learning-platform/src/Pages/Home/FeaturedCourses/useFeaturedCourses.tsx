import axios from "axios";
import { useQuery } from "react-query";
interface FeaturedCourseState {
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

const fetchFeaturedCourses = async () => {
  const response = await axios.get<FeaturedCourseState[]>(
    "http://localhost:4000/FeaturedCourses"
  );
  return response.data;
};
function useFeaturedCourses() {
  const { data, isLoading, isError, refetch } = useQuery(
    "featured-courses",
    fetchFeaturedCourses,
    {
      cacheTime: 1000 * 60 * 10,
      refetchOnMount: false, // Don't refetch when the component remounts
      refetchOnReconnect: true, // Refetch if the network reconnects
    }
  );
  return { FeaturedCourse: data || [], isLoading, isError, refetch };
}

export default useFeaturedCourses;
