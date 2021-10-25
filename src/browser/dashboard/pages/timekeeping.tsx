import { Grid } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom';
import { ReplicantProvider } from '../../ReplicantProvider'
import { BundleConfigProvider } from '../BundleConfigProvider';
import { Timekeeper } from '../component/Timekeeper';
import { DashboardThemeProvider } from '../DashboardThemeProvider'

const App = () => {
  return (
    <DashboardThemeProvider>
      <BundleConfigProvider>
        <ReplicantProvider>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Timekeeper />
            </Grid>
          </Grid>
        </ReplicantProvider>
      </BundleConfigProvider>
    </DashboardThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));