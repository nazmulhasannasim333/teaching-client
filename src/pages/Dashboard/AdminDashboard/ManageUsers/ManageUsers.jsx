import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get(`/users`);
    return res.data;
  });

  // handle make admin
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to update role for ${user.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              refetch();
              Swal.fire("Admin!", "User role has been updated.", "success");
            }
          });
      }
    });
  };

  // handle make nstructor
  const handleMakeInstructor = (user) => {
    fetch(`http://localhost:5000/users/instructor/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Now you are our instructor",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };



  return (
    <div className="w-full px-10  my-16">
      <h3 className="text-3xl ms-2 my-3 font-bold">
        Total Users: {users.length}
      </h3>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
            <tr>
              <th className="text-xl font-semibold">#</th>
              <th className="text-xl font-semibold">Image</th>
              <th className="text-xl font-semibold">Name</th>
              <th className="text-xl font-semibold">Email</th>
              <th className="text-xl font-semibold">Role</th>
              <th className="text-xl font-semibold">Action</th>
              <th className="text-xl font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.photo} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-semibold text-md">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="bg-green-500 py-2 px-3 text-white rounded-md">
                      Admin
                    </span>
                  ) : user.role === "instructor" ? (
                    <span className="bg-purple-500 py-2 px-3 text-white rounded-md">
                      Instructor
                    </span>
                  ) : (
                    <span className="">Student</span>
                  )}
                </td>
                <td>
                  <button
                    disabled={
                       user.role === "instructor"
                    }
                    onClick={() => handleMakeInstructor(user)}
                    className="btn btn-ghost btn-xs"
                  >
                    Make Instructor
                  </button>
                </td>
                <td>
                  <button
                    disabled={
                      user.role === "admin" 
                    }
                    onClick={() => handleMakeAdmin(user)}
                    className="btn btn-ghost btn-xs"
                  >
                    Make Admin
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

export default ManageUsers;
