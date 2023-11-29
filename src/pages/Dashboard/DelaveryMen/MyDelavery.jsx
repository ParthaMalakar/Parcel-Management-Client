import { useQuery } from "@tanstack/react-query";

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import ModalComponent from "./ModalComponent";
import MapComponent from "./MapComponent";

const MyDelavery = () => {
    const [number, setNumber] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
  const deliveryLatitude = 40.7128; 
  const deliveryLongitude = -74.0060; // Replace with your delivery longitude

  
    const { user } = useContext(AuthContext);
    console.log('ggggg', user)
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcel'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/count/${user.email}`, {
            });
            return res.data;
        },
    });

    const handleCancel =async(id)=>{
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
refetch()
    }
}
const handleDelivery =async(id)=>{
    const dataof={
        status :'delivered'
    }
    const menuRes = await axiosSecure.patch(`/parcel/cancel/${id}`, dataof);
    console.log(menuRes.data)
    refetch();
    if(menuRes.data.modifiedCount){
        // show success popup
        
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `parcel is delivered.`,
            showConfirmButton: false,
            timer: 1500
          });
          const menuRes = await axiosSecure.put(`/user/delaveried/${user.email}`);
          console.log(menuRes.data)
refetch()
}
}
    return (
        <div className="">
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">ALL</h2>
                <h2 className="text-3xl">Total My Devavery: {parcels.length}</h2>
            </div>

         

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            
                            <th>Booked User Name</th>
                            <th>Receivers Name</th>
                            <th>Booked User’s Phone</th>
                            <th>Requested Delivery Date</th>
                            <th>ApproximateDeliveryDate</th>
                            <th>Recievers number</th>
                            <th>Receivers Address</th>
                            <th>Status</th>
                            <th>Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels?.map((user1, index) => (
                                <tr key={user1._id}>
                                    
                                    <td>{user1.name}</td>
                                    <td>{user1.ReceiverName}</td>
                                    <td>{user1.phone}</td>
                                    <td>{user1?.parcelDate}</td>
                                    <td>{user1?.delaveryDate}</td>
                                   <td>{user1.ReceiverPhone}</td>
                                    <td>{user1.parcelAddress}</td>
                                    <td>{user1.status}</td>
                                    
                                    <td>
                                    {<><div>
                                        <div className="hidden">
     <MapComponent latitude={deliveryLatitude}
        longitude={deliveryLongitude}></MapComponent>
     </div>                             
      <Link to={`map/${user1._id}`}   className="btn btn-accent mb-1">See Location</Link>
     
    </div>
                                    {user1.status=='cancel'||user1.status=='delivered'?"":<button onClick={()=>handleCancel(user1._id)} className="btn btn-accent mb-1">Cancel</button>}
                                    {user1.status=='delivered'|| user1.status=='cancel'?"":<button onClick={()=>handleDelivery(user1._id)} className="btn btn-accent ">Deliver</button>}
                                    </>}
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

export default MyDelavery;