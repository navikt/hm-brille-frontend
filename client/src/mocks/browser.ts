import { RequestHandler, rest, setupWorker } from 'msw'
import { apiUrl } from '../http'
import {
  BeregnSatsRequest,
  BeregnSatsResponse,
  HarLestOgGodtattVilkårResponse,
  HentInnbyggerRequest,
  HentInnbyggerResponse,
  OpprettKravRequest,
  OpprettKravResponse,
  TidligereBrukteVirksomheterResponse,
  VilkårsgrunnlagRequest,
  VilkårsgrunnlagResponse,
  VilkårsgrunnlagResultat,
  VirksomhetResponse,
} from '../types'
import { beregnSats } from './beregnSats'
import {FeatureToggles} from "../FeatureToggleProvider";

let godtattVilkår: boolean = false

const handlers: RequestHandler[] = [
  rest.post<BeregnSatsRequest, {}, BeregnSatsResponse>(apiUrl('/brillesedler'), (req, res, ctx) => {
    return res(
      ctx.json(
        beregnSats({
          høyreSfære: req.body.høyreSfære,
          høyreSylinder: req.body.høyreSylinder,
          venstreSfære: req.body.venstreSfære,
          venstreSylinder: req.body.venstreSylinder,
        })
      )
    )
  }),

  rest.post<HentInnbyggerRequest, {}, HentInnbyggerResponse>(apiUrl('/innbyggere/sok'), (req, res, ctx) => {
    const { fnr } = req.body
    if (fnr === '123') {
      return res(
        ctx.json({
          fnr,
          navn: 'Pippi Langstrømpe',
          alder: 9,
        })
      )
    }
    if (fnr === '456') {
      return res(
        ctx.json({
          fnr,
          navn: 'Ole Brumm',
          alder: 18,
        })
      )
    }
    return res(
      ctx.json({
        fnr,
        navn: 'Albert Åberg',
        alder: 12,
      })
    )
  }),

  rest.get<{}, {}, TidligereBrukteVirksomheterResponse>(apiUrl('/virksomheter'), (req, res, ctx) => {
    return res(
      ctx.json({
        //  sistBrukteOrganisasjon: undefined,
        sistBrukteOrganisasjon: {
          orgnr: '123456789',
          navn: 'Brillehuset Kristiansand',
          adresse: 'Kristiansandveien 123',
          aktiv: true,
        },
        tidligereBrukteOrganisasjoner: [
          {
            orgnr: '123456789',
            navn: 'Brillehuset Kristiansand',
            adresse: 'Kristiansandveien 123',
            aktiv: true,
          },
          {
            orgnr: '112233445',
            navn: 'Klokker, gull og armatur AS',
            adresse: 'Strømmensveien 123',
            aktiv: true,
          },
          {
            orgnr: '54433221',
            navn: 'Brillelsjø AS',
            adresse: 'Brillefinveien 123',
            aktiv: true,
          },
        ],
      })
    )
  }),

  rest.get<{}, { orgnr: string }, VirksomhetResponse>(apiUrl('/virksomheter/:orgnr'), (req, res, ctx) => {
    const orgnr = req.params.orgnr

    if (orgnr === '404') {
      return res(
        ctx.json({
          navn: 'Manglerud Avtale',
          orgnr: '123456789',
          aktiv: false,
          adresse: 'Mangerudveien 6, 0942 Oslo',
        })
      )
    }

    return res(
      ctx.json({
        orgnr: '987654321',
        navn: 'Brillesjø AS',
        kontonr: '11111111113',
        aktiv: true,
        adresse: 'Osloveien 1, 0942 Oslo',
      })
    )
  }),
  rest.get<{}, {}, HarLestOgGodtattVilkårResponse>(apiUrl('/innsendere'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ godtatt: godtattVilkår }))
  }),
  rest.post<{}, {}, {}>(apiUrl('/innsendere'), (req, res, ctx) => {
    godtattVilkår = true
    return res(ctx.status(200), ctx.json({}))
  }),
  rest.post<VilkårsgrunnlagRequest, {}, VilkårsgrunnlagResponse>(apiUrl('/vilkarsgrunnlag'), (req, res, ctx) => {
    const { body } = req

    const beregnSatsResponse = beregnSats(body.brilleseddel, body.brillepris)

    if (body.fnrBarn === '123') {
      return res(
        ctx.json({
          resultat: VilkårsgrunnlagResultat.NEI,
          ...beregnSatsResponse,
        })
      )
    }

    return res(
      ctx.json({
        resultat: VilkårsgrunnlagResultat.JA,
        ...beregnSatsResponse,
      })
    )
  }),

  rest.post<OpprettKravRequest, {}, OpprettKravResponse>(apiUrl('/krav'), (req, res, ctx) => {
    const { bestillingsreferanse, vilkårsgrunnlag } = req.body
    const beregnSatsResponse = beregnSats(vilkårsgrunnlag.brilleseddel, vilkårsgrunnlag.brillepris)
    return res(
      ctx.status(201),
      ctx.json({
        id: '6429',
        orgnr: vilkårsgrunnlag.orgnr,
        bestillingsdato: vilkårsgrunnlag.bestillingsdato,
        brillepris: vilkårsgrunnlag.brillepris.toString(),
        bestillingsreferanse,
        behandlingsresultat: 'INNVILGET',
        opprettet: new Date().toISOString(),
        ...beregnSatsResponse,
      })
    )
  }),
    rest.get<{}, {}, FeatureToggles>(apiUrl('/features'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            "hm.brille.feilbanner": false
        }))
    }),
]

export const worker = setupWorker(...handlers)
