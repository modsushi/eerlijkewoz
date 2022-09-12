import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import { steps } from '../constants';

export default function StepperUI(props) {
  const activeStep = props.activeStep;
  return (<div className='stepper'>
     <Stepper activeStep={activeStep} orientation="vertical">
      {
        steps.map( (step) => {
          return (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>
                {step.description}
              </Typography>
            </StepContent>
          </Step>)
        })
      }
     </Stepper>
  </div>)
}