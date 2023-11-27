import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../provider/Authprovider";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const MyParcel = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');

    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
console.log('ggggg',user)
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcel'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel/${user.email}`);
            return res.data;
            
        }
    })
    const filteredParcels = selectedFilter === 'all' ? parcels : parcels.filter(user1 => user1.status === selectedFilter);
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
const onSubmit = async(data) => {
    console.log(data)
    const menuRes = await axiosSecure.post('/review', data);
            console.log(menuRes.data)
            if(menuRes.data.insertedId){
                // show success popup
                
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Review is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                  });

}}
    return (
        <div className="">
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All My Booked Parcel</h2>
                <h2 className="text-3xl">Total Parcel: {parcels.length}</h2>
            </div>
            
            <div>
          <label className="text-lg">Filter by Status:</label>
          <select
            className="ml-2 p-2 border border-gray-300 rounded"
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
            <option value="on the way">on the way</option>
            <option value="Returned">Returned</option>
            <option value="cancel">Cancel</option>
          </select>
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
                            filteredParcels.map((user1, index) => <tr key={user1._id}>
                                <th>{index + 1}</th>
                                <td>{user1.type}</td>
                                <td>{user1.parcelDate}</td>
                                <td></td>
                                <td>{user1.bookingDate}</td>
                                <td>{}</td>
                                <td>{user1.status}</td>
                                {
                                    user1.status == 'pending' ? <>
                                    <Link to={`/dashboard/details/${user1._id}`} className="btn btn-accent">Update</Link>
                                    <button onClick={()=>handleCancle(user1._id)} className="btn btn-accent ml-3">Cancel</button></> : ''

                                }
                                {
                                     user1.status == 'delivered' ? <>
                                     {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn btn-accent" onClick={()=>document.getElementById('my_modal_1').showModal()}>Review</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-center text-lg">Give Review</h3>
    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" defaultValue={user.displayName} className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" defaultValue={user.photoURL}  className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Rating</span>
                                </label>
                                <input type="text"  {...register("rating")} name="rating" placeholder="Out of 5" className="input input-bordered" />
                                {errors.rating && <span className="text-red-600">Rating is required</span>}
                            </div>
                           
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">FeedBack</span>
                                </label>
                                <input type="text"  {...register("feedBack", { required: true })} name="feedBack" placeholder="feedBack" className="input input-bordered" />
                                {errors.feedBack && <span className="text-red-600">feedBack is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Delavery Men Id</span>
                                </label>
                                <input type="text"  {...register("delaveryId", { required: true })} name="delaveryId" placeholder="Delavery men Id" defaultValue={user1.delaveryMenId} className="input input-bordered" />
                                {errors.delaveryId && <span className="text-red-600">DelaverMenId is required</span>}
                            </div>
                            
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Submit" />
                            </div>
                        </form>
                        <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    
  </div>
</dialog>
                                     </> : ''
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