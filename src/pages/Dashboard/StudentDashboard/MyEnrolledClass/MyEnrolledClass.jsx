import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import React, { useContext } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../provider/AuthProvider';

const MyEnrolledClass = () => {
const {user, loading} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()

    const { data: payment=[], refetch  } = useQuery({
        queryKey: ['payment', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure(`/payment?email=${user?.email}`)
            return response.data;
          },
      })

    return (
        <div className="w-full px-10  my-16">
      <h3 className="text-3xl ms-2 my-3 font-bold">
        Total Enrolled Class: {payment.length}
      </h3>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead className='bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500 text-white'>
            <tr>
              <th className="text-xl font-semibold">#</th>
              <th className="text-xl font-semibold">Image</th>
              <th className="text-xl font-semibold">Class Name</th>
              <th className="text-xl font-semibold">Instructor name</th>
              <th className="text-xl font-semibold">Enrolled Date</th>
              <th className="text-xl font-semibold">Price</th>
              <th className="text-xl font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payment.map((selectOne, index) => (
              <tr key={index}>
                <th>{index +1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={selectOne.classImage} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-semibold text-lg">{selectOne.className}</td>
                <td className='text-lg'>{selectOne.instructorName}</td>
                <td className='text-lg'>{moment(selectOne.date).format('MMMM Do YYYY, h:mm')}</td>
                <td className='text-lg'>${selectOne.price}</td>
                <td>
                <button
                className="btn btn-sm bg-green-300"
              >
                Paid
              </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default MyEnrolledClass;