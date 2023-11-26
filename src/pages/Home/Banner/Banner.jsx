import banner from '../../../assets/banner.jpg'

import { Link } from 'react-router-dom';
const Banner = () => {
    return (
        <div>

            <div id="item1" className="carousel-item w-full">
                <div className="hero max-w-full mx-auto" style={{

                    background: 'rgba(255, 255, 255, 0.7)',

                    backgroundImage: `url(${banner})`,

                    backgroundSize: 'cover',

                    backgroundPosition: 'center',
                    backgroundAttachment:'fixed',

                    backgroundRepeat: 'no-repeat',

                    width: '100%',

                    height: '610px',

                }}>
                    <div className="hero-overlay bg-opacity-75"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="">
                            <h1 className="mb-5 text-white text-3xl font-bold w-96 md:w-[550px] ">Effortless Parcel Management,
                                Swift Deliveries at Your Fingertips!</h1>
                            <div className="mt-10">
                                <input type="text" className="border-solid border-2 border-[#DEDEDE] bg-[#FFF] py-2 pl-1 w-80" name="text" placeholder="Search our service here...." />
                                <button className="bg-[#FF444A] text-[#FFF] py-[9px] px-7">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Banner;