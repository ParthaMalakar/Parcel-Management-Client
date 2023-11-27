import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUser = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isUser, isPending: isUserLoading } = useQuery({
        queryKey: [user?.email, 'isUser'],
        enabled: !loading,
        queryFn: async () => {
            console.log('asking or checking is user', user)
            const res = await axiosSecure.get(`/users/user/${user.email}`);
            console.log(res.data);
            return res.data?.usera;
        }
    })
    return [isUser, isUserLoading]
};

export default useUser;