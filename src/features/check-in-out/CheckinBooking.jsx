import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Checkbox from '../../ui/Checkbox';
import { useMoveBack } from '../../hooks/useMoveBack';
import useGetBookingDetail from '../bookings/useGetBookingDetail';
import Spinner from '../../ui/Spinner';
import useGetListSetting from '../settings/useGetListSetting';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import useCheckin from './useCheckin';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [isConfirmPaid, setIsConfirmPaid] = useState(false);
  const [isAddBreakfast, setIsAddBreakfast] = useState(false);
  const { booking, isLoading } = useGetBookingDetail();
  const { settings, isLoading: isLoadingSetting } = useGetListSetting();
  const { checkin, isChecking } = useCheckin();
  const moveBack = useMoveBack();

  const {
    id: bookingId,
    guests,
    total_price: totalPrice,
    num_guests: numGuests,
    has_breakfast: hasBreakfast,
    num_nights: numNights,
    is_paid: isPaid,
  } = booking || {};
  useEffect(() => {
    if (isPaid) {
      setIsConfirmPaid(true);
    }
  }, [isPaid]);
  if (isLoading || isChecking) return <Spinner></Spinner>;

  const totalBreakfastPrice = settings?.breakfast_price * numNights * numGuests;
  function handleCheckin() {
    if (isAddBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          has_breakfast: true,
          extra_price: totalBreakfastPrice,
          total_price: totalPrice + totalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            id='add_breakfast'
            checked={isAddBreakfast}
            onChange={() => {
              setIsAddBreakfast(!isAddBreakfast);
              setIsConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(totalBreakfastPrice)} ?
          </Checkbox>
        </Box>
      )}
      {
        <Box>
          <Checkbox
            id='confirm'
            checked={isConfirmPaid}
            onChange={() => {
              setIsConfirmPaid(!isConfirmPaid);
            }}
          >
            I confirm that {guests?.full_name} has paid the total amount of{' '}
            {!isAddBreakfast
              ? formatCurrency(totalPrice)
              : `${formatCurrency(
                  totalPrice + totalBreakfastPrice
                )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                  totalBreakfastPrice
                )})`}
          </Checkbox>
        </Box>
      }
      <ButtonGroup>
        <Button disabled={!isConfirmPaid} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
