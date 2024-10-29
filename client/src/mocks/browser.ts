import { http, HttpResponse, RequestHandler } from 'msw'
import { apiUrl } from '../http'
import {
  BeregnSatsRequest,
  BeregnSatsResponse,
  HarLestOgGodtattVilkårResponse,
  HentInnbyggerRequest,
  HentInnbyggerResponse,
  OpprettKravRequest,
  OpprettKravResponse,
  SatsType,
  TidligereBrukteVirksomheterResponse,
  VilkårsgrunnlagRequest,
  VilkårsgrunnlagResponse,
  VilkårsgrunnlagResultat,
  VirksomhetResponse,
} from '../types'
import { beregnSats } from './beregnSats'
import { handlers as mocksForOptikersOversiktHandlers } from './mocksForOptikersOversikt'
import { setupWorker } from "msw/browser";

let godtattVilkår: boolean = false

const handlers: RequestHandler[] = [
  http.post<{}, BeregnSatsRequest, BeregnSatsResponse>(apiUrl('/brillesedler'), async ({ request }) => {
    const req = await request.json()
    return HttpResponse.json(
      beregnSats({
        høyreSfære: req.høyreSfære,
        høyreSylinder: req.høyreSylinder,
        venstreSfære: req.venstreSfære,
        venstreSylinder: req.venstreSylinder,
      })
    )
  }),

  http.post<{}, HentInnbyggerRequest, HentInnbyggerResponse>(apiUrl('/innbyggere/sok'), async ({ request }) => {
    const req = await request.json()
    const { fnr } = req

    if (fnr === '08887799742') {
      return HttpResponse.json({
          fnr,
          navn: 'Ole Brumm',
          alder: 55,
        }
      )
    }

    return HttpResponse.json(
      {
        fnr,
        navn: 'Albert Åberg',
        alder: 12,
      }
    )
  }),

  http.get<{}, {}, TidligereBrukteVirksomheterResponse>(apiUrl('/virksomheter'), (request) => {
    return HttpResponse.json(
      {
        //  sistBrukteOrganisasjon: undefined,
        sistBrukteOrganisasjon: {
          orgnr: '108271914',
          navn: 'Brillehuset Kristiansand',
          adresse: 'Kristiansandveien 123',
          aktiv: false,
        },
        tidligereBrukteOrganisasjoner: [
          {
            orgnr: '108271914',
            navn: 'Brillehuset Kristiansand',
            adresse: 'Kristiansandveien 123',
            aktiv: true,
          },
          {
            orgnr: '384243762',
            navn: 'Klokker, gull og armatur AS',
            adresse: 'Strømmensveien 123',
            aktiv: true,
          },
          {
            orgnr: '092746712',
            navn: 'Brillesjø AS',
            adresse: 'Brillefinveien 123',
            aktiv: true,
          },
        ],
      }
    )
  }),

  http.get<{ orgnr: string }, {}, VirksomhetResponse>(apiUrl('/virksomheter/:orgnr'), ({ params }) => {


    const orgnr = params.orgnr

    if (orgnr === '404') {
      return HttpResponse.json(
        {
          navn: 'Manglerud Avtale',
          orgnr: '978875076',
          aktiv: false,
          adresse: 'Mangerudveien 6, 0942 Oslo',
        }
      )
    }

    return HttpResponse.json(
      {
        orgnr: '092746712',
        navn: 'Brillesjø AS',
        aktiv: true,
        adresse: 'Osloveien 1, 0942 Oslo',
      }
    )
  }),
  http.get<{}, {}, HarLestOgGodtattVilkårResponse>(apiUrl('/innsendere'), () => {
    return HttpResponse.json({ godtatt: godtattVilkår })
  }),
  http.post<{}, {}, {}>(apiUrl('/innsendere'), () => {
    godtattVilkår = true
    return HttpResponse.json(({}))
  }),
  http.post<{}, VilkårsgrunnlagRequest, VilkårsgrunnlagResponse>(apiUrl('/vilkarsgrunnlag'), async ({ request }) => {
    const { fnrBarn, brillepris, brilleseddel } = await request.json()

    const beregnSatsResponse = beregnSats(brilleseddel, brillepris)

    if (fnrBarn === '08887799742') {
      return HttpResponse.json(
        {
          resultat: VilkårsgrunnlagResultat.NEI,
          ...beregnSatsResponse,
          sats: SatsType.INGEN,
        }
      )
    }

    if (fnrBarn === '20071359671') {
      return HttpResponse.json(
        {
          resultat: VilkårsgrunnlagResultat.NEI,
          ...beregnSatsResponse,
          sats: SatsType.INGEN,
          kravFraFørFraInnsender: 'bassa',
        }
      )
    }

    return HttpResponse.json(
      {
        resultat: VilkårsgrunnlagResultat.JA,
        ...beregnSatsResponse,
      }
    )
  }),

  http.post<{}, OpprettKravRequest, OpprettKravResponse>(apiUrl('/krav'), async ({ request }) => {
    const { bestillingsreferanse, vilkårsgrunnlag } = await request.json()
    const beregnSatsResponse = beregnSats(vilkårsgrunnlag.brilleseddel, vilkårsgrunnlag.brillepris)
    return HttpResponse.json(
      {
        id: '6429',
        orgnr: vilkårsgrunnlag.orgnr,
        bestillingsdato: vilkårsgrunnlag.bestillingsdato,
        brillepris: vilkårsgrunnlag.brillepris.toString(),
        bestillingsreferanse,
        behandlingsresultat: 'INNVILGET',
        opprettet: new Date().toISOString(),
        ...beregnSatsResponse,
      }, { status: 201 }
    )
  }),
  ...mocksForOptikersOversiktHandlers,
]

export const worker = setupWorker(...handlers)
