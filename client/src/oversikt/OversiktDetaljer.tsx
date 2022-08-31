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
import { Trans, useTranslation } from 'react-i18next'
import { LenkeMedLogging } from '../components/LenkeMedLogging'

export function OversiktDetaljer() {
  let { vedtakId } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()

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
            title={t('oversikt.laster')}
            style={{ display: 'block', margin: '2rem auto' }}
          />
        )}
        {!error && data && (
          <>
            {data.annullert && (
              <div style={{ marginBottom: '1rem' }}>
                <Tag variant="warning" size="small">
                  {t('oversikt.annullert')} <Dato verdi={data.annullert}></Dato>
                </Tag>
              </div>
            )}
            {data.utbetalingsdato && (
              <div style={{ marginBottom: '1rem' }}>
                <Tag variant="success" size="small">
                  {t('oversikt.utbetalt')} <Dato verdi={data.utbetalingsdato}></Dato>
                </Tag>
              </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
              <Heading
                level="1"
                size="large"
                style={{ display: 'inline-block', marginRight: '1rem', margin: '0.1em 0' }}
              >
                {t('oversikt.krav_detaljer.overskrift')} {data.barnsNavn}
              </Heading>
              <div className="dontPrintMe">
                <Button icon={<Print aria-hidden />} variant="secondary" size="medium" onClick={handlePrint}>
                  {t('oversikt.krav_detaljer.meny.utskrift')}
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
                        <Print aria-hidden /> {t('oversikt.krav_detaljer.meny.utskrift')}
                      </Dropdown.Menu.List.Item>
                      {!data.annullert && (
                        <>
                          <Dropdown.Menu.Divider />
                          <Dropdown.Menu.List.Item ref={annullerRef}>
                            <Delete aria-hidden /> {t('oversikt.krav_detaljer.meny.annuller')}
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
                  {t('krav.overskrift_foretaket')}
                </Heading>
                <Line />
                <Data>
                  <DatumHelper label={t('krav.ledetekst_orgnavn')}>{data.orgnavn}</DatumHelper>
                  <DatumHelper label={t('krav.ledetekst_orgnr')}>{data.orgnr}</DatumHelper>
                </Data>
              </div>
              <div style={{ marginTop: '2rem' }}>
                <Heading level="1" size="medium">
                  {t('krav.overskrift_barn')}
                </Heading>
                <Line />
                <Data>
                  <DatumHelper label={t('krav.ledetekst_navn')}>{data.barnsNavn}</DatumHelper>
                  <DatumHelper label={t('krav.ledetekst_fnr')}>{data.barnsFnr}</DatumHelper>
                  <DatumHelper label={t('krav.ledetekst_alder')}>{data.barnsAlder} år</DatumHelper>
                </Data>
              </div>
              <div style={{ marginTop: '2rem' }}>
                <Heading level="1" size="medium">
                  {t('krav.overskrift_brillestyrke')}
                </Heading>
                <Line />
                <Data>
                  <DatumHelper label={t('krav.ledetekst_høyre_sfære')}>
                    {data.høyreSfære.toFixed(2).replace('.', ',')}
                  </DatumHelper>
                  <DatumHelper label={t('krav.ledetekst_høyre_sylinder')}>
                    {data.høyreSylinder.toFixed(2).replace('.', ',')}
                  </DatumHelper>
                  <DatumHelper label={t('krav.ledetekst_venstre_sfære')}>
                    {data.venstreSfære.toFixed(2).replace('.', ',')}
                  </DatumHelper>
                  <DatumHelper label={t('krav.ledetekst_venstre_sylinder')}>
                    {data.venstreSylinder.toFixed(2).replace('.', ',')}
                  </DatumHelper>
                </Data>
              </div>
              <div style={{ marginTop: '2rem' }}>
                <Heading level="1" size="medium">
                  {t('krav.overskrift_om_brillen')}
                </Heading>
                <Line />
                <Data>
                  <DatumHelper label={t('krav.ledetekst_bestillingsdato_alt')}>
                    <Dato verdi={data.bestillingsdato} />
                  </DatumHelper>
                  <DatumHelper label={t('oversikt.krav_detaljer.ledetekst_krav_innsendt')}>
                    <Dato verdi={data.opprettet} />
                  </DatumHelper>
                  <DatumHelper label={t('krav.ledetekst_brillepris_alt')}>
                    {beløp.formater(data.brillepris)}
                  </DatumHelper>
                  <DatumHelper label={t('krav.ledetekst_bestillingsreferanse')}>
                    {data.bestillingsreferanse}
                  </DatumHelper>
                </Data>
              </div>
              <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
                <Heading level="1" size="medium">
                  {t('oversikt.krav_detaljer.overskrift_om_kravet')}
                </Heading>
                <Line />
                <ul>
                  <li>
                    {t('krav.brillestøtte_sats', {
                      sats: data.satsNr,
                      satsBeskrivelse: data.satsBeskrivelse,
                    })}
                  </li>
                  <li>
                    {t('oversikt.krav_detaljer.brillestøtte_i_kr', {
                      beløp: beløp.formater(data.beløp),
                    })}
                  </li>
                </ul>
                <Heading level="1" size="small">
                  {t('oversikt.krav_detaljer.krav_om_direkte_oppgjør', {
                    beløp: beløp.formater(data.beløp),
                  })}
                </Heading>
                {!data.utbetalingsdato && !data.annullert && (
                  <Alert variant="info" size="medium" fullWidth style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    {t('oversikt.utbetalingsstatus.ikke_utbetalt')}
                  </Alert>
                )}
                {data.annullert && (
                  <Alert variant="warning" size="medium" fullWidth style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    {t('oversikt.utbetalingsstatus.annullert')} <Dato verdi={data.annullert} />.
                  </Alert>
                )}
                {data.utbetalingsdato && (
                  <Alert variant="success" size="medium" fullWidth style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    {t('oversikt.utbetalingsstatus.utbetalt')} <Dato verdi={data.utbetalingsdato} />.
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
                      {t('oversikt.annuller_modal.overskrift')}
                    </Heading>
                    <BodyLong spacing>{t('oversikt.annuller_modal.ingress')}</BodyLong>
                    <Heading level="2" size="medium">
                      {t('oversikt.annuller_modal.konsekvenser')}
                    </Heading>
                    <BodyLong spacing>
                      <ul>
                        <li>{t('oversikt.annuller_modal.konsekvenser_beskrivelse1')}</li>
                        <li>
                          {t('oversikt.annuller_modal.konsekvenser_beskrivelse2', {
                            år: new Date(data.bestillingsdato).getFullYear(),
                          })}
                        </li>
                        <li>{t('oversikt.annuller_modal.konsekvenser_beskrivelse3')}</li>
                      </ul>
                    </BodyLong>

                    <Knapper>
                      <Button icon={<Delete aria-hidden />} variant="danger">
                        {t('oversikt.annuller_modal.knapp_annuller')}
                      </Button>
                      <Button variant="secondary" onClick={() => setModalDeleteOpen(false)}>
                        {t('oversikt.annuller_modal.knapp_lukk')}
                      </Button>
                    </Knapper>
                  </main>
                )}
                {data.utbetalingsdato && (
                  <main>
                    <Heading spacing level="1" size="large">
                      {t('oversikt.annuller_modal.allerede_utbetalt_overskrift')}
                    </Heading>
                    <BodyLong spacing>{t('oversikt.annuller_modal.allerede_utbetalt_beskrivelse1')}</BodyLong>
                    <BodyLong spacing>
                      <Trans t={t} i18nKey="oversikt.annuller_modal.allerede_utbetalt_beskrivelse2">
                        <></>
                        <LenkeMedLogging
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
                          <></>
                        </LenkeMedLogging>
                        <></>
                      </Trans>
                    </BodyLong>
                    <Knapper>
                      <Button variant="secondary" onClick={() => setModalDeleteOpen(false)}>
                        {t('oversikt.annuller_modal.knapp_lukk')}
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
