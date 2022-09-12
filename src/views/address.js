import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Search from '../components/search';
import Stepper from '../components/stepper';

export default function Address() {
    return (<div className='content'>
        <div className='wrap'>
        <Grid container spacing={2}>
            <Grid xs={12} sm={12} md={4}>
                <Stepper activeStep={0} />
            </Grid>
            <Grid xs={12} sm={12} md={8}>
            <div className='flex alignleft'>
            <Card 
                sx={{padding:3, marginBottom:5, zIndex:0, width:'100%'}}>
                <Typography variant='h2' sx={{fontSize:'24px', fontWeight:'bold'}}>Welcome to the WOZ Check 2022!</Typography>
                <p>Enter your home address to get started.</p>
                <p style={{fontWeight:'bold', margin:'20px 0 5px 0'}}>residential address</p>
                <Search />
            </Card>
            </div>
            </Grid>
        </Grid>
        </div>
    </div>)
}