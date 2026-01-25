import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div className="relative w-full h-[620px] overflow-hidden pt-24">
      <img
        src="/bannerCat.jpg"
        alt="Hero banner"
        className="absolute inset-0 object-cover w-full h-full"
      />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 flex flex-col items-end justify-center h-full px-8 text-right">
        <h2 className="max-w-xl mb-16 text-5xl font-semibold tracking-tight text-white">
          Discover the New Collection
        </h2>

        <p className="max-w-md mb-4 text-xl text-white/80">Premium products.</p>
        <p className="max-w-md mb-4 text-xl text-white/80">
          Exceptional quality.
        </p>
        <p className="max-w-md mb-4 text-xl text-white/80">
          Designed for everyday life.
        </p>

        <Link
          to="/categories"
          className="px-8 py-3 mt-8 text-lg font-medium text-black transition bg-white rounded-full hover:bg-pink-400 hover:text-white"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;
