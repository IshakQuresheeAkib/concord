import { Select, Slider, Drawer } from "antd";
import { motion } from "framer-motion";
import { FiFilter, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";

const BiodataFilterSidebar = ({
    type, setType,
    minAge, setMinAge,
    maxAge, setMaxAge,
    location, setLocation,
    activeFiltersCount,
    locations
}) => {
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const onAfterChange = (value) => {
        setMinAge(value[0]);
        setMaxAge(value[1]);
    };

    const handleReset = () => {
        setType('');
        setLocation('');
        setMinAge(18);
        setMaxAge(40);
    };

    const filterContent = (
        <div className="space-y-8">
            {/* Age Range */}
            <div className="group">
                <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-dark-blue/80 tracking-wide">Age Range</label>
                    <span className="text-xs font-bold text-teal bg-teal/10 px-3 py-1 rounded-full">{minAge} - {maxAge}</span>
                </div>
                <div className="px-1">
                    <Slider 
                        onAfterChange={onAfterChange} 
                        range={{ draggableTrack: true }} 
                        value={[minAge, maxAge]} 
                        onChange={(val) => { setMinAge(val[0]); setMaxAge(val[1]); }}
                        max={60} 
                        min={18}
                        trackStyle={[{ backgroundColor: '#008080', height: '6px', borderRadius: '4px' }]}
                        handleStyle={[
                            { height: '20px', width: '20px' }, 
                            { height: '20px', width: '20px' }
                        ]}
                        railStyle={{ backgroundColor: '#f2f2f2', height: '6px', borderRadius: '4px' }}
                    />
                    <div className="flex justify-between text-[11px] text-black/40 mt-2 font-bold uppercase">
                        <span>18 yrs</span>
                        <span>60 yrs</span>
                    </div>
                </div>
            </div>

            {/* Location */}
            <div className="group">
                <label className="block text-sm font-bold text-dark-blue/80 tracking-wide mb-3">Location</label>
                <Select 
                    placeholder="Select Division" 
                    value={location || undefined}
                    onChange={(value) => setLocation(value)} 
                    options={locations} 
                    className="w-full"
                    size="large"
                    variant="filled"
                    aria-label="Filter by Division"
                    dropdownStyle={{ padding: '8px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}
                />
            </div>

            {/* Biodata Type */}
            <div className="group">
                <label className="block text-sm font-bold text-dark-blue/80 tracking-wide mb-4">Looking For</label>
                <div className="flex flex-col gap-3">
                    {[
                        { id: 'Male', label: 'Groom (Male)' },
                        { id: 'Female', label: 'Bride (Female)' },
                        { id: '', label: 'Any' }
                    ].map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => setType(opt.id)}
                            className={`relative w-full overflow-hidden flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 font-bold ${
                                type === opt.id 
                                ? 'bg-teal text-white shadow-lg shadow-teal/20 scale-[1.02]' 
                                : 'bg-black/5 text-dark-blue/70 hover:bg-teal/5 hover:text-teal hover:border-teal/20'
                            }`}
                        >
                            <span className="relative z-10">{opt.label}</span>
                            {type === opt.id && (
                                <div className="absolute left-0 top-0 w-1.5 h-full bg-white/40" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Reset Button */}
            <button 
                onClick={handleReset}
                className="w-full mt-4 py-3 text-sm font-bold text-black/50 hover:text-teal transition-colors underline-offset-4 hover:underline"
            >
                Reset all filters
            </button>
        </div>
    );

    return (
        <>
            {isMobile && (
                <div className="lg:hidden mb-6 flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <span className="font-bold text-dark-blue">
                        {activeFiltersCount} Filters active
                    </span>
                    <button 
                        onClick={() => setIsMobileDrawerOpen(true)}
                        className="flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-teal/20 active:scale-95 transition-all"
                    >
                        <FiFilter size={18} />
                        Filter Profiles
                    </button>
                </div>
            )}

            <Drawer
                title={<div className="flex items-center gap-2 font-extrabold text-xl"><FiFilter className="text-teal" /> Filters</div>}
                placement="right"
                onClose={() => setIsMobileDrawerOpen(false)}
                open={isMobileDrawerOpen && isMobile}
                closeIcon={<FiX size={24} className="text-dark-blue hover:text-teal transition-colors" />}
                className="font-Nunito"
                styles={{ body: { paddingBottom: 80 } }}
            >
                {filterContent}
            </Drawer>

            <motion.aside 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden lg:block w-[350px] flex-shrink-0"
            >
                <div className="sticky top-28 bg-white/80 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl border border-white transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,128,128,0.08)]">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-teal/20 to-teal/5 rounded-2xl text-teal">
                                <FiFilter size={24} className="stroke-[2.5]" />
                            </div>
                            <h2 className="text-2xl font-extrabold text-dark-blue tracking-tight">Filters</h2>
                        </div>
                        {activeFiltersCount > 0 && (
                            <span className="text-xs font-bold px-3 py-1 bg-teal/10 text-teal rounded-full animate-pulse">{activeFiltersCount} Active</span>
                        )}
                    </div>
                    {filterContent}
                </div>
            </motion.aside>
        </>
    );
};

export default BiodataFilterSidebar;
