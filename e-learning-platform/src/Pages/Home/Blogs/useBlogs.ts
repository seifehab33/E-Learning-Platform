import axios from "axios";
import { useQuery } from "react-query";
import { apiUrl } from "../../../lib/api";
import { ensureArray } from "../../../lib/arrayResponse";
interface BlogsState {
  id: string;
  img: string;
  name: string;
  type: string;
  date: string;
}
const fetchBlogs = async () => {
  const response = await axios.get<BlogsState[]>(apiUrl("/Blogs"));

  return ensureArray<BlogsState>(response.data);
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
