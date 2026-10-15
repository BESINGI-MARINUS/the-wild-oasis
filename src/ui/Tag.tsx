import styled from "styled-components";

export type TagType = "blue" | "green" | "silver";

type TagProps = {
  type: TagType;
};

const Tag = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "type",
})<TagProps>`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
`;

export default Tag;
