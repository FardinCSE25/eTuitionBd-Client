import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

const ReportsAnalytics = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["payments"],
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

    if (isLoading || amountLoading) return <Loading />;

    return (
        <div className="w-11/12 mx-auto my-20 bg-white rounded-2xl shadow-xl p-8">

            {/* Page Title */}
            <h1 className="text-center text-4xl font-extrabold text-secondary">
                📊 Reports & Analytics
            </h1>
            <p className="text-center text-primary mt-2 text-sm">
                Overview of all platform earnings & approved tuitions.
            </p>

            {/* Analytics Cards */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Total Earnings */}
                <div className="p-6 rounded-2xl shadow-md bg-secondary/10 border-l-8 border-primary">
                    <h2 className="text-xl font-semibold text-secondary">
                        Platform's Total Transactions
                    </h2>
                    <p className="text-4xl font-extrabold text-secondary mt-3">
                        ৳ {amount[0].totalAmount}
                    </p>
                    <p className="text-sm text-secondary/70 mt-1">All confirmed payments</p>
                </div>

                {/* Total Approved Tuitions */}
                <div className="p-6 rounded-2xl shadow-md bg-primary/20 border-l-8 border-secondary">
                    <h2 className="text-xl font-semibold text-secondary">
                        Platform's Total Approved Tuitions
                    </h2>
                    <p className="text-4xl font-extrabold text-primary mt-3">
                        {amount[0].count}
                    </p>
                    <p className="text-sm text-secondary/70 mt-1">Active approved tuition count</p>
                </div>
            </div>

            {/* Payment History Table */}
            <div className="overflow-x-auto mt-14">
                <table className="table w-full">
                    <thead className="bg-primary text-secondary text-lg">
                        <tr>
                            <th>#</th>
                            <th>Subject</th>
                            <th>Transaction ID</th>
                            <th>Status</th>
                            <th>Paid At</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id} className="hover:bg-gray-100 transition">
                                <td>{index + 1}</td>
                                <td>{payment.subject}</td>
                                <td className="font-mono">{payment.transactionId}</td>
                                <td className="font-bold text-green-600">Paid</td>
                                <td>{new Date(payment.paidAt).toLocaleString("en-GB")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ReportsAnalytics;
