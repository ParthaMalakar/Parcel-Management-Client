import React from 'react';
import Banner from './Banner/Banner';
import Services from './Services/Services';
import Usage from './Usage/Usage';
import TopDelaveryMen from './TopDelaveryMen/TopDelaveryMen';

const Home = () => {
    return (
        <div className='bg-base-200'>
            <Banner></Banner>
            <Services></Services>
            <div className="mx-auto text-center md:w-4/12 my-8">
                <p className="text-gray-600 mb-2 text-3xl"><i>---Statistics of  app usage---</i></p>
            </div>
            <Usage></Usage>
            <div className="mx-auto text-center md:w-4/12 my-8">
                <p className="text-gray-600 mb-2 text-3xl"><i>---The Top Delivery Man---</i></p>
            </div>
            <TopDelaveryMen></TopDelaveryMen>
        </div>
    );
};

export default Home;