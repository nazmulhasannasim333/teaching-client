import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../provider/AuthProvider';

const PaymentHistory = () => {
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
       Total Payment History: {payment.length}
      </h3>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead className='bg-gradient-to-r from-cyan-500 to-purple-500 text-white'>
            <tr>
              <th className="text-xl font-semibold">#</th>
              <th className="text-xl font-semibold">Customer Name</th>
              <th className="text-xl font-semibold">Customer Email</th>
              <th className="text-xl font-semibold">Transaction ID</th>
              <th className="text-xl font-semibold">Time</th>
              <th className="text-xl font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payment.map((selectOne, index) => (
              <tr key={index}>
                <th>{index +1}</th>
                <td className="font-semibold text-lg">{selectOne.name}</td>
                <td className='text-lg'>{selectOne.email}</td>
                <td className='text-lg'>{selectOne.transactionId}</td>
                <td className='text-lg'>{selectOne.date}</td>
                <td className='text-lg text-end'>${selectOne.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default PaymentHistory;