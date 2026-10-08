import type { SelectHTMLAttributes } from "react";
import styled from "styled-components";

type SelectVariant = "white" | "default";

const StyledSelect = styled.select<{ $type: SelectVariant }>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.$type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> {
  options: { value: string | number; label: string }[];
  type?: SelectVariant;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Select({
  options,
  value,
  type = "default",
  onChange,
  ...props
}: SelectProps) {
  return (
    <StyledSelect $type={type} value={value} {...props} onChange={onChange}>
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </StyledSelect>
  );
}

export default Select;
