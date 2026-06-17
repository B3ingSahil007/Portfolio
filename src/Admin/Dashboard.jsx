import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../Context/theme-context';
import { motion } from 'framer-motion';
import {
    Activity, Users, Database, Globe,
    Share2, Cpu, Terminal, AlertCircle
} from 'lucide-react';

const Dashboard = () => {
    const { isDark } = useTheme();
    const [time, setTime] = useState(new Date());
    const [stats, setStats] = useState({
        projects: 0,
        experience: 0,
        services: 0,
        messages: 0
    });

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const [contentRes, mailRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/content'),
                    axios.get('http://localhost:5000/api/content/mail', {
                        headers: { 'x-auth-token': token }
                    })
                ]);

                setStats({
                    projects: contentRes.data.deployments?.length || 0,
                    experience: contentRes.data.experiences?.length || 0,
                    services: contentRes.data.services?.length || 0,
                    messages: mailRes.data?.length || 0
                });
            } catch (err) {
                console.error("Stats fetch error", err);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { label: 'Total Project', value: stats.projects, icon: Globe, color: 'text-cyan-400', border: 'border-cyan-500/30' },
        { label: 'Total Services Provided', value: stats.services, icon: Database, color: 'text-purple-400', border: 'border-purple-500/30' },
        { label: 'Experience', value: stats.experience, icon: Activity, color: 'text-green-400', border: 'border-green-500/30' },
        { label: 'Total Mails Receive', value: stats.messages, icon: Share2, color: 'text-yellow-400', border: 'border-yellow-500/30' }
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Welcome Section */}
            <div className="flex justify-between items-end border-b border-gray-800 pb-6">
                <div>
                    <h2 className="text-4xl font-bold font-mono text-white mb-2 tracking-tight">
                        COMMAND_CENTER
                    </h2>
                    <p className="text-gray-400 font-mono text-sm max-w-xl">
                        Welcome back, Administrator. System integrity is optimal. All endpoints are active.
                    </p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-xs text-gray-500 font-mono">SERVER_TIME</p>
                    <p className="text-xl font-mono text-cyan-400">{time.toLocaleTimeString()}</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-xl border ${isDark ? 'bg-gray-900/50' : 'bg-white'} ${card.border} relative overflow-hidden group hover:bg-gray-900/80 transition-all`}
                    >
                        <div className={`absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity ${card.color}`}>
                            <card.icon size={32} />
                        </div>
                        <h3 className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-2">{card.label}</h3>
                        <div className={`text-4xl font-bold font-mono ${card.color}`}>
                            {String(card.value).padStart(2, '0')}
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions / System Log */}
            {/* Middle Section: Quick Actions & Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visualizer Mockup (Network Status) */}
                <div className={`lg:col-span-2 p-6 rounded-xl border relative overflow-hidden flex flex-col justify-between ${isDark ? 'bg-gray-900/40 border-gray-800' : 'bg-white border-gray-200'}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent" />
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <div>
                            <h3 className="text-lg font-bold font-mono text-white flex items-center gap-2">
                                <Activity size={18} className="text-cyan-400" />
                                NETWORK_TRAFFIC
                            </h3>
                            <p className="text-xs text-gray-500 font-mono mt-1">REALTIME_PACKET_LOSS: 0.0%</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                            <span className="w-2 h-2 rounded-full bg-cyan-500/50 animate-pulse delay-75" />
                            <span className="w-2 h-2 rounded-full bg-cyan-500/20 animate-pulse delay-150" />
                        </div>
                    </div>
                    {/* Mock Graph Bars */}
                    <div className="flex items-end justify-between h-32 gap-1 px-2">
                        {[40, 65, 30, 80, 55, 90, 45, 70, 35, 60, 25, 85, 50, 75, 40].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ duration: 1, delay: i * 0.05, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                                className="w-full bg-cyan-500/20 rounded-t hover:bg-cyan-500/40 transition-colors"
                            />
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-900/40 border-gray-800' : 'bg-white border-gray-200'}`}>
                    <h3 className="text-lg font-bold font-mono text-white mb-6 flex items-center gap-2">
                        <Cpu size={18} className="text-purple-400" />
                        QUICK_EXECUTION
                    </h3>
                    <div className="space-y-3">
                        <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 hover:border-cyan-500/50 hover:bg-gray-800 transition-all group">
                            <h4 className="text-sm font-mono text-cyan-400 group-hover:text-white transition-colors">DEPLOY_NEW_PROJECT</h4>
                            <p className="text-[10px] text-gray-500 group-hover:text-gray-400">Initialize new repository deployment sequence.</p>
                        </button>
                        <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 hover:border-purple-500/50 hover:bg-gray-800 transition-all group">
                            <h4 className="text-sm font-mono text-purple-400 group-hover:text-white transition-colors">CHECK_COMMUNICATIONS</h4>
                            <p className="text-[10px] text-gray-500 group-hover:text-gray-400">Scan secure channels for new transmissions.</p>
                        </button>
                        <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 hover:border-green-500/50 hover:bg-gray-800 transition-all group">
                            <h4 className="text-sm font-mono text-green-400 group-hover:text-white transition-colors">UPDATE_SYSTEM_CORE</h4>
                            <p className="text-[10px] text-gray-500 group-hover:text-gray-400">Modify core identity parameters and bio.</p>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Status Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* System Logs */}
                <div className="p-6 rounded-xl border border-gray-800 bg-black/40 backdrop-blur-sm">
                    <h3 className="text-lg font-bold font-mono text-white mb-4 flex items-center gap-2">
                        <Terminal size={18} className="text-gray-400" />
                        SYSTEM_LOGS
                    </h3>
                    <div className="space-y-3 font-mono text-xs">
                        <div className="flex gap-4 text-gray-400 border-b border-gray-800 pb-2">
                            <span className="text-gray-600 w-24">{time.toLocaleTimeString()}</span>
                            <span className="text-cyan-400">[INFO]</span>
                            <span>Dashboard metrics synchronized.</span>
                        </div>
                        <div className="flex gap-4 text-gray-400 border-b border-gray-800 pb-2">
                            <span className="text-gray-600 w-24">{new Date(Date.now() - 1000 * 60 * 2).toLocaleTimeString()}</span>
                            <span className="text-green-400">[Status]</span>
                            <span>System heartbeat: <span className="text-green-500">STABLE</span>.</span>
                        </div>
                        <div className="flex gap-4 text-gray-400 border-b border-gray-800 pb-2">
                            <span className="text-gray-600 w-24">{new Date(Date.now() - 1000 * 60 * 15).toLocaleTimeString()}</span>
                            <span className="text-blue-400">[UPDATE]</span>
                            <span>Secure connection active. 128-bit encryption.</span>
                        </div>
                    </div>
                </div>
                {/* Resource Usage */}
                <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/30">
                    <h3 className="text-lg font-bold font-mono text-white mb-4 flex items-center gap-2">
                        <AlertCircle size={18} className="text-yellow-400" />
                        RESOURCE_USAGE
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                                <span>CPU_LOAD</span>
                                <span>{Math.floor(Math.random() * 20) + 10}%</span>
                            </div>
                            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }} animate={{ width: "15%" }}
                                    className="h-full bg-cyan-500"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                                <span>MEMORY_ALLOC</span>
                                <span>42%</span>
                            </div>
                            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }} animate={{ width: "42%" }}
                                    className="h-full bg-purple-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
