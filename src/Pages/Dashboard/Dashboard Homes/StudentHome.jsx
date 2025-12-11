import React from "react";
import UseAuth from "../../../Hooks/UseAuth";

const StudentHome = () => {
    const { user } = UseAuth();

    return (
        <div className="w-11/12 mx-auto my-10">

            <div className="bg-white shadow-xl rounded-2xl p-8 border-l-4 border-primary">
                <h1 className="text-3xl font-bold text-secondary">
                    Welcome to your Dashboard <span className="text-primary ml-1">{user?.displayName}</span> 👋
                </h1>
                <p className="text-primary mt-2 text-sm">
                    Manage your tuitions, track payments, apply to tutors and customize your profile—everything in one place.
                </p>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">


                {[
                    {
                        title: "My Tuitions",
                        desc: "View and manage all your tuition requests and approval status.",
                        border: "border-primary"
                    },
                    {
                        title: "Post New Tuition",
                        desc: "Need a tutor? Post a new tuition requirement easily.",
                        border: "border-primary"
                    },
                    {
                        title: "Applied Tutors",
                        desc: "Check tutors who have applied to teach you and review profiles.",
                        border: "border-primary"
                    },
                    {
                        title: "Payment History",
                        desc: "View past payments and transaction details in one place.",
                        border: "border-primary"
                    },
                    {
                        title: "Profile Settings",
                        desc: "Update personal info and manage account details.",
                        border: "border-primary"
                    },
                ].map((card, index) => (
                    <div
                        key={index}
                        className={`p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer border-b-4 ${card.border}`}
                    >
                        <h2 className="text-2xl font-bold text-secondary tracking-wide">
                            {card.title}
                        </h2>

                        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                            {card.desc}
                        </p>


                        {/* <div className="mt-4 h-1 w-16 bg-primary rounded-full transition-all duration-300 group-hover:w-24"></div> */}
                    </div>
                ))}

            </div>

        </div>
    );
};

export default StudentHome;
