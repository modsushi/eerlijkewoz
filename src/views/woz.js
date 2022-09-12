import { useContext, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Stepper from '../components/stepper';
import { useNavigate, Link  } from "react-router-dom";
import { AddressContext } from '../Context';

export default function Woz() {
  const AppState = useContext(AddressContext);
  const Navigate = useNavigate();
  
  useEffect( () => {
    if (!AppState || Object.keys(AppState).length === 0 || !AppState.currentWoz || !AppState.proposedWoz) {
      Navigate('/address');
      return;
    }
  },[])
  
  return (<div className='content'>
    {
      AppState.currentWoz > AppState.proposedWoz && <Savings AppState={AppState} /> 
    }
    {
      AppState.currentWoz <= AppState.proposedWoz && <NoSavings AppState={AppState} />
    }
  </div>)
}

function Savings(props) {
  const { AppState } = props;
  return (<div className='wrap'>
    <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={4}>
            <Stepper activeStep={2} />
        </Grid>
        <Grid xs={12} sm={12} md={8}>
        <div className='flex alignleft'>
        <Card 
            sx={{padding:3, marginBottom:5, zIndex:0, width:'100%'}}>
            <Typography variant='h2' sx={{fontSize:'24px', fontWeight:'bold'}}>You pay too much tax due to a WOZ value that is too high</Typography>
            <div className='highlight' style={{backgroundColor:'rgb(255, 153, 31)', padding:'15px', width:'90%', color:'#fff', fontFamily:'Montserrat', marginTop:20, marginBottom:20, fontWeight:'bold'}}>You can save money</div>
              <p style={{fontWeight:'bold'}}>WOZ value</p>
              <div className='highlight' style={{marginTop:10, width:'90%'}}>
                <div className='flex justify-evenly' style={{marginBottom:10}}>
                  <span>Current Woz Value</span>
                  <span>€{AppState.currentWoz}</span>
                </div>
                <div className='flex justify-evenly'>
                  <span>Fair Woz Value</span>
                  <span>€{AppState.proposedWoz}</span>
                </div>
              </div>
            <div style={{marginTop:30}}>
              <p>We will submit the objection to your municipality within a few working days. Your WOZ advisor will check this provisional valuation thoroughly and, if necessary, supplement it in consultation with you.</p>
            </div>
            <div style={{marginTop:30}}>
              <p style={{fontWeight:'bold'}}>Expected savings per year</p>
              <div className='highlight' style={{marginTop:10, width:'90%'}}>
                <div className='flex justify-evenly' style={{marginBottom:10}}>
                  <span>Income Tax</span>
                  <span>€212</span>
                </div>
                <div className='flex justify-evenly' style={{marginBottom:10}}>
                  <span>OZB</span>
                  <span>€111</span>
                </div>
                <div className='flex justify-evenly' style={{marginBottom:10}}>
                  <span>Water System Levy</span>
                  <span>€32</span>
                </div>
                <div className='highlight flex justify-evenly' style={{backgroundColor:'rgb(36, 194, 127)', padding:'15px', width:'90%', color:'#fff', fontFamily:'Montserrat', marginTop:20, marginBottom:20, fontWeight:'bold'}}>
                  <span>Total Savings Per Year</span>
                  <span>€212</span>
                </div>
              </div>
            </div>
            <Grid spacing={2} container style={{marginTop:10}}>
              <Grid xs={3}>
              <Link to='/confirmation'><button className='btn grey'>Previous</button></Link>
              </Grid>
              <Grid xs={9}>
                <button className='btn' style={{color:'#FFF'}}>Complain for free</button>
              </Grid>
            </Grid>
        </Card>
        </div>
        </Grid>
    </Grid>
    </div>)
}

function NoSavings(props) {
  const { AppState } = props;
  return (<div className='wrap'>
    <Grid container spacing={2}>
      <Grid xs={12} sm={12} md={4}>
          <Stepper activeStep={2} />
      </Grid>
      <Grid xs={12} sm={12} md={8}>
        <div className='flex alignleft'>
          <Card 
              sx={{padding:3, marginBottom:5, zIndex:0, width:'100%'}}>
              <Typography variant='h2' sx={{fontSize:'24px', fontWeight:'bold'}}>Your WOZ value is probably not too high</Typography>
              <div className='highlight' style={{backgroundColor:'rgb(222, 235, 255)', padding:'15px', width:'90%', color:'rgb(7, 65, 166)', fontFamily:'Montserrat', marginTop:20, marginBottom:20, fontWeight:'bold'}}>You probably can't save money.</div>
              <p style={{fontWeight:'bold'}}>WOZ value</p>
              <div className='highlight' style={{marginTop:10, width:'90%'}}>
                <div className='flex justify-evenly' style={{marginBottom:10}}>
                  <span>Current Woz Value</span>
                  <span>€{AppState.currentWoz}</span>
                </div>
                <div className='flex justify-evenly'>
                  <span>Fair Woz Value</span>
                  <span>€{AppState.proposedWoz}</span>
                </div>
              </div>
              <p>If you agree with our findings, you can register for the WOZ Notification. Your WOZ advisor will send you a message as soon as you can do the WOZ Check in 2022</p>
              <p>If you disagree, you can still object free of charge via Fair WOZ. Your WOZ advisor will deal with your file immediately.</p>
              <Grid spacing={2} container style={{marginTop:10}}>
                <Grid xs={3}>
                  <Link to='/confirmation'><button className='btn grey'>Previous</button></Link>
                </Grid>
                <Grid xs={9}>
                  <button className='btn' style={{color:'#FFF'}}>Complain for free</button>
                </Grid>
              </Grid>
          </Card>
        </div>
      </Grid>
    </Grid>
    </div>)
}