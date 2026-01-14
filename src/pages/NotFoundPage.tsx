import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
      <p className="mb-6 text-xl text-gray-600"> Page not found </p>
      <Link
        to="/"
        className="px-6 py-3 text-white transition bg-pink-500 rounded-lg hover:bg-pink-600"
      >
        Go Home
      </Link>
    </div>
  );
};
export default NotFoundPage;
