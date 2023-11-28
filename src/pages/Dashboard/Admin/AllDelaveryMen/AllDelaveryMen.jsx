import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../provider/Authprovider";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const AllDelaveryMen = () => {
    const [number, setNumber] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    console.log('ggggg', user)
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcel'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/delivary`, {
            });
            return res.data;
        },
    });



    return (
        <div className="">
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All  DelaveryMen</h2>
                <h2 className="text-3xl">Total DelaveryMen: {parcels.length}</h2>
            </div>

            

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Number of parcel delivered</th>
                            <th>Average review</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels?.map((user1, index) => (
                                <tr key={user1._id}>
                                    <th>{index + 1}</th>
                                    <td>{user1.name}</td>
                                    <td>{user1.phone}</td>
                                    <td>{user1?.delaveryCount}</td>
                                    <td>{user1?.averageReview}</td>
                                   
                                    
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDelaveryMen;