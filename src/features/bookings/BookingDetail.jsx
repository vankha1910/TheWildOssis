import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useMoveBack } from '../../hooks/useMoveBack';
import useGetBookingDetail from './useGetBookingDetail';
import Spinner from '../../ui/Spinner';
import useCheckout from '../check-in-out/useCheckout';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading } = useGetBookingDetail();
  const { checkout } = useCheckout();
  // const { status, id: bookingId } = booking;
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const handleDelete = () => {};
  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{booking?.id}</Heading>
          <Tag type={statusToTagName[booking?.status]}>
            {booking?.status?.replace('-', ' ')}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking?.status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${booking.id}`)}>
            Check in
          </Button>
        )}
        {booking?.status === 'checked-in' && (
          <Button onClick={() => checkout(booking?.id)}>Check out</Button>
        )}
        <Modal>
          <Modal.Open opens='delete-booking'>
            <Button variation='danger'>Delete</Button>
          </Modal.Open>
          <Modal.Window name='delete-booking'>
            <ConfirmDelete
              resourceName='booking'
              onConfirm={handleDelete}
            ></ConfirmDelete>
          </Modal.Window>
        </Modal>

        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
