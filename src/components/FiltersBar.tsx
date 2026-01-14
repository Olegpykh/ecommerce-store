import { useState } from 'react';
import {
  FunnelIcon,
  XMarkIcon,
  BarsArrowDownIcon,
} from '@heroicons/react/24/outline';

interface FiltersBarProps {
  sort: string;
  setSort: (value: string) => void;
  brandFilter: string;
  setBrandFilter: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  brands: string[];
}

const FiltersBar = ({
  sort,
  setSort,
  brandFilter,
  setBrandFilter,
  priceRange,
  setPriceRange,
  brands,
}: FiltersBarProps) => {
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-white border-b">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg shadow-sm hover:bg-gray-50"
            >
              <BarsArrowDownIcon className="w-5 h-5" />
              Sort
            </button>

            {sortOpen && (
              <div className="absolute left-0 z-50 p-2 mt-2 bg-white border rounded-lg shadow-lg w-44">
                <button
                  className={`block w-full text-left px-3 py-2 hover:bg-gray-100 ${
                    sort === 'newest' ? 'bg-gray-200 font-semibold' : ''
                  }`}
                  onClick={() => {
                    setSort('newest');
                    setSortOpen(false);
                  }}
                >
                  Newest
                </button>

                <button
                  className={`block w-full text-left px-3 py-2 hover:bg-gray-100 ${
                    sort === 'price-asc' ? 'bg-gray-200 font-semibold' : ''
                  }`}
                  onClick={() => {
                    setSort('price-asc');
                    setSortOpen(false);
                  }}
                >
                  Price: Low → High
                </button>

                <button
                  className={`block w-full text-left px-3 py-2 hover:bg-gray-100 ${
                    sort === 'price-desc' ? 'bg-gray-200 font-semibold' : ''
                  }`}
                  onClick={() => {
                    setSort('price-desc');
                    setSortOpen(false);
                  }}
                >
                  Price: High → Low
                </button>

                <button
                  className={`block w-full text-left px-3 py-2 hover:bg-gray-100 ${
                    sort === 'rating' ? 'bg-gray-200 font-semibold' : ''
                  }`}
                  onClick={() => {
                    setSort('rating');
                    setSortOpen(false);
                  }}
                >
                  Rating
                </button>
              </div>
            )}
          </div>

          <div className="items-center hidden gap-4 md:flex">
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg shadow-sm"
            >
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b === 'all' ? 'All brands' : b}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <span>€{priceRange[0]}</span>
              <input
                type="range"
                min="0"
                max="50000"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
              />
              <input
                type="range"
                min="0"
                max="50000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
              />
              <span>€{priceRange[1]}</span>
            </div>
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm md:hidden"
            onClick={() => setFiltersOpen(true)}
          >
            <FunnelIcon className="w-5 h-5" />
            Filters
          </button>
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40">
          <div className="w-full p-6 bg-white shadow-xl rounded-t-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button onClick={() => setFiltersOpen(false)}>
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="w-full px-3 py-2 mb-4 border rounded-lg shadow-sm"
            >
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b === 'all' ? 'All brands' : b}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-3 mb-6">
              <span>€{priceRange[0]}</span>
              <input
                type="range"
                min="0"
                max="50000"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
              />
              <input
                type="range"
                min="0"
                max="50000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
              />
              <span>€{priceRange[1]}</span>
            </div>

            <button
              className="w-full py-3 text-white bg-black rounded-xl"
              onClick={() => setFiltersOpen(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FiltersBar;
