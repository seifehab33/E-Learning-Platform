import axios from "axios";
import { useQuery } from "react-query";
interface FeaturedInstState {
  id: string;
  name_inst: string;
  img_inst: string;
  job: string;
  students: string;
}
const fetchFeaturedInstructor = async () => {
  const response = await axios.get<FeaturedInstState[]>(
    "http://localhost:4000/Featured_Inst"
  );
  return response.data;
};

function UseFeaturedInstructor() {
  const { data, isLoading, isError, refetch } = useQuery(
    "featured-inst",
    fetchFeaturedInstructor,
    {
      cacheTime: 1000 * 60 * 10,
      refetchOnMount: false, // Don't refetch when the component remounts
      refetchOnReconnect: true, // Refetch if the network reconnects
    }
  );
  return { FeaturedInst: data || [], isLoading, isError, refetch };
}

export default UseFeaturedInstructor;
