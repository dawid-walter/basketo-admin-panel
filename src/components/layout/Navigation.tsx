import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/orders', label: 'Orders' },
    { path: '/products', label: 'Products' },
    { path: '/customers', label: 'Customers' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  px-3 py-4 text-sm font-medium
                  ${isActive
                    ? 'text-white border-b-2 border-blue-500'
                    : 'text-gray-300 hover:text-white'
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
