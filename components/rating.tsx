import { IoIosStarOutline, IoMdStar } from "react-icons/io";

export type RatingProps = {
  rating: number;
  reviewCount: number;
  showWord?: boolean;
};

export default function Rating({ rating, reviewCount, showWord }: RatingProps) {
  const maxRating = 5;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {[...Array(filledStars)].map((_, index) => (
        <Star key={index} filled />
      ))}

      {[...Array(maxRating - filledStars - (hasHalfStar ? 1 : 0))].map(
        (__, index) => (
          <Star key={index + filledStars} />
        )
      )}

      <span className="text-xs font-semibold ml-2 text-gray-600">
        ({reviewCount} {showWord && "Reviews"})
      </span>
    </div>
  );
}

type StarProps = {
  filled?: boolean;
};

const Star = ({ filled }: StarProps) => {
  if (filled) {
    return <IoMdStar className="w-5 h-5 text-yellow-600" />;
  }

  return <IoMdStar className="w-5 h-5 text-gray-400" />;
};
