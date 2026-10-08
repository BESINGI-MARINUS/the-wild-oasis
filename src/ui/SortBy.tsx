import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export interface SortByOptions {
  value: string;
  label: string;
}
export interface SortByProps {
  options: SortByOptions[];
}

function SortBy({ options }: { options: SortByOptions[] }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortValue = searchParams.get("sortBy") || "";

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", event.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={sortValue}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
