import React, { useState } from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import UseAuth from '../../../Hooks/UseAuth';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  FaChartPie, 
  FaUsers, 
  FaCheckCircle, 
  FaClock, 
  FaTimesCircle,
  FaChartLine,
  FaDatabase,
  FaBan
} from 'react-icons/fa';

const pieColors = [
  "#3B82F6", // Primary (blue)
  "#1E293B", // Secondary (dark slate)
  "#5CA0F7", // Light Blue (Primary variation)
  "#03373D", // Deep Teal (Secondary variation)
  "#66C9AC", // Soft Teal accent
  "#89CFF0", // Sky Blue
  "#0F4C75", // Dark Blue/Teal
];

// Extended colors that match the theme
const themeColors = [
  ...pieColors,
  "#2563EB", // Blue 600
  "#0EA5E9", // Sky 500
  "#22D3EE", // Cyan 400
  "#0D9488", // Teal 600
  "#2DD4BF", // Teal 300
  "#0F766E", // Teal 700
  "#1E40AF", // Blue 800
];

const statusIcons = {
  'pending': <FaClock />,
  'approved': <FaCheckCircle />,
  'rejected': <FaTimesCircle />,
  'unapproved': <FaBan />,
  'completed': <FaCheckCircle />,
  'active': <FaChartLine />,
  'default': <FaDatabase />
};

const AdminHome = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [hoveredStatus, setHoveredStatus] = useState(null);
  const [hoveredSlice, setHoveredSlice] = useState(null);

  const { data: approvalStats = [], isLoading } = useQuery({
    queryKey: ["tuitions-approval-status-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tuitions/approval-status/stats?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // Transform the data: convert null to "Unapproved" and filter out any other invalid data
  const transformedStats = approvalStats.map(stat => {
    if (!stat._id || stat._id === null || stat._id === 'null') {
      return { ...stat, _id: 'Unapproved' };
    }
    return stat;
  }).filter(stat => stat._id);

  // Remove duplicates and sum counts if same status appears multiple times
  const consolidatedStats = transformedStats.reduce((acc, curr) => {
    const existing = acc.find(item => item._id === curr._id);
    if (existing) {
      existing.count += curr.count;
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, []);

  // Calculate total from all stats
  const totalTuitions = consolidatedStats.reduce((sum, item) => sum + (item.count || 0), 0);
  
  // Prepare chart data
  const chartData = consolidatedStats.map((item, index) => ({
    name: item._id,
    value: item.count,
    color: themeColors[index % themeColors.length],
    percentage: totalTuitions > 0 ? Math.round((item.count / totalTuitions) * 100) : 0
  }));

  // Find specific statuses for summary section
  const unapprovedCount = consolidatedStats.find(stat => stat._id === 'Unapproved')?.count || 0;
  const approvedCount = consolidatedStats.find(stat => stat._id === 'Approved')?.count || 0;
  // eslint-disable-next-line no-unused-vars
  const pendingCount = consolidatedStats.find(stat => stat._id === 'Pending')?.count || 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const pieVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <title>eTuitionBd - Admin Dashboard</title>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full"
            style={{ background: `linear-gradient(to right, ${pieColors[0]}10, ${pieColors[3]}10)` }}
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              scale: 0
            }}
            animate={{
              x: Math.random() * 100 - 50 + 'vw',
              y: Math.random() * 100 - 50 + 'vh',
              scale: [0, 1, 0],
              rotate: 360
            }}
            transition={{
              duration: 20 + i * 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl shadow-2xl mb-10"
          style={{ background: `linear-gradient(to right, ${pieColors[0]}, ${pieColors[3]})` }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-black/5 to-transparent"></div>
          <div className="relative p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="p-3 rounded-full bg-white/20 backdrop-blur-sm"
                  >
                    <FaChartPie className="w-6 h-6 text-white" />
                  </motion.div>
                  <span className="text-white/90 text-sm font-medium tracking-wider">
                    ADMIN DASHBOARD
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  Welcome Back, <span className="bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    {user?.displayName?.split(' ')[0]}
                  </span> 👋
                </h1>
                <p className="text-white/90 max-w-2xl text-lg">
                  Manage tuition applications, track approval status, and monitor platform analytics
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white/30 overflow-hidden shadow-2xl">
                  <img
                    src={user?.photoURL || 'https://via.placeholder.com/150'}
                    alt={user?.displayName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-white/50 transition-all duration-300"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {/* Total Tuitions Card */}
          <motion.div
            variants={itemVariants}
            className="relative group"
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 rounded-xl text-white shadow-lg" style={{ background: pieColors[0] }}>
                  <FaUsers className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: `${pieColors[0]}20`, color: pieColors[0] }}>
                  Total
                </span>
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">{totalTuitions}</div>
              <div className="text-gray-600 text-sm">Total Tuitions</div>
              <motion.div
                className="absolute bottom-0 left-0 h-1 w-full"
                style={{ background: pieColors[0] }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>

          {/* Dynamic Stat Cards */}
          {consolidatedStats.map((stat, index) => (
            <motion.div
              key={stat._id}
              variants={itemVariants}
              custom={index}
              className="relative group"
              onMouseEnter={() => setHoveredStatus(stat._id)}
              onMouseLeave={() => setHoveredStatus(null)}
            >
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    animate={{
                      scale: hoveredStatus === stat._id ? 1.2 : 1,
                      rotate: hoveredStatus === stat._id ? 5 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="p-4 rounded-xl shadow-lg"
                    style={{ background: themeColors[index % themeColors.length] }}
                  >
                    <div className="text-white text-xl">
                      {statusIcons[stat._id?.toLowerCase()] || statusIcons.default}
                    </div>
                  </motion.div>
                  <span 
                    className="text-sm font-medium px-3 py-1 rounded-full"
                    style={{ 
                      background: `${themeColors[index % themeColors.length]}20`,
                      color: themeColors[index % themeColors.length]
                    }}
                  >
                    {Math.round((stat.count / totalTuitions) * 100)}%
                  </span>
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.count}</div>
                <div className="text-gray-600 text-sm capitalize">{stat._id} Tuitions {stat._id === "Unapproved" && "by students" }</div>
                <motion.div
                  className="absolute bottom-0 left-0 h-1 w-full"
                  style={{ background: themeColors[index % themeColors.length] }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Chart Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl shadow-lg" style={{ background: `linear-gradient(to right, ${pieColors[0]}, ${pieColors[3]})` }}>
              <FaChartPie className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Tuition Approval Analytics</h2>
              <p className="text-gray-600">Interactive breakdown of tuition status distribution</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Pie Chart Container */}
            <motion.div
              variants={pieVariants}
              className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-gray-100"
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      strokeWidth={0}
                      onMouseEnter={(_, index) => setHoveredSlice(index)}
                      onMouseLeave={() => setHoveredSlice(null)}
                      animationBegin={0}
                      animationDuration={1500}
                      animationEasing="ease-out"
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke="white"
                          strokeWidth={hoveredSlice === index ? 3 : 2}
                          className="transition-all duration-300"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                      }}
                      formatter={(value, name) => [
                        `${value} tuitions (${Math.round((value / totalTuitions) * 100)}%)`,
                        name
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Chart Legend with Animation */}
              <motion.div 
                className="flex justify-center gap-4 mt-6 flex-wrap"
                variants={containerVariants}
              >
                {chartData.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md border border-gray-100 cursor-pointer"
                    onMouseEnter={() => setHoveredSlice(index)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  >
                    <motion.div
                      animate={{
                        scale: hoveredSlice === index ? 1.3 : 1
                      }}
                      className="w-4 h-4 rounded-full shadow-sm"
                      style={{ background: item.color }}
                    />
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {item.name}
                    </span>
                    <span className="text-sm font-bold" style={{ color: item.color }}>
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Detailed Stats Container */}
            <motion.div
              variants={containerVariants}
              className="space-y-4"
            >
              {chartData.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ 
                    scale: 1.02,
                    x: 10,
                    boxShadow: `0 10px 30px ${item.color}40`
                  }}
                  className="group"
                  onMouseEnter={() => setHoveredSlice(index)}
                  onMouseLeave={() => setHoveredSlice(null)}
                >
                  <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-gray-100 hover:border-transparent transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <motion.div
                          animate={{
                            scale: hoveredSlice === index ? 1.3 : 1,
                            rotate: hoveredSlice === index ? 360 : 0
                          }}
                          transition={{ duration: 0.5 }}
                          className="p-3 rounded-xl shadow-md"
                          style={{ background: item.color }}
                        >
                          <div className="text-white text-lg">
                            {statusIcons[item.name?.toLowerCase()] || statusIcons.default}
                          </div>
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 capitalize">{item.name}</h3>
                          <p className="text-gray-600 text-sm">Tuition Requests</p>
                        </div>
                      </div>
                      
                      <motion.div
                        animate={{
                          scale: hoveredSlice === index ? 1.2 : 1
                        }}
                        className="text-right"
                      >
                        <div className="text-3xl font-bold" style={{ color: item.color }}>
                          {item.value}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.percentage}% of total
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{item.percentage}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: item.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ 
                            duration: 1.5, 
                            delay: index * 0.1,
                            ease: "easeOut" 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-linear-to-r from-blue-50/80 via-teal-50/80 to-blue-50/80 backdrop-blur-sm rounded-3xl p-8 border"
          style={{ borderColor: `${pieColors[3]}20` }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl" style={{ background: `linear-gradient(to right, ${pieColors[3]}, ${pieColors[4]})` }}>
              <FaDatabase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Platform Insights</h3>
              <p className="text-gray-600">Real-time overview of tuition management</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/90 rounded-xl p-6 shadow-lg"
            >
              <div className="text-4xl font-bold mb-2" style={{ color: pieColors[0] }}>{totalTuitions}</div>
              <div className="text-gray-700 font-medium">Total Applications</div>
              <div className="text-sm text-gray-500 mt-2">Across all status categories</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/90 rounded-xl p-6 shadow-lg"
            >
              <div className="text-4xl font-bold mb-2" style={{ color: pieColors[4] }}>
                {approvedCount}
              </div>
              <div className="text-gray-700 font-medium">Approved Tuitions</div>
              <div className="text-sm text-gray-500 mt-2">Successfully processed</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/90 rounded-xl p-6 shadow-lg"
            >
              <div className="text-4xl font-bold mb-2" style={{ color: pieColors[2] }}>
                {unapprovedCount}
              </div>
              <div className="text-gray-700 font-medium">Unapproved Tuitions</div>
              <div className="text-sm text-gray-500 mt-2">Awaiting review</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminHome;