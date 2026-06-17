import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../Context/theme-context';
import { toast } from 'react-toastify';
import { Loader, Plus, Trash2, Edit2, Save, Briefcase } from 'lucide-react';

const ExperienceForm = () => {
    const { isDark } = useTheme();
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        jobTitle: '',
        companyName: '',
        durationFrom: '',
        durationTo: '',
        responsibilities: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/content');
            setExperiences(res.data.experiences || []);
        } catch (err) {
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (editingId) {
                await axios.put(`http://localhost:5000/api/content/experiences/${editingId}`, formData, {
                    headers: { 'x-auth-token': token }
                });
                toast.success('Experience updated');
            } else {
                await axios.post('http://localhost:5000/api/content/experiences', formData, {
                    headers: { 'x-auth-token': token }
                });
                toast.success('Experience added');
            }
            setFormData({ jobTitle: '', companyName: '', durationFrom: '', durationTo: '', responsibilities: '' });
            setEditingId(null);
            fetchData();
        } catch (err) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/content/experiences/${id}`, {
                headers: { 'x-auth-token': token }
            });
            toast.success('Deleted successfully');
            fetchData();
        } catch (err) {
            toast.error('Failed to delete');
        }
    };

    const handleEdit = (item) => {
        setFormData({
            jobTitle: item.jobTitle,
            companyName: item.companyName,
            durationFrom: item.durationFrom,
            durationTo: item.durationTo,
            responsibilities: item.responsibilities
        });
        setEditingId(item._id);
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
                            EXPERIENCE_LOGS
                        </h2>
                    </div>
                    <p className="text-gray-500 font-mono text-sm tracking-widest pl-5">PROFESSIONAL_TIMELINE // HISTORY</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-1.5 bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-mono rounded tracking-widest shadow-[0_0_10px_rgba(34,211,238,0.1)] flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        TIMELINE_ACTIVE
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
                        {editingId ? 'MODIFY_TIMELINE_ENTRY' : 'LOG_NEW_EXPERIENCE'}
                        <span className="absolute bottom-0 right-0 w-8 h-0.5 bg-cyan-500" />
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className={labelClasses}>ROLE_TITLE</label>
                            <input
                                type="text"
                                value={formData.jobTitle}
                                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                className="w-full bg-transparent border-b border-gray-700 py-3 text-lg font-mono text-white focus:border-cyan-500 outline-none transition-all placeholder-gray-700 focus:placeholder-gray-600"
                                placeholder="e.g. SENIOR_ENGINEER"
                                required
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>ORGANIZATION_ID</label>
                            <input
                                type="text"
                                value={formData.companyName}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                className="w-full bg-transparent border-b border-gray-700 py-3 text-lg font-mono text-cyan-300 focus:border-cyan-500 outline-none transition-all placeholder-gray-700"
                                placeholder="e.g. TECH_CORP"
                                required
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>TIMEFRAME_START</label>
                            <input
                                type="text"
                                value={formData.durationFrom}
                                onChange={(e) => setFormData({ ...formData, durationFrom: e.target.value })}
                                className="w-full bg-transparent border-b border-gray-700 py-3 text-base font-mono text-gray-300 focus:border-cyan-500 outline-none transition-all placeholder-gray-700"
                                placeholder="e.g. JAN 2023"
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>TIMEFRAME_END</label>
                            <input
                                type="text"
                                value={formData.durationTo}
                                onChange={(e) => setFormData({ ...formData, durationTo: e.target.value })}
                                className="w-full bg-transparent border-b border-gray-700 py-3 text-base font-mono text-gray-300 focus:border-cyan-500 outline-none transition-all placeholder-gray-700"
                                placeholder="e.g. PRESENT"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className={labelClasses}>ROLE_RESPONSIBILITIES</label>
                            <textarea
                                value={formData.responsibilities}
                                onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                                className="w-full bg-gray-900/30 border border-gray-800 rounded p-4 text-sm font-mono text-gray-300 focus:border-cyan-500/50 outline-none transition-all resize-none leading-relaxed"
                                rows={4}
                                placeholder="Detailing operational duties..."
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="flex items-center gap-3 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold font-mono tracking-widest rounded-sm shadow-[0_0_20px_rgba(8,145,178,0.3)] transition-all transform hover:translate-y-[-2px] border-l-4 border-white overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                            {editingId ? <><Save size={18} /> UPDATE_ENTRY</> : <><Plus size={18} /> LOG_EXPERIENCE</>}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={() => { setEditingId(null); setFormData({ jobTitle: '', companyName: '', durationFrom: '', durationTo: '', responsibilities: '' }); }}
                                className="px-6 py-3 border border-gray-700 hover:border-red-500/50 text-gray-400 hover:text-red-400 font-mono tracking-widest rounded-sm transition-all"
                            >
                                ABORT
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="relative pl-8 space-y-12 before:absolute before:inset-y-0 before:left-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-purple-500 before:to-transparent before:opacity-20 pb-20">
                {experiences.map((exp, index) => (
                    <div key={exp._id} className={`relative p-8 rounded-xl border group transition-all duration-300 ${isDark ? 'bg-gray-900/20 border-gray-800' : 'bg-white border-gray-200'} hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.05)]`}>
                        {/* Timeline Node */}
                        <div className="absolute top-8 left-[-42px] w-4 h-4 rounded-full bg-gray-900 border-2 border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)] z-10 group-hover:scale-125 group-hover:bg-cyan-500 transition-all duration-300" />

                        {/* Connecting Line (Horizontal) */}
                        <div className="absolute top-[38px] left-[-34px] w-8 h-[2px] bg-cyan-500/50 group-hover:w-10 transition-all duration-300" />

                        {/* Control Actions */}
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                            <button onClick={() => handleEdit(exp)} className="p-2 hover:bg-cyan-500/20 text-gray-500 hover:text-cyan-400 rounded transition-colors"><Edit2 size={16} /></button>
                            <button onClick={() => handleDelete(exp._id)} className="p-2 hover:bg-red-500/20 text-gray-500 hover:text-red-400 rounded transition-colors"><Trash2 size={16} /></button>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-bold font-mono text-white mb-2 group-hover:text-cyan-400 transition-colors flex items-center gap-3">
                                    {exp.jobTitle}
                                </h3>
                                <p className="text-lg font-medium text-gray-400 flex items-center gap-2 font-mono">
                                    <Briefcase size={16} className="text-purple-500" />
                                    {exp.companyName}
                                </p>
                            </div>
                            <div className="px-5 py-2 mt-4 md:mt-0 rounded bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(8,145,178,0.1)] group-hover:bg-cyan-500/10 transition-colors">
                                {exp.durationFrom} — {exp.durationTo}
                            </div>
                        </div>

                        <div className="relative p-6 bg-black/40 rounded border border-gray-800/50 group-hover:border-cyan-500/20 transition-colors">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500/50 to-transparent" />
                            <p className="text-gray-400 leading-relaxed font-mono text-sm whitespace-pre-wrap group-hover:text-gray-300 transition-colors">
                                {exp.responsibilities}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceForm;
