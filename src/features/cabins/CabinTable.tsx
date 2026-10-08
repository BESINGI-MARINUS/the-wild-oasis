import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import type { CabinType } from "../../utils/types";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, isError, error, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (isError) toast.error((error && error.message) || "Error loading cabins");

  // 1. Filter by discount
  const filterByDiscount = searchParams.get("discount") || "all";
  let filteredCabins;
  if (filterByDiscount === "all") filteredCabins = cabins;
  if (filterByDiscount === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  if (filterByDiscount === "with-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);

  // 2. Sort
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [sortField, sortOrder] = sortBy.split("-");
  const modifier = sortOrder === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort(
    (a, b) => (a[sortField] - b[sortField]) * modifier,
  );

  return (
    <Menus>
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
          data={sortedCabins as CabinType[]}
          render={(cabin: CabinType) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
