import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { SunIcon, MoonIcon, UserIcon, LogOutIcon } from 'lucide-react';
const Header: React.FC = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  return <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4 md:px-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          AmadouPay
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}>
          {theme === 'dark' ? <SunIcon className="h-5 w-5 text-yellow-400" /> : <MoonIcon className="h-5 w-5 text-gray-700" />}
        </button>
        <div className="flex items-center border-l border-gray-200 dark:border-gray-700 pl-4">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-100 dark:bg-indigo-900/40 p-2 rounded-full">
              <UserIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                john.doe@gmail.com
              </p>
            </div>
          </div>
          <button className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <LogOutIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </header>;
};
export default Header;