import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, CreditCardIcon, HistoryIcon, CalendarIcon, ShieldIcon, AwardIcon, BellIcon, MenuIcon, XIcon } from 'lucide-react';
const Sidebar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [{
    name: 'Tableau de bord',
    path: '/dashboard',
    icon: <HomeIcon className="h-5 w-5" />
  }, {
    name: 'Mes cartes',
    path: '/cards',
    icon: <CreditCardIcon className="h-5 w-5" />
  }, {
    name: 'Transactions',
    path: '/transactions',
    icon: <HistoryIcon className="h-5 w-5" />
  }, {
    name: 'Abonnements',
    path: '/subscriptions',
    icon: <CalendarIcon className="h-5 w-5" />
  }, {
    name: 'Litiges',
    path: '/disputes',
    icon: <ShieldIcon className="h-5 w-5" />
  }, {
    name: 'Fidélité',
    path: '/loyalty',
    icon: <AwardIcon className="h-5 w-5" />
  }, {
    name: 'Notifications',
    path: '/notifications',
    icon: <BellIcon className="h-5 w-5" />
  }];
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return <>
      {/* Mobile menu button */}
      <button className="fixed z-50 bottom-4 right-4 md:hidden bg-indigo-600 text-white p-3 rounded-full shadow-lg" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>
      {/* Sidebar for desktop */}
      <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            AmadouPay
          </h2>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map(item => <NavLink key={item.path} to={item.path} className={({
            isActive
          }) => `flex items-center px-4 py-3 rounded-md transition-all ${isActive ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>)}
          </nav>
        </div>
      </div>
      {/* Mobile sidebar */}
      {isMobileMenuOpen && <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={toggleMobileMenu}></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-50">
            <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                AmadouPay
              </h2>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navItems.map(item => <NavLink key={item.path} to={item.path} className={({
            isActive
          }) => `flex items-center px-4 py-3 rounded-md transition-all ${isActive ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`} onClick={toggleMobileMenu}>
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>)}
            </nav>
          </div>
        </div>}
    </>;
};
export default Sidebar;