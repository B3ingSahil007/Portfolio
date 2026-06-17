import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../Context/theme-context';
import { Lock, User } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // For now, hardcoded URL. Should use env var.
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                password: formData.password
            });

            localStorage.setItem('token', res.data.token);
            toast.success('Login Successful');
            navigate('/admin/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Login Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center overflow-hidden relative ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
            <div className="noise-overlay" />
            <div className={`absolute inset-0 bg-tech-grid opacity-20 pointer-events-none ${isDark ? '' : 'hidden'}`} />

            {/* Animated background blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 blur-[100px] animate-pulse-slow-once pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 blur-[80px] animate-float-slow pointer-events-none" />

            <div className={`w-full max-w-md p-1 relative group z-10`}>
                {/* Glowing Border Container */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-1000 animate-loadingPulse" />

                <div className={`relative w-full p-8 rounded-xl border backdrop-blur-xl ${isDark ? 'bg-[#0a0a0f]/90 border-cyan-500/30' : 'bg-white/90 border-gray-200'}`}>
                    {/* Cyber Decor */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-xl" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-purple-400/50 rounded-br-xl" />

                    <div className="text-center mb-10 relative">
                        <div className="inline-block p-4 rounded-full bg-cyan-500/10 mb-4 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                            <Lock className="text-cyan-400 animate-pulse" size={32} />
                        </div>
                        <h2 className="text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 glitch-hover mb-2">
                            SYSTEM ACCESS
                        </h2>
                        <p className="text-gray-400 font-mono text-sm tracking-widest">SECURE_GATEWAY_V.4.0</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-xs font-mono text-cyan-400 mb-2 tracking-widest uppercase">Password Authentication</label>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
                                </div>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className={`w-full pl-10 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-lg text-white font-mono tracking-widest outline-none focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 placeholder-gray-600`}
                                    placeholder="ENTER_SECURITY_KEY"
                                    required
                                />
                                <div className="absolute inset-0 border border-cyan-500/0 group-hover/input:border-cyan-500/30 pointer-events-none rounded-lg transition-colors" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-lg font-bold text-lg font-mono tracking-widest transition-all transform hover:scale-[1.02] active:scale-95 relative overflow-hidden group/btn
                                ${loading
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                    : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(8,145,178,0.4)]'
                                }`}
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {loading ? 'DECRYPTING...' : 'INITIALIZE_LINK_'}
                                {!loading && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                            </span>
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-[10px] text-gray-600 font-mono">
                            UNAUTHORIZED ACCESS WILL BE LOGGED. IP TRACKING ACTIVE.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
