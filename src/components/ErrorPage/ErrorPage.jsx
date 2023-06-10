import React from 'react';
import { FaRegGrinAlt } from "react-icons/fa";
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const { error, status } = useRouteError()
  return (
    <div className='flex items-center p-16 bg-gray-100'>
      <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
        <img className='h-52 w-96 my-12' src="https://atlassianblog.wpengine.com/wp-content/uploads/2017/12/44-incredible-404-error-pages@3x-1560x760.png" alt="" />
        <FaRegGrinAlt className='w-40 h-40 text-purple-500' />
        <div className='max-w-md text-center'>
          <h2 className='mb-8 font-extrabold text-9xl text-purple-500'>
            <span className='pe-5'>Error</span>
            {status || 404}
          </h2>
          <p className='text-2xl font-semibold md:text-3xl text-red-800 mb-8'>
            {error?.message}
          </p>
          <Link to='/' className='btn bg-black text-white'>
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage;
