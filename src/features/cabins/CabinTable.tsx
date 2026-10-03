import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import type { CabinType } from "../../utils/types";

function CabinTable() {
  const { isLoading, isError, error, cabins } = useCabins();
  if (isLoading) return <Spinner />;
  if (isError) toast.error((error && error.message) || "Error loading cabins");

  return (
    <div>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={cabins}
          render={(cabin: CabinType) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          )}
        />
      </Table>
    </div>
  );
}

export default CabinTable;
