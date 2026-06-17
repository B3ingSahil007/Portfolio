import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Save, Loader } from 'lucide-react';
import { useTheme } from '../../Context/theme-context';

const GeneralForm = () => {
    const { isDark } = useTheme();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [tempRole, setTempRole] = useState('');
    const [formData, setFormData] = useState({
        hero: {
            title: '',
            roles: [],
            subtitle: '',
            location: '',
            description: '',
            resumeLink: ''
        }
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/content');
            if (res.data.hero) {
                setFormData(prev => ({
                    ...prev,
                    hero: {
                        ...prev.hero,
                        ...res.data.hero,
                        roles: res.data.hero.roles || []
                    }
                }));
            }
        } catch (err) {
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    // Role Management Functions
    const handleAddRole = (e) => {
        e.preventDefault();
        if (!tempRole.trim()) return;

        if (formData.hero.roles.includes(tempRole.trim())) {
            toast.warning('Role already exists');
            return;
        }

        setFormData(prev => ({
            ...prev,
            hero: {
                ...prev.hero,
                roles: [...prev.hero.roles, tempRole.trim()]
            }
        }));
        setTempRole('');
    };

    const handleRemoveRole = (roleToRemove) => {
        setFormData(prev => ({
            ...prev,
            hero: {
                ...prev.hero,
                roles: prev.hero.roles.filter(role => role !== roleToRemove)
            }
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddRole(e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/content/hero', formData.hero, {
                headers: { 'x-auth-token': token }
            });
            toast.success('Changes saved successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center"><Loader className="animate-spin mx-auto text-cyan-500" /></div>;

    const inputClasses = `w-full p-2 bg-gray-900/50 border border-gray-800 rounded-lg text-white font-mono focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)] outline-none transition-all duration-300 placeholder-gray-600 hover:border-gray-700`;

    const labelClasses = `flex items-center justify-between text-xs font-mono text-cyan-400 mb-3 tracking-widest uppercase`;

    return (
        <form onSubmit={handleSubmit} className="space-y-12 max-w-6xl mx-auto animate-fadeInUp">
            {/* Header */}
            <div className="flex items-end justify-between mb-8 border-b border-gray-800 pb-6 relative">
                <div className="absolute bottom-0 left-0 w-32 h-0.5 bg-cyan-500 shadow-[0_0_10px_cyan]" />
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-8 bg-cyan-500" />
                        <h2 className="text-4xl font-bold font-mono text-white tracking-tight">
                            CONTENT_EDITOR
                        </h2>
                    </div>
                    <p className="text-gray-500 font-mono text-sm tracking-widest pl-5">SYSTEM_PARAMETERS // ACCESS_LEVEL_ADMIN</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-1.5 bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-mono rounded tracking-widest shadow-[0_0_10px_rgba(34,211,238,0.1)] flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        READ_WRITE_ACTIVE
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className={`p-8 rounded-xl border relative overflow-hidden group ${isDark ? 'bg-gray-900/20 border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="absolute top-0 right-0 p-3">
                    <div className="flex gap-1">
                        <div className="w-12 h-1 bg-cyan-500/20" />
                        <div className="w-2 h-1 bg-cyan-500/40" />
                        <div className="w-1 h-1 bg-cyan-500/60" />
                    </div>
                </div>

                <h3 className="text-xl font-bold font-mono text-cyan-400 mb-8 flex items-center gap-3 border-b border-gray-800 pb-4 w-fit pr-12 relative">
                    HERO_CONFIGURATION
                    <span className="absolute bottom-0 right-0 w-8 h-0.5 bg-cyan-500" />
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="col-span-2 md:col-span-1 group/input">
                        <label className={labelClasses}>MAIN TITLE (NAME)</label>
                        <input
                            type="text"
                            value={formData.hero.title}
                            onChange={(e) => handleChange('hero', 'title', e.target.value)}
                            className="w-full bg-transparent border-b border-gray-700 py-3 text-xl font-mono text-white focus:border-cyan-500 outline-none transition-all placeholder-gray-700 focus:placeholder-gray-600"
                            placeholder="ENTER_NAME"
                        />
                    </div>

                    <div className="col-span-2 md:col-span-1 group/input">
                        <label className={labelClasses}>LOCATION STRING</label>
                        <input
                            type="text"
                            value={formData.hero.location}
                            onChange={(e) => handleChange('hero', 'location', e.target.value)}
                            className="w-full bg-transparent border-b border-gray-700 py-3 text-base font-mono text-gray-300 focus:border-cyan-500 outline-none transition-all"
                            placeholder="CITY, COUNTRY"
                        />
                    </div>

                    <div className="col-span-2 md:col-span-1 group/input">
                        <label className={labelClasses}>ROLES (ADD ONE BY ONE)</label>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={tempRole}
                                    onChange={(e) => setTempRole(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-1 bg-transparent border-b border-gray-700 py-3 text-lg font-mono text-purple-400 focus:border-purple-500 outline-none transition-all tracking-wide placeholder-gray-700"
                                    placeholder="TYPE ROLE..."
                                />
                                <button
                                    type="button"
                                    onClick={handleAddRole}
                                    className="px-4 py-2 bg-purple-500/10 border border-purple-500/50 text-purple-400 font-mono text-sm hover:bg-purple-500/20 transition-all rounded-sm uppercase tracking-wider"
                                >
                                    ADD
                                </button>
                            </div>

                            {/* Roles Display Area */}
                            <div className="flex flex-wrap gap-2 p-2 bg-gray-900/30 border border-gray-800/50 rounded-lg">
                                {formData.hero.roles.length === 0 && (
                                    <span className="text-gray-600 font-mono text-xs italic">NO_ROLES</span>
                                )}
                                {formData.hero.roles.map((role, index) => (
                                    <div
                                        key={index}
                                        className="group relative flex items-center gap-2 px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded text-purple-300 font-mono text-sm transition-all hover:bg-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                                    >
                                        <span>{role}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveRole(role)}
                                            className="ml-1 text-purple-400/50 hover:text-red-400 transition-colors"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2 md:col-span-1 group/input">
                        <label className={labelClasses}>RESUME LINK (UPLOAD PDF)</label>
                        <div className="flex items-center gap-2 border-b border-gray-700 focus-within:border-cyan-500 transition-colors pb-2">
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const formDataObj = new FormData();
                                        formDataObj.append('file', file);

                                        // Show loading state if needed or toast
                                        const toastId = toast.loading("Uploading resume...");

                                        try {
                                            const res = await axios.post('http://localhost:5000/api/upload', formDataObj, {
                                                headers: {
                                                    'Content-Type': 'multipart/form-data',
                                                    'x-auth-token': localStorage.getItem('token')
                                                }
                                            });

                                            handleChange('hero', 'resumeLink', res.data.filePath);
                                            toast.update(toastId, { render: "Resume uploaded successfully", type: "success", isLoading: false, autoClose: 3000 });
                                        } catch (err) {
                                            console.error(err);
                                            toast.update(toastId, { render: "Upload failed", type: "error", isLoading: false, autoClose: 3000 });
                                        }
                                    }
                                }}
                                className="w-full text-sm font-mono text-cyan-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20 cursor-pointer"
                            />
                        </div>
                        {formData.hero.resumeLink && (
                            <div className="mt-2 text-[10px] font-mono text-gray-500 truncate max-w-xs">
                                CURRENT: <a href={formData.hero.resumeLink} target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline">{formData.hero.resumeLink.split('/').pop()}</a>
                            </div>
                        )}
                    </div>

                    <div className="col-span-2">
                        <label className={labelClasses}>DESCRIPTION NARRATIVE</label>
                        <textarea
                            rows={3}
                            value={formData.hero.description}
                            onChange={(e) => handleChange('hero', 'description', e.target.value)}
                            className="w-full bg-gray-900/30 border border-gray-800 rounded p-3 text-sm font-mono text-gray-300 focus:border-cyan-500/50 outline-none transition-all resize-none"
                            placeholder="System description..."
                        />
                    </div>
                </div>
                {/* Save Button relocated from About Section */}
                <div className="bottom-8 right-8 z-50">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-3 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold font-mono tracking-widest rounded-sm shadow-[0_0_20px_rgba(8,145,178,0.3)] transition-all transform hover:translate-y-[-2px] border-l-4 border-white overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                        {saving ? (
                            <Loader className="animate-spin" size={20} />
                        ) : (
                            <Save size={20} />
                        )}
                        <span>EXECUTE_SAVE</span>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default GeneralForm;
