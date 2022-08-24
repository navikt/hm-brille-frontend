import { useNavigate, useParams } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'
import { Button, Panel, Heading, Loader, Link, Alert, Modal, BodyLong } from '@navikt/ds-react'
import { Back, Print, EllipsisV, Delete } from '@navikt/ds-icons'
import '@navikt/ds-css-internal'
import { Dropdown } from '@navikt/ds-react-internal'
import React, { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { logPrintKravÅpnet, logSkjemaFullfoert } from '../utils/amplitude'
import { Data } from '../components/Data'
import { Datum } from '../components/Datum'
import { ReactNode } from 'react'
import { Nullable, OversiktDetaljerResponse } from '../types'
import { useGet } from '../useGet'
import styled from 'styled-components'
import { Dato } from '../components/Dato'
import { Knapper } from '../components/Knapper'
import { AvbrytKrav } from '../krav/AvbrytKrav'

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

  const skrivUtRef = useRef<HTMLButtonElement>(null)
  const annulerRef = useRef<HTMLButtonElement>(null)
  const dropdownOnSelect = (e: React.MouseEvent) => {
    switch (e.target) {
      case skrivUtRef.current:
        handlePrint()
        break
      case annulerRef.current:
        setModalDeleteOpen(true)
        break
    }
  }

  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)

  return (
    <DontPrintHelper ref={printRef}>
      <ScrollToTop />
      <main>
        {/* <Link
          onClick={() => {
            navigate('/oversikt')
          }}
          className="dontPrintMe"
          style={{ cursor: 'pointer', fontSize: '1.1em', marginBottom: '2rem' }}
        >
          <Back aria-hidden /> Tilbake til oversikten
        </Link> */}
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
              <Heading
                level="1"
                size="large"
                style={{ display: 'inline-block', marginRight: '1rem', margin: '0.1em 0' }}
              >
                Krav for {data.barnsNavn}
              </Heading>
              <div className="dontPrintMe">
                <Button variant="secondary" size="medium" onClick={handlePrint}>
                  <Print aria-hidden />
                  Skriv ut krav
                </Button>
                {/* @ts-ignore */}
                <Dropdown onSelect={dropdownOnSelect}>
                  <Button
                    variant="secondary"
                    size="medium"
                    className="dontPrintMe"
                    as={Dropdown.Toggle}
                    style={{ marginLeft: '-3px' }}
                  >
                    <EllipsisV aria-hidden />
                  </Button>
                  {/* @ts-ignore */}
                  <Dropdown.Menu>
                    {/* @ts-ignore */}
                    <Dropdown.Menu.List>
                      <Dropdown.Menu.List.Item ref={skrivUtRef}>
                        <Print aria-hidden /> Skriv ut krav
                      </Dropdown.Menu.List.Item>
                      <Dropdown.Menu.Divider />
                      <Dropdown.Menu.List.Item ref={annulerRef}>
                        <Delete aria-hidden /> Annulér kravet
                      </Dropdown.Menu.List.Item>
                    </Dropdown.Menu.List>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
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
                  <DatumHelper label="Alder">{data.barnsAlder} år</DatumHelper>
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
                  <DatumHelper label="Bestillingsdato">
                    <Dato verdi={data.bestillingsdato} />
                  </DatumHelper>
                  <DatumHelper label="Krav innsendt">
                    <Dato verdi={data.opprettet} />
                  </DatumHelper>
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
                  <li>Barnet har krav på brillestøtte på kr. {data.beløp.toFixed(2).replace('.', ',')}</li>
                </ul>
                <Heading level="1" size="small">
                  Krav om direkte oppgjør fra NAV på kr. {data.beløp.toFixed(2).replace('.', ',')}
                </Heading>
                {!data.utbetalingsdato && (
                  <Alert variant="info" size="medium" fullWidth style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    Kravet er ikke utbetalt enda.
                  </Alert>
                )}
                {data.utbetalingsdato && (
                  <Alert variant="success" size="medium" fullWidth style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    Kravet er utbetalt <Dato verdi={data.utbetalingsdato} />.
                  </Alert>
                )}
              </div>
            </Panel>
            <Modal
              open={modalDeleteOpen}
              aria-label="Annuler krav dialog"
              onClose={() => setModalDeleteOpen((x) => !x)}
            >
              <Modal.Content>
                {!data.utbetalingsdato && (
                  <main>
                    <Heading spacing level="1" size="large">
                      Er du sikker på at du vil annulere kravet?
                    </Heading>
                    <BodyLong spacing>Optiker vil ikke få refundert kravet</BodyLong>
                    <BodyLong spacing>Barnet har fortsatt en ubrukt rettighet inneværende år</BodyLong>
                    <Knapper>
                      <Button>Annuler kravet</Button>
                      <AvbrytKrav />
                    </Knapper>
                  </main>
                )}
                {data.utbetalingsdato && (
                  <main>
                    <Heading spacing level="1" size="large">
                      Kravet er utbetalt og kan ikke annuleres
                    </Heading>
                    <BodyLong spacing>
                      Etter at kravet er sendt til utbetaling av NAV kan det ikke annuleres i denne
                      selvbetjeningsløsningen.
                    </BodyLong>
                    <BodyLong spacing>
                      Dersom du likevel trenger å annulere kravet vil beløpet måtte tilbakebetales av mottaker. Ta
                      kontakt med NAV ved å trykke{' '}
                      <a
                        href={
                          'mailto:digihot@nav.no?subject=Brillekrav ønskes annulert: ' +
                          data.id +
                          '&body=Detaljer om kravet: %0A' +
                          'NAVs referanse: ' +
                          data.id +
                          '%0A' +
                          'Foretak: ' +
                          data.orgnr +
                          ' ' +
                          data.orgnavn +
                          '%0A' +
                          '%0A' +
                          'Beskriv hvorfor kravet ønskes annulert under linjen: %0A' +
                          '-------------------------------------------------------------------------- %0A%0A'
                        }
                      >
                        her
                      </a>
                      .
                    </BodyLong>
                    <Knapper>
                      <Button variant="secondary" onClick={() => setModalDeleteOpen(false)}>Lukk</Button>
                    </Knapper>
                  </main>
                )}
              </Modal.Content>
            </Modal>
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
