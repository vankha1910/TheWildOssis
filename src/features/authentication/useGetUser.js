import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getUserApi } from '../../services/apiAuth';

const useGetUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUserApi,
  });
  return { user, isLoading };
};

export default useGetUser;
