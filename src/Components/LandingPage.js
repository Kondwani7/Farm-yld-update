import React, {useState, useEffect} from 'react'
import {AppBar, makeStyles, IconButton, Typography, Toolbar, Collapse} from '@material-ui/core'
import SortIcon from '@material-ui/icons/Sort'; 
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll} from 'react-scroll'
import 'aframe'
import {Entity, Scene} from 'aframe-react'

const useStyles = makeStyles((theme) =>({
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'100vh',
        textAlign:'center'
    },
    appbar:{
        background:'none',
        fontFamily:'Montserrat'
    },
    sortIcon:{
        color:'#fff',
        fontSize:'2rem'
    },
    appbarWrapper:{
        width:"80%",
        margin:'0 auto'
    },
    appbarTitle:{
        flexGrow:'1',
    },
    colorText:{
        color:'#33d480'
    },
    title:{
        color:"#fff",
        fontSize:'45px'
    },
    titleTwo:{
        color:"#fff",
        fontSize:'35px'
    },
    container:{
        textAlign:'center'
    },
    goDown:{
        color:'#33d480',
        fontSize:'4rem',
    }
    
    
}));

function LandingPage() {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);

    useEffect(()=>{
        setChecked(true);
    })

    return (
        <div className={classes.root} id='header'>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    <Typography align="left" variant="h5">
                        Farm<span className={classes.colorText}> YLD</span></Typography>
                    <IconButton>
                        <SortIcon className={classes.sortIcon}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Collapse 
                    in={checked}
                    {...(checked? {timeout: 2000} : {})}
                    collapsedHeight={40}
            >
                <div className={classes.container}>
                <h1 className={classes.titleTwo}>
                   <br/> Track  <span className={classes.colorText}>Your</span> Crop <span className={classes.colorText}> Performance</span>
                </h1>
                <Scroll to='map' smooth={true}>
                    <IconButton >
                            <ExpandMoreIcon className={classes.goDown}/>
                    </IconButton>
                </Scroll>
            </div>
            
            </Collapse>
            <Scene>
                <Entity
                    geometry={{primitive: 'box', width: 5}}
                    material={{color: 'red', roughness: 0.5,}}
                    scale={{x: 2, y: 2, z: 2}}
                    position={{x: 0, y: 0, z: -5}}/>
                />
            </Scene>
        </div>

    )
}

export default LandingPage
