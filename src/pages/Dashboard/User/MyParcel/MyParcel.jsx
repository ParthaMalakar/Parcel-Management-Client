import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../provider/Authprovider";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyParcel = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
console.log(`/parcel/${user.email}`)
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcel'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel/${user.email}`);
            return res.data;
            
        }
    })
    const handleCancle =async(id)=>{
        const dataof={
            status :'cancel'
        }
        const menuRes = await axiosSecure.patch(`/parcel/cancel/${id}`, dataof);
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
       
    }
}
    return (
        <div className="">
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All My Booked Parcel</h2>
                <h2 className="text-3xl">Total Parcel: {parcels.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Parcel Type</th>
                            <th>Requested Delivery Date</th>
                            <th>Approximate Delivery Date</th>
                            <th>Booking Date</th>
                            <th>Delivery Men ID</th>
                            <th>Booking Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.type}</td>
                                <td>{user.parcelDate}</td>
                                <td></td>
                                <td>{user.bookingDate}</td>
                                <td>{}</td>
                                <td>{user.status}</td>
                                {
                                    user.status == 'pending' ? <>
                                    <Link to={`/dashboard/details/${user._id}`} className="btn btn-accent">Update</Link>
                                    <button onClick={()=>handleCancle(user._id)} className="btn btn-accent ml-3">Cancel</button></> : ''

                                }
                                {
                                     user.status == 'delivered' ? <>
                                     <button className="btn btn-accent">Review</button></> : ''
                                }
                                <button className="btn btn-accent ml-3">Pay</button>
                                
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcel;