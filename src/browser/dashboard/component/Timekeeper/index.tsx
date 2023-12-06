import { Divider, Grid } from '@mui/material';
import React, { useContext } from 'react';
import { ReplicantContext } from '../../../ReplicantProvider';
import { BundleConfigContext } from '../../BundleConfigProvider';
import { TimeHistoryList } from './TimeHistoryList';
import { TimekeepingControl } from './TimekeepingControl';
import { TimeTextForm } from './TimeTextForm';

export const Timekeeper = () => {

  const replicant = useContext(ReplicantContext);
  const disableControl = useContext(BundleConfigContext).disableDashboardControl;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TimeTextForm
          time={replicant.timekeeping.time.display}
          status={replicant.timekeeping.status}
        />
      </Grid>
      {
        !disableControl && (
          <Grid item xs={12}>
            <TimekeepingControl status={replicant.timekeeping.status} />
          </Grid>
        )
      }
      <Divider />
      <Grid item xs={12}>
        <TimeHistoryList history={replicant.history} />
      </Grid>
    </Grid>
  );
}