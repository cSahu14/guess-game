import React from 'react';

const Probability = ({ probability }: { probability: number }) => {
  console.log(probability);
  return (
    <div className='bg-white rounded-xl shadow-sm overflow-hidden p-1'>
      <div className='relative h-6 flex items-center justify-center'>
        <div
          className={`absolute top-0 bottom-0 left-0 rounded-lg w-[${probability}%] bg-green-200`}
        ></div>
        <div className='relative text-green-900 font-medium text-sm'>
          {probability}
        </div>
      </div>
    </div>
  );
};

export default Probability;
