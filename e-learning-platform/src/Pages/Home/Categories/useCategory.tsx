import axios from "axios";
import { useQuery } from "react-query";

interface CategoryState {
  id: string;
  category: string;
  no_inst: string;
  img: string;
}

const fetchCategories = async (): Promise<CategoryState[]> => {
  const response = await axios.get<CategoryState[]>(
    "http://localhost:4000/categories"
  );
  return response.data; // Return the data directly from the response
};

function useCategory() {
  const { data, isLoading, isError } = useQuery<CategoryState[], Error>(
    "category-types",
    fetchCategories,
    {
      cacheTime: 1000 * 60 * 10,
      refetchOnMount: false, // Don't refetch when the component remounts
      refetchOnReconnect: true, // Refetch if the network reconnects
    }
  );

  return { categories: data || [], isLoading, isError }; // Directly return the data or an empty array
}

export default useCategory;
