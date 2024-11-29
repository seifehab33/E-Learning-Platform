import axios from "axios";
import { useQuery } from "react-query";

interface InstructorListState {
  id: string;
  img_inst: string;
  name_inst: string;
  job: string;
  courses: string[];
  lesson: string;
  hours: string;
  rate: string;
  students: string;
}
const fetchInstList = async () => {
  const response = await axios.get<InstructorListState[]>(
    "http://localhost:4000/Avaliable_Inst"
  );
  return response.data;
};

function useInstructorList() {
  const { data, isLoading, isError } = useQuery("Inst-List", fetchInstList, {
    cacheTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
  return { InstList: data || [], isLoading, isError };
}

export default useInstructorList;
