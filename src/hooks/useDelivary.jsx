
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useDelivary = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isDelivary, isPending: isDelivaryLoading } = useQuery({
        queryKey: [user?.email, 'isDelivary'],
        enabled: !loading,
        queryFn: async () => {
            console.log('asking or checking is admin', user)
            const res = await axiosSecure.get(`/users/delivary/${user.email}`);
            console.log(res.data);
            return res.data?.delivary;
        }
    })
    return [isDelivary, isDelivaryLoading]
};

export default useDelivary;