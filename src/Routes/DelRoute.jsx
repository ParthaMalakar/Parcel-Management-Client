import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useDelivary from "../hooks/useDelivary";




const DelRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isDelivary, isDelivaryLoading] = useDelivary();
    const location = useLocation();

    if (loading || isDelivaryLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isDelivary) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default DelRoute;