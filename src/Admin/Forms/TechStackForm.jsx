import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../Context/theme-context';
import { toast } from 'react-toastify';
import { Loader, Cpu, X, Plus } from 'lucide-react';

// Helper Component for Tag Inputs
const TagInput = ({ label, tags, onChange, placeholder, color = "purple" }) => {
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

    const borderColor = {
        purple: 'focus-within:border-purple-500/50',
        cyan: 'focus-within:border-cyan-500/50',
        green: 'focus-within:border-green-500/50',
    }[color];

    const tagBg = {
        purple: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
        cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300',
        green: 'bg-green-500/10 border-green-500/20 text-green-300',
    }[color];

    return (
        <div className="group/input">
            <label className={`block text-xs font-mono text-${color}-400 mb-2 tracking-widest uppercase`}>{label}</label>
            <div className={`w-full min-h-[60px] p-3 bg-gray-900/30 border border-gray-800 rounded flex flex-wrap gap-2 ${borderColor} transition-all duration-300`}>
                {tags.map((tag, index) => (
                    <span key={index} className={`flex items-center gap-1 px-3 py-1 border rounded text-xs font-mono animate-fadeIn ${tagBg}`}>
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="hover:text-white focus:outline-none ml-1 transition-colors"
                        >
                            <X size={12} />
                        </button>
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
            <p className="text-[10px] text-gray-600 mt-1 font-mono pl-1 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                Press Enter or Comma to add tag
            </p>
        </div>
    );
};

const TechStackForm = () => {
    const { isDark } = useTheme();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [techStack, setTechStack] = useState({
        frontend: [],
        backend: [],
        ecosystemAndDesign: []
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/content');
            if (res.data.techStack) setTechStack(prev => ({ ...prev, ...res.data.techStack }));
        } catch (err) {
            toast.error('Failed to load tech stack');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/content/tech-stack', techStack, {
                headers: { 'x-auth-token': token }
            });
            toast.success('Tech matrix updated successfully');
        } catch (err) {
            toast.error('Failed to update tech matrix');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center"><Loader className="animate-spin mx-auto text-cyan-500" /></div>;

    return (
        <div className="max-w-7xl mx-auto animate-fadeInUp pb-32">
            {/* Header */}
            <div className="flex items-end justify-between mb-8 border-b border-gray-800 pb-6 relative">
                <div className="absolute bottom-0 left-0 w-32 h-0.5 bg-purple-500 shadow-[0_0_10px_purple]" />
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-8 bg-purple-500" />
                        <h2 className="text-4xl font-bold font-mono text-white tracking-tight">
                            TECH_MATRIX_CONFIG
                        </h2>
                    </div>
                    <p className="text-gray-500 font-mono text-sm tracking-widest pl-5">SYSTEM_CAPABILITIES // STACK_DEFINITION</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-1.5 bg-purple-950/30 border border-purple-500/20 text-purple-400 text-xs font-mono rounded tracking-widest shadow-[0_0_10px_rgba(168,85,247,0.1)] flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                        MATRIX_EDIT_MODE
                    </div>
                </div>
            </div>

            <form onSubmit={handleSave} className={`p-8 rounded-xl border relative overflow-hidden group ${isDark ? 'bg-gray-900/20 border-gray-800' : 'bg-white border-gray-200'}`}>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-3">
                    <div className="flex gap-1">
                        <div className="w-12 h-1 bg-purple-500/20" />
                        <div className="w-2 h-1 bg-purple-500/40" />
                        <div className="w-1 h-1 bg-purple-500/60" />
                    </div>
                </div>

                <h3 className="text-xl font-bold font-mono text-purple-400 mb-8 flex items-center gap-3 border-b border-gray-800 pb-4 w-fit pr-12 relative z-10">
                    <Cpu size={24} className="text-purple-500" />
                    STACK_CATEGORIES
                    <span className="absolute bottom-0 right-0 w-8 h-0.5 bg-purple-500" />
                </h3>

                <div className="space-y-10 relative z-10">
                    <TagInput
                        label="FRONT-END CORE"
                        tags={techStack.frontend}
                        onChange={(newTags) => setTechStack(prev => ({ ...prev, frontend: newTags }))}
                        placeholder="Type React and press Enter..."
                        color="cyan"
                    />

                    <TagInput
                        label="BACK-END & DATABASE"
                        tags={techStack.backend}
                        onChange={(newTags) => setTechStack(prev => ({ ...prev, backend: newTags }))}
                        placeholder="Type Node.js and press Enter..."
                        color="purple"
                    />

                    <TagInput
                        label="ECOSYSTEM & DESIGN"
                        tags={techStack.ecosystemAndDesign}
                        onChange={(newTags) => setTechStack(prev => ({ ...prev, ecosystemAndDesign: newTags }))}
                        placeholder="Type Figma and press Enter..."
                        color="green"
                    />

                    <button
                        type="submit"
                        disabled={saving}
                        className="bottom-8 right-8 flex items-center gap-3 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold font-mono tracking-widest rounded-sm shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all transform hover:translate-y-[-2px] border-l-4 border-white z-50 overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                        {saving ? (
                            <Loader className="animate-spin" size={18} />
                        ) : (
                            <Cpu size={18} />
                        )}
                        <span>EXECUTE_SAVE</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TechStackForm;
