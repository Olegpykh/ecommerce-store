interface LoadMoreButtonProps {
  onClick: () => void;
}

export const LoadMoreButton = ({ onClick }: LoadMoreButtonProps) => {
  return (
    <div className="mt-12 text-center">
      <button
        onClick={onClick}
        className="px-24 py-3 text-lg font-medium border-2 border-gray-400 rounded-xl hover:bg-pink-400 hover:text-white"
      >
        Load More
      </button>
    </div>
  );
};
