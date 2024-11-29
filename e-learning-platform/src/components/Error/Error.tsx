import notfound from "../../assets/not-found.png";
function Error() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={notfound} // Replace with your image path
        alt="Error Not Found"
        className="mb-4 w-1/2 md:w-1/3 lg:w-1/4" // Adjust the width as needed
      />
      <p className="text-gray-700">
        The categories you are looking for does not exist.
      </p>
    </div>
  );
}

export default Error;
