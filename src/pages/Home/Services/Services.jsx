import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import fast from '../../../assets/fast.png'
import live from '../../../assets/live2.jpg'
const Services = () => {
    return (
        <div className="max-w-7xl mx-auto pb-5">
            <div className="mx-auto text-center md:w-4/12 my-8">
                <p className="text-gray-600 mb-2 text-3xl"><i>---Our Features Section---</i></p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
                <div className="card mx-auto mt-4 bg-base-100 shadow-2xl">
                    <figure className="px-1 pt-3">
<AiTwotoneSafetyCertificate className="rounded-xl h-[200px] w-[400px]"></AiTwotoneSafetyCertificate>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold mx-auto"> Secure Shipments</h2>
                        <p className="font-semibold">Rest easy knowing that your parcels are in safe hands. Our robust security measures ensure the protection of your shipments throughout the entire delivery process.</p>
                      
                    </div>
                    
                </div>
                <div className="card mx-auto mt-4 bg-base-100 shadow-2xl">
                    <figure className="px-1 pt-3">
<img src={fast} className="rounded-xl md:h-[200px] md:w-[400px]" alt="" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold mx-auto">Express Delivery</h2>
                        <p className="font-semibold">Experience the speed of SwiftParcelHub! We prioritize efficiency to ensure your parcels reach their destination swiftly. Choose us for express deliveries that match your pace.</p>
                      
                    </div>
                    
                </div>
                <div className="card mx-auto mt-4 bg-base-100 shadow-2xl">
                    <figure className="px-1 pt-3">
                    <img src={live} className="rounded-xl md:h-[200px] md:w-[400px]" alt="" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold mx-auto">Live Parcel Updates</h2>
                        <p className="font-semibold">Stay in the loop with real-time tracking. Know exactly where your parcel is on its journey, from pickup to delivery. Our advanced tracking system keeps you informed every step of the way.</p>
                      
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Services;