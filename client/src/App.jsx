import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/admin/Login';
import Home from './pages/Home/Home';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import ManagerLayout from './layouts/ManagerLayout';

// Admin Pages
import OutletManagement from './pages/admin/OutletManagement';
import Dashboard from './pages/admin/Dashboard'; // Reusing as Overview for now

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Super Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="overview" element={<Dashboard />} />
            <Route path="outlets" element={<OutletManagement />} />
            <Route path="users" element={<div className="p-4">User Management (Coming Soon)</div>} />
            <Route path="analytics" element={<div className="p-4">Analytics (Coming Soon)</div>} />
            <Route index element={<Navigate to="/admin/overview" replace />} />
          </Route>

          {/* Manager Routes */}
          <Route path="/manager" element={
            <ProtectedRoute>
              <ManagerLayout />
            </ProtectedRoute>
          }>
            <Route path="live-orders" element={<div className="p-4">Live Orders (Coming Soon)</div>} />
            <Route path="tables" element={<div className="p-4">Table Management (Coming Soon)</div>} />
            <Route path="kitchen" element={<div className="p-4">Kitchen View (Coming Soon)</div>} />
            <Route index element={<Navigate to="/manager/live-orders" replace />} />
          </Route>

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
