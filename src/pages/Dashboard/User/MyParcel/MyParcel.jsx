import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../provider/Authprovider";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const MyParcel = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [currentUser, setCurentUser] = useState('');

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
    const totalPrice = parcels.reduce((total, item) => total + parseFloat(item.price), 0);
    const handle = (id) => {
        setCurentUser(id)
    }
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
const handleonSubmit = async(e) => {
    e.preventDefault();
        const form = new FormData(e.currentTarget);
        const id = form.get('id');
        const name = form.get('name');
        const photo = form.get('photo');
        const ratting = form.get('ratting');
        const feedback = form.get('feedback');
        const delaverMenId = form.get('did');
        const data = {
           id,
            name,
            photo,
            ratting,
            feedback,
            delaverMenId
        }


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
const dataup={
    averageReview:ratting
}
                  const menuRes = await axiosSecure.put(`/user/update/${delaverMenId}`, dataup);
                  console.log(menuRes.data)


}


}
    return (
        <div className="">
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All My Booked Parcel:{parcels.length}</h2>
                <h2 className="text-3xl">Total Price:{totalPrice} </h2>
               {totalPrice>0 ?<> {parcels.length?
               <Link to={"/dashboard/payment"}><button  className="btn btn-accent ml-3">Pay</button></Link>
            :<button disabled className="btn btn-accent ml-3">Pay</button>}</>:<h2 className=" text-2xl font-bold bg-orange-300 p-5 ">Payment Done</h2>
            }

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
                                <td>{user1.delaveryDate}</td>
                                <td>{user1.bookingDate}</td>
                                <td>{user1.delaverMenId}</td>
                                <td>{user1.status}</td>
                                {
                                    user1.status == 'pending' ? <>
                                    <Link to={`/dashboard/details/${user1._id}`} className="btn btn-accent mb-1">Update</Link>
                                    <button onClick={()=>handleCancle(user1._id)} className="btn btn-accent ">Cancel</button></> : ''

                                }
                                {
                                     user1.status == 'delivered' ? <>
                                     {/* Open the modal using document.getElementById('ID').showModal() method */}
                                     <button
                                            className="btn btn-accent"
                                            onClick={() => {
                                                handle(user1._id);
                                                document.getElementById(`my_modal_${index}`).showModal();
                                              }}                                            >
                                            Review
                                        </button>
                                        <dialog id={`my_modal_${index}`} className="modal">
                                            
  <div className="modal-box">
    <h3 className="font-bold text-center text-lg">Give Review</h3>
    <form onSubmit={handleonSubmit}  className=" md:w-3/4 lg:w-1/2 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Name</span>
                        </label>
                        <input type="text" required name="name" placeholder="Name" defaultValue={user.displayName} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Photo URL</span>
                        </label>
                        <input type="text" required name="photo" placeholder="Photo URL" className="input input-bordered" defaultValue={user.photoURL} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Ratting</span>
                        </label>
                        <input type="text" required name="ratting" placeholder="Ratting"  className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">FeedBack</span>
                        </label>
                        <input type="text" required name="feedback" placeholder="FeedBack" className="input input-bordered" />
                        
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Parcel Id</span>
                        </label>
                        <input type="text" required name="id" placeholder="id" defaultValue={user1._id} className="input input-bordered" />
                        
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Delavery Men Id</span>
                        </label>
                        <input type="text" required name="did" placeholder=" Delavery Men id" defaultValue={user1.delaverMenId} className="input input-bordered" />
                        
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-red-400 text-white font-bold">Submit</button>
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
                                
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcel;