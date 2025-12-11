import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loading from '../../../Components/Loading/Loading';

const RevenueHistory = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/payments/tutor?email=${user?.email}`
            );
            return res.data;
        },
    });

    const { data: amount = [], isLoading: amountLoading } = useQuery({
        queryKey: ["totalAmount", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/payments/total/${user?.email}`
            );
            return res.data;
        },
    });

    if (isLoading || amountLoading) return <Loading />;

    return (
        <div className="w-11/12 mx-auto my-20 bg-white rounded-2xl shadow-xl p-6">

            <h1 className="text-center text-secondary text-3xl font-bold" >
                Revenue History
            </h1>
            <p className="text-center text-sm mt-2 text-primary">
                Your tuition earnings and payment activities
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl shadow-md bg-gray-50 border-l-4 border-primary">
                    <h2 className="text-xl font-semibold text-secondary">Total Earnings</h2>
                    <p className="text-3xl font-bold mt-2 text-secondary">
                        {amount.totalAmount} ৳
                    </p>
                </div>

                <div className="p-5 rounded-xl shadow-md bg-gray-50 border-l-4 border-secondary">
                    <h2 className="text-xl font-semibold text-secondary">Ongoing Tuitions</h2>
                    <p className="text-3xl font-bold mt-2 text-primary">
                        {amount.count}
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto mt-10">
                <table className="table">
                    <thead className='bg-primary text-accent'>
                        <tr className="text-lg">
                            <th>#</th>
                            <th>Subject</th>
                            <th>Transaction ID</th>
                            <th>Payment Status</th>
                            <th>Paid at</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id} className="hover:bg-gray-100">
                                <td>{index + 1}</td>
                                <td>{payment.subject}</td>
                                <td >{payment.transactionId}</td>
                                <td className="font-bold text-green-600">
                                    Paid
                                </td>
                                <td>
                                    {new Date(payment.paidAt).toLocaleString("en-GB")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default RevenueHistory;
