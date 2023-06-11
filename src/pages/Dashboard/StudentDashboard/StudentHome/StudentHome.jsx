import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useSelected from '../../../../hooks/useSelected';
import { AuthContext } from '../../../../provider/AuthProvider';

const StudentHome = () => {
    const [selected, refetch] = useSelected()
    const [axiosSecure] = useAxiosSecure()
    const {user, loading} = useContext(AuthContext)

    const { data: enrolled=[]  } = useQuery({
        queryKey: ['enrolled', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure(`/payment?email=${user?.email}`)
            return response.data;
          },
      })

      const totalPayment = enrolled?.reduce(
        (total, payment) => total + payment.price,
        0
      );

    return (
        <div className='w-full my-12'>
           <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
        <div className="relative  bg-blueGray-100 w-full">
          <div className="relative  pb-32 bg-lightBlue-500">
            <div className="px-4 md:px-6 mx-auto w-full">
              <div>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-4/12 px-4 ">
                    <div className="relative flex flex-col py-5 min-w-0 break-words  bg-gradient-to-r from-indigo-500 via-purple-500  text-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                      <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                              Selected Classes
                            </h5>
                            <span className="font-bold text-3xl">{selected.length}</span>
                          </div>
                          <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-green-500">
                              <i className="far fa-chart-bar" />
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-blueGray-500 mt-4">
                          <span className="text-amber-400 font-semibold mr-2">
                            <i className="fas fa-arrow-up" /> 3.48%
                          </span>
                          <span className="whitespace-nowrap">
                            Since last month
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% py-5 to-90% text-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                      <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                              Enrolled Classes
                            </h5>
                            <span className="font-bold text-3xl">{enrolled.length}</span>
                          </div>
                          <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                              <i className="fas fa-chart-pie" />
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-blueGray-500 mt-4">
                          <span className="text-green-500 mr-2 font-semibold">
                            <i className="fas fa-arrow-down" /> 3.48%
                          </span>
                          <span className="whitespace-nowrap">
                            Since last month
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-gradient-to-r from-blue-500 py-5 text-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                      <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                             Total Payment
                            </h5>
                            <span className="font-bold text-3xl">{totalPayment}</span>
                          </div>
                          <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                              <i className="fas fa-users" />
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-blueGray-500 mt-4">
                          <span className="text-lime-400 font-semibold mr-2">
                            <i className="fas fa-arrow-down" /> 1.10%
                          </span>
                          <span className="whitespace-nowrap">
                            Since last month
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 md:px-6 mx-auto w-full -mt-24">
            <div className="flex flex-wrap">
              <div className="w-full xl:w-8/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded-lg bg-white text-blueGray-700">
                  <div className="px-6 py-4 border-0">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full max-w-full flex-grow flex-1">
                        <h3 className="font-bold text-lg text-blueGray-700">
                         Latest Enrolled History
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                      <thead>
                        <tr>
                          <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                            Class Name
                          </th>
                          <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                           Instructor Name
                          </th>
                          <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                            Price
                          </th>
                          <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                            enrolled.map(enroll => <tr key={enroll._id}>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <div className="flex items-center">
                                    <span className="ml-3 font-bold NaN">
                                      {enroll.className}
                                    </span>
                                  </div>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <div className="flex items-center">{enroll.instructorName}</div>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <div className="flex items-center">${enroll.price}</div>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <div className="flex items-center text-green-500">
                                    Paid
                                  </div>
                                </td>
                              </tr>)
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="w-full xl:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded-lg bg-white text-blueGray-700">
                  <div className="px-6 py-4 border-0">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full max-w-full flex-grow flex-1">
                        <h3 className="font-bold text-lg text-blueGray-700">
                          Latest Payment History
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                      <thead>
                        <tr>
                          <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                            Payment Method
                          </th>
                          <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                            Date / Time
                          </th>
                          <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200" >
                            Price</ th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                            enrolled.map(enroll => <tr key={enroll._id}>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <div className="flex items-center">
                                    <span className="ml-3 font-bold NaN">
                                      Stripe
                                    </span>
                                  </div>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <div className="flex items-center">{enroll.date}</div>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 min-w-140-px">
                                  <div className="flex items-center">
                                    <span className="mr-2">${enroll.price}</span>
                                    <div className="relative w-full">
                                     
                                    </div>
                                  </div>
                                </td>
                              </tr>)
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <footer className="block py-4">
              <div className="container mx-auto px-4">
                <hr className="mb-4 border-b-1 border-blueGray-200" />
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                  <div className="w-full md:w-4/12 px-4">
                    <div className="text-center mb-2 md:text-left md:mb-0">
                      <a
                        href="https://www.creative-tim.com/?ref=npr-footeradmin"
                        className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left"
                      >
                        Copyright © 2023 Teaching.Ing
                      </a>
                    </div>
                  </div>
                  <div className="w-full md:w-8/12 px-4">
                    <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                      <li>
                        <a
                          href="https://www.creative-tim.com?ref=npr-footeradmin"
                          className="text-blueGray-700 hover:text-blueGray-900 text-sm font-semibold block py-1 px-3"
                        >
                          Teaching Team
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.creative-tim.com/presentation?ref=npr-footeradmin"
                          className="text-blueGray-700 hover:text-blueGray-900 text-sm font-semibold block py-1 px-3"
                        >
                          About Us
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.creative-tim.com/blog/?ref=npr-footeradmin"
                          className="text-blueGray-700 hover:text-blueGray-900 text-sm font-semibold block py-1 px-3"
                        >
                          Blog
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.creative-tim.com/license?ref=npr-footeradmin"
                          className="text-blueGray-700 hover:text-blueGray-900 text-sm font-semibold block py-1 px-3"
                        >
                          Licenses
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
        </div>
    );
};

export default StudentHome;