import React from 'react'
import MapsPage from './Components/MapsPage'
import LandingPage from './Components/LandingPage'
import {makeStyles} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core';
import Farmland from './assets/farmland.jpg'

const useStyles = makeStyles({
  root:{
    minHeight:'100vh',
    background: `rgba(0,0,0,0.4) url(${Farmland})`,
    backgroundRepeat:'no-repeat',
    backgroundSize:'cover',
    backgroundBlendMode:'darken'
  }
});

export default function App() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <LandingPage/>
      <MapsPage/>
    </div>
    
  )
}
