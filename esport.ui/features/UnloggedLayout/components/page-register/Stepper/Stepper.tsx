import React, { ReactNode } from 'react'
import { styled } from '@mui/material/styles'

import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { Box, Step, StepLabel, Stepper } from '@mui/material'
import { StepIconProps } from '@mui/material/StepIcon'

import Check from '@mui/icons-material/Check'

import { RegisterSteps } from '@features/UnloggedLayout/enums'

const steps = ['Main info', 'Sport info', 'Some additional info']

interface StepperProps {
  currStep: RegisterSteps
}

export const RegisterStepper: React.FC<StepperProps> = ({ currStep }) => {
  const isStepFailed = (step: number) => {
    return step === 1
  }

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }))

  const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }))

  function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? <Check className='QontoStepIcon-completedIcon' /> : <div className='QontoStepIcon-circle' />}
      </QontoStepIconRoot>
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper alternativeLabel activeStep={currStep} connector={<QontoConnector />} className='text-skin-main'>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              <p className='text-skin-main'>{label}</p>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
