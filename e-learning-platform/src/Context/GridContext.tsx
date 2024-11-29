import { createContext, useState, ReactNode } from "react";
import useInstructorList from "../Pages/Instructor/InstructorHooks/useInstructorList";

interface Instructor {
  id: string;
  img_inst: string;
  name_inst: string;
  job: string;
  students: string;
  courses: string[];
  lesson: string;
  hours: string;
  rate: string;
}

interface GridContextType {
  isGrid: boolean;
  setGridLayout: () => void;
  setListLayout: () => void;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalInstructors: number;
  updatePage: (page: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  SearchedInst: Instructor[];
}

export const GridContext = createContext<GridContextType>({
  isGrid: true,
  setGridLayout: () => {},
  setListLayout: () => {},
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 10,
  totalInstructors: 0,
  updatePage: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
  SearchedInst: [],
});

export const GridProvider = ({ children }: { children: ReactNode }) => {
  const { InstList } = useInstructorList();
  const totalInstructors = InstList.length;
  const [isGrid, setIsGrid] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalInstructors / itemsPerPage);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const setGridLayout = () => setIsGrid(true);
  const setListLayout = () => setIsGrid(false);

  const updatePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const SearchedInst = InstList.filter((instructor: Instructor) =>
    instructor.courses.some((course) =>
      course.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <GridContext.Provider
      value={{
        isGrid,
        setGridLayout,
        setListLayout,
        currentPage,
        totalPages,
        itemsPerPage,
        totalInstructors,
        updatePage,
        searchTerm,
        setSearchTerm,
        SearchedInst,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};
