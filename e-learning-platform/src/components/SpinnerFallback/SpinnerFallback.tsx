function SpinnerFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-t-[#ff4b5c] border-solid border-gray-300"></div>
    </div>
  );
}

export default SpinnerFallback;
