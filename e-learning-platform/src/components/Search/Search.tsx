import React from "react";
import { CiFilter, CiSearch } from "react-icons/ci";
import { MdOutlineGridView } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import { useGrid } from "../../Context/useGrid";
function Search() {
  const {
    isGrid,
    setGridLayout,
    setListLayout,
    currentPage,
    itemsPerPage,
    totalInstructors,
  } = useGrid();
  const { setSearchTerm } = useGrid();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Calculate the start and end index for displaying results
  const startIdx = (currentPage - 1) * itemsPerPage + 1;
  const endIdx = Math.min(currentPage * itemsPerPage, totalInstructors);
  return (
    <div className="container-main flex flex-col md:flex-row justify-between items-center bg-[#1c1b29] px-6 py-3 rounded-lg space-y-4 md:space-y-0">
      {/* Left Section - Grid/List Buttons and Results Count */}
      <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="flex space-x-2">
          {/* Grid View Button */}
          <button
            className={`p-2 bg-transparent text-white border border-gray-600 rounded-md ${
              isGrid ? "bg-gray-600" : ""
            }`}
            onClick={setGridLayout}
          >
            <MdOutlineGridView className="w-5 h-5 hover:text-[var(--peach-color)] transition-colors duration-150 ease-in-out" />
          </button>
          {/* List View Button */}
          <button
            className={`p-2 bg-transparent text-white border border-gray-600 rounded-md ${
              !isGrid ? "bg-gray-600" : ""
            }`}
            onClick={setListLayout}
          >
            <TfiMenuAlt className="w-5 h-5 hover:text-[var(--peach-color)] transition-colors duration-150 ease-in-out" />
          </button>
        </div>
        {/* Results Count */}
        <div className="text-white mt-2 sm:mt-0">
          <p className="text-sm sm:text-base">
            Showing {startIdx}-{endIdx} of {totalInstructors} results
          </p>
        </div>
      </div>

      {/* Center Section - Search and Dropdown */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Search Input */}
        <div className="flex items-center bg-[#23212d] text-white px-3 py-2 rounded-md w-full sm:w-auto">
          <CiSearch className="w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search our courses"
            className="bg-transparent focus:outline-none text-sm placeholder-gray-400 w-full"
            onChange={handleChange}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="w-full sm:w-auto">
          <select
            name=""
            id=""
            className="bg-[#23212d] text-white px-3 py-2 rounded-md w-full"
          >
            <option value="Newly published">Newly published</option>
            <option value="Angular">Angular</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
          </select>
        </div>
      </div>

      {/* Right Section - Filters and Clear Button */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-20 text-white">
        {/* Filters Button */}
        <div className="flex items-center gap-1 text-[var(--text-color)]">
          <CiFilter className="w-7 h-7" />
          <p className="text-lg sm:text-xl uppercase">Filters</p>
        </div>
        {/* Clear Button */}
        <button className="text-gray-400 hover:text-white">CLEAR</button>
      </div>
    </div>
  );
}

export default Search;
