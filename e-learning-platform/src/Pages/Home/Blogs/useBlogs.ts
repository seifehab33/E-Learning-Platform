import axios from "axios";
import { useQuery } from "react-query";
interface BlogsState {
  id: string;
  img: string;
  name: string;
  type: string;
  date: string;
}
const fetchBlogs = async () => {
  const response = await axios.get<BlogsState[]>("http://localhost:4000/Blogs");

  return response.data;
};

function useBlogs() {
  const { data, isLoading, isError } = useQuery("fetch-Blogs", fetchBlogs, {
    cacheTime: 1000 * 60 * 10,
    refetchOnMount: false, // Don't refetch when the component remounts
    refetchOnReconnect: true, // Refetch if the network reconnects
  });

  return {
    BlogsData: data || [],
    isLoading,
    isError,
  };
}

export default useBlogs;
