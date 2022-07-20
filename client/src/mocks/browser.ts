import { RequestHandler, rest, setupWorker } from 'msw'
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

let godtattVilkår: boolean = false

const handlers: RequestHandler[] = [
  rest.post<BeregnSatsRequest, {}, BeregnSatsResponse>('/api/brillesedler', (req, res, ctx) => {
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

  rest.post<HentInnbyggerRequest, {}, HentInnbyggerResponse>('/api/innbyggere/sok', (req, res, ctx) => {
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

  rest.get<{}, {}, TidligereBrukteVirksomheterResponse>('/api/virksomheter', (req, res, ctx) => {
    return res(
      ctx.json({
        //  sistBrukteOrganisasjon: undefined,
       sistBrukteOrganisasjon: {
         orgnr: '123456789',
         navn: 'Brillehuset Kristiansand',
          adresse: 'Kristiansandveien 123',
          aktiv: true
         },
        tidligereBrukteOrganisasjoner: [
          {
            orgnr: '123456789',
            navn: 'Brillehuset Kristiansand',
            adresse: 'Kristiansandveien 123',
            aktiv: true
          },
        ],
      })
    )
  }),

  rest.get<{}, { orgnr: string }, VirksomhetResponse>('/api/virksomheter/:orgnr', (req, res, ctx) => {
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
  rest.get<{}, {}, HarLestOgGodtattVilkårResponse>('/api/innsendere', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ godtatt: godtattVilkår }))
  }),
  rest.post<{}, {}, {}>('/api/innsendere', (req, res, ctx) => {
    godtattVilkår = true
    return res(ctx.status(200), ctx.json({}))
  }),
  rest.post<VilkårsgrunnlagRequest, {}, VilkårsgrunnlagResponse>('/api/vilkarsgrunnlag', (req, res, ctx) => {
    const { body } = req

    const beregnSatsResponse = beregnSats(body.brilleseddel)

    if (body.fnrBarn === '123') {
      return res(
        ctx.json({
          resultat: VilkårsgrunnlagResultat.NEI,
          beløp: '0',
          ...beregnSatsResponse,
        })
      )
    }

    return res(
      ctx.json({
        resultat: VilkårsgrunnlagResultat.JA,
        beløp: beregnSatsResponse.satsBeløp,
        ...beregnSatsResponse,
      })
    )
  }),

  rest.post<OpprettKravRequest, {}, OpprettKravResponse>('/api/krav', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: '6429',
        orgnr: '987654321',
        bestillingsdato: new Date().toISOString(),
        brillepris: '4200',
        bestillingsreferanse: '694296',
        behandlingsresultat: 'innvilget',
        sats: SatsType.SATS_2,
        satsBeløp: '1800',
        satsBeskrivelse: 'Briller med sfærisk styrke på minst ett glass ≥ 4,25D ≤ 6,00D og cylinderstyrke ≤ 4,00D',
        beløp: '1800',
        opprettet: new Date().toISOString(),
      })
    )
  }),
]

export const worker = setupWorker(...handlers)
