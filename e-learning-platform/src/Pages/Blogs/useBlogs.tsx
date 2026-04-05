import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { apiUrl } from "../../lib/api";
import { ensureArray } from "../../lib/arrayResponse";

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
  const response = await axios.get(apiUrl("/blogs_news"));
  return ensureArray<Blog>(response.data);
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
        ensureArray<Blog>(data).forEach((blog) => {
          queryClient.prefetchQuery(["blog", blog.id], () =>
            axios.get(apiUrl(`/blogs_news/${blog.id}`))
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
