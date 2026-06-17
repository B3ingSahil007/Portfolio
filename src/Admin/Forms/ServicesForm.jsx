import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../Context/theme-context';
import { toast } from 'react-toastify';
import { Loader, Plus, Trash2, Edit2, Save, X } from 'lucide-react';

const ServicesForm = () => {
    const { isDark } = useTheme();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        heading: '',
        description: '',
        icon: ''
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/content');
            setServices(res.data.services || []);
        } catch (err) {
            toast.error('Failed to load services');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (editingId) {
                await axios.put(`http://localhost:5000/api/content/services/${editingId}`, formData, {
                    headers: { 'x-auth-token': token }
                });
                toast.success('Service updated');
            } else {
                await axios.post('http://localhost:5000/api/content/services', formData, {
                    headers: { 'x-auth-token': token }
                });
                toast.success('Service created');
            }
            setFormData({ heading: '', description: '', icon: '' });
            setEditingId(null);
            fetchServices();
        } catch (err) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/content/services/${id}`, {
                headers: { 'x-auth-token': token }
            });
            toast.success('Service deleted');
            fetchServices();
        } catch (err) {
            toast.error('Failed to delete');
        }
    };

    const handleEdit = (service) => {
        setFormData({
            heading: service.heading,
            description: service.description,
            icon: service.icon || ''
        });
        setEditingId(service._id);
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
                            SERVICES_MODULE
                        </h2>
                    </div>
                    <p className="text-gray-500 font-mono text-sm tracking-widest pl-5">SYSTEM_CAPABILITIES // CONFIGURATION</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-1.5 bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-mono rounded tracking-widest shadow-[0_0_10px_rgba(34,211,238,0.1)] flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        SERVICE_REGISTRY_ACTIVE
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className={`p-8 rounded-xl border relative overflow-hidden group ${isDark ? 'bg-gray-900/20 border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="absolute top-0 right-0 p-3">
                    <div className="flex gap-1">
                        <div className="w-12 h-1 bg-cyan-500/20" />
                        <div className="w-2 h-1 bg-cyan-500/40" />
                        <div className="w-1 h-1 bg-cyan-500/60" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                    <h3 className="text-xl font-bold font-mono text-cyan-400 mb-8 flex items-center gap-3 border-b border-gray-800 pb-4 w-fit pr-12 relative">
                        {editingId ? 'MODIFY_SERVICE_PROTOCOL' : 'INITIATE_NEW_SERVICE'}
                        <span className="absolute bottom-0 right-0 w-8 h-0.5 bg-cyan-500" />
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group/input">
                            <label className={labelClasses}>SERVICE_HEADING</label>
                            <input
                                type="text"
                                value={formData.heading}
                                onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                                className="w-full bg-transparent border-b border-gray-700 py-3 text-lg font-mono text-white focus:border-cyan-500 outline-none transition-all placeholder-gray-700 focus:placeholder-gray-600"
                                placeholder="e.g. WEB_DEVELOPMENT"
                                required
                            />
                        </div>
                        <div className="group/input">
                            <label className={labelClasses}>ICON_IDENTIFIER (CLASS/URL)</label>
                            <input
                                type="text"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="w-full bg-transparent border-b border-gray-700 py-3 text-lg font-mono text-cyan-300 focus:border-cyan-500 outline-none transition-all placeholder-gray-700"
                                placeholder="e.g. Code, Database..."
                            />
                        </div>
                        <div className="col-span-2 group/input">
                            <label className={labelClasses}>SERVICE_DESCRIPTION</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-gray-900/30 border border-gray-800 rounded p-4 text-sm font-mono text-gray-300 focus:border-cyan-500/50 outline-none transition-all resize-none leading-relaxed"
                                rows={3}
                                placeholder="Detailed service parameters..."
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="flex items-center gap-3 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold font-mono tracking-widest rounded-sm shadow-[0_0_20px_rgba(8,145,178,0.3)] transition-all transform hover:translate-y-[-2px] border-l-4 border-white overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                            {editingId ? <><Save size={18} /> UPDATE_PROTOCOL</> : <><Plus size={18} /> INITIALIZE_SERVICE</>}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={() => { setEditingId(null); setFormData({ heading: '', description: '', icon: '' }); }}
                                className="px-6 py-3 border border-gray-700 hover:border-red-500/50 text-gray-400 hover:text-red-400 font-mono tracking-widest rounded-sm transition-all"
                            >
                                ABORT_EDIT
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <div key={service._id} className={`p-6 rounded-xl border group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] ${isDark ? 'bg-gray-900/20 border-gray-800' : 'bg-white border-gray-200'}`}>
                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Cyber Corners */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500/30 group-hover:w-6 group-hover:h-6 group-hover:border-cyan-400 transition-all duration-300" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500/30 group-hover:w-6 group-hover:h-6 group-hover:border-cyan-400 transition-all duration-300" />

                        {/* Number Watermark */}
                        <div className="absolute top-2 right-4 text-4xl font-black font-mono text-gray-800/50 group-hover:text-cyan-900/20 transition-colors select-none">
                            {String(index + 1).padStart(2, '0')}
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-gray-900/50 rounded border border-gray-800 group-hover:border-cyan-500/50 transition-colors shadow-lg">
                                    {/* Placeholder for Icon */}
                                    <span className="text-xl font-mono text-cyan-500">
                                        {'</>'}
                                    </span>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                                    <button onClick={() => handleEdit(service)} className="p-2 hover:bg-cyan-500/20 text-gray-500 hover:text-cyan-400 rounded transition-colors"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(service._id)} className="p-2 hover:bg-red-500/20 text-gray-500 hover:text-red-400 rounded transition-colors"><Trash2 size={16} /></button>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold font-mono text-white mb-3 group-hover:text-cyan-400 transition-colors">
                                {service.heading}
                            </h3>
                            <p className="text-gray-500 text-xs font-mono leading-relaxed line-clamp-3 mb-4 group-hover:text-gray-400">
                                {service.description}
                            </p>

                            <div className="pt-4 border-t border-gray-800 flex items-center justify-between text-[10px] font-mono text-gray-600">
                                <span className="uppercase tracking-wider">ID: {service.icon || 'N/A'}</span>
                                <span className="flex items-center gap-1 text-cyan-500/50 group-hover:text-cyan-400">
                                    <span className="w-1 h-1 bg-current rounded-full animate-pulse" />
                                    ONLINE
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesForm;
