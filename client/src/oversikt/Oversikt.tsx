import { useGet } from '../useGet'
import ScrollToTop from '../components/ScrollToTop'
import { LinkPanel, Alert, Loader, Pagination, Detail, Heading, Tag } from '@navikt/ds-react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { OversiktResponse } from '../types'
import { Dato } from '../components/Dato'
import { useTranslation } from 'react-i18next'

function useQuery() {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

export function Oversikt() {
  const navigate = useNavigate()
  let setCurrPage = (page: number) => navigate('/oversikt?page=' + page)

  let query = useQuery()
  let currPage = parseInt(query.get('page') || '1')
  if (!currPage || isNaN(currPage)) setCurrPage(1)

  const { data, error } = useGet<OversiktResponse>('/oversikt?page=' + currPage)

  const { t } = useTranslation()

  return (
    <>
      <ScrollToTop />
      <main>
        {/* <Link
          onClick={() => {
            navigate('/')
          }}
          className="dontPrintMe"
          style={{ cursor: 'pointer', fontSize: '1.1em' }}
        >
          <Back aria-hidden /> Tilbake
        </Link> */}
        <Heading level="1" size="large" style={{ marginRight: '1rem', margin: '0.1em 0' }}>
          {t('oversikt.overskrift')}
        </Heading>
        {!data && !error && (
          <Loader
            variant="neutral"
            size="3xlarge"
            title={t('oversikt.laster')}
            style={{ display: 'block', margin: '2rem auto' }}
          />
        )}
        {!error && data && data.items.length == 0 && (
          <div style={{ marginTop: '2rem' }}>
            <Alert variant="info" size="medium">
              {t('oversikt.ingen_krav')}
            </Alert>
          </div>
        )}
        {!error && data && data.items.length > 0 && (
          <>
            <ul
              style={{
                listStyleType: 'none',
                paddingInlineStart: 0,
              }}
            >
              {data?.items.map((it, idx) => {
                return (
                  <li key={idx} style={{ margin: '0.5rem 0' }}>
                    <LinkPanel
                      onClick={() => navigate('/oversikt/' + it.id)}
                      style={{ cursor: 'pointer' }}
                      border={false}
                    >
                      <LinkPanel.Title className="navds-heading--small"> {it.barnsNavn} </LinkPanel.Title>
                      {/* TODO: Følge designsystemet og ha svart overskrift som blir blå ved mouseOver? */}
                      <LinkPanel.Description>
                        {t('oversikt.krav_beskrivelse_linje1')} <Dato verdi={it.opprettet}></Dato>
                        <br />
                        {t('oversikt.krav_beskrivelse_linje2', {
                          orgnavn: it.orgnavn,
                          bestillingsreferanse: it.bestillingsreferanse,
                        })}
                        {it.slettet && (
                          <div>
                            <Tag variant="warning" size="small">
                              {t('oversikt.slettet')} <Dato verdi={it.slettet}></Dato>
                            </Tag>
                          </div>
                        )}
                        {it.utbetalingsdato && (
                          <div>
                            <Tag variant="success" size="small">
                              {t('oversikt.utbetalt')} <Dato verdi={it.utbetalingsdato}></Dato>
                            </Tag>
                          </div>
                        )}
                      </LinkPanel.Description>
                    </LinkPanel>
                    <hr />
                  </li>
                )
              })}
            </ul>
            <div style={{ textAlign: 'right', margin: '1rem 0 2rem' }}>
              <Detail>
                {t('oversikt.pagination', {
                  totalItems: data.totalItems,
                  fromRow: (currPage - 1) * data.itemsPerPage + 1,
                  toRow: Math.min(currPage * data.itemsPerPage, data.totalItems),
                })}
              </Detail>
            </div>
            {data.numberOfPages > 1 && (
              <Pagination
                size="medium"
                page={currPage}
                onPageChange={(x) => setCurrPage(x)}
                count={data.numberOfPages}
                boundaryCount={1}
                siblingCount={1}
                prevNextTexts
                style={{ justifyContent: 'center' }}
              />
            )}
          </>
        )}
      </main>
    </>
  )
}
