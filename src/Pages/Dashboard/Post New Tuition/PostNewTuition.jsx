import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const PostNewTuition = () => {
    const { register, handleSubmit } = useForm();
    const { user } = UseAuth();

    const handlePostTuition = async (data) => {
        console.log("Tuition Form Submitted:", data);

        const result = await Swal.fire({
            title: `📚 Confirm Tuition Post?`,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3B82F6",   
            cancelButtonColor: "#1E293B",    
            confirmButtonText: "<span style='color:white; font-weight:600;'>Confirm</span>",
            cancelButtonText: "<span style='color:white; font-weight:600;'>Cancel</span>",
        });
    };

    return (
        <div className='w-11/12 mx-auto my-20 bg-white rounded-2xl shadow-xl border border-secondary/20 p-8'>
            <h1 className='text-secondary text-4xl md:text-5xl font-extrabold mb-8 text-center'>
                Post New Tuition
            </h1>
            <hr className='border-primary mb-8' />

            <form onSubmit={handleSubmit(handlePostTuition)} className="flex flex-col gap-8">

                {/* Student Name & Email Auto-filled */}
                <div className='flex flex-col md:flex-row gap-8'>
                    <div className='flex-1'>
                        <label className='label text-secondary font-semibold'>Your Name</label>
                        <input
                            type="text"
                            defaultValue={user?.displayName}
                            {...register("studentName", { required: true })}
                            className='input w-full border-2 border-primary text-secondary'
                        />
                    </div>

                    <div className='flex-1'>
                        <label className='label text-secondary font-semibold'>Your Email</label>
                        <input
                            type="email"
                            defaultValue={user?.email}
                            {...register("studentEmail", { required: true })}
                            className='input w-full border-2 border-primary text-secondary'
                        />
                    </div>
                </div>

                {/* Subject & Class */}
                <div className='flex flex-col md:flex-row gap-8'>
                    <div className='flex-1'>
                        <label className='label text-secondary font-semibold'>Subject</label>
                        <input
                            type="text"
                            placeholder='e.g. Math, Physics'
                            {...register("subject", { required: true })}
                            className='input w-full border-2 border-primary text-secondary'
                        />
                    </div>

                    <div className='flex-1'>
                        <label className='label text-secondary font-semibold'>Class</label>
                        <input
                            type="text"
                            placeholder='e.g. Class 9, HSC'
                            {...register("class", { required: true })}
                            className='input w-full border-2 border-primary text-secondary'
                        />
                    </div>
                </div>

                {/* Location & Budget */}
                <div className='flex flex-col md:flex-row gap-8'>
                    <div className='flex-1'>
                        <label className='label text-secondary font-semibold'>Location</label>
                        <input
                            type="text"
                            placeholder='e.g. Mirpur, Dhanmondi'
                            {...register("location", { required: true })}
                            className='input w-full border-2 border-primary text-secondary'
                        />
                    </div>

                    <div className='flex-1'>
                        <label className='label text-secondary font-semibold'>Monthly Budget (BDT)</label>
                        <input
                            type="number"
                            placeholder='e.g. 4000'
                            {...register("budget", { required: true })}
                            className='input w-full border-2 border-primary text-secondary'
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <input
                    type="submit"
                    value="Post Tuition"
                    className='btn bg-primary text-accent w-44 h-12 self-center mt-6'
                />
            </form>
        </div>
    );
};

export default PostNewTuition;
