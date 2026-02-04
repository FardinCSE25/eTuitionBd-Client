import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaChartLine, FaMoneyCheckAlt, FaCheckCircle, FaCalendarAlt, FaReceipt, FaChartBar } from "react-icons/fa";
import { MdTrendingUp, MdAccountBalance } from "react-icons/md";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import ReportsAnalyticsLoading from "../../../Components/Loading/Dashboard/ReportsAnalyticsLoading";

const ReportsAnalytics = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-payments?email=${user?.email}`);
            return res.data;
        },
    });

    const { data: amount = [], isLoading: amountLoading } = useQuery({
        queryKey: ["totalAmount", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/admin?email=${user?.email}`);
            return res.data;
        },
    });

    if (isLoading || amountLoading) return <ReportsAnalyticsLoading />;

    const totalAmount = amount[0]?.totalAmount || 0;
    const totalCount = amount[0]?.count || 0;
    const totalTransactions = payments.length;

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0
        }).format(amount).replace('BDT', '৳');
    };

    return (
        <div className='py-12 lg:-py-20'>
            <div className="w-11/12 mx-auto bg-white rounded-2xl p-6 md:p-8 animate-fade-in">
                <title>eTuitionBd - Reports & Analytics</title>

                {/* Header Section */}
                <div className="text-center mb-12 animate-slide-down">
                    <div className="inline-flex items-center justify-center p-3 bg-linear-to-r from-primary/10 to-secondary/10 rounded-full mb-4">
                        <FaChartBar className="text-4xl text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl text-primary font-bold">
                        📊 Reports & Analytics
                    </h1>
                    <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
                        Comprehensive overview of platform earnings, transactions, and tuition statistics
                    </p>
                </div>

                {/* Stats Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Total Revenue Card */}
                    <div className="group bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <MdAccountBalance className="text-3xl text-blue-600" />
                            </div>
                            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                                REVENUE
                            </span>
                        </div>
                        <h3 className="text-gray-700 font-semibold text-lg mb-2">Total Revenue</h3>
                        <p className="text-3xl font-bold text-blue-700 mb-1">
                            {formatCurrency(totalAmount)}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                            <FaMoneyCheckAlt className="mr-2" />
                            <span>All confirmed payments</span>
                        </div>
                    </div>

                    {/* Approved Tuitions Card */}
                    <div className="group bg-linear-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <FaCheckCircle className="text-3xl text-green-600" />
                            </div>
                            <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                                ACTIVE
                            </span>
                        </div>
                        <h3 className="text-gray-700 font-semibold text-lg mb-2">Approved Tuitions</h3>
                        <p className="text-3xl font-bold text-green-700 mb-1">{totalCount}</p>
                        <div className="flex items-center text-sm text-gray-500">
                            <MdTrendingUp className="mr-2" />
                            <span>Active approved tuitions</span>
                        </div>
                    </div>

                    {/* Total Transactions Card */}
                    <div className="group bg-linear-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <FaReceipt className="text-3xl text-purple-600" />
                            </div>
                            <span className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
                                TRANSACTIONS
                            </span>
                        </div>
                        <h3 className="text-gray-700 font-semibold text-lg mb-2">Total Transactions</h3>
                        <p className="text-3xl font-bold text-purple-700 mb-1">{totalTransactions}</p>
                        <div className="flex items-center text-sm text-gray-500">
                            <FaChartLine className="mr-2" />
                            <span>All payment records</span>
                        </div>
                    </div>

                    {/* Average Transaction Card */}
                    <div className="group bg-linear-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-orange-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <FaMoneyCheckAlt className="text-3xl text-orange-600" />
                            </div>
                            <span className="px-3 py-1 bg-orange-600 text-white text-xs font-semibold rounded-full">
                                AVERAGE
                            </span>
                        </div>
                        <h3 className="text-gray-700 font-semibold text-lg mb-2">Avg. Transaction</h3>
                        <p className="text-3xl font-bold text-orange-700 mb-1">
                            {totalTransactions > 0 ? formatCurrency(totalAmount / totalTransactions) : formatCurrency(0)}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                            <FaCalendarAlt className="mr-2" />
                            <span>Per transaction average</span>
                        </div>
                    </div>
                </div>

                {/* Transaction History Table */}
                <div className="bg-linear-to-r from-gray-50 to-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-slide-up">
                    <div className="px-6 py-4 bg-linear-to-r from-primary/5 to-secondary/5 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-secondary flex items-center gap-3">
                            <FaChartLine className="text-primary" />
                            Transaction History
                        </h2>
                        <p className="text-gray-600 mt-1">
                            Detailed list of all payment transactions across the platform
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-linear-to-r from-primary to-secondary text-white uppercase text-sm">
                                <tr>
                                    <th className="py-4 px-6 font-semibold text-left">#</th>
                                    <th className="py-4 px-6 font-semibold text-left">Subject</th>
                                    <th className="py-4 px-6 font-semibold text-left">Transaction ID</th>
                                    <th className="py-4 px-6 font-semibold text-left">Status</th>
                                    <th className="py-4 px-6 font-semibold text-left">Paid at</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {payments.map((payment, index) => (
                                    <tr
                                        key={payment._id}
                                        className="hover:bg-primary/5 transition-all duration-300 group"
                                    >
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-lg font-bold group-hover:scale-110 transition-transform duration-300">
                                                {index + 1}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="font-medium text-gray-800 group-hover:text-primary transition-colors duration-300">
                                                {payment.subject}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 font-mono text-gray-700 bg-gray-50 rounded group-hover:bg-gray-100 transition-colors duration-300">
                                            {payment.transactionId}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700 group-hover:bg-green-200 transition-colors duration-300">
                                                <FaCheckCircle className="mr-1" />
                                                Paid
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2 text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                                                <FaCalendarAlt className="text-primary" />
                                                {new Date(payment.paidAt).toLocaleString("en-GB", {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                            Showing <span className="font-semibold">{payments.length}</span> transactions
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Last updated:</span>
                            <span className="text-sm font-semibold text-primary">
                                {new Date().toLocaleDateString("en-GB")}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                {payments.length === 0 && (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
                            <FaChartLine className="text-4xl text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Transactions Yet</h3>
                        <p className="text-gray-500">Transaction history will appear here once payments are made.</p>
                    </div>
                )}
            </div>

            {/* Add custom animation styles */}
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slide-down {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
                
                .animate-slide-down {
                    animation: slide-down 0.5s ease-out forwards;
                }
                
                .animate-slide-up {
                    animation: slide-up 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ReportsAnalytics;