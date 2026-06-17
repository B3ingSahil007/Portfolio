import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../Context/theme-context';
import { toast } from 'react-toastify';
import { Loader, Save } from 'lucide-react';

const AboutForm = () => {
    const { isDark } = useTheme();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // System Identity State
    const [identity, setIdentity] = useState({
        heading: '',
        description: '',
        yearsExp: 0,
        projectsCount: 0,
        classTier: '',
        locationCity: '',
        locationCountry: '',
        missionStatement: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/content');
            if (res.data.systemIdentity) setIdentity({ ...identity, ...res.data.systemIdentity });
        } catch (err) {
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleIdentitySave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/content/system-identity', identity, {
                headers: { 'x-auth-token': token }
            });
            toast.success('Identity configuration updated');
        } catch (err) {
            toast.error('Failed to update identity');
        } finally {
            setSaving(false);
        }
    };

    const inputClasses = `w-full p-4 bg-gray-900/50 border border-gray-800 rounded-lg text-white font-mono focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)] outline-none transition-all duration-300 placeholder-gray-600 hover:border-gray-700`;
    const labelClasses = `block text-xs font-mono text-cyan-400 mb-2 tracking-widest uppercase`;

    if (loading) return <div className="p-8 text-center"><Loader className="animate-spin mx-auto text-cyan-500" /></div>;

    return (
        <form onSubmit={handleIdentitySave} className="max-w-7xl mx-auto animate-fadeInUp pb-32">
            {/* Header */}
            <div className="flex items-end justify-between mb-8 border-b border-gray-800 pb-6 relative">
                <div className="absolute bottom-0 left-0 w-32 h-0.5 bg-cyan-500 shadow-[0_0_10px_cyan]" />
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-8 bg-cyan-500" />
                        <h2 className="text-4xl font-bold font-mono text-white tracking-tight">
                            SYSTEM_IDENTITY
                        </h2>
                    </div>
                    <p className="text-gray-500 font-mono text-sm tracking-widest pl-5">CORE_PARAMETERS // IDENTITY_CONFIG</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-1.5 bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-mono rounded tracking-widest shadow-[0_0_10px_rgba(34,211,238,0.1)] flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        IDENTITY_EDIT_MODE
                    </div>
                </div>
            </div>

            {/* System Identity Panel */}
            <div className={`p-8 rounded-xl border relative overflow-hidden group ${isDark ? 'bg-gray-900/20 border-gray-800' : 'bg-white border-gray-200'}`}>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-3">
                    <div className="flex gap-1">
                        <div className="w-12 h-1 bg-cyan-500/20" />
                        <div className="w-2 h-1 bg-cyan-500/40" />
                        <div className="w-1 h-1 bg-cyan-500/60" />
                    </div>
                </div>
                <h3 className="text-xl font-bold font-mono text-cyan-400 mb-8 flex items-center gap-3 border-b border-gray-800 pb-4 w-fit pr-12 relative">
                    CORE_CONFIGURATION
                    <span className="absolute bottom-0 right-0 w-8 h-0.5 bg-cyan-500" />
                </h3>

                <div className="space-y-10 relative z-10">
                    <div className="group/input">
                        <label className={labelClasses}>HEADING / TAGLINE</label>
                        <input
                            value={identity.heading}
                            onChange={e => setIdentity({ ...identity, heading: e.target.value })}
                            className="w-full bg-transparent border-b border-gray-700 py-3 text-xl font-mono text-white focus:border-cyan-500 outline-none transition-all placeholder-gray-700 focus:placeholder-gray-600 tracking-wide"
                            placeholder="Architecting Digital Realities..."
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>MISSION STATEMENT / BIO</label>
                        <textarea
                            value={identity.missionStatement}
                            onChange={e => setIdentity({ ...identity, missionStatement: e.target.value })}
                            className="w-full bg-gray-900/30 border border-gray-800 rounded p-4 text-sm font-mono text-gray-300 focus:border-cyan-500/50 outline-none transition-all resize-none leading-relaxed"
                            rows={5}
                            placeholder="Defining the mission parameters..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-8 pt-4">
                        <div className="p-6 bg-gray-900/30 rounded border border-gray-800 flex flex-col items-center justify-center gap-2 group hover:border-cyan-500/50 transition-all relative overflow-hidden">
                            <div className="absolute inset-0 bg-cyan-500/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                            <label className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase relative z-10">YEARS_EXP</label>
                            <input
                                type="number"
                                value={identity.yearsExp}
                                onChange={e => setIdentity({ ...identity, yearsExp: e.target.value })}
                                className="bg-transparent text-center text-5xl font-bold font-mono text-white outline-none w-full relative z-10 focus:text-cyan-400 transition-colors"
                            />
                        </div>
                        <div className="p-6 bg-gray-900/30 rounded border border-gray-800 flex flex-col items-center justify-center gap-2 group hover:border-purple-500/50 transition-all relative overflow-hidden">
                            <div className="absolute inset-0 bg-purple-500/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                            <label className="text-[10px] font-mono text-purple-400 tracking-widest uppercase relative z-10">PROJECTS_COMPLETED</label>
                            <input
                                type="number"
                                value={identity.projectsCount}
                                onChange={e => setIdentity({ ...identity, projectsCount: e.target.value })}
                                className="bg-transparent text-center text-5xl font-bold font-mono text-white outline-none w-full relative z-10 focus:text-purple-400 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Hidden fields but kept for state completeness if needed later */}
                    <div className="hidden">
                        <input value={identity.locationCity} onChange={e => setIdentity({ ...identity, locationCity: e.target.value })} />
                        <input value={identity.locationCountry} onChange={e => setIdentity({ ...identity, locationCountry: e.target.value })} />
                        <input value={identity.classTier} onChange={e => setIdentity({ ...identity, classTier: e.target.value })} />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className=" bottom-8 right-8 flex items-center gap-3 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold font-mono tracking-widest rounded-sm shadow-[0_0_20px_rgba(8,145,178,0.3)] transition-all transform hover:translate-y-[-2px] border-l-4 border-white z-50 overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                        {saving ? (
                            <Loader className="animate-spin" size={18} />
                        ) : (
                            <Save size={18} />
                        )}
                        <span>EXECUTE_SAVE</span>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AboutForm;
