
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(location?.state ? location.state : '/');
    }
    return (
        <div>
            
            <div className="max-w-5xl mx-auto bg-[#009CDB26]">
                <div className='flex justify-center'>
                <img className='' src="https://i.ibb.co/Px3jF6Q/1163282-ORHG1-B0.jpg" alt="" />

                </div>
                <div className="mt-2 text-xs max-w-lg mx-auto text-white border-solid border-2 border-indigo-600 bg-slate-500">
                   
                    <p>Some Things went worng</p>
                    <p>Check the internet connection and Route</p>
                </div>
                <div className='text-center max-w-7xl '>
                        <button onClick={handleBack} className='btn btn-neutral'>Back</button>
                    </div>
            </div>
        </div>
    );
};

export default ErrorPage;