import React, { useState, useEffect } from "react";
import httpClient from "./httpClient";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to Skill management Application</h1>
      <Grid container justifyContent="flex-end">
      <Grid item>
        <Link href="/register" variant="body2">
          Dont have an account? Register
        </Link>
      </Grid>
    </Grid>
    </div>
  );
};

export default LandingPage;