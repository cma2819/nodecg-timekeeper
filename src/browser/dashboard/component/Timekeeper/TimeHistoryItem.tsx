import { Paper } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { Time } from '../../../../extension/lib/Time';

type Props = {
  time: Time,
}

const Item = styled(Paper)(() => ({
  height: 24,
  padding: '8px 16px',
}));

export const TimeHistoryItem = ({ time }: Props) => {
  return (
    <Item>
      { time.display }
    </Item>
  );
}