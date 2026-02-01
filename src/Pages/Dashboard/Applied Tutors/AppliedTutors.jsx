import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../Components/Loading/Loading';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import {
    Calendar,
    BookOpen,
    GraduationCap,
    DollarSign,
    User,
    Clock,
    Briefcase,
    Award,
    MapPin,
    CheckCircle,
    XCircle,
    MessageCircle
} from "lucide-react";
import AppliedTutorsLoading from '../../../Components/Loading/Dashboard/AppliedTutorsLoading';

const AppliedTutors = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const { data: applications = [], isLoading, refetch } = useQuery({
        queryKey: ["applied-tutors", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tuitions/${user?.email}/applied`);
            return res.data;
        }
    });

    if (isLoading) return <AppliedTutorsLoading />;

    const handleAccept = async (app) => {
        const paymentInfo = {
            fee: app.tutorExpectedSalary,
            tuitionId: app._id,
            studentEmail: app.studentEmail,
            subject: app.subject,
            tutorEmail: app.tutorEmail
        };

        const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
        window.location.href = res.data.url;
    };

    const handleReject = (app) => {
        Swal.fire({
            title: "Reject Application?",
            text: `Are you sure you want to reject ${app.tutorName}'s proposal?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, Reject",
            cancelButtonText: "Cancel",
            background: '#1F2937',
            color: '#F9FAFB',
            customClass: {
                popup: 'rounded-2xl border border-gray-700',
                title: 'text-gray-100',
                htmlContainer: 'text-gray-300'
            }
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/tuitions/reject`, app)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                title: "Rejected!",
                                text: `${app.tutorName}'s application has been rejected.`,
                                icon: "success",
                                background: '#1F2937',
                                color: '#F9FAFB',
                                customClass: {
                                    popup: 'rounded-2xl border border-gray-700'
                                }
                            });
                        }
                    });
            }
        });
    };

    const StatusBadge = ({ status }) => {
        const statusConfig = {
            'Pending': { color: 'bg-yellow-500', text: 'text-yellow-100' },
            'Approved': { color: 'bg-green-500', text: 'text-green-100' },
            'Rejected': { color: 'bg-red-500', text: 'text-red-100' }
        };

        const config = statusConfig[status] || statusConfig.Pending;

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.color} ${config.text}`}>
                {status === 'Approved' && <CheckCircle size={12} className="mr-1" />}
                {status === 'Rejected' && <XCircle size={12} className="mr-1" />}
                {status}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-12 lg:py-20">
            <div className="w-11/12 mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-primary to-secondary rounded-2xl shadow-lg mb-6">
                        <GraduationCap size={32} className="text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Tutor <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Applications</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Review and manage tutor proposals for your tuition posts
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md border border-gray-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-semibold text-gray-700">
                            Total Applications: <span className="text-primary font-bold text-xl ml-2">{applications.length}</span>
                        </span>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Pending Review</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">
                                    {applications.filter(app => app.approvalStatus === 'Pending').length}
                                </p>
                            </div>
                            <div className="p-3 bg-yellow-50 rounded-xl">
                                <Clock size={24} className="text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Accepted</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">
                                    {applications.filter(app => app.approvalStatus === 'Approved').length}
                                </p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-xl">
                                <CheckCircle size={24} className="text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Tutors</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{applications.length}</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-xl">
                                <User size={24} className="text-blue-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Applications Grid */}
                {applications.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                            <MessageCircle size={48} className="text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-3">No Applications Yet</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            You haven't received any tutor applications yet. Check back soon!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {applications.map(app => (
                            <div
                                key={app._id}
                                className="group bg-linear-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-200 hover:border-primary/20 hover:shadow-2xl transition-all duration-500 overflow-hidden"
                            >
                                {/* Status Ribbon */}
                                <div className="absolute top-0 right-0">
                                    <div className="relative">
                                        <div className="w-8 h-8 bg-linear-to-r from-primary to-secondary transform rotate-45 translate-x-4 -translate-y-2"></div>
                                        <StatusBadge status={app.approvalStatus} />
                                    </div>
                                </div>

                                {/* Tutor Profile Section */}
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="relative">
                                            <img
                                                src={app.tutorPhoto}
                                                alt={app.tutorName}
                                                className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
                                            />
                                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-linear-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-md">
                                                <Award size={18} className="text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                                                {app.tutorName}
                                            </h3>
                                            <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                                                <GraduationCap size={14} />
                                                {app.tutorQualification}
                                            </p>
                                            <div className="mt-3 flex items-center gap-2">
                                                <Briefcase size={14} className="text-gray-400" />
                                                <span className="text-sm text-gray-500">{app.tutorExperience} years experience</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tuition Details Card */}
                                    <div className="mt-6 bg-linear-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100">
                                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <BookOpen size={18} className="text-primary" />
                                            Tuition Details
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600 text-sm">Subject</span>
                                                <span className="font-semibold text-gray-900">{app.subject}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600 text-sm">Class Level</span>
                                                <span className="font-semibold text-gray-900">{app.class}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600 text-sm">Applied Date</span>
                                                <span className="font-semibold text-gray-900 flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    {new Date(app.applied_at).toLocaleDateString("en-GB")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expected Salary */}
                                    <div className="mt-6 bg-linear-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-100">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <DollarSign size={20} className="text-amber-600" />
                                                <span className="text-gray-700 font-medium">Expected Salary</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-gray-900">
                                                    ৳{app.tutorExpectedSalary}
                                                </p>
                                                <p className="text-xs text-gray-500">per month</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-8 flex gap-3">
                                        {app.approvalStatus === "Approved" ? (
                                            <button
                                                disabled
                                                className="flex-1 px-4 py-3 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle size={18} />
                                                Accepted
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleAccept(app)}
                                                    className="flex-1 px-4 py-3 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                                >
                                                    <CheckCircle size={18} />
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleReject(app)}
                                                    className="flex-1 px-4 py-3 bg-linear-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                                >
                                                    <XCircle size={18} />
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Decorative Bottom Gradient */}
                                <div className="h-2 bg-linear-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {applications.length > 0 && (
                    <div className="mt-12 text-center">
                        <div className="inline-flex items-center gap-2 text-gray-500 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200">
                            <Clock size={16} />
                            <span className="text-sm">
                                Showing all <span className="font-semibold">{applications.length}</span> applications
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppliedTutors;