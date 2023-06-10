import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';


const useClasses = () => {
    const {user, loading} = useContext(AuthContext);
    // const token = localStorage.getItem('access_token')
    const [axiosSecure] = useAxiosSecure()

    const { refetch, data: classes=[] } = useQuery({
        queryKey: ['classes', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure(`/classes/${user?.email}`)
            return response.data;
          },
      })

return [classes, refetch];
}

export default useClasses;