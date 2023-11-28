import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { AuthContext } from '../../../../provider/AuthProvider';
import { useContext } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useState } from 'react';
import Review from './Review';

const MyReview = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    console.log('ggggg', user)
    // const { data: reviews = [], refetch } = useQuery({
    //     queryKey: ['parcel'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/review/${user.email}`, {
    //         });
    //         return res.data;
    //     },
    // });
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/review/${user.email}`)
        
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    console.log(user.email)
    return (
        <div>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-2'>
                {
                    reviews?.map(REVIEW => <Review
                        key={REVIEW._id} REVIEW={REVIEW}></Review>)
                }

            </div>
        </div>
    );
};

export default MyReview;