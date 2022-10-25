import React from 'react'

import { LinearProgress } from '@mui/material'

import { useAppSelector } from '@storage/hooks/useStore'
import { selectLoadingIndicator } from '@storage/slices/loadingIndicator'

export const TopPageLoader: React.FC = () => {
  const { isLoading } = useAppSelector(selectLoadingIndicator)
  return (
    <>
      {isLoading && (
        <LinearProgress
          className="fixed w-full z-10 bg-skin-subsidiary text-skin-primary"
          color="inherit"
        />
      )}
    </>
  );
}
