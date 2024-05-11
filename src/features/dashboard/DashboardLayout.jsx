import styled from 'styled-components';
import Stats from './Stats';
import useRecentBooking from './useRecentBooking';
import useRecentStay from './useRecentStay';
import useCabin from '../cabins/useCabin';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
const DashboardLayout = () => {
  const { bookings, isLoading: isLoadingBooking } = useRecentBooking();
  const { stays, confirmedStays, isLoading: isLoadingStays } = useRecentStay();
  const { cabins } = useCabin();

  return (
    <StyledDashboardLayout>
      <Stats
        booking={bookings}
        confirmedStay={confirmedStays}
        cabinCount={cabins?.length}
      />
      <TodayActivity></TodayActivity>
      <DurationChart confirmedStays={confirmedStays}></DurationChart>
      <SalesChart bookings={bookings}></SalesChart>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
