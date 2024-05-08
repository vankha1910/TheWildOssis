import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { updateSettingApi } from '../../services/apiSettings';
import toast from 'react-hot-toast';

const useUpdateSetting = () => {
  const clientQuery = useQueryClient();
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Updated successfully');
      clientQuery.invalidateQueries({
        queryKey: ['settings'],
      });
    },
  });
  return { updateSetting, isUpdating };
};

export default useUpdateSetting;
