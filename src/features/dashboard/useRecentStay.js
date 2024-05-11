import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

const useRecentStay = () => {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.get('last') || 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: stays, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', `last-${numDays}`],
  });
  const confirmedStays = stays?.filter(
    (item) => item.status === 'checked-in' || item.status === 'checkout'
  );
  return { stays, isLoading, confirmedStays };
};

export default useRecentStay;
