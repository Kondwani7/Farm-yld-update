/* eslint-disable no-undef */
import React,{useState} from 'react'
import { Paper, Typography} from '@material-ui/core'
import {GoogleMap, withScriptjs, withGoogleMap, Marker,InfoWindow} from 'react-google-maps';
import {makeStyles} from '@material-ui/core/styles'
import Geocode from 'react-geocode'
import AutoComplete from 'react-google-autocomplete'

Geocode.setApiKey("AIzaSyAL9uyrWOeMRM4SrLrPMnJJqpIpk-tjxCc")

const useStyles = makeStyles({
  root:{
    backgroundColor:''
  },
  typography:{
    fontSize:'56px',
    paddingLeft: 250
  }
})
function MapsPage() {
    const [address, setAddress] = useState("")
  const [city, setCity] = useState("hi")
  const [area, setArea] = useState("")
  const [state, setState] = useState("")
  const [zoom, setZoom] = useState(8)
  const [height, setHeight] = useState(400)
  const [mapPosition, setMapPosition] = useState({lat:-15.387526, lng:28.322817})
  const [markerPosition, setMarkerPosition] = useState({lat:-15.387526, lng:28.322817})

  

  const getCity = (addressArray)=>{
    let city = '';
    
      for(let index=0; index<addressArray.length; index ++){
        if(addressArray[index].types[0] && 'adminstrative_area_level_2' ===addressArray[index].types[0]){
          city = addressArray[index.long_name]
          return city
        }
      };
    
  }

  const getArea = (addressArray)=>{
    let area= '';
      for(let index=0; index<addressArray.length;index++){
        if(addressArray[index].types[0]){
          for (let j=0; j<addressArray.length; j++){
            if('sublocality_level_1' === addressArray[index].types[j] || 'locality' === addressArray[index].types[j]){
              area = addressArray[index.long_name]
              return area
            }
          }
        }
      }
  }

  const getState = (addressArray) =>{
    let state = ''
    for(let index=0; index<addressArray.length;index++){
      for(let index=0; index< addressArray.length;index++){
        if(addressArray[index].types[0] && 'adminstrative_area_level_1'=== addressArray[index].types[0]){
          state = addressArray[index.long_name]
          return state
        }
      }
    }
  }

  const onMarkerDragEnd = (event) =>{
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(res=>{
      const address = res.results[0].formatted_address,
            addressArray = res.results[0].address_components,
            city = getCity(addressArray),
            area = getArea(addressArray),
            state = getState(addressArray)

            setAddress({address:(address) ? address:""})
            setCity({city:(city)? city:""})
            setArea({area:(area) ? area:""})
            setState({state:(state)? state:""})
            setMapPosition({...mapPosition, lat:newLat, lng:newLng})
            setMarkerPosition({...markerPosition, lat:newLat, lng:newLng})
            
      console.log('response', res)
    })
    console.log('latitude',newLat, 'longitude', newLng)
  }

  const classes = useStyles() 
  const MapWithMarker = withScriptjs(withGoogleMap((props)=>  
    <GoogleMap 
      defaultZoom={8}
      defaultCenter={{lat:mapPosition.lat,lng:mapPosition.lng}}
      >
      <Marker
        draggable={true}
        onDragEnd={onMarkerDragEnd}
        position={{lat:markerPosition.lat,lng:markerPosition.lng}}
      >
        <InfoWindow>
          <Typography>FarmYLD</Typography>
        </InfoWindow>
      </Marker>
    </GoogleMap>   
    ));

    const onPlaceSelected = (place)=>{
      const address = place.formatted_address,
      addressArray = place.address_components,
      city = getCity(addressArray),
      area = getArea(addressArray),
      state = getState(addressArray),
      newLat = place.geomerty.location.lat(),
      newLng = place.geomerty.location.lng()

      setAddress({address:(address) ? address:""})
      setCity({city:(city)? city:""})
      setArea({area:(area) ? area:""})
      setState({state:(state)? state:""})
      setMapPosition({...mapPosition, lat:newLat, lng:newLng})
      setMarkerPosition({...markerPosition, lat:newLat, lng:newLng})
    }

    return (
    <div id="map">
        <Paper className={classes.root}>
      <div style={{width:'100vw', height:'70vh'}}>
      <AutoComplete
        style={{width:"100%", height:'30px', paddingLeft:16,}}
        types={['(regions)']}
        onPlaceSelected={onPlaceSelected}
      />
      <br></br>
      <MapWithMarker
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAL9uyrWOeMRM4SrLrPMnJJqpIpk-tjxCc`}
          loadingElement= {<div style={{height: `100%`}}/>}
          containerElement= {<div style={{height: `100%`}}/>}
          mapElement= {<div style={{height: `100%`}}/>}
        />
        <br/>
      
      </div>
    </Paper>
    </div>
    )
}

export default MapsPage
