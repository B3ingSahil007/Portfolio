import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../Context/theme-context';
import { toast } from 'react-toastify';
import { Loader, Plus, Trash2, Edit2, Save, X, Rocket } from 'lucide-react';

// Helper Component for Tag Inputs (Inlined for self-containment)
const TagInput = ({ label, tags, onChange, placeholder, color = "cyan" }) => {
    const [input, setInput] = useState('');

    const handleKeyDown = (e) => {
        if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
            e.preventDefault();
            if (!tags.includes(input.trim())) {
                onChange([...tags, input.trim()]);
            }
            setInput('');
        } else if (e.key === 'Backspace' && !input && tags.length > 0) {
            onChange(tags.slice(0, -1));
        }
    };

    const removeTag = (indexToRemove) => {
        onChange(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="group/input">
            <label className={`block text-xs font-mono text-${color}-400 mb-2 tracking-widest uppercase`}>{label}</label>
            <div className={`w-full min-h-[56px] p-3 bg-gray-900/30 border border-gray-700 rounded flex flex-wrap gap-2 focus-within:border-${color}-500/50 transition-all duration-300`}>
                {tags.map((tag, index) => (
                    <span key={index} className={`flex items-center gap-1 px-2 py-0.5 bg-${color}-500/10 border border-${color}-500/20 rounded text-[10px] font-mono text-${color}-300 animate-fadeIn`}>
                        {tag}
                        <button type="button" onClick={() => removeTag(index)} className="hover:text-white focus:outline-none ml-1"><X size={10} /></button>
                    </span>
                ))}
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent min-w-[120px] outline-none text-sm font-mono text-gray-300 placeholder-gray-700"
                    placeholder={tags.length === 0 ? placeholder : "Add..."}
                />
            </div>
        </div>
    );
};

const ProjectsForm = () => {
    const { isDark } = useTheme();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        projectName: '',
        description: '',
        projectImage: '',
        techUsed: [] // Changed to array for TagInput
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/content');
            setProjects(res.data.deployments || []);
        } catch (err) {
            toast.error('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const dataToSend = { ...formData }; // Already array

            if (editingId) {
                await axios.put(`http://localhost:5000/api/content/deployments/${editingId}`, dataToSend, {
                    headers: { 'x-auth-token': token }
                });
                toast.success('Project updated');
            } else {
                await axios.post('http://localhost:5000/api/content/deployments', dataToSend, {
                    headers: { 'x-auth-token': token }
                });
                toast.success('Project created');
            }
            setFormData({ projectName: '', description: '', projectImage: '', techUsed: [] });
            setEditingId(null);
            fetchProjects();
        } catch (err) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/content/deployments/${id}`, {
                headers: { 'x-auth-token': token }
            });
            toast.success('Project deleted');
            fetchProjects();
        } catch (err) {
            toast.error('Failed to delete');
        }
    };

    const handleEdit = (project) => {
        setFormData({
            projectName: project.projectName,
            description: project.description,
            projectImage: project.projectImage,
            techUsed: project.techUsed || []
        });
        setEditingId(project._id);
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
                            OPERATIONAL_DEPLOYMENTS
                        </h2>
                    </div>
                    <p className="text-gray-500 font-mono text-sm tracking-widest pl-5">PROJECT_ARCHIVE // DATABASE</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-1.5 bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-mono rounded tracking-widest shadow-[0_0_10px_rgba(34,211,238,0.1)] flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        DEPLOYMENT_ACTIVE
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
                        {editingId ? 'MODIFY_DEPLOYMENT_DATA' : 'INITIATE_NEW_DEPLOYMENT'}
                        <span className="absolute bottom-0 right-0 w-8 h-0.5 bg-cyan-500" />
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className={labelClasses}>PROJECT_CODENAME</label>
                            <input
                                type="text"
                                value={formData.projectName}
                                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                                className="w-full bg-transparent border-b border-gray-700 py-3 text-lg font-mono text-white focus:border-cyan-500 outline-none transition-all placeholder-gray-700 focus:placeholder-gray-600"
                                placeholder="e.g. PROJECT_OMEGA"
                                required
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>VISUAL_ASSET_URL</label>
                            <input
                                type="text"
                                value={formData.projectImage}
                                onChange={(e) => setFormData({ ...formData, projectImage: e.target.value })}
                                className="w-full bg-transparent border-b border-gray-700 py-3 text-lg font-mono text-cyan-300 focus:border-cyan-500 outline-none transition-all placeholder-gray-700"
                                placeholder="https://..."
                            />
                        </div>
                        <div className="col-span-2">
                            <TagInput
                                label="TECH_STACK_USED"
                                tags={formData.techUsed}
                                onChange={(newTags) => setFormData({ ...formData, techUsed: newTags })}
                                placeholder="React, Node.js..."
                            />
                        </div>
                        <div className="col-span-2">
                            <label className={labelClasses}>MISSION_BRIEF (DESCRIPTION)</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-gray-900/30 border border-gray-800 rounded p-4 text-sm font-mono text-gray-300 focus:border-cyan-500/50 outline-none transition-all resize-none leading-relaxed"
                                rows={3}
                                placeholder="Confirming mission parameters..."
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="flex items-center gap-3 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold font-mono tracking-widest rounded-sm shadow-[0_0_20px_rgba(8,145,178,0.3)] transition-all transform hover:translate-y-[-2px] border-l-4 border-white overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                            {editingId ? <><Save size={18} /> UPDATE_DEPLOYMENT</> : <><Rocket size={18} /> EXECUTE_DEPLOYMENT</>}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={() => { setEditingId(null); setFormData({ projectName: '', description: '', projectImage: '', techUsed: [] }); }}
                                className="px-6 py-3 border border-gray-700 hover:border-red-500/50 text-gray-400 hover:text-red-400 font-mono tracking-widest rounded-sm transition-all"
                            >
                                ABORT
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-8">
                {projects.map((project, index) => (
                    <div key={project._id} className={`rounded-xl border group relative overflow-hidden flex flex-col md:flex-row ${isDark ? 'bg-gray-900/20 border-gray-800' : 'bg-white border-gray-200'} transition-all hover:border-cyan-500/30`}>
                        {/* Image Area */}
                        <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden bg-gray-900 border-r border-gray-800">
                            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                            {project.projectImage ? (
                                <img src={project.projectImage} alt={project.projectName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-700 font-mono text-sm">NO_DATA</div>
                            )}
                            {/* Controls */}
                            <div className="absolute top-2 left-2 z-20 flex gap-2">
                                <span className="px-2 py-1 bg-black/70 text-[10px] text-cyan-400 font-mono rounded border border-cyan-500/30">
                                    V.1.{index}
                                </span>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 flex-1 flex flex-col relative">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold font-mono text-white mb-1 group-hover:text-cyan-400 transition-colors">
                                        {project.projectName}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {project.techUsed.map((tech, i) => (
                                            <span key={i} className="text-[10px] font-mono text-green-400 px-1 border-b border-green-500/30">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                                    <button onClick={() => handleEdit(project)} className="p-2 hover:bg-cyan-500/20 text-gray-500 hover:text-cyan-400 rounded transition-colors"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(project._id)} className="p-2 hover:bg-red-500/20 text-gray-500 hover:text-red-400 rounded transition-colors"><Trash2 size={16} /></button>
                                </div>
                            </div>

                            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                                {project.description}
                            </p>

                            <div className="pt-4 border-t border-gray-800 flex justify-between items-center text-xs font-mono text-gray-600">
                                <span>ID: {project._id}</span>
                                <span className="flex items-center gap-2 group-hover:text-cyan-400 transition-colors cursor-pointer">
                                    ESTABLISH_LINK <span className="text-lg">›</span>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsForm;
