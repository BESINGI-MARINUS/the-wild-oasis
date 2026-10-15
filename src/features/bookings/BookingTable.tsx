import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import type { BookingType } from "../../utils/types";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

function BookingTable() {
  const { bookings, isLoading } = useBookings();
  if (isLoading) return <Spinner />;
  if (!bookings || bookings.length === 0)
    return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings as BookingType[]}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking as BookingType} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
