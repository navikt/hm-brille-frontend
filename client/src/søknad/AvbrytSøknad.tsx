import { Button } from '@navikt/ds-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApplicationContext } from '../state/ApplicationContext'

export function AvbrytSøknad() {
  const { resetAppState } = useApplicationContext()
  const navigate = useNavigate()
  return (
    <Button
      variant="secondary"
      type="button"
      onClick={() => {
        resetAppState()
        navigate('/')
      }}
    >
      Avbryt
    </Button>
  )
}
