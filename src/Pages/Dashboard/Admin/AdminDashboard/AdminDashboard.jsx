import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FiUsers, FiUserPlus, FiStar } from 'react-icons/fi';
import { 
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Loader from '../../../../Components/Loader/Loader';

const StatCard = ({ title, value, icon: Icon, delay, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="relative overflow-hidden bg-white/70 backdrop-blur-xl p-5 xl:p-6 rounded-2xl lg:rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,128,128,0.12)] transition-all duration-300"
    >
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-white/40 to-white/0 rounded-full blur-2xl z-0" />
        <div className="relative z-10 flex items-start justify-between">
            <div>
                <p className="text-xs xl:text-sm font-bold text-teal-900/60 tracking-wider mb-1 xl:mb-2">{title}</p>
                <motion.h3 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: delay + 0.2 }}
                    className="text-3xl xl:text-4xl font-extrabold text-teal-900"
                >
                    {value || 0}
                </motion.h3>
            </div>
            <div className={`p-3 xl:p-4 rounded-xl xl:rounded-2xl ${color}`}>
                <Icon className="w-5 h-5 xl:w-6 xl:h-6 stroke-[2.5]" />
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
            <div className="min-h-full flex justify-center items-center">
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
        <div className="font-Nunito min-h-full flex flex-col gap-5 lg:gap-6 2xl:gap-8 pb-4">
            
            {/* Header Section */}
            <motion.header 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="shrink-0"
            >
                <h1 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold text-teal-900 tracking-tight mb-1 md:mb-2">
                    Platform <span className="text-teal italic">Overview</span>
                </h1>
                <p className="text-teal-900/60 font-bold tracking-wide text-xs md:text-sm 2xl:text-base">
                    Real-time metrics and analytics for Concord.
                </p>
            </motion.header>

            {/* Top Stat Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 2xl:gap-6 shrink-0">
                <StatCard title="TOTAL PROFILES" value={totalBiodata} icon={FiUsers} delay={0.1} color="bg-teal/10 text-teal" />
                <StatCard title="MALE PROFILES" value={maleBiodata} icon={FiUserPlus} delay={0.2} color="bg-[#00C4C4]/10 text-light-teal" />
                <StatCard title="FEMALE PROFILES" value={femaleBiodata} icon={FiUserPlus} delay={0.3} color="bg-teal-900/10 text-teal-900" />
                <StatCard title="PREMIUM USERS" value={premiumBiodata} icon={FiStar} delay={0.4} color="bg-yellow-500/10 text-yellow-600" />
            </section>

            {/* Charts Area - Bento Box Layout */}
            <motion.section 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 2xl:gap-8 flex-1"
            >
                {/* Gender Split Chart */}
                <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                    className="lg:col-span-1 bg-white/80 backdrop-blur-2xl p-5 xl:p-6 2xl:p-8 rounded-[1.5rem] xl:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col items-center justify-center transform transition-transform hover:-translate-y-1 duration-500 min-h-[300px] lg:min-h-0 h-full"
                >
                    <h3 className="w-full text-base xl:text-lg font-extrabold text-teal-900 tracking-wide mb-4 xl:mb-6 shrink-0 text-center lg:text-left">Gender Distribution</h3>
                    <div className="w-full flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={genderData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="60%"
                                    outerRadius="90%"
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
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Premium Ratio Chart */}
                <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                    className="lg:col-span-2 bg-white/80 backdrop-blur-2xl p-5 xl:p-6 2xl:p-8 rounded-[1.5rem] xl:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white transform transition-transform hover:-translate-y-1 duration-500 flex flex-col min-h-[350px] lg:min-h-0 h-full"
                >
                    <div className="flex justify-between items-center mb-4 xl:mb-6 shrink-0">
                        <h3 className="text-base xl:text-lg font-extrabold text-teal-900 tracking-wide">Account Tiers</h3>
                        <div className="px-3 xl:px-4 py-1 xl:py-1.5 bg-teal/5 text-teal text-[10px] xl:text-xs font-bold rounded-full border border-teal/10">Overview</div>
                    </div>
                    <div className="w-full flex-1 min-h-0">
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
                                    tick={{ fill: '#067eaa', fontWeight: 700, fontSize: 12 }} 
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#9CA3AF', fontWeight: 600, fontSize: 12 }}
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

            </motion.section>
        </div>
    );
};

export default AdminDashboard;