import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../Context/theme-context';
import { toast } from 'react-toastify';
import { Loader, Trash2, Mail, Calendar, User, MessageSquare, Shield, Clock } from 'lucide-react';

const MessageForm = () => {
    const { isDark } = useTheme();
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/content/mail', {
                headers: { 'x-auth-token': token }
            });
            setMessages(res.data);
        } catch (err) {
            toast.error('Failed to load messages');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this transmission?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/content/mail/${id}`, {
                headers: { 'x-auth-token': token }
            });
            setMessages(prev => prev.filter(msg => msg._id !== id));
            toast.success('Transmission purged');
        } catch (err) {
            toast.error('Failed to purge transmission');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return <div className="p-8 text-center"><Loader className="animate-spin mx-auto text-cyan-500" /></div>;

    return (
        <div className="max-w-7xl mx-auto animate-fadeInUp pb-32">
            {/* Header */}
            <div className="flex items-end justify-between mb-12 border-b border-gray-800 pb-6 relative">
                <div className="absolute bottom-0 left-0 w-32 h-0.5 bg-cyan-500 shadow-[0_0_10px_cyan]" />
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-8 bg-cyan-500" />
                        <h2 className="text-4xl font-bold font-mono text-white tracking-tight">
                            INCOMING_TRANSMISSIONS
                        </h2>
                    </div>
                    <p className="text-gray-500 font-mono text-sm tracking-widest pl-5">COMMUNICATION_LOGS // ENCRYPTED</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-1.5 bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-mono rounded tracking-widest shadow-[0_0_10px_rgba(34,211,238,0.1)] flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${messages.length > 0 ? 'bg-cyan-400 animate-pulse' : 'bg-gray-600'}`} />
                        {messages.length} SIGNAL(S)
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {messages.length === 0 ? (
                    <div className="relative p-12 text-center rounded-xl border border-gray-800 bg-gray-900/20 overflow-hidden group">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] opacity-10" />
                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <div className="p-4 bg-gray-800/50 rounded-full text-gray-600 group-hover:text-cyan-500 transition-colors duration-500">
                                <Shield size={48} />
                            </div>
                            <h3 className="text-xl font-bold font-mono text-gray-500 tracking-widest">SILENCE_DETECTED</h3>
                            <p className="text-sm font-mono text-gray-600">No incoming transmissions found on this frequency.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {messages.map((msg) => (
                            <div
                                key={msg._id}
                                className={`relative p-6 rounded-xl border group transition-all duration-300 ${isDark ? 'bg-gray-900/40 border-gray-800' : 'bg-white border-gray-200'} hover:border-cyan-500/50 hover:bg-gray-900/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.05)]`}
                            >
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex gap-1">
                                        <div className="w-1 h-1 bg-cyan-500" />
                                        <div className="w-1 h-1 bg-cyan-500/50" />
                                        <div className="w-1 h-1 bg-cyan-500/20" />
                                    </div>
                                </div>
                                <div className="absolute left-0 top-6 bottom-6 w-0.5 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex flex-col md:flex-row gap-6 relative z-10">
                                    {/* Sender Info - Left Column */}
                                    <div className="md:w-64 flex-shrink-0 flex flex-col gap-3 border-b md:border-b-0 md:border-r border-gray-800 pb-4 md:pb-0 md:pr-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded bg-cyan-900/20 flex items-center justify-center text-cyan-400 border border-cyan-500/10">
                                                <User size={18} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white font-mono tracking-wide truncate w-40" title={msg.name}>{msg.name || 'UNKNOWN_ENTITY'}</h4>
                                                <a href={`mailto:${msg.email}`} className="text-xs text-cyan-500/60 hover:text-cyan-400 font-mono tracking-wider truncate w-40 block transition-colors">
                                                    {msg.email}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-2 flex items-center gap-2 text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                                            <Clock size={12} />
                                            {formatDate(msg.createdAt)}
                                        </div>
                                    </div>

                                    {/* Message Body - Right Column */}
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400/50 uppercase tracking-widest mb-1">
                                                <MessageSquare size={12} />
                                                PAYLOAD_CONTENT
                                            </div>
                                            <button
                                                onClick={() => handleDelete(msg._id)}
                                                className="opacity-0 group-hover:opacity-100 p-2 text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded transition-all duration-300"
                                                title="Purge Transmission"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <div className="p-4 bg-black/40 border border-gray-800/50 rounded text-gray-300 font-mono text-sm leading-relaxed whitespace-pre-wrap group-hover:border-cyan-500/10 transition-colors">
                                            {msg.message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageForm;
