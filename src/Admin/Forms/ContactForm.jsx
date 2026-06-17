import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../Context/theme-context';
import { toast } from 'react-toastify';
import { Loader, Save, Plus, Trash2, Globe, Mail, Phone, MapPin, Share2 } from 'lucide-react';

const ContactForm = () => {
    const { isDark } = useTheme();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        description: '',
        email: '',
        phoneNumber: '',
        location: '',
        socialLinks: []
    });

    const [newLink, setNewLink] = useState({ platform: '', url: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/content');
            if (res.data.connection) {
                setFormData(res.data.connection);
            }
        } catch (err) {
            toast.error('Failed to load connection data');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/content/connection', formData, {
                headers: { 'x-auth-token': token }
            });
            toast.success('Connection parameters updated');
        } catch (err) {
            toast.error('Failed to update');
        } finally {
            setSaving(false);
        }
    };

    const addSocialLink = () => {
        if (!newLink.platform || !newLink.url) return;
        setFormData(prev => ({
            ...prev,
            socialLinks: [...prev.socialLinks, newLink]
        }));
        setNewLink({ platform: '', url: '' });
    };

    const removeSocialLink = (index) => {
        setFormData(prev => ({
            ...prev,
            socialLinks: prev.socialLinks.filter((_, i) => i !== index)
        }));
    };

    const labelClasses = `block text-xs font-mono text-cyan-400 mb-2 tracking-widest uppercase`;

    if (loading) return <div className="p-8 text-center"><Loader className="animate-spin mx-auto text-cyan-500" /></div>;

    return (
        <div className="space-y-12 max-w-7xl mx-auto animate-fadeInUp pb-32">
            {/* Header */}
            <div className="flex items-end justify-between mb-8 border-b border-gray-800 pb-6 relative">
                <div className="absolute bottom-0 left-0 w-32 h-0.5 bg-cyan-500 shadow-[0_0_10px_cyan]" />
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-8 bg-cyan-500" />
                        <h2 className="text-4xl font-bold font-mono text-white tracking-tight">
                            COMM_CHANNELS
                        </h2>
                    </div>
                    <p className="text-gray-500 font-mono text-sm tracking-widest pl-5">UPLINK_STATUS // ESTABLISHED</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-1.5 bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-mono rounded tracking-widest shadow-[0_0_10px_rgba(34,211,238,0.1)] flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        LINK_ACTIVE
                    </div>
                </div>
            </div>

            <div className={`p-8 rounded-xl border relative overflow-hidden group ${isDark ? 'bg-gray-900/20 border-gray-800' : 'bg-white border-gray-200'}`}>
                {/* Decorative & Cyber Elements */}
                <div className="absolute top-0 right-0 p-3">
                    <div className="flex gap-1">
                        <div className="w-12 h-1 bg-cyan-500/20" />
                        <div className="w-2 h-1 bg-cyan-500/40" />
                        <div className="w-1 h-1 bg-cyan-500/60" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                    <h3 className="text-xl font-bold font-mono text-cyan-400 mb-8 flex items-center gap-3 border-b border-gray-800 pb-4 w-fit pr-12 relative">
                        ESTABLISH_CONNECTION
                        <span className="absolute bottom-0 right-0 w-8 h-0.5 bg-cyan-500" />
                    </h3>

                    <div className="grid gap-10">
                        {/* Description */}
                        <div>
                            <label className={labelClasses}>TRANSMISSION_MESSAGE</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-gray-900/30 border border-gray-800 rounded p-4 text-sm font-mono text-gray-300 focus:border-cyan-500/50 outline-none transition-all resize-none leading-relaxed"
                                rows={3}
                                placeholder="Initiate handshake protocol..."
                            />
                        </div>

                        {/* Contact Details Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="group/input relative">
                                <label className={labelClasses}>SECURE_MAIL_RELAY</label>
                                <div className="absolute left-0 bottom-3 text-gray-500"><Mail size={18} /></div>
                                <input
                                    type="text"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-transparent border-b border-gray-700 py-3 pl-8 text-lg font-mono text-white focus:border-cyan-500 outline-none transition-all placeholder-gray-700 focus:placeholder-gray-600"
                                    placeholder="email@domain.com"
                                />
                            </div>
                            <div className="group/input relative">
                                <label className={labelClasses}>COMMS_FREQUENCY (PHONE)</label>
                                <div className="absolute left-0 bottom-3 text-gray-500"><Phone size={18} /></div>
                                <input
                                    type="text"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    className="w-full bg-transparent border-b border-gray-700 py-3 pl-8 text-lg font-mono text-white focus:border-cyan-500 outline-none transition-all placeholder-gray-700 focus:placeholder-gray-600"
                                    placeholder="+1 000 000 0000"
                                />
                            </div>
                        </div>

                        <div className="group/input relative">
                            <label className={labelClasses}>PHYSICAL_COORDINATES</label>
                            <div className="absolute left-0 bottom-3 text-gray-500"><MapPin size={18} /></div>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full bg-transparent border-b border-gray-700 py-3 pl-8 text-lg font-mono text-white focus:border-cyan-500 outline-none transition-all placeholder-gray-700 focus:placeholder-gray-600"
                                placeholder="Sector 7, Night City"
                            />
                        </div>
                    </div>

                    {/* Social Uplinks Section */}
                    <div className="space-y-6 pt-6 border-t border-gray-800">
                        <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm tracking-widest uppercase">
                            <Share2 size={16} />
                            SOCIAL_UPLINKS_CONFIGURATION
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                placeholder="PLATFORM (e.g. GITHUB)"
                                className="md:w-1/3 bg-gray-900/50 border border-gray-700 rounded p-3 text-sm font-mono text-white outline-none focus:border-cyan-500 transition-colors"
                                value={newLink.platform}
                                onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                            />
                            <input
                                placeholder="UPLINK_URL (https://...)"
                                className="flex-1 bg-gray-900/50 border border-gray-700 rounded p-3 text-sm font-mono text-white outline-none focus:border-cyan-500 transition-colors"
                                value={newLink.url}
                                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                            />
                            <button type="button" onClick={addSocialLink} className="p-3 bg-cyan-600/20 border border-cyan-500/50 text-cyan-400 rounded hover:bg-cyan-500 hover:text-white transition-all">
                                <Plus size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formData.socialLinks.map((link, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-gray-900/80 rounded border border-gray-800 group hover:border-cyan-500/30 transition-all">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-8 h-8 rounded bg-cyan-900/20 flex items-center justify-center text-cyan-400">
                                            <Globe size={16} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">{link.platform}</span>
                                            <span className="text-sm font-mono text-gray-300 truncate w-48">{link.url}</span>
                                        </div>
                                    </div>
                                    <button type="button" onClick={() => removeSocialLink(i)} className="p-2 text-gray-600 hover:text-red-400 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            {formData.socialLinks.length === 0 && (
                                <div className="col-span-2 text-center py-8 text-gray-600 font-mono text-xs border border-dashed border-gray-800 rounded">
                                    // NO_UPLINKS_DETECTED
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end pt-6">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-3 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold font-mono tracking-widest rounded-sm shadow-[0_0_20px_rgba(8,145,178,0.3)] transition-all transform hover:translate-y-[-2px] border-l-4 border-white overflow-hidden group relative"
                        >
                            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                            {saving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                            <span>SAVE_PARAMETERS</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
