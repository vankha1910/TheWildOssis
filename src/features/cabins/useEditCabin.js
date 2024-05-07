import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditingCabin } = useMutation({
    mutationFn: ({ cabinData, id }) => editCabinApi(cabinData, id),
    onSuccess: () => {
      toast.success('Updated cabin successfully');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => {
      toast.err(err.message);
    },
  });

  return { editCabin, isEditingCabin };
};

export default useEditCabin;
