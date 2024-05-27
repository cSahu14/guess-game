'use client';
import Details from '@/components/Details';
import Loading from '@/components/Loading';
import React, { useRef, useState } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import { CiRuler } from 'react-icons/ci';
import { FaBars } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';
import { LuLoader2 } from 'react-icons/lu';

export default function Home() {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [genderProbability, setGenderProbability] = useState(0);
  const [countryProbability, setCountryProbability] = useState(0);
  // const userInput = useRef<HTMLInputElement | null>(null);
  const handleSubmitName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setError('Please enter name!');
      return;
    }
    setLoading(true);
    // fetch 3 apis
    try {
      const promises = [
        fetch(`https://api.agify.io?name=${username}`, {
          cache: 'no-store',
        }).then((res) => res.json()),
        fetch(`https://api.genderize.io?name=${username}`, {
          cache: 'no-store',
        }).then((res) => res.json()),
        fetch(`https://api.nationalize.io?name=${username}`, {
          cache: 'no-store',
        }).then((res) => res.json()),
      ];

      // Wait for all the promises to resolve and get the data
      (await Promise.all(promises)).map((p) => {
        // Set error
        if (!p?.age || !p?.gender || !p?.country[0]) {
          setError('Error while fetching data.');
        }
        if (p?.age) {
          setAge(p?.age);
        } else if (p?.gender) {
          setGender(p?.gender);
          let probable = Math.trunc(p?.probability * 100);
          setGenderProbability(probable);
        } else if (p?.country) {
          setCountry(p?.country[0]?.country_id);
          let probable = Math.trunc(p?.country[0]?.probability * 100);
          setCountryProbability(probable);
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
    <section className='h-screen flex items-center flex-col p-4'>
      <h4 className='text-3xl'>Guessing Game!</h4>
      {/* form submit */}
      <form onSubmit={handleSubmitName} className='mt-8 flex'>
        <div className='mr-2'>
          <input
            className='inputStyle'
            id='username'
            type='text'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <button className='button-style'>Submit</button>
        </div>
      </form>

      <div className='mt-4'>
        {loading ? (
          // Use skeleton for loading state
          <LuLoader2 className='animate-spin text-4xl mt-3' />
        ) : // Check if age, gender and country is not empty
        age && gender && country ? (
          <Details
            age={age}
            gender={gender}
            country={country}
            genderProbability={genderProbability}
            countryProbability={countryProbability}
          />
        ) : (
          <div>{error}</div>
        )}
      </div>
    </section>
  );
}
