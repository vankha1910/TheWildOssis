import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreatingCabin } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      toast.success('Created cabin successfully');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err),
  });
  return { createCabin, isCreatingCabin };
};
