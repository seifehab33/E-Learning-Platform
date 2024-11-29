import { FaRegStar, FaStar } from "react-icons/fa";

interface StarRatingProps {
  rate: number;
}
function Rating({ rate }: StarRatingProps) {
  const roundedRate = Math.round(rate);

  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) =>
        index < roundedRate ? (
          <FaStar key={index} className="text-yellow-500" /> // Filled star
        ) : (
          <FaRegStar key={index} className="text-gray-400" /> // Empty star
        )
      )}
    </div>
  );
}

export default Rating;
