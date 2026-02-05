
import { UserProfile } from '@clerk/clerk-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../features/theme/themeSlice';
import type { RootState } from '../store/store';

const AccountPage = () => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();

  return (
    <div className="relative min-h-screen px-10 py-14 dark:bg-black">
      <button
        onClick={() => dispatch(toggleTheme())}
        className="absolute z-50 px-4 py-1 transition border-2 border-pink-400 rounded top-28 dark:border-gray-600 hover:bg-black hover:text-white dark:hover:bg-pink-500 dark:text-whitev right-96"
      >
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>

      <div className="flex justify-center mt-10">
        <UserProfile />
      </div>
    </div>
  );
};

export default AccountPage;
