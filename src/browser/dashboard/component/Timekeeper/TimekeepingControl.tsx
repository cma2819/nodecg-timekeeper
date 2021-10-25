import { Button, Grid } from '@mui/material';
import React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DoneIcon from '@mui/icons-material/Done';
import PauseIcon from '@mui/icons-material/Pause';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { BundleNodecgInstance } from '../../../../nodecg/nodecg';
import { MessageMap } from '../../../../nodecg/messages';

type Props = {
  status: 'in_progress' | 'paused' | 'finished';
};

type MessageKey = keyof MessageMap;

export const TimekeepingControl = ({ status }: Props) => {

  const action = (message: MessageKey) => {
    (nodecg as BundleNodecgInstance).sendMessage(message);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Button
          color="primary"
          startIcon={<FiberManualRecordIcon />}
          disabled={ status !== 'finished' }
          variant="contained"
          fullWidth
          onClick={() => { action('start') }}
        >
          Start
        </Button>
      </Grid>

      <Grid item xs={6}>
        <Button
          color="primary"
          startIcon={<DoneIcon />}
          disabled={ status === 'finished' }
          variant="contained"
          fullWidth
          onClick={() => { action('finish') }}
        >
          Finish
        </Button>
      </Grid>
      
      <Grid item xs={6}>
        <Button
          color="info"
          startIcon={<PlayArrowIcon />}
          disabled={ status !== 'paused' }
          variant="contained"
          fullWidth
          onClick={() => { action('resume') }}
        >
          Resume
        </Button>
      </Grid>

      <Grid item xs={6}>
        <Button
          color="info"
          startIcon={<PauseIcon />}
          disabled={ status !== 'in_progress' }
          variant="contained"
          fullWidth
          onClick={() => { action('pause') }}
        >
          Pause
        </Button>
      </Grid>
    </Grid>
  )
}