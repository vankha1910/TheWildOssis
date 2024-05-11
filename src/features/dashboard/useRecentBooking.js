import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../../services/apiBookings';

const useRecentBooking = () => {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.get('last') || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ['bookings', `last-${numDays}`],
  });
  return { bookings, isLoading };
};

export default useRecentBooking;
