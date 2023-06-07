import React, { useEffect, useState } from 'react';

const TopInstructors = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch('/Instructors.json')
        .then(res => res.json())
        .then(data => {
           setInstructors(data);
           console.log(data);
        })
    },[])


    return (
        <section className=" body-font my-24 max-w-[1300px] mx-auto">
        <h3 className='text-center mb-10 font-semibold text-5xl'>Popular Instructors</h3>
        <div className='grid gap-6 mb-8 lg:grid-cols-3 sm:grid-cols-1'>
       {
        instructors.map((instructor, index) =>  <div key={index} className='overflow-hidden relative transition duration-200 transform hover:-translate-y-2 rounded shadow-lg hover:shadow-2xl'>
        

        <img
             src="https://img.freepik.com/free-photo/students-knowing-right-answer_329181-14271.jpg?w=996&t=st=1686075212~exp=1686075812~hmac=4f9c421de4b0a4adb2c6e818cb0c1a461a5d5a025e3d9f2afceae4dbe4ee14fb"
             alt='book cover'
             className='object-cover w-full '
             style={{height: "430px"}}
           />
           <div className='bg-black h-full px-6 py-12 bg-opacity-80 opacity-0 hover:opacity-100 text-white absolute inset-0 transition-opacity duration-200 flex flex-col'>
             <span className='font-semibold text-3xl'>Nasim</span>
             <br />
             <p className='tetx-xl'>Email: <span className='font-semibold text-xl'>nasim2gmail.com</span></p>
             
           
           </div>
         </div> )
       }
        </div>
         </ section >
    );
};

export default TopInstructors;