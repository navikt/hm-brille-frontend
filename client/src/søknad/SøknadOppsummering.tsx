import { Alert, BodyLong, Heading } from '@navikt/ds-react'
import { useEffect } from 'react'
import { Avstand } from '../components/Avstand'
import { Data } from '../components/Data'
import { Datum } from '../components/Datum'
import { useApplicationContext } from '../state/ApplicationContext'
import { SatsType, VilkårsgrunnlagRequest, VilkårsgrunnlagResponse, VilkårsgrunnlagResultat } from '../types'
import { usePost } from '../usePost'
import { MAX_SFÆRE, MAX_SYLINDER } from './config'
import { FormatertStyrke } from './FormatertStyrke'
import { SendInnSøknad } from './SendInnSøknad'
import { SøknadSteg } from './SøknadSteg'

export function SøknadOppsummering() {
  const { appState } = useApplicationContext()
  const {
    post: vurderVilkår,
    data: vilkårsvurdering,
    loading: vilkårsvurderingLoading,
  } = usePost<VilkårsgrunnlagRequest, VilkårsgrunnlagResponse>('/vilkarsgrunnlag')

  const formaterDato = (datoString: string): string => {
    const [day, month, year] = datoString.split('.')
    return `${year}-${month}-${day}`
  }

  const vilkårsgrunnlag: VilkårsgrunnlagRequest = {
    orgnr: appState.orgnr,
    fnrBruker: appState.innbyggerFnr,
    brilleseddel: appState.brillestyrke,
    bestillingsdato: formaterDato(appState.bestillingsdato),
    brillepris: parseFloat(appState.brillepris),
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    vurderVilkår(vilkårsgrunnlag)
  }, [])

  if (!vilkårsvurdering) {
    return null
  }

  const kanSøke = vilkårsvurdering.resultat === VilkårsgrunnlagResultat.JA || window.appSettings.MILJO !== 'prod-gcp'

  return (
    <SøknadSteg>
      <Heading level="2" size="medium">
        Barn
      </Heading>
      <Data>
        <Datum label="Fødselsnummer">{appState.innbyggerFnr}</Datum>
        <Datum label="Navn">{appState.innbyggerNavn}</Datum>
        <Datum label="Alder">{appState.innbyggerAlder}</Datum>
      </Data>
      <Heading level="2" size="medium">
        Brillestyrke
      </Heading>
      <Data>
        <Datum label="Høyre sfære">
          <FormatertStyrke verdi={appState.brillestyrke.høyreSfære} max={MAX_SFÆRE} />
        </Datum>
        <Datum label="Høyre sylinder">
          <FormatertStyrke verdi={appState.brillestyrke.høyreSylinder} max={MAX_SYLINDER} minus />
        </Datum>
        <Datum label="Venstre sfære">
          <FormatertStyrke verdi={appState.brillestyrke.venstreSfære} max={MAX_SFÆRE} />
        </Datum>
        <Datum label="Venstre sylinder">
          <FormatertStyrke verdi={appState.brillestyrke.venstreSylinder} max={MAX_SYLINDER} minus />
        </Datum>
      </Data>
      <Heading level="2" size="medium">
        Annet
      </Heading>
      <Data>
        <Datum label="Organisasjonsnummer">{appState.orgnr}</Datum>
        <Datum label="Bestillingsdato">{appState.bestillingsdato}</Datum>
        <Datum label="Pris på brille">{vilkårsgrunnlag.brillepris}</Datum>
        <Datum label="Bestillingsreferanse">{appState.bestillingsreferanse}</Datum>
      </Data>
      <Avstand paddingBottom={5} paddingTop={5}>
        {vilkårsvurdering.sats === SatsType.INGEN ? (
          <Alert variant="warning">
            <BodyLong>Vilkårene er ikke oppfylt</BodyLong>
          </Alert>
        ) : (
          <Alert variant="info">
            <Heading
              level="2"
              spacing
              size="small"
            >{`Brillestøtte på opp til ${vilkårsvurdering.beløp} kroner`}</Heading>
            <BodyLong>{`Barnet kan få støtte fra sats ${vilkårsvurdering.sats.replace('SATS_', '')}: ${
              vilkårsvurdering.satsBeskrivelse
            }`}</BodyLong>
          </Alert>
        )}
      </Avstand>
      {kanSøke && <SendInnSøknad vilkårsgrunnlag={vilkårsgrunnlag} />}
    </SøknadSteg>
  )
}
