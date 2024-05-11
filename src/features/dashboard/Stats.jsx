import React from 'react';
import useRecentBooking from './useRecentBooking';
import Stat from './Stat';
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';
import { useSearchParams } from 'react-router-dom';
const Stats = ({ booking, confirmedStay, cabinCount }) => {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get('last') || 7;
  // Bookings
  const numBookings = booking?.length;

  // Sales
  const sales = booking?.reduce((prev, cur) => prev + cur?.total_price, 0);

  // Check ins
  const checkedIn = confirmedStay?.length;

  // Occupancy rate
  const rate =
    confirmedStay?.reduce((prev, cur) => prev + cur.num_nights, 0) /
    (numDays * cabinCount);
  return (
    <>
      <Stat
        title='Booking'
        icon={<HiOutlineBriefcase />}
        color='blue'
        value={numBookings}
      />
      <Stat
        title='Sales'
        icon={<HiOutlineBanknotes />}
        color='green'
        value={formatCurrency(sales)}
      />{' '}
      <Stat
        title='Check in'
        icon={<HiOutlineCalendarDays />}
        color='indigo  '
        value={checkedIn}
      />{' '}
      <Stat
        title='Occupancy rate'
        icon={<HiOutlineChartBar />}
        color='yellow'
        value={`${Math.round(rate * 100)}` + ' %'}
      />
    </>
  );
};

export default Stats;
