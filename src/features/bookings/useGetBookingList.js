import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getListBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/contants';

const useGetBookingList = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  console.log(searchParams);

  //Get filter from Url
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  // Get sort from url
  const sortValue = searchParams.get('sortBy') || 'start_date-desc';
  const [field, direction] = sortValue?.split('-');
  const sort = { field, direction };

  // Get current page
  const currentPage = Number(searchParams.get('page')) || 1;

  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryKey: ['bookings', filter, sort, currentPage],
    queryFn: () => getListBookings({ filter, sort, currentPage }),
  });
  console.log(bookings);

  // Handle pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sort, currentPage + 1],
      queryFn: () =>
        getListBookings({ filter, sort, currentPage: currentPage + 1 }),
    });
  }
  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sort, currentPage - 1],
      queryFn: () =>
        getListBookings({ filter, sort, currentPage: currentPage - 1 }),
    });
  }
  return { bookings, isLoading, count };
};

export default useGetBookingList;
