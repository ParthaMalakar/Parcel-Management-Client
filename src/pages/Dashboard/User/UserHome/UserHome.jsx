import React, { useContext } from 'react';
import { AuthContext } from '../../../../provider/Authprovider';

const UserHome = () => {
    const {user}=useContext(AuthContext);
    return (

        <div className="container mx-auto my-8 bg-slate-400 p-32">
          <h2 className="text-3xl font-bold mb-4">Welcome, {user.displayName}!</h2>
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* User Information */}
            <div className="bg-white p-4 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-2">User Information</h3>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              {/* Add more user information as needed */}
            </div>
    
            {/* Recent Activities */}
            <div className="bg-white p-4 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-2">Recent Activities</h3>
              {/* Display recent activities here */}
            </div>
    
            
          </div>
        </div>
      );
    
};

export default UserHome;