import { useEffect, useState } from 'react';

export const useCategoryImages = (
  categoriesItems: Array<{ slug: string; url: string }>
) => {
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    if (categoriesItems.length === 0) return;

    const loadImages = async () => {
      const promises = categoriesItems.map(async (cat) => {
        try {
          const res = await fetch(cat.url);
          const data = await res.json();

          return {
            slug: cat.slug,
            thumbnail:
              data.products?.[0]?.thumbnail ||
              'https://via.placeholder.com/300x200?text=No+Image',
          };
        } catch {
          return {
            slug: cat.slug,
            thumbnail: 'https://via.placeholder.com/300x200?text=No+Image',
          };
        }
      });

      const results = await Promise.all(promises);

      const imagesMap: Record<string, string> = {};
      results.forEach((item) => {
        imagesMap[item.slug] = item.thumbnail;
      });

      setCategoryImages(imagesMap);
    };

    loadImages();
  }, [categoriesItems]);

  return categoryImages;
};
