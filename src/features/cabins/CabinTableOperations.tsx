import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterBy="discount"
        options={[
          { label: "All", filter: "all" },
          { label: "No Discount", filter: "no-discount" },
          { label: "With Discount", filter: "with-discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (a-z)" },
          { value: "name-desc", label: "Sort by name (z-a)" },
          { value: "regularPrize-asc", label: "Sort by price (asc)" },
          { value: "regularPrize-desc", label: "Sort by price (desc)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (asc)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (desc)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
