

import CategoryButton from './CategoryButton';

interface CategoriesSectionProps {
  categories: Array<{ slug: string; name: string }>;
  selected: string | null;
  onSelect: (slug: string | null) => void;
  status: string;
  error: string | null;
}

const CategoriesSection = ({
  categories,
  selected,
  onSelect,
  status,
  error,
}: CategoriesSectionProps) => {
  return (
    <div className="mb-12">
      <h2 className="mb-6 text-2xl font-semibold">Shop by Category</h2>

      {status === 'loading' && <p>Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-4 pb-2 overflow-x-auto flex-nowrap scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 sm:overflow-visible">
        <CategoryButton
          label="All products"
          active={selected === null}
          onClick={() => onSelect(null)}
        />

        {categories.slice(0, 17).map((category) => (
          <CategoryButton
            key={category.slug}
            label={category.name}
            active={selected === category.slug}
            onClick={() => onSelect(category.slug)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
