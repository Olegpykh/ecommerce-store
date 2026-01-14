import { StarIcon } from '@heroicons/react/24/solid';

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  if (!reviews || reviews.length === 0) {
    return <p className="mt-10 text-gray-500">No reviews yet</p>;
  }

  return (
    <div className="mt-14">
      <h2 className="mb-6 text-3xl font-semibold">Customer Reviews</h2>

      <div className="flex flex-col gap-4">
        {reviews.map((r, i) => (
          <div key={i} className="p-6 bg-white border shadow-lg rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{r.reviewerName}</h3>

              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <StarIcon
                    key={idx}
                    className={`w-5 h-5 ${
                      idx < r.rating ? 'text-pink-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-gray-700">{r.comment}</p>

            <p className="mt-2 text-sm text-gray-500">
              {new Date(r.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
