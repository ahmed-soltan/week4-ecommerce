import { IoIosStarOutline, IoMdStar } from "react-icons/io";

export type RatingProps = {
  rating: number;
  reviewCount: number;
};

export default function Rating({ rating, reviewCount }: RatingProps) {
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

      <span className="text-xs font-semibold ml-2 text-gray-600">({reviewCount})</span>
    </div>
  );
}

type StarProps = {
  filled?: boolean;
};

const Star = ({ filled }: StarProps) => {
  if (filled) {
    return <IoMdStar className="w-4 h-4 text-yellow-600" />;
  }

  return <IoIosStarOutline className="w-4 h-4 text-yellow-600" />;
};
