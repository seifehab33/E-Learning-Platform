import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

interface RecentBlogs {
  id: string;
  img_blog: string;
  desc_blog: string;
  date_blog: string;
}

const fetchBlogs = async (): Promise<RecentBlogs[]> => {
  const response = await axios.get("http://localhost:4000/RecentBlogs");
  return response.data;
};

function useRecentBlogs() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery("recent-blogs", fetchBlogs, {
    staleTime: 60000,
    retry: 2,
    onSuccess: (data) => {
      // Prefetch each blog only if it hasn't already been fetched
      data.forEach((blog) => {
        queryClient.prefetchQuery(["recent-blog", blog.id], async () => {
          try {
            const response = await axios.get(
              `http://localhost:4000/RecentBlogs/${blog.id}`
            );
            return response.data;
          } catch (error) {
            console.error(`Error prefetching blog ${blog.id}:`, error);
          }
        });
      });
    },
  });

  return { recentBlogs: data || [], isLoading, isError };
}

export default useRecentBlogs;
