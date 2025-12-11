// src/pages/Tuitions.jsx
import React, { useState } from 'react';
import UseAxios from '../../Hooks/UseAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router';

const Tuitions = () => {
    const axiosInstance = UseAxios();
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("Default");

    let { data: tuitions = [], isLoading } = useQuery({
        queryKey: ["tuitions", search],
        queryFn: async () => {
            const res = await axiosInstance.get(`/all-tuitions?status=Approved&search=${search}`);
            return res.data;
        },
    });

  const sortedTuitions = (() => {
        if (sort == 'Higher to Lower Budget') {
            return tuitions.sort((a, b) => (b.budget) - (a.budget))
        }
        else if (sort == 'Lower to Higher Budget') {
            return tuitions.sort((a, b) => (a.budget) - (b.budget))
        }
        else {
            return tuitions
        }
    })()


    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='h-screen'>
            <div className="w-11/12 mx-auto my-32 bg-white rounded-2xl shadow-xl border border-secondary/20 p-6">

                <h1 className="text-center text-3xl font-bold text-secondary">
                    All Tuitions <span className="text-primary ml-1"> ({tuitions.length})</span>
                </h1>
                

               <div className='flex justify-between items-center my-12'>
                 <div>
                    <select className='border-2 border-black rounded-md p-1' value={sort} onChange={e => setSort(e.target.value)}>
                        <option value="Default">Default</option>
                        <option value="Higher to Lower Budget">Higher to Lower Budget</option>
                        <option value="Lower to Higher Budget">Lower to Higher Budget</option>
                    </select>
                </div>

                
                    <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-md w-full md:w-1/3">
                        <svg
                            className="h-6 opacity-60"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                            type="search"
                            placeholder="Search by subject or class"
                            className="w-full bg-transparent outline-none text-secondary placeholder-secondary"
                        />
                    </div>
               
               </div>

                <div className="overflow-x-auto mt-6">
                    <table className="table w-full">
                        <thead className="bg-secondary/10 text-secondary uppercase text-sm font-bold">
                            <tr>
                                <th>#</th>
                                <th>Student Name</th>
                                <th>Subject</th>
                                <th>Class</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTuitions.map((tuition, index) => (
                                <tr key={tuition._id} className="hover:bg-primary/10 transition">
                                    <td className="text-secondary">{index + 1}</td>

                                    <td className="text-secondary font-medium">{tuition.studentName}</td>
                                    <td className="text-secondary font-medium">{tuition.subject}</td>
                                    <td className="text-secondary">{tuition.class}</td>
                                    <td>
                                        <Link to={`/tuition-details/${tuition._id}`} className="btn btn-square bg-primary text-white">
                                            <FaEye />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default Tuitions;
