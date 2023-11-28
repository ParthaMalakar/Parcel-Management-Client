
const Review = ({REVIEW}) => {
    const{name,photo,ratting,feedback}=REVIEW;
    console.log(REVIEW)
    return (
        <div>
            <div className="card mx-auto mt-4 bg-base-100 shadow-xl">
                <figure className="px-1 pt-3">
                    <img src={photo} alt="Shoes" className="rounded-xl md:h-[200px] md:w-[400px]" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-lg font-semibold mx-auto">Review giver’s name:
                    {name}</h2>
                    <p className="font-semibold">Rating out of 5:{ratting}</p>
                    <p className="font-semibold">Feedback Text:{feedback}$</p>
                    <div className="card-actions ">

                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;