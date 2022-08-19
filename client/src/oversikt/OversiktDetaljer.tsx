import { useNavigate, useParams } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'
import { Button, Panel, Heading, Loader } from '@navikt/ds-react'
import { Back, Print } from '@navikt/ds-icons'
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { logPrintKravÅpnet } from '../utils/amplitude'
import { Data } from '../components/Data'
import { Datum } from '../components/Datum'
import { ReactNode } from 'react'
import { Nullable, OversiktDetaljerResponse } from '../types'
import { useGet } from '../useGet'
import styled from 'styled-components'

export function OversiktDetaljer() {
  let { vedtakId } = useParams()
  const navigate = useNavigate()

  const { data, error } = useGet<OversiktDetaljerResponse>('/oversikt/' + vedtakId)

  const printRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onBeforePrint: () => logPrintKravÅpnet(),
    documentTitle: `krav_${vedtakId}`,
  })

  return (
    <DontPrintHelper ref={printRef}>
      <ScrollToTop />
      <main>
        <Button
          variant="tertiary"
          size="medium"
          onClick={() => {
            navigate('/oversikt')
          }}
          className="dontPrintMe"
        >
          <Back aria-hidden /> Tilbake til oversikten
        </Button>
        {!error && !data && (
          <Loader
            variant="neutral"
            size="3xlarge"
            title="Laster krav..."
            style={{ display: 'block', margin: '2rem auto' }}
          />
        )}
        {!error && data && (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ display: 'inline-block', marginRight: '1rem', margin: '0.1em 0' }}>
                Krav for {data.barnsNavn}
              </h1>
              <Button variant="secondary" size="medium" className="dontPrintMe" onClick={handlePrint}>
                <Print aria-hidden />
                Skriv ut krav
              </Button>
            </div>
            <Panel border={true} style={{ marginTop: '1rem' }}>
              <div style={{ marginTop: '1rem' }}>
                <Heading level="1" size="medium">
                  Foretaket som skal ha direkte oppgjør
                </Heading>
                <Line />
                <Data>
                  <DatumHelper label="Organisasjonsnavn">{data.orgnavn}</DatumHelper>
                  <DatumHelper label="Organisasjonsnummer">{data.orgnr}</DatumHelper>
                </Data>
              </div>
              <div style={{ marginTop: '2rem' }}>
                <Heading level="1" size="medium">
                  Barn
                </Heading>
                <Line />
                <Data>
                  <DatumHelper label="Navn">{data.barnsNavn}</DatumHelper>
                  <DatumHelper label="Fødselsnummer">{data.barnsFnr}</DatumHelper>
                  <DatumHelper label="Alder">{data.barnsAlder}</DatumHelper>
                </Data>
              </div>
              <div style={{ marginTop: '2rem' }}>
                <Heading level="1" size="medium">
                  Brillestyrke
                </Heading>
                <Line />
                <Data>
                  <DatumHelper label="Høyre sfære">{data.høyreSfære.toFixed(2).replace('.', ',')}</DatumHelper>
                  <DatumHelper label="Høyre sylinder">{data.høyreSylinder.toFixed(2).replace('.', ',')}</DatumHelper>
                  <DatumHelper label="Venstre sfære">{data.venstreSfære.toFixed(2).replace('.', ',')}</DatumHelper>
                  <DatumHelper label="Venstre sylinder">
                    {data.venstreSylinder.toFixed(2).replace('.', ',')}
                  </DatumHelper>
                </Data>
              </div>
              <div style={{ marginTop: '2rem' }}>
                <Heading level="1" size="medium">
                  Om brillen
                </Heading>
                <Line />
                <Data>
                  <DatumHelper label="Bestillingsdato">{data.bestillingsdato}</DatumHelper>
                  <DatumHelper label="Pris på brille">{data.brillepris.toFixed(2).replace('.', ',')} kr</DatumHelper>
                  <DatumHelper label="Bestillingsreferanse">{data.bestillingsreferanse}</DatumHelper>
                </Data>
              </div>
              <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
                <Heading level="1" size="medium">
                  Om kravet
                </Heading>
                <Line />
                <ul>
                  <li>
                    Barnet kan få støtte fra sats {data.satsNr}: {data.satsBeskrivelse}
                  </li>
                  <li>Barnet har krav på brillestøtte på kr. {data.belop.toFixed(2).replace('.', ',')}</li>
                </ul>
                <Heading level="1" size="small">
                  Krav om direkte oppgjør fra NAV på kr. {data.belop.toFixed(2).replace('.', ',')}
                </Heading>
              </div>
            </Panel>
          </>
        )}
      </main>
    </DontPrintHelper>
  )
}

const Line = () => {
  return <hr style={{ borderTop: '1px solid #707070' }} />
}

interface DatumHelperProps {
  label: string
  children?: Nullable<ReactNode>
}

const DatumHelper = (props: DatumHelperProps) => {
  return (
    <Datum label={props.label}>{props.children && <span style={{ marginLeft: '1rem' }}>{props.children}</span>}</Datum>
  )
}

export const DontPrintHelper = styled.div<{ labelColumnWidth?: number }>`
  @media print {
    .dontPrintMe {
      display: none;
    }
  }
`
