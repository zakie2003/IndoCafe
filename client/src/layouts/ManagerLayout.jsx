import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ClipboardList, 
  Armchair, 
  ChefHat, 
  LogOut, 
  Menu,
  Bell
} from 'lucide-react';

const ManagerLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path) 
      ? "bg-emerald-600 text-white" 
      : "text-slate-300 hover:bg-slate-700 hover:text-white";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-emerald-400">IndoCafe</h1>
          <p className="text-xs text-slate-400 mt-1">Manager Portal</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/manager/live-orders" className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/manager/live-orders')}`}>
            <ClipboardList className="h-5 w-5 mr-3" />
            Live Orders
          </Link>
          <Link to="/manager/tables" className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/manager/tables')}`}>
            <Armchair className="h-5 w-5 mr-3" />
            Tables
          </Link>
          <Link to="/manager/kitchen" className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/manager/kitchen')}`}>
            <ChefHat className="h-5 w-5 mr-3" />
            Kitchen View
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center px-4 py-2">
            <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-bold">
              {user?.name?.charAt(0) || 'M'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role?.replace('_', ' ')}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <button className="md:hidden text-gray-500 focus:outline-none">
              <Menu className="h-6 w-6" />
            </button>
            
            <h2 className="text-xl font-semibold text-gray-800">
              {location.pathname.split('/').pop().replace('-', ' ').toUpperCase()}
            </h2>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                <Bell className="h-5 w-5" />
              </button>
              
              <div className="h-6 w-px bg-gray-200 mx-2"></div>
              
              <button 
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ManagerLayout;
