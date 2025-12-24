import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Store, 
  Users, 
  BarChart3, 
  LogOut, 
  Menu,
  Bell
} from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path) 
      ? "bg-blue-600 text-white" 
      : "text-slate-300 hover:bg-slate-700 hover:text-white";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-blue-400">IndoCafe</h1>
          <p className="text-xs text-slate-400 mt-1">Super Admin Portal</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/overview" className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/admin/overview')}`}>
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Overview
          </Link>
          <Link to="/admin/outlets" className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/admin/outlets')}`}>
            <Store className="h-5 w-5 mr-3" />
            Outlets
          </Link>
          <Link to="/admin/users" className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/admin/users')}`}>
            <Users className="h-5 w-5 mr-3" />
            Users
          </Link>
          <Link to="/admin/analytics" className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/admin/analytics')}`}>
            <BarChart3 className="h-5 w-5 mr-3" />
            Analytics
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center px-4 py-2">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
              {user?.name?.charAt(0) || 'A'}
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

export default AdminLayout;
