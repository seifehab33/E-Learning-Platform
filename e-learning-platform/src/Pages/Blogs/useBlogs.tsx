import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

// Define the TypeScript type for the blog data
interface Blog {
  id: string;
  name_blog: string;
  img_blog: string;
  date_blog: string;
  tag_blog: string;
  admin_img: string;
  admin_name: string;
}

const fetchBlogs = async (): Promise<Blog[]> => {
  const response = await axios.get("http://localhost:4000/blogs_news");
  return response.data;
};

function useBlogs() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isFetching } = useQuery<Blog[]>(
    "blogs-news",
    fetchBlogs,
    {
      staleTime: 60000,
      cacheTime: 300000,
      retry: 2,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      onSuccess: (data) => {
        data.forEach((blog) => {
          queryClient.prefetchQuery(["blog", blog.id], () =>
            axios.get(`http://localhost:4000/blogs_news/${blog.id}`)
          );
        });
      },
    }
  );

  return {
    blogsNews: data || [],
    isLoading,
    isError,
    isFetching,
  };
}

export default useBlogs;
