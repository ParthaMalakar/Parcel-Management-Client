import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../provider/Authprovider";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const AllUser = () => {
    const [users, setUsers] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    console.log('ggggg', user)
    
    // const { data: users = [], refetch } = useQuery({
    //     queryKey: ['parcel'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`users?page=${currentPage}&size=${itemsPerPage}`, {
    //         });
    //         return res.data;
    //     },
    // });

    const handleAdmin =async(id)=>{
        const dataof={
            Role :'admin'
        }
        const menuRes = await axiosSecure.patch(`/user/admin/${id}`, dataof);
        console.log(menuRes.data)
        
        if(menuRes.data.modifiedCount){
            // show success popup
            
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `parcel is Cancle.`,
                showConfirmButton: false,
                timer: 1500
              });
              window.location.reload(true)

    }
}
    const handleMen =async(id)=>{
        const dataof={
            Role :'DeliveryMen'
        }
        const menuRes = await axiosSecure.patch(`/user/admin/${id}`, dataof);
        console.log(menuRes.data)
        
        if(menuRes.data.modifiedCount){
            // show success popup
            
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `User appointed to DeliveryMen.`,
                showConfirmButton: false,
                timer: 1500
              });
              window.location.reload(true)

    }

    }
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [count, setCount] = useState(0)


    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];
    useEffect(() => {
        fetch(`http://localhost:5000/users?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [currentPage, itemsPerPage])

    useEffect(() => {
        fetch('http://localhost:5000/usercount')
            .then(res => res.json())
            .then(data => setCount(data.count))
    }, [])
    const handleItemsPerPage = e => {
        const val = parseInt(e.target.value);
        console.log(val);
        setItemsPerPage(val);
        setCurrentPage(0);
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
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
                                    {user1.Role =='DeliveryMen'?"":<button onClick={()=>handleMen(user1._id)} className="btn btn-accent ml-3">Make DelaveryMen</button>}</>}
                                   </td>
                                    
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className='pagination text-center pb-6'>
                <button className='btn btn-ghost font-semibold  text-xl' onClick={handlePrevPage}><AiOutlineArrowLeft></AiOutlineArrowLeft></button>
                {
                    pages.map(page => <button
                        className={`btn btn-outline  ${currentPage === page ? 'selected' : undefined}`}
                        onClick={() => setCurrentPage(page)}
                        key={page}
                    >{page}</button>)
                }
                <button className='btn btn-ghost font-semibold text-xl' onClick={handleNextPage}><AiOutlineArrowRight></AiOutlineArrowRight></button>
                <select value={itemsPerPage} onChange={handleItemsPerPage} name="" id="">
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="12">12</option>
                    <option value="15">15</option>
                </select>
            </div>
        </div>
    );
};

export default AllUser;