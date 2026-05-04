import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FiUsers, FiUserPlus, FiStar } from 'react-icons/fi';
import { 
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';
import useAxiosSecure from '../../../../hook/useAxiosSecure';
import useAuth from '../../../../hook/useAuth';
import Loader from '../../../../Components/Loader/Loader';

const StatCard = ({ title, value, icon: Icon, delay, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="relative overflow-hidden bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,128,128,0.12)] transition-all duration-300"
    >
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-white/40 to-white/0 rounded-full blur-2xl z-0" />
        <div className="relative z-10 flex items-start justify-between">
            <div>
                <p className="text-sm font-bold text-dark-blue/60 tracking-wider mb-2">{title}</p>
                <motion.h3 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: delay + 0.2 }}
                    className="text-4xl font-extrabold text-dark-blue"
                >
                    {value || 0}
                </motion.h3>
            </div>
            <div className={`p-4 rounded-2xl ${color}`}>
                <Icon size={24} className="stroke-[2.5]" />
            </div>
        </div>
    </motion.div>
);

const AdminDashboard = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: countData = {}, isLoading } = useQuery({
        queryKey: ['count'],
        enabled: !loading && !!user,
        queryFn: () => axiosSecure.get('/biodatas-count')
    });

    if (isLoading) {
        return (
            <div className="h-[80vh] flex justify-center items-center">
                <Loader width='80' />
            </div>
        );
    }

    const { 
        totalBiodata = 0, 
        maleBiodata = 0, 
        femaleBiodata = 0, 
        premiumBiodata = 0 
    } = countData?.data || {};

    const genderData = [
        { name: 'Male', value: maleBiodata, color: '#00C4C4' },
        { name: 'Female', value: femaleBiodata, color: '#067eaa' },
    ];

    const distributionData = [
        { name: 'Standard', value: totalBiodata - premiumBiodata },
        { name: 'Premium', value: premiumBiodata },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <div className="font-Nunito min-h-screen bg-gray/30 p-6 md:p-10 lg:p-14">
            
            {/* Header Section */}
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-dark-blue tracking-tight mb-2">
                    Platform <span className="text-teal italic">Overview</span>
                </h1>
                <p className="text-dark-blue/60 font-bold tracking-wide">
                    Real-time metrics and analytics for Concord.
                </p>
            </motion.div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard 
                    title="TOTAL PROFILES" 
                    value={totalBiodata} 
                    icon={FiUsers} 
                    delay={0.1} 
                    color="bg-teal/10 text-teal" 
                />
                <StatCard 
                    title="MALE PROFILES" 
                    value={maleBiodata} 
                    icon={FiUserPlus} 
                    delay={0.2} 
                    color="bg-[#00C4C4]/10 text-light-teal" 
                />
                <StatCard 
                    title="FEMALE PROFILES" 
                    value={femaleBiodata} 
                    icon={FiUserPlus} 
                    delay={0.3} 
                    color="bg-dark-blue/10 text-dark-blue" 
                />
                <StatCard 
                    title="PREMIUM USERS" 
                    value={premiumBiodata} 
                    icon={FiStar} 
                    delay={0.4} 
                    color="bg-yellow-500/10 text-yellow-600" 
                />
            </div>

            {/* Charts Area - Bento Box Layout */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
                {/* Gender Split Chart */}
                <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                    className="lg:col-span-1 bg-white/80 backdrop-blur-2xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col items-center justify-center transform transition-transform hover:-translate-y-1 duration-500"
                >
                    <h3 className="w-full text-lg font-extrabold text-dark-blue tracking-wide mb-6">Gender Distribution</h3>
                    <div className="w-full h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={genderData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {genderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                                    itemStyle={{ color: '#067eaa' }}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Premium Ratio Chart */}
                <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                    className="lg:col-span-2 bg-white/80 backdrop-blur-2xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white transform transition-transform hover:-translate-y-1 duration-500"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-extrabold text-dark-blue tracking-wide">Account Tiers</h3>
                        <div className="px-4 py-1.5 bg-teal/5 text-teal text-xs font-bold rounded-full border border-teal/10">Overview</div>
                    </div>
                    <div className="w-full h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={distributionData}
                                maxBarSize={60}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#067eaa', fontWeight: 700, fontSize: 14 }} 
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#9CA3AF', fontWeight: 600 }}
                                />
                                <Tooltip 
                                    cursor={{ fill: 'rgba(0,128,128,0.05)' }} 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                                />
                                <Bar 
                                    dataKey="value" 
                                    fill="#008080" 
                                    radius={[8, 8, 0, 0]}
                                    animationDuration={1500}
                                >
                                    {distributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 1 ? '#F59E0B' : '#008080'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
};

export default AdminDashboard;