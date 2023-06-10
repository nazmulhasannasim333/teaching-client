import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';


const useSelected = () => {
    const {user, loading} = useContext(AuthContext);
    // const token = localStorage.getItem('access_token')
    const [axiosSecure] = useAxiosSecure()

    const { data: selected=[], refetch  } = useQuery({
        queryKey: ['classes', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure(`/selected/${user?.email}`)
            return response.data;
          },
      })

return [selected, refetch];
}

export default useSelected;