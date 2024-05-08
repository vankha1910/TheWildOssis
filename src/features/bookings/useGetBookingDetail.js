import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

const useGetBookingDetail = () => {
  const { bookingId } = useParams();
  const { data: booking, isLoading } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
  });
  return { booking, isLoading };
};

export default useGetBookingDetail;
