import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../provider/Authprovider";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
const Modal = () => {
    return (
        <div>
            
                                   
                                     {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn btn-accent" onClick={()=>document.getElementById('my_modal_1').showModal()}>Manage</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3  className="font-bold text-center text-lg">Manage</h3>
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
                selectedDeliveryman.map((one)=><option key={one._id} value={`${one.email}`}>{one.email}</option>)
              }
              {/* Add more options as needed */}
            </select>
          </label>
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Parcel Id</span>
                                </label>
                                <input type="text"  {...register("_id", { required: true })} name="_id" placeholder="Name" defaultValue={user1._id} readOnly className="input input-bordered" />
                                {errors._id && <span className="text-red-600">id is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Parcel Delaver date</span>
                                </label>
                                <input type="date"  {...register("date", { required: true })} name="date" placeholder="date" value={`${user1.parcelDate}`} className="input input-bordered" />
                                {errors.date && <span className="text-red-600">Date is required</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input  className="btn btn-primary" type="submit" value="Submit" />
                            </div>
                        </form>
                        <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    
  </div>
</dialog>


        </div>
    );
};

export default Modal;