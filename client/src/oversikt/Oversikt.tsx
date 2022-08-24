import { useGet } from '../useGet'
import ScrollToTop from '../components/ScrollToTop'
import { GuidePanel, LinkPanel, Alert, Loader, Pagination, Detail, Heading, Tag } from '@navikt/ds-react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { OversiktResponse } from '../types'
import { Dato } from '../components/Dato'

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
          Innsendte krav
        </Heading>
        <GuidePanel poster>Dette er en oversikt over krav om direkte oppgjør du har sendt inn til NAV.</GuidePanel>
        {!data && !error && (
          <Loader
            variant="neutral"
            size="3xlarge"
            title="Laster krav..."
            style={{ display: 'block', margin: '2rem auto' }}
          />
        )}
        {!error && data && data.items.length == 0 && (
          <div style={{ marginTop: '2rem' }}>
            <Alert variant="info" size="medium">
              Vi har ingen krav å vise her akkurat nå.
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
                    <LinkPanel onClick={() => navigate('/oversikt/' + it.id)} border style={{ cursor: 'pointer' }}>
                      <LinkPanel.Title>{it.barnsNavn}</LinkPanel.Title>
                      <LinkPanel.Description>
                        Innsendt: <Dato verdi={it.opprettet}></Dato>
                        {it.annullert && (
                          <div>
                            <Tag variant="warning" size="small">
                              Annullert <Dato verdi={it.annullert}></Dato>
                            </Tag>
                          </div>
                        )}
                        {it.utbetalingsdato && (
                          <div>
                            <Tag variant="success" size="small">
                              Utbetalt <Dato verdi={it.utbetalingsdato}></Dato>
                            </Tag>
                          </div>
                        )}
                      </LinkPanel.Description>
                    </LinkPanel>
                  </li>
                )
              })}
            </ul>
            <div style={{ textAlign: 'right', margin: '1rem 0 2rem' }}>
              <Detail>
                Viser {(currPage - 1) * data.itemsPerPage + 1}-{Math.min(currPage * data.itemsPerPage, data.totalItems)}{' '}
                av {data.totalItems} krav
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
