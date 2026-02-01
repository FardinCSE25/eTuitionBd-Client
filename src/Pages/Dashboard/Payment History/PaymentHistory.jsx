import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FaReceipt, FaMoneyCheckAlt, FaCalendarAlt, FaHashtag, FaFileInvoiceDollar, FaDownload } from 'react-icons/fa';
import { SiGoogleanalytics } from 'react-icons/si';
import Loading from '../../../Components/Loading/Loading';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import PaymentHistoryLoading from '../../../Components/Loading/Dashboard/PaymentHistoryLoading';

const PaymentHistory = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const { data: histories = [], isLoading } = useQuery({
        queryKey: ["payment-history", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) return <PaymentHistoryLoading />;

    // Calculate total amount
    const totalAmount = histories.reduce((sum, payment) => sum + parseFloat(payment.amount || 0), 0);


    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 py-12 lg:py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-primary to-primary/90 rounded-2xl mb-6 shadow-xl">
                        <FaReceipt className="text-4xl text-white" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
                        Payment History
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Track all your tuition payments and financial transactions in one place
                    </p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-linear-to-r from-primary to-primary/90 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-primary/20"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-50 text-sm font-medium">Total Payments</p>
                                <h3 className="text-3xl font-bold text-white mt-2">{histories.length}</h3>
                            </div>
                            <FaFileInvoiceDollar className="text-4xl text-white/90" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="bg-linear-to-r from-primary via-blue-500 to-blue-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-400"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-50 text-sm font-medium">Total Spent</p>
                                <h3 className="text-3xl font-bold text-white mt-2">
                                    ৳{totalAmount.toLocaleString()}
                                </h3>
                            </div>
                            <FaMoneyCheckAlt className="text-4xl text-white/90" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="bg-linear-to-r from-primary to-secondary rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-primary/20"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-50 text-sm font-medium">Avg. Payment</p>
                                <h3 className="text-3xl font-bold text-white mt-2">
                                    ৳{histories.length > 0 ? (totalAmount / histories.length).toFixed(0) : 0}
                                </h3>
                            </div>
                            <SiGoogleanalytics className="text-4xl text-white/90" />
                        </div>
                    </motion.div>
                </div>

                {/* Payment History Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
                >
                    <div className="px-6 py-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-secondary flex items-center gap-3">
                                <FaReceipt className="text-primary" />
                                Transaction History
                            </h2>
                            <div className="text-sm text-slate-500 bg-slate-50 px-4 py-2 rounded-full">
                                {histories.length} payments found
                            </div>
                        </div>

                        {histories.length > 0 ? (
                            <div className="overflow-x-auto rounded-2xl border border-slate-100">
                                <table className="min-w-full divide-y divide-slate-100">
                                    <thead className="bg-linear-to-r from-primary to-primary/90">
                                        <tr>
                                            {["SL No", "Subject", "Amount", "Payment Date", "Transaction ID", "Status"].map((header, idx) => (
                                                <th
                                                    key={idx}
                                                    className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider"
                                                >
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        <AnimatePresence>
                                            {histories.map((payment, index) => (
                                                <motion.tr
                                                    key={payment._id}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    whileHover={{
                                                        scale: 1.01,
                                                        backgroundColor: "rgba(59, 130, 246, 0.03)"
                                                    }}
                                                    className="group hover:bg-primary/5 transition-all duration-200"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="shrink-0 h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                                                                <span className="text-lg font-bold text-primary">{index + 1}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">

                                                            <div>
                                                                <div className="text-sm font-semibold text-secondary">
                                                                    {payment.subject || 'N/A'}
                                                                </div>
                                                                <div className="text-xs text-slate-500">
                                                                    Tuition Payment
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <span className="text-xl font-bold text-secondary">
                                                                ৳{parseFloat(payment.amount || 0).toLocaleString()}
                                                            </span>
                                                            <span className="ml-2 text-xs text-slate-400">BDT</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-2">
                                                            <FaCalendarAlt className="text-primary" />
                                                            <div className="text-sm font-medium text-secondary">
                                                                {new Date(payment.paidAt).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                })}
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-slate-500 mt-1">
                                                            {new Date(payment.paidAt).toLocaleTimeString('en-US', {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-2">
                                                            <FaHashtag className="text-slate-400" />
                                                            <code className="text-sm font-mono bg-slate-50 px-3 py-1 rounded border border-slate-200 text-slate-700 group-hover:bg-white transition-all duration-300">
                                                                {payment.transactionId || 'N/A'}
                                                            </code>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                                                            <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                                                            Completed
                                                        </span>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FaReceipt className="text-3xl text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-secondary mb-2">
                                    No Payment History Found
                                </h3>
                                <p className="text-slate-500 max-w-md mx-auto">
                                    Your payment history will appear here once you make your first tuition payment.
                                </p>
                            </motion.div>
                        )}

                        {/* Summary Footer */}
                        {histories.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-8 pt-6 border-t border-slate-100"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div className="text-slate-600">
                                        Showing <span className="font-semibold text-secondary">{histories.length}</span> payments
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-sm text-slate-500">Total Amount Paid</p>
                                            <p className="text-2xl font-bold text-primary">
                                                ৳{totalAmount.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 text-center text-slate-600 text-sm"
                >
                    <p className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
                        <span className="text-primary">💡</span>
                        Need help with a payment? Contact our support team at
                        <span className="font-semibold text-primary ml-1">support@etuitionbd.com</span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default PaymentHistory;