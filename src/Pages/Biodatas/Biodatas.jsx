import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { PiSealWarningFill } from "react-icons/pi";

import useAxiosPublic from '../../hooks/useAxiosPublic';
import BiodataCard from "../Shared/BiodataCard/BiodataCard";
import BiodataFilterSidebar from "./BiodataFilterSidebar";
import Loader from '../../Components/Loader/Loader';
import Navbar from "../Shared/Navbar/Navbar";

const Biodatas = () => {

    const axiosPublic = useAxiosPublic();

    // Filters State
    const [type, setType] = useState('');
    const [maxAge, setMaxAge] = useState(40);
    const [minAge, setMinAge] = useState(18);
    const [location, setLocation] = useState('');

    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (type) count += 1;
        if (location) count += 1;
        if (minAge !== 18 || maxAge !== 40) count += 1;
        return count;
    }, [type, location, minAge, maxAge]);

    const { data: biodatas = [], isPending } = useQuery({
        queryKey: ['biodatas', maxAge, minAge, type, location],
        queryFn: () => axiosPublic.get(`/biodatas?type=${type}&maxAge=${maxAge}&minAge=${minAge}&location=${location}`)
    });

    const locations = [
        { value: '', label: 'All Divisions' },
        { value: 'Dhaka', label: 'Dhaka' },
        { value: 'Chattagram', label: 'Chattagram' },
        { value: 'Rangpur', label: 'Rangpur' },
        { value: 'Barisal', label: 'Barisal' },
        { value: 'Khulna', label: 'Khulna' },
        { value: 'Mymensingh', label: 'Mymensingh' },
        { value: 'Sylhet', label: 'Sylhet' }
    ];

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <div className="font-Nunito bg-gray min-h-screen selection:bg-teal selection:text-white">
            
            {/* Cinematic Hero Section */}
            <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-black flex items-center justify-center">
                <div className="absolute top-0 left-0 w-full z-50">
                    <Navbar />
                </div>
                <div className="absolute inset-0 w-full h-full bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co.com/60h84M9Q/biodatas-banner.webp')" }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-700/50 via-teal-200/70 to-white z-10 mix-blend-multiply" />
                </div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="relative z-20 text-center px-4 w-full max-w-4xl"
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold text-black drop-shadow-2xl tracking-tighter mb-4">
                        Discover <span className="text-coral italic">Connections</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-white/90 font-light tracking-wide drop-shadow-md">
                        Explore the beauty of relationships as you navigate through our curated space.
                    </p>
                </motion.div>
            </div>

            {/* Main Content Layout */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col lg:flex-row gap-8 relative z-30 -mt-8 lg:-mt-52">
                
                {/* Modernized Interactive Filter Sidebar */}
                <BiodataFilterSidebar 
                    type={type} setType={setType}
                    minAge={minAge} setMinAge={setMinAge}
                    maxAge={maxAge} setMaxAge={setMaxAge}
                    location={location} setLocation={setLocation}
                    activeFiltersCount={activeFiltersCount}
                    locations={locations}
                />

                {/* Profiles Grid Area */}
                <main className="flex-1 min-h-[50vh]">
                    {isPending ? (
                        <div className="w-full h-full flex items-center justify-center py-20">
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                                <Loader width='80' />
                            </motion.div>
                        </div>
                    ) : biodatas?.data?.length > 0 ? (
                        <motion.div 
                            key={`${type}-${location}-${minAge}-${maxAge}`}
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-50px" }}
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 auto-rows-max"
                        >
                            {biodatas.data.map((biodata, index) => (
                                <motion.div 
                                    key={biodata._id} 
                                    variants={itemVariants}
                                    whileHover={{ y: -2, scale: 1.01 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 500 }}
                                    className="h-full"
                                >
                                    <BiodataCard biodata={biodata} index={index} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/50 backdrop-blur-md rounded-3xl p-12 text-center border border-white shadow-xl mt-10"
                        >
                            <PiSealWarningFill className="w-24 h-24 mx-auto text-teal/40 mb-6 drop-shadow-sm"/>
                            <h3 className="text-2xl font-bold text-teal-900 mb-2">No Profiles Found</h3>
                            <p className="text-black/60 font-medium">Try adjusting your filters to discover more matches.</p>
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Biodatas;