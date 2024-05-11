import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings';

const useTodayActivate = () => {
  const { data: activities, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['today-activate'],
  });
  return { activities, isLoading };
};

export default useTodayActivate;
