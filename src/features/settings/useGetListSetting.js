import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getSettings } from '../../services/apiSettings';

const useGetListSetting = () => {
  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });
  return { settings, isLoading };
};

export default useGetListSetting;
