import { Paper, TextField } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { BundleNodecgInstance } from '../../../../nodecg/nodecg';

type Props = {
  time: string;
  status: 'in_progress' | 'paused' | 'finished';
}

const Text = styled(Paper)(() => ({
  textAlign: 'center',
  height: 48,
  lineHeight: '48px',
  fontWeight: 'bold',
}));

export const TimeTextForm = ({ time, status }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputTime, setInputTime] = useState(time);

  const handleEdit = () => {
    if (status !== 'finished') {
      return;
    }

    setIsEditing(true);
  }

  const executeEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }
    if (!inputTime.match(/^(\d+:)?(?:\d{1}|\d{2}):\d{2}$/)) {
      return;
    }

    (nodecg as BundleNodecgInstance).sendMessage('edit-time', inputTime);
    setIsEditing(false);
  }

  useEffect(() => {
    if (status !== 'finished') {
      setIsEditing(false);
    }
  }, [status]);

  if (isEditing) {
    return (
      <TextField
        fullWidth
        size="small"
        variant="filled"
        defaultValue={time}
        inputProps={{
          style: {
            textAlign: 'center',
            fontWeight: 'bold',
            padding: '12.5px'
          }
        }}
        onKeyPress={executeEdit}
        onChange={(e) => setInputTime(e.target.value)}
      />
    )
  }

  return (
    <Text onClick={handleEdit}>
      {time}
    </Text>
  )
}