import { useContext } from "react";
import { AuthContext } from "../../../../provider/Authprovider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const { user,setUser,updateUserProfile} = useContext(AuthContext);
    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
            
        });
        console.log(res)
         if (res.data.success) {
            // now send the menu item data to the server with the image url
            updateUserProfile(user.displayName,res.data.data.display_url)
            .then(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Profile update successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                
               
                window.location.reload(true)
            })
            .catch(error => console.log(error))
            console.log(user) 
    }
}
    return (
        <div>
            
            <div className="max-w-7xl ">
            
            <div className="card mx-auto md:w-[800px] md:h-[600px] mt-2 bg-gray-300 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={user.photoURL} alt="Shoes" className="rounded-xl md:h-[400px] md:w-[450px]" />
                </figure>
                <div className="card-body items-center text-center">

                    <h2 className="card-title">Name:{user.displayName}</h2>
                    <p>Email:{user.email}</p>
                    <p>User Id:{user.uid}</p>
                    
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn">
                        Update
                    </button>
                </form>
            </div>
            </div>
        </div>
    );
};

export default Profile;