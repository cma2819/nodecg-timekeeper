import { Paper } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

type Props = {
  time: string;
}

const Text = styled(Paper)(() => ({
  textAlign: 'center',
  height: 48,
  lineHeight: '48px',
  fontWeight: 'bold',
}));

export const TimeTextForm = ({ time }: Props) => {
  return (
    <Text>
      { time }
    </Text>
  )
}