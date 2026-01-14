import React from 'react';

interface CategoryButtonProps {
label: string;
active: boolean;
onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  label,
  active,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`  min-w-[140px] sm:min-w-0 h-12 sm:h-14
                    w-full
                    whitespace-nowrap
                    rounded-lg font-medium transition
                    ${
                      active
                        ? 'bg-black text-white rounded-3xl'
                        : 'bg-white hover:bg-pink-400 border-2 border-gray-400 rounded-3xl text-gray-800'
                    }
`}
    >
      {label}
    </button>
  );
};

export default CategoryButton;
