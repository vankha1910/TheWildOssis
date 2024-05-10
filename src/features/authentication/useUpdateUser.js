import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { updateUserInfor } from '../../services/apiAuth';
import toast from 'react-hot-toast';

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: updateUserInfor,
    onSuccess: (data) => {
      toast.success('Updated user information successfully');
      queryClient.invalidateQueries(['user', data?.user]);
    },
    onErrorl: (error) => {
      toast.error('Updated fail');
    },
  });

  return { updateUser, isLoading };
};

export default useUpdateUser;
