import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export interface FilterOption {
  filter: string;
  label: string;
}

function Filter({
  filterBy,
  options,
}: {
  filterBy: string;
  options: FilterOption[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterBy) || options.at(0)?.filter;

  function handleFilterClick(filter: string) {
    searchParams.set(filterBy, filter);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.filter}
          onClick={() => handleFilterClick(option.filter)}
          $active={currentFilter === option.filter}
          disabled={currentFilter === option.filter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
