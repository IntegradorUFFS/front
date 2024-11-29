import styled from "styled-components";

interface IProps {
  $length: number;
  $buttons?: number;
}

export const DynamicGrid = styled.div<IProps>`
  display: grid;
  grid-template-columns: repeat(${({ $length }) => $length}, minmax(0, 1fr)) ${({
      $buttons,
    }) => $buttons && ` ${$buttons}px`};
`;
