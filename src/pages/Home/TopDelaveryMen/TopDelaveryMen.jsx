import  { useEffect, useState } from 'react';
import Details from './Details';

const TopDelaveryMen = () => {
    const [man, setMan] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/topdelavery')
            .then(res => res.json())
            .then(data => setMan(data))
    }, [])
 console.log(man)
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-5 max-w-7xl mx-auto'>
                {
                    man?.map(one =><Details key={one._id} one={one}></Details>)
                }
            </div>
        </div>
    );
};

export default TopDelaveryMen;