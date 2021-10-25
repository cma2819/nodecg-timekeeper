import React, { useContext } from 'react';
import styled from 'styled-components';
import { ReplicantContext } from '../../../ReplicantProvider';

const Container = styled.div`
  font-size: min(100vh, 20vw);
  font-family: 'Source Code Pro';
`;

export const Timekeeper = () => {

  const replicant = useContext(ReplicantContext);

  return (
    <Container>
      { replicant.timekeeping.time.display }
    </Container>
  );
}