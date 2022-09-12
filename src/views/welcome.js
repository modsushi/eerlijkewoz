import Logo from '../components/logo';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

export default function Welcome() {
  return (<header className="App-header">
    <Logo />
    <Card 
      sx={{padding:3, marginBottom:5, backgroundColor:'#eee'}}>
      <Typography variant='h2' sx={{fontSize:'24px', fontWeight:'bold'}}>Frontend Coding Challenge</Typography>
      <Jab>
        <Typography variant='p' sx={{fontSize:'18px', fontWeight:400}}>Jabran Saeed</Typography>
      </Jab>
    </Card>
    <Link to='/address'><Button variant='contained'>Start Here</Button></Link>
  </header>)
}

const Jab = (props) => (<div className='flex aligncenter'>
  <img alt='Jabran' className='jab' src='jab.png'/>
  {
    props.children
  }
</div>);