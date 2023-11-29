import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../provider/Authprovider";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const AllParcel = () => {
    const [currentUser, setCurentUser] = useState('');
    const handle = (id) => {
        setCurentUser(id)
    }
    console.log(currentUser)
    const [selectedDeliveryman, setSelectedDeliveryman] = useState([]);
    const [Deliveryman, setDeliveryman] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    console.log('ggggg', user)
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcel'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel`, {
                params: {
                    startDate,
                    endDate,
                },
            });
            return res.data;
        },
    });

    console.log(selectedDeliveryman)
    useEffect(() => {
        fetch(`http://localhost:5000/users/delivary`)
            .then(res => res.json())
            .then(data => setSelectedDeliveryman(data || []))
    }, [])
    const onSubmit = async (data) => {
        const Update = {
            status: 'On the way',
            delaverMenId: Deliveryman,
            delaveryDate: data.date
        }
        data._id=currentUser;
        console.log(Update)
        const menuRes = await axiosSecure.put(`/parcel/one/${data._id}`, Update);
        console.log(menuRes.data)
        if (menuRes.data.matchedCount) {
            // show success popup

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Assigned delavery man.`,
                showConfirmButton: false,
                timer: 1500
            });
            refetch()

        }
    }
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const applyDateFilter = () => {
        refetch();
    };
    return (
        <div className="">
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All  Parcel</h2>
                <h2 className="text-3xl">Total Parcel: {parcels.length}</h2>
            </div>

            <div className="flex justify-between my-4">
                <div className="flex items-center space-x-4">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        onChange={(e) => handleStartDateChange(e.target.value)}
                        value={startDate}
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        onChange={(e) => handleEndDateChange(e.target.value)}
                        value={endDate}
                    />
                </div>
                <button className="btn btn-primary" onClick={applyDateFilter}>
                    Apply Filter
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Users Name</th>
                            <th>Users Phone</th>
                            <th>Booking Date</th>
                            <th>Requested Delivery Date</th>
                            <th>Price</th>
                            <th>Status</th>

                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels?.map((user1, index) => (
                                <tr key={user1._id}>
                                    <th>{index + 1}</th>
                                    <td>{user1.name}</td>
                                    <td>{user1.phone}</td>
                                    <td>{user1.bookingDate}</td>
                                    <td>{user1.parcelDate}</td>
                                    <td>{user1.price}</td>
                                    <td>{user1.status}</td>
                                    <td>
                                        {user1.status =='pending'&&<button
                                            className="btn btn-accent"
                                            onClick={() => {
                                                handle(user1._id);
                                                document.getElementById(`my_modal_${index}`).showModal();
                                              }}                                            >
                                            Manage
                                        </button>}
                                        <dialog id={`my_modal_${index}`} className="modal">
                                            <div className="modal-box">
                                                <h3 className="font-bold text-center text-lg">Manage</h3>
                                                <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                                                    <div className="form-control">
                                                        <label>
                                                            Select Deliveryman:
                                                            <select
                                                                value={selectedDeliveryman}
                                                                {...register("man")}
                                                                onChange={(e) => setDeliveryman(e.target.value)}
                                                            >
                                                                {/* Populate the select options with available deliverymen */}
                                                                {/* <option value="deliveryman1">Deliveryman 1</option>
              <option value="deliveryman2">Deliveryman 2</option> */}
                                                                {
                                                                  selectedDeliveryman?.map((one) => <option key={one._id} value={`${one.email}`}>{one.email}</option>)
                                                                }
                                                                {/* Add more options as needed */}
                                                            </select>
                                                        </label>
                                                    </div>

                                                    

                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Parcel Delaver date</span>
                                                        </label>
                                                        <input type="date"  {...register("date", { required: true })} name="date" placeholder="date" value={`${user1.parcelDate}`} className="input input-bordered" />
                                                        {errors.date && <span className="text-red-600">Date is required</span>}
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

export default AllParcel;