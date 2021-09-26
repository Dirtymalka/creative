import React from 'react';

import { makeStyles } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'start',
    cursor: 'pointer',
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: '#7d7d7d' }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img src="img/vizor-logo-32x32.png" alt="" style={{ width: 32, height: 32 }} />
            <span>Creative</span>
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
