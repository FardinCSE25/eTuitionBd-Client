import React from 'react';
import Loading from '../../../Components/Loading/Loading';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const { user } = UseAuth()
    const axiosSecure = UseAxiosSecure()
    const { data: histories = [], isLoading } = useQuery({
        queryKey: ["payment-history", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`)
            return res.data
        }
    })
    if (isLoading) return <Loading />;


    return (
        <div className='py-12 lg:py-20'>
            <div className="w-11/12 mx-auto bg-white rounded-2xl shadow-xl border border-secondary/20 p-6">

            <title>eTuitionBd - Payment History</title>

            {/* Header */}
            <h1 className="text-center text-3xl md:text-4xl font-bold text-secondary py-5">
                Your Payments <span className="text-primary ml-2">({histories.length})</span>
            </h1>

            {/* Table */}
            <div className="overflow-x-auto mt-6">
                <table className="table w-full">
                    <thead className="bg-primary text-accent uppercase text-sm font-bold">
                        <tr>
                            <th>Sl No</th>
                            <th>Subject</th>
                            <th>Amount</th>
                            <th>Payment Date</th>
                            <th>Transaction ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {histories.map((payment, index) => (
                            <tr
                                key={payment._id}
                                className="hover:bg-primary/10 transition"
                            >
                                <th className="text-secondary">{index + 1}</th>
                                <td className="text-secondary font-medium">{payment.subject}</td>
                                <td className="text-secondary font-medium">{payment.amount}</td>
                                <td className="text-secondary">{new Date(payment.paidAt).toLocaleString()}</td>
                                <td className="text-secondary font-mono">{payment.transactionId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default PaymentHistory;