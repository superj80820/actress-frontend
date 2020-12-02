import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StarCard from './components/StarCard'
import AdCard from './components/AdCard'
import AppBar from './components/AppBar'
import './App.css';

const useStyles = makeStyles({
  root: {
    display:'flex',
    justifyContent:'center'
  },
  card: {
    'flex-direction':'column'
  }
});

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <AppBar></AppBar>
      <div className={classes.root} style={{ padding: '60px'}}>
        <div className={classes.card}>
          <AdCard></AdCard>
          <StarCard></StarCard>
        </div>
      </div>
    </div>
  );
}

export default App;
