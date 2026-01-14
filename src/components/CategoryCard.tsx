import { Link } from 'react-router-dom';

interface CategoryCardProps {
  name: string;
  slug: string;
  image: string;
}

export const CategoryCard = ({ name, slug, image }: CategoryCardProps) => {
  return (
    <Link
      to={`/categories/${slug}`}
      className="block overflow-hidden transition bg-white rounded-lg shadow-md hover:shadow-2xl hover:-translate-y-2"
    >
      <div className="flex items-center justify-center w-full h-40 bg-gray-100">
        <img
          src={image}
          alt={name}
          className="object-contain max-w-full max-h-full"
          onError={(e) => {
            e.currentTarget.src =
              'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </div>

      <div className="p-4 text-center">
        <h2 className="mb-1 text-xl font-semibold">{name}</h2>
      </div>
    </Link>
  );
};
