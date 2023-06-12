import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useSelected from '../../../../hooks/useSelected';

const MySelectedClass = () => {
 const [selected, refetch] = useSelected()

  const handleDelete = (selectOne) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://teaching-server.vercel.app/selected/${selectOne._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Class has been deleted.", "success");
            }
          });
      }
    });
  };




    return (
        <div className="w-full px-10  my-16">
      <h3 className="text-3xl ms-2 my-3 font-bold">
        Total Selected Class: {selected.length}
      </h3>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white'>
            <tr>
              <th className="text-xl font-semibold">#</th>
              <th className="text-xl font-semibold">Image</th>
              <th className="text-xl font-semibold">Class Name</th>
              <th className="text-xl font-semibold">Available Seat</th>
              <th className="text-xl font-semibold">Enrolled</th>
              <th className="text-xl font-semibold">Price</th>
              <th className="text-xl font-semibold">Pay</th>
              <th className="text-xl font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {selected.map((selectOne, index) => (
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
                <td className='text-lg'>{selectOne.availableSeats}</td>
                <td className='text-lg'>{selectOne.enrolled}</td>
                <td className='text-lg'>${selectOne.price}</td>
                <td>
               <Link to={`/dashboard/payment/${selectOne._id}`}> <button className="btn btn-sm bg-purple-500 text-white">Pay</button></Link>
                  </td>
                <td>
                    <button
                      onClick={() => handleDelete(selectOne)}
                      className="btn btn-ghost bg-red-600  text-white"
                    >
                      <FaTrashAlt />
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

export default MySelectedClass;