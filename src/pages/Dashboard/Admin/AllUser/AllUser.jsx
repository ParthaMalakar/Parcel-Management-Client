import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../provider/Authprovider";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const AllUser = () => {
    const [number, setNumber] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    console.log('ggggg', user)
    const { data: users = [], refetch } = useQuery({
        queryKey: ['parcel'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`, {
            });
            return res.data;
        },
    });

    const handleAdmin =async(id)=>{
        const dataof={
            Role :'admin'
        }
        const menuRes = await axiosSecure.patch(`/user/admin/${id}`, dataof);
        console.log(menuRes.data)
        refetch();
        if(menuRes.data.modifiedCount){
            // show success popup
            
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `parcel is Cancle.`,
                showConfirmButton: false,
                timer: 1500
              });
              refetch()

    }

    
    }
    return (
        <div className="">
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All  User</h2>
                <h2 className="text-3xl">Total User: {users.length}</h2>
            </div>

            

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>User’s Name</th>
                            <th>Phone Number</th>
                            <th>Number of parcel Booked</th>
                            <th>Role</th>
                            <th>Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user1, index) => (
                                <tr key={user1._id}>
                                    <th>{index + 1}</th>
                                    <td>{user1.name}</td>
                                    <td>{user1.phone}</td>
                                    <td>{user1?.parcelbook}</td>
                                    <td>{user1?.Role}</td>
                                   <td>
                                   {user1.Role =='admin'?
                                   '':<><button onClick={()=>handleAdmin(user1._id)} className="btn btn-accent ml-3">Make Admin</button>
                                    <button onClick={()=>handleMen(user1._id)} className="btn btn-accent ml-3">Make DelaveryMen</button></>}
                                   </td>
                                    
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;