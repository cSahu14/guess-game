import React from 'react';
import { CgProfile } from 'react-icons/cg';
import Probability from './Probability';

const Details = ({
  age,
  gender,
  country,
  genderProbability,
  countryProbability,
}: {
  age: number;
  gender: string;
  country: string;
  genderProbability: number;
  countryProbability: number;
}) => {
  return (
    <div className='relative flex items-center flex-col mt-3 border-black w-96 p-4 border-2 detail-div'>
      <div className='flex justify-start w-full gap-2'>
        <CgProfile className='text-xl' />
        <span className='text-sm text-black font-semibold'>Details -</span>
      </div>
      <div className='flex flex-col justify-start w-full gap-2 mt-3'>
        <h6 className='block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
          Age - {age}
        </h6>
        <h6 className='block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
          Gender - {gender}
        </h6>
        {/* <Probability probability={genderProbability} /> */}
        <h6 className='block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
          Country - {country}
        </h6>
        {/* <Probability probability={countryProbability} /> */}
      </div>
    </div>
  );
};

export default Details;
