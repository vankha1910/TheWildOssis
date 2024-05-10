import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      console.error(error.message);
      toast.error(`Email or password are incorrect`);
    },
  });
  return { login, isLoading };
};

export default useLogin;
