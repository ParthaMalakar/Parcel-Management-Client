import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import CountUp from 'react-countup';
const Usage = () => {
    const [count, setCount] = useState(0)
    const [Man, setMen] = useState(0)
    const [countdelavery, setCountdelavery] = useState(0)
    useEffect(() => {
        fetch('http://localhost:5000/usercount')
            .then(res => res.json())
            .then(data => setCount(data.count))
    }, [])
    useEffect(() => {
        fetch('http://localhost:5000/parcelCount')
            .then(res => res.json())
            .then(data => setCountdelavery(data.count))
    }, [])
    useEffect(() => {
        fetch('http://localhost:5000/all/men')
            .then(res => res.json())
            .then(data => setMen(data.man))
    }, [])
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-3'>
            <div className='p-8 bg-red-300 font-bold text-xl'>
              <h1>Number of Parcel Booked :
              <CountUp end={countdelavery} duration={2} />
                </h1>
            </div>
            <div className='p-8 bg-red-300 font-bold text-xl'>
                <h1>Number of Parcel Delivered:
                <CountUp end={Man} duration={2} />
                    </h1>
            </div>
            <div className='p-8 bg-red-300 font-bold text-xl'>
                <h2>Number of People Using Your App:
                <CountUp end={count} duration={2} />
                     </h2>
            </div>
        </div>
    );
};

export default Usage;