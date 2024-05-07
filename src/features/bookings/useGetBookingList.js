import { useQuery } from '@tanstack/react-query';
import { getListBookings } from '../../services/apiBookings';

const useGetBookingList = () => {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => getListBookings(),
  });
  return { bookings, isLoading };
};

export default useGetBookingList;
