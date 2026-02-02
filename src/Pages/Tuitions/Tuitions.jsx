import React, { useState, useEffect } from 'react';
import UseAxios from '../../Hooks/UseAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';
import { FaEye, FaSearch, FaFilter, FaUserGraduate, FaBook, FaGraduationCap, FaMapMarkerAlt, FaMoneyBillWave, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import TuitionsLoading from '../../Components/Loading/HomePage/TuitionsLoading';

const Tuitions = () => {
    const axiosInstance = UseAxios();
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("Default");
    const [filteredTuitions, setFilteredTuitions] = useState([]);
    const [allTuitions, setAllTuitions] = useState([]);
    const [totalTuitions, setTotalTuitions] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 9;

    // Fetch all tuitions once
    let { data: tuitionsData = [], isLoading } = useQuery({
        queryKey: ["all-tuitions"],
        queryFn: async () => {
            // Fetch all tuitions without pagination for local filtering
            const res = await axiosInstance.get(`/all-tuitions?status=Approved`);
            return res.data;
        },
    });

    // Initialize data once when fetched
    useEffect(() => {
        if (tuitionsData.result) {
            setAllTuitions(tuitionsData.result);
            setFilteredTuitions(tuitionsData.result);
            setTotalTuitions(tuitionsData.count?.[0]?.count || 0);
        }
    }, [tuitionsData]);

    // Filter and sort logic
    useEffect(() => {
        if (allTuitions.length === 0) return;

        let result = [...allTuitions];

        // Apply search filter
        if (search.trim()) {
            const searchLower = search.toLowerCase();
            result = result.filter(tuition => 
                tuition.subject?.toLowerCase().includes(searchLower) ||
                tuition.class?.toLowerCase().includes(searchLower) ||
                tuition.location?.toLowerCase().includes(searchLower) ||
                tuition.studentName?.toLowerCase().includes(searchLower)
            );
        }

        // Apply sorting
        if (sort === 'Higher to Lower Budget') {
            result.sort((a, b) => (b.budget || 0) - (a.budget || 0));
        } else if (sort === 'Lower to Higher Budget') {
            result.sort((a, b) => (a.budget || 0) - (b.budget || 0));
        }

        setFilteredTuitions(result);
        setTotalTuitions(result.length);
        setCurrentPage(0); // Reset to first page on filter/sort change
    }, [search, sort, allTuitions]);

    // Calculate paginated data
    const startIndex = currentPage * limit;
    const endIndex = startIndex + limit;
    const paginatedTuitions = filteredTuitions.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredTuitions.length / limit);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    if (isLoading) return <TuitionsLoading />;

    return (
        <div className="min-h-screen py-8 lg:pt-44 lg:pb-12 px-4">
            <div className="max-w-11/12 mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
                        All Tuitions
                    </h1>
                    <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-slate-200">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-lg font-semibold text-secondary">
                                Total Available:
                                <span className="text-primary ml-2 font-bold text-xl">
                                    {totalTuitions}
                                </span>
                            </span>
                        </div>
                    </div>
                    <p className="text-slate-600 max-w-2xl mx-auto mt-4 text-lg">
                        Find the perfect tuition opportunity that matches your expertise
                    </p>
                </motion.div>

                {/* Search and Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-10"
                >
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                            {/* Sort Filter */}
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <FaFilter className="text-primary text-xl" />
                                </div>
                                <select
                                    value={sort}
                                    onChange={e => setSort(e.target.value)}
                                    className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary focus:ring-3 focus:ring-primary/20 transition-all duration-300 bg-white text-secondary w-full lg:w-auto"
                                >
                                    <option value="Default">Default Sorting</option>
                                    <option value="Higher to Lower Budget">Higher to Lower Budget</option>
                                    <option value="Lower to Higher Budget">Lower to Higher Budget</option>
                                </select>
                            </div>

                            {/* Search Bar */}
                            <div className="relative w-full lg:w-1/3">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <FaSearch className="text-slate-400" />
                                </div>
                                <input
                                    value={search}
                                    onChange={handleSearchChange}
                                    onKeyPress={handleKeyPress}
                                    type="text"
                                    placeholder="Search by subject, class, or location..."
                                    className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-slate-200 focus:border-primary focus:ring-3 focus:ring-primary/20 transition-all duration-300 bg-white text-secondary placeholder-slate-400"
                                />
                            </div>

                            {/* Reset Button */}
                            <button
                                onClick={() => {
                                    setSearch("");
                                    setSort("Default");
                                }}
                                className="px-6 py-3 border-2 border-slate-300 text-secondary hover:bg-slate-50 hover:border-primary/50 rounded-xl font-medium transition-all duration-300"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Tuitions Grid */}
                {paginatedTuitions.length > 0 ? (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
                        >
                            {paginatedTuitions.map((tuition, index) => (
                                <motion.div
                                    key={tuition._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    whileHover={{ y: -8 }}
                                    className="group relative"
                                >
                                    {/* Background Glow Effect */}
                                    <div className="absolute -inset-0.5 bg-linear-to-r from-primary/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>

                                    {/* Card */}
                                    <div className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-md hover:shadow-2xl transition-all duration-300 group-hover:border-primary/30">
                                        {/* Subject Header */}
                                        <div className="mb-6">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 bg-linear-to-r from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                                                    <FaBook className="text-xl text-primary" />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-bold text-secondary">{tuition.subject}</h2>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                                            Approved
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Student Info */}
                                        <div className="mb-6">
                                            <div className="flex items-center gap-3 p-3 bg-linear-to-r from-slate-50 to-slate-100 rounded-xl group-hover:from-primary/5 group-hover:to-blue-50 transition-all duration-300">
                                                <div className="w-10 h-10 bg-linear-to-br from-primary/10 to-blue-500/10 rounded-full flex items-center justify-center">
                                                    <FaUserGraduate className="text-lg text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-secondary">{tuition.studentName}</h3>
                                                    <p className="text-sm text-slate-500">Student</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info Grid */}
                                        <div className="space-y-4">
                                            {/* Class */}
                                            <div className="flex items-center justify-between p-3 bg-linear-to-r from-slate-50 to-slate-100 rounded-xl group-hover:from-primary/5 group-hover:to-blue-50 transition-all duration-300">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                                        <FaGraduationCap className="text-primary" />
                                                    </div>
                                                    <span className="font-medium text-slate-700">Class</span>
                                                </div>
                                                <span className="font-bold text-secondary">{tuition.class}</span>
                                            </div>

                                            {/* Location */}
                                            <div className="flex items-center justify-between p-3 bg-linear-to-r from-slate-50 to-slate-100 rounded-xl group-hover:from-primary/5 group-hover:to-blue-50 transition-all duration-300">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                                        <FaMapMarkerAlt className="text-primary" />
                                                    </div>
                                                    <span className="font-medium text-slate-700">Location</span>
                                                </div>
                                                <span className="font-semibold text-secondary truncate max-w-[120px]">
                                                    {tuition.location || 'Flexible'}
                                                </span>
                                            </div>

                                            {/* Budget */}
                                            <div className="p-4 bg-linear-to-r from-primary/5 to-blue-500/5 rounded-xl border border-primary/10 group-hover:border-primary/20 transition-all duration-300">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <FaMoneyBillWave className="text-xl text-primary" />
                                                        <span className="font-semibold text-slate-700">Budget</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-xl font-bold text-secondary">
                                                            ৳{tuition.budget || 'Negotiable'}
                                                        </div>
                                                        <div className="text-xs text-slate-500">per month</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* View Details Button */}
                                        <div className="mt-6 pt-4 border-t border-slate-100 group-hover:border-primary/20 transition-all duration-300">
                                            <Link
                                                to={`/tuition-details/${tuition._id}`}
                                                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-linear-to-r from-primary to-primary/90 text-white rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                                            >
                                                <FaEye />
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center justify-center gap-2 mt-12"
                            >
                                {/* Previous Button */}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                    disabled={currentPage === 0}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${currentPage === 0
                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                        : 'bg-white border border-slate-200 text-secondary hover:bg-slate-50 hover:border-primary/50'
                                        }`}
                                >
                                    <FaChevronLeft />
                                    Previous
                                </button>

                                {/* Page Numbers */}
                                <div className="flex items-center gap-2">
                                    {[...Array(totalPages).keys()].slice(
                                        Math.max(0, currentPage - 2),
                                        Math.min(totalPages, currentPage + 3)
                                    ).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${page === currentPage
                                                ? 'bg-linear-to-r from-primary to-primary/90 text-white shadow-md'
                                                : 'bg-white border border-slate-200 text-secondary hover:bg-slate-50 hover:border-primary/50'
                                                }`}
                                        >
                                            {page + 1}
                                        </button>
                                    ))}
                                </div>

                                {/* Next Button */}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                                    disabled={currentPage === totalPages - 1}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${currentPage === totalPages - 1
                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                        : 'bg-white border border-slate-200 text-secondary hover:bg-slate-50 hover:border-primary/50'
                                        }`}
                                >
                                    Next
                                    <FaChevronRight />
                                </button>
                            </motion.div>
                        )}

                        {/* Page Info */}
                        <div className="text-center mt-6 text-slate-600">
                            <p>
                                Showing <span className="font-semibold text-primary">
                                    {startIndex + 1} - {Math.min(endIndex, filteredTuitions.length)}
                                </span> of <span className="font-semibold text-secondary">{filteredTuitions.length}</span> tuitions
                            </p>
                        </div>
                    </>
                ) : (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaBook className="text-4xl text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-secondary mb-3">
                            No Tuitions Found
                        </h3>
                        <p className="text-slate-600 max-w-md mx-auto mb-8">
                            {search
                                ? `No tuitions found for "${search}". Try different search terms.`
                                : 'No tuitions are currently available. Please check back later.'
                            }
                        </p>
                        {search && (
                            <button
                                onClick={() => {
                                    setSearch("");
                                }}
                                className="px-6 py-3 bg-linear-to-r from-primary to-primary/90 text-white rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Clear Search
                            </button>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Tuitions;