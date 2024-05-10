import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
const useCheckout = () => {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading } = useMutation({
    mutationFn: (id) =>
      updateBooking(id, {
        status: 'checked-out',
      }),
    onSuccess: (data) => {
      toast.success(`Checked out booking #${data.id} successfully`);
      queryClient.invalidateQueries({ active: true });
    },
  });
  return { checkout, isLoading };
};

export default useCheckout;
