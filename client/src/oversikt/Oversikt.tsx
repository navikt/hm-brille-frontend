import { useGet } from "../useGet"
import ScrollToTop from "../components/ScrollToTop"
import { Button, GuidePanel, LinkPanel, Alert, Loader, Pagination, Detail } from "@navikt/ds-react"
import { Back } from "@navikt/ds-icons"
import React, { useState } from "react"
import {useNavigate} from "react-router-dom"
import { OversiktResponse } from "../types"

export function Oversikt() {
    const navigate = useNavigate()
    let [ currPage, setCurrPage ] = useState(1)

    const {
        data,
        error,
    } = useGet<OversiktResponse>('/oversikt?page=' + currPage)

    return (
        <>
            <ScrollToTop />
            <main>
                <Button
                    variant="tertiary"
                    size="medium"
                    onClick={() => {
                        navigate('/')
                    }}
                >
                    <Back aria-hidden /> Tilbake
                </Button>
                <h1>Innsendte krav</h1>
                <GuidePanel poster>
                    Dette er en oversikt over krav om direkte oppgjør du har sendt inn til NAV. Sakene vises i 4 uker etter at kravet er utbetalt av NAV. Ingen saker som er eldre enn 6 måneder vises i oversikten.
                </GuidePanel>
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
                            Vi har ingen krav å vise her akkurat nå. Krav vises i fire uker etter de er utbetalt.
                        </Alert>
                    </div>
                )}
                {!error && data && data.items.length > 0 && (
                    <>
                        <ul style={{
                            listStyleType: 'none',
                            paddingInlineStart: 0
                        }}>
                            {data?.items.map((it, idx) => {
                                return (
                                    <li key={idx} style={{ margin: '0.5rem 0' }}>
                                        <LinkPanel onClick={ () => navigate('/oversikt/' + it.vedtakId) } border style={{ cursor: 'pointer' }}>
                                            <LinkPanel.Title>
                                                {it.name}
                                            </LinkPanel.Title>
                                            <LinkPanel.Description>
                                                {it.description}
                                            </LinkPanel.Description>
                                        </LinkPanel>
                                    </li>
                                )
                            })}
                      </ul>
                        <div style={{ textAlign: 'right', margin: '1rem 0 2rem' }}>
                            <Detail>Viser {(currPage-1)*data.itemsPerPage + 1}-{Math.min(currPage*data.itemsPerPage, data.totalItems)} av {data.totalItems} krav</Detail>
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
