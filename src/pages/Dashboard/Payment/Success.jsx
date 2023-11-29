import React from 'react';
import Confetti from 'react-confetti';

const Success = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold'>Payment Successful!</h2>
      {/* Add any other success message or details here */}
      <Confetti width={800} height={600} />
    </div>
  );
};

export default Success;
