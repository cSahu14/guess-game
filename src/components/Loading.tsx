import React from 'react';

const Loading = () => {
  return (
    <div className='border border-gray-300 shadow-md rounded-xl p-4 max-w-sm w-full mx-auto mt-6 bg-white'>
      <div className='animate-pulse flex space-x-4'>
        <div className='flex-1 space-y-4 py-7'>
          <div className='space-y-2 flex flex-col items-center'>
            <div className='h-4 bg-gray-400 rounded w-3/6'></div>
            <div className='h-4 bg-gray-400 rounded w-3/6'></div>
            <div className='h-4 bg-gray-400 rounded w-3/6'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
