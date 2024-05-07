import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import useGetBookingList from './useGetBookingList';
import Spiner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
function BookingTable() {
  const { bookings, isLoading } = useGetBookingList();
  if (isLoading) return <Spiner />;

  if (!bookings.length) return <Empty resourceName='bookings' />;
  return (
    <>
      <Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </>
  );
}

export default BookingTable;
