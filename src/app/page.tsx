'use client';
import Loading from '@/components/Loading';
import React, { useRef, useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // const userInput = useRef<HTMLInputElement | null>(null);
  const handleSubmitName = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // fetch 3 apis
    try {
      const promises = [
        fetch(`https://api.agify.io?name=${username}`, {
          cache: 'no-store',
        })
          .then((res) => {
            res.json();
          })
          .catch((err) => console.log('err', err)),
        fetch(`https://api.genderize.io?name=${username}`, {
          cache: 'no-store',
        })
          .then((res) => res.json())
          .catch((err) => console.log('err')),
        fetch(`https://api.nationalize.io?name=${username}`, {
          cache: 'no-store',
        })
          .then((res) => res.json())
          .catch((err) => console.log('err')),
      ];

      // Wait for all the promises to resolve and get the data
      (await Promise.all(promises)).map((p) => {
        // Set error
        if (!p.age || !p.gender || !p.country[0]) {
          setError('Error while fetching data.');
        }
        if (p.age) {
          setAge(p?.age);
        } else if (p.gender) {
          setGender(p?.gender);
        } else if (p.country) {
          setCountry(p.country[0].country_id);
        }
        setLoading(false);
      });
    } catch (error) {
      console.log('error', error);
      // Set error
      setLoading(false);
      setError('Error while fetching data.');
      throw new Error('Error while fetching data.');
    }
  };
  return (
    <section className='h-screen flex items-center flex-col'>
      {/* form submit */}
      <form onSubmit={handleSubmitName} className='mt-8 flex'>
        <div className='mr-2'>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='username'
            type='text'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Submit
          </button>
        </div>
      </form>

      {loading ? (
        // Use skeleton for loading state
        <Loading />
      ) : // Check if age, gender and country is not empty
      age && gender && country ? (
        <div className='relative flex items-center flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96'>
          <div className='p-6'>
            <h5 className='block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
              Age - {age}
            </h5>
            <h5 className='block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
              Gender - {gender}
            </h5>
            <h5 className='block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
              Country - {country}
            </h5>
          </div>
        </div>
      ) : (
        <div>{error}</div>
      )}
    </section>
  );
}
