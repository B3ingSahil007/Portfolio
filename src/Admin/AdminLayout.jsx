import { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../Context/theme-context';
import { LogOut, LayoutDashboard, User, Briefcase, FileText, Fingerprint, Cpu, Box, Rocket, Mail, Home, Layers, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/hero', icon: User, label: 'Hero Section' },
        { path: '/admin/identity', icon: Fingerprint, label: 'System Identity' },
        { path: '/admin/tech-stack', icon: Cpu, label: 'Tech Stack' },
        { path: '/admin/services', icon: Box, label: 'Services' },
        { path: '/admin/deployments', icon: Rocket, label: 'Deployments' },
        { path: '/admin/experience', icon: Briefcase, label: 'Experience' },
        { path: '/admin/connection', icon: Layers, label: 'Connection' },
        { path: '/admin/mail', icon: Mail, label: 'Messages' }
    ];

    return (
        <div className={`min-h-screen flex transition-colors duration-500 ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>

            {/* Mobile Toggle */}
            <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-cyan-900/50 rounded-lg text-cyan-400 backdrop-blur-md border border-cyan-500/20"
            >
                {isSidebarOpen ? <X /> : <Menu />}
            </button>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 z-40 h-screen w-72 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 bg-[#0a0a0f] border-r border-cyan-500/10 flex flex-col`}>
                <div className="h-16 flex items-center px-6 border-b border-cyan-500/10">
                    <span className="text-xl font-bold text-cyan-400 tracking-wider">SM ADMIN.SYS</span>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-3">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 relative overflow-hidden ${isActive ? 'bg-cyan-900/10 text-cyan-400 ' : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-900/5 '}`}
                                    >
                                        {/* Hover Effect Background */}
                                        <div className={`absolute inset-0 bg-cyan-400/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ${isActive ? 'translate-x-0' : ''}`} />

                                        <Icon size={20} className={`relative z-10 transition-colors ${isActive ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]' : 'group-hover:text-cyan-300'}`} />
                                        <span className="font-medium tracking-wide relative z-10">{item.label}</span>

                                        {isActive && <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-3 border-t border-cyan-500/10 bg-[#050508]">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-red-500/5 translate-y-full group-hover:translate-y-0 transition-transform" />
                        <LogOut size={18} />
                        <span className="font-bold tracking-wider">TERMINATE_SESSION</span>
                    </button>
                    <div className="text-center mt-3 text-[10px] text-gray-600 font-mono">
                        SYS.VER.2.0.4.STATUS.ONLINE
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 ml-72 p-8 transition-all ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto space-y-8 relative z-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
