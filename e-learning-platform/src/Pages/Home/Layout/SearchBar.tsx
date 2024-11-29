import { FC } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  category: string;
  setCategory: (category: string) => void;
  handleSearch: () => void;
}

const SearchBar: FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  category,
  setCategory,
  handleSearch,
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center bg-[var(--nav-color)] rounded-xl lg:rounded-full lg:w-[700px] px-5 py-2 my-7 shadow-lg shadow-[rgba(65,64,64,0.19)] lg:gap-0 gap-4">
      <div className="pl-3 hidden lg:block">
        <CiSearch className="w-6 h-6 text-[var(--peach-color)]" />
      </div>
      <input
        type="text"
        className="bg-transparent flex-grow outline-none w-full text-sm"
        placeholder="Search School, Online educational centers"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="max-w-full w-full bg-transparent">
        <select
          className="bg-[var(--nav-color)] px-4 py-2 rounded-md outline-none w-full truncate"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Category">Category</option>
          <option value="Schools">Schools</option>
          <option value="Online">Online Educational Centers</option>
        </select>
      </div>
      <button
        onClick={handleSearch}
        className="bg-[var(--peach-color)] text-white p-3 rounded-full ml-0 lg:ml-4 hover:bg-[var(--orange-color)] transition-colors duration-300 ease-in"
      >
        <FaArrowRight className="w-6 h-6 p-1" />
      </button>
    </div>
  );
};

export default SearchBar;
