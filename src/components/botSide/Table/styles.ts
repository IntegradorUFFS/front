import styled from "styled-components";

interface IProps {
  length: number;
}

export const DynamicGrid = styled.div<IProps>`
  display: grid;
  grid-template-columns: repeat(${({ length }) => length}, minmax(0, 1fr)) calc(
      36px + 0.75rem
    );
`;
