import React from "react";
import UseAuth from "../../../Hooks/UseAuth";

const TutorHome = () => {
    const { user } = UseAuth();

    const tutorCards = [
        {
            title: "My Applications",
            desc: "Track all your submitted tuition applications and their statuses.",
            border: "border-primary",
        },
        {
            title: "Ongoing Tuitions",
            desc: "View tuitions that have been approved and are ongoing .",
            border: "border-primary",
        },
        {
            title: "Revenue History",
            desc: "Check your earnings, payments, and transaction history.",
            border: "border-primary",
        },
    ];

    return (
        <div className="w-11/12 mx-auto my-10">

          
            <div className="bg-white shadow-xl rounded-2xl p-8 border-l-4 border-primary">
                <h1 className="text-3xl font-bold text-secondary">
                    Welcome to your Dashboard{" "}
                    <span className="text-primary ml-1">{user?.displayName}</span> 👋
                </h1>
                <p className="text-primary mt-2 text-sm">
                    Manage your applications, ongoing tuitions, track revenue in one place.
                </p>
            </div>

          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {tutorCards.map((card, index) => (
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TutorHome;
