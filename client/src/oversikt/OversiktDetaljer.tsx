import { useNavigate, useParams } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'
import { Button, Panel, Heading, Loader, Link, Alert, Modal, BodyLong, Tag } from '@navikt/ds-react'
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
import { beløp } from '../beløp'

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
  const annullerRef = useRef<HTMLButtonElement>(null)
  const dropdownOnSelect = (e: React.MouseEvent) => {
    switch (e.target) {
      case skrivUtRef.current:
        handlePrint()
        break
      case annullerRef.current:
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
            {data.annullert && (
              <div style={{ marginBottom: '1rem' }}>
                <Tag variant="warning" size="small">
                  Annullert <Dato verdi={data.annullert}></Dato>
                </Tag>
              </div>
            )}
            {data.utbetalingsdato && (
              <div style={{ marginBottom: '1rem' }}>
                <Tag variant="success" size="small">
                  Utbetalt <Dato verdi={data.utbetalingsdato}></Dato>
                </Tag>
              </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
              <Heading
                level="1"
                size="large"
                style={{ display: 'inline-block', marginRight: '1rem', margin: '0.1em 0' }}
              >
                Krav for {data.barnsNavn}
              </Heading>
              <div className="dontPrintMe">
                <Button icon={<Print aria-hidden />} variant="secondary" size="medium" onClick={handlePrint}>
                  Skriv ut kravet
                </Button>
                {/* @ts-ignore */}
                <Dropdown onSelect={dropdownOnSelect}>
                  <Button
                    icon={<EllipsisV aria-hidden />}
                    variant="secondary"
                    size="medium"
                    className="dontPrintMe"
                    as={Dropdown.Toggle}
                    style={{ marginLeft: '-3px' }}
                  />
                  {/* @ts-ignore */}
                  <Dropdown.Menu>
                    {/* @ts-ignore */}
                    <Dropdown.Menu.List>
                      <Dropdown.Menu.List.Item ref={skrivUtRef}>
                        <Print aria-hidden /> Skriv ut kravet
                      </Dropdown.Menu.List.Item>
                      {!data.annullert && (
                        <>
                          <Dropdown.Menu.Divider />
                          <Dropdown.Menu.List.Item ref={annullerRef}>
                            <Delete aria-hidden /> Annuller kravet
                          </Dropdown.Menu.List.Item>
                        </>
                      )}
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
                  <DatumHelper label="Pris på brille">{beløp.formater(data.brillepris)}</DatumHelper>
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
                  <li>Barnet har krav på brillestøtte på {beløp.formater(data.beløp)}</li>
                </ul>
                <Heading level="1" size="small">
                  Krav om direkte oppgjør fra NAV på {beløp.formater(data.beløp)}
                </Heading>
                {!data.utbetalingsdato && !data.annullert && (
                  <Alert variant="info" size="medium" fullWidth style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    Kravet er ikke utbetalt enda.
                  </Alert>
                )}
                {data.annullert && (
                  <Alert variant="warning" size="medium" fullWidth style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    Kravet ble annullert <Dato verdi={data.annullert} />.
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
              aria-label="Annuller krav dialog"
              onClose={() => setModalDeleteOpen((x) => !x)}
            >
              <Modal.Content>
                {!data.utbetalingsdato && (
                  <main>
                    <Heading spacing level="1" size="large">
                      Er du sikker på at du vil annullere kravet?
                    </Heading>
                    <BodyLong spacing>
                      Her kan du annullere et krav. Det kan for eksempel være fordi du ikke ønsker å sende inn kravet
                      likevel eller for å sende inn et nytt krav med korrigerte opplysninger.
                    </BodyLong>
                    <Heading level="2" size="medium">
                      Konsekvenser
                    </Heading>
                    <BodyLong spacing>
                      <ul>
                        <li>Optiker vil ikke få refundert penger fra NAV uten å sende inn et nytt krav</li>
                        <li>
                          Barnets rettighet til brillestøtte for {new Date(data.bestillingsdato).getFullYear()} vil være
                          ubrukt etter annullering
                        </li>
                        <li>
                          Hvis brillens bestillingsdato nå er eldre enn seks måneder vil man ikke kunne sende inn kravet
                          på nytt
                        </li>
                      </ul>
                    </BodyLong>

                    <Knapper>
                      <Button icon={<Delete aria-hidden />} variant="danger">
                        Annuller kravet
                      </Button>
                      <Button variant="secondary" onClick={() => setModalDeleteOpen(false)}>
                        Lukk
                      </Button>
                    </Knapper>
                  </main>
                )}
                {data.utbetalingsdato && (
                  <main>
                    <Heading spacing level="1" size="large">
                      Kravet er utbetalt og kan ikke annulleres
                    </Heading>
                    <BodyLong spacing>
                      Etter at kravet er sendt til utbetaling av NAV kan det ikke annulleres i denne
                      selvbetjeningsløsningen.
                    </BodyLong>
                    <BodyLong spacing>
                      Dersom du likevel trenger å annullere kravet vil beløpet måtte tilbakebetales av mottaker. Ta
                      kontakt med NAV ved å trykke{' '}
                      <a
                        href={
                          'mailto:digihot@nav.no?subject=Brillekrav ønskes annullert: ' +
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
                          'Beskriv hvorfor kravet ønskes annullert under linjen: %0A' +
                          '-------------------------------------------------------------------------- %0A%0A'
                        }
                      >
                        her
                      </a>
                      .
                    </BodyLong>
                    <Knapper>
                      <Button variant="secondary" onClick={() => setModalDeleteOpen(false)}>
                        Lukk
                      </Button>
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
