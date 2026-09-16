import styled, { css } from "styled-components";

type RowProps = {
  type: "horizontal" | "vertical";
};

const Row = styled.div<RowProps>`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      align-items: center;
      justify-content: space-between;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

export default Row;
