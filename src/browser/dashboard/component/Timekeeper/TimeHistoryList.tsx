import { Button, List, ListItemText, styled as muiStyled } from '@mui/material';
import { clone } from 'lodash';
import React from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { TimeHistoryItem } from './TimeHistoryItem';
import styled from 'styled-components';
import { History } from '../../../../nodecg/generated';

type Props = {
  history: History,
}

const Container = styled.div``;

const ButtonRow = styled.div``;

const ListContainer = styled.div`
  max-height: 480px;
  overflow-y: auto;
  margin: 8px;
  padding-right:16px;
`;

const TransitionListItem = muiStyled(ListItemText)(() => ({
  transition: 'all 500ms ease',
  opacity: 0,
  transform: 'translateX(16px)',
}));

export const TimeHistoryList = ({ history }: Props) => {

  const reversed = clone(history).reverse();

  const resetHistoryAction = () => {
    nodecg.sendMessage('reset-history');
  }

  return (
    <Container>
      <ButtonRow>
        <Button
          color="primary"
          fullWidth
          variant="contained"
          onClick={resetHistoryAction}
          disabled={history.length === 0}
        >
          Reset History
        </Button>
      </ButtonRow>
      <ListContainer>
        <List>
          <TransitionGroup className="history-list">
            {
              reversed.map((h) => (
                <Transition key={h.finishedAt} timeout={500}>
                  {
                    state => (
                      <TransitionListItem sx={{
                        opacity: (state === 'entered') ? 1 : 0,
                        transform: (state === 'entered') ? 'translateX(0)' : 'translateX(16px)',
                      }}>
                        <TimeHistoryItem time={h.time} />
                      </TransitionListItem>
                    )
                  }
                </Transition>
              ))
            }
          </TransitionGroup>
        </List>
      </ListContainer>
    </Container>
  );
}