import React from 'react';
import ReactDOM from 'react-dom';
import { ReplicantProvider } from '../../ReplicantProvider';
import styled from 'styled-components';
import { Timekeeper } from '../components/Timekeeper';
import '../common.css';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #222222;
  display: grid;
  align-content: center;
  justify-content: center;
`;

const App = () => {
  return (
    <ReplicantProvider>
      <Container>
        <Timekeeper />
      </Container>
    </ReplicantProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));