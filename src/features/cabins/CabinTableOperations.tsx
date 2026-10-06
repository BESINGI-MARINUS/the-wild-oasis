import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { label: "All", filter: "all" },
          { label: "No Discount", filter: "no-discount" },
          { label: "With Discount", filter: "with-discount" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
