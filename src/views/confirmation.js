import { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CancelIcon from '@mui/icons-material/Cancel';
import Stepper from '../components/stepper';
import { useNavigate, Link  } from "react-router-dom";
import { AddressContext, AddressDispatchContext } from '../Context';
import '../styles/Confirmation.css';

export default function Confirmation() {
  const AppState = useContext(AddressContext);
  const AppStateSet = useContext(AddressDispatchContext);
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleNext = () => {
    if(AppState.gebruiksdoel !== 'woonfunctie') {
      setOpen(true);
    }
    else
    {
      Navigate('/woz')
    }
  }

  useEffect( () => {
    if (!AppState || Object.keys(AppState).length === 0) {
      Navigate('/address');
      return;
    }
    AppStateSet({
      ...AppState,
      currentWoz: generateRandomInteger(400000, 450000),
      proposedWoz: generateRandomInteger(400000, 450000)
    })
  },[])
  
  return (<div className='content'>
    <NotResidential open={open} setOpen={setOpen} state={AppState}/>
    <div className='wrap'>
    <Grid container spacing={2}>
      <Grid xs={12} sm={12} md={4}>
          <Stepper activeStep={1} />
      </Grid>
      <Grid xs={12} sm={12} md={8}>
      <div className='flex alignleft'>
      <Card 
          sx={{padding:3, marginBottom:5, zIndex:0, width:'100%'}}>
          <Typography variant='h2' sx={{fontSize:'24px', fontWeight:'bold'}}>Welcome to the WOZ Check 2022!</Typography>
          <p>See within 1 minute whether your WOZ value is correct and how much you can save.</p>
          <Benefits />
          <div className='flex highlight' style={{marginTop:30, marginBottom:30}}>
            <VerifiedUserIcon color='green'/>
            <span style={{margin:'0 0 0 15px'}} color='secondary'>Complies with GDPR privacy legislation</span>
          </div>
          <p style={{fontWeight:'bold', margin:'20px 0 5px 0'}}>Your address</p>
          <div className='highlight' style={{padding:25, marginTop:15, width:'90%'}}>
            <Typography>{AppState.openbareruimte} {AppState.huisnummer}-{AppState.huisletter}, {AppState.postcode}, {AppState.woonplaats}</Typography>
          </div>
          <div className='flex' style={{marginTop:30, justifyContent:'space-between', flexWrap:'wrap'}}>
            <Link to='/address'><Button variant='outlined' color='button'>Previous</Button></Link>
            <Button variant='contained' onClick={handleNext}>Next</Button>
          </div>
      </Card>
      </div>
      </Grid>
    </Grid>
    </div>
  </div>)
}

function Benefits() {
  return (<ul className='benefits'>
  <li>
    <span className='count'>1</span>
    <span className='description'>Check your home details.</span>
  </li>
  <li>
    <span className='count'>2</span>
    <span className='description'>See how much you can save.</span>
  </li>
  <li>
    <span className='count'>3</span>
    <span className='description'>See how much you can save.</span>
  </li>
</ul>)
}

function NotResidential(props) {
  const closeModal = () => props.setOpen(false);
  return (<Modal
    open={props.open}
    onClose={closeModal}
    aria-labelledby="Non Residential Address"
    aria-describedby="This address is not a residential address">
      <div className='modal'>
        <div className='flex justify-evenly' style={{marginBottom:20, paddingBottom:15, borderBottom:'1px solid #eee'}}>
          <Typography variant='h2' sx={{fontSize:'18px', fontWeight:'bold', marginTop:1}}>Address has a business or mixed destination</Typography>
          <IconButton aria-label="cancel" onClick={closeModal}>
            <CancelIcon />
          </IconButton>
        </div>
        <p>According to our data, this address (also) has a business destination. Unfortunately, Fair WOZ currently only checks the WOZ value of homes.</p>
        <p>In the future, we will check the WOZ value of commercial real estate. If you want Fair WOZ to contact you as soon as the WOZ Check is also available for commercial real estate, continue with registration.</p>
        <div className='highlight' style={{padding:25, marginTop:15, marginBottom:15, width:'90%'}}>
          <Typography>{props.state.openbareruimte} {props.state.huisnummer}-{props.state.huisletter}, {props.state.postcode}, {props.state.woonplaats}</Typography>
        </div>
        <Grid spacing={2} container style={{marginTop:10}}>
          <Grid xs={6}>
            <button className='btn' style={{color:'#FFF'}}>Signup for Fair WOZ Business</button>
          </Grid>
          <Grid xs={6}>
            <button className='btn grey' style={{color:'#344563'}}>This house is not used for business</button>
          </Grid>
        </Grid>
      </div>
  </Modal>)
}

function generateRandomInteger(min, max) {
  return  Math.round( (Math.floor(min + Math.random()*(max - min + 1)) ) / 1000) * 1000
}