import { RequestHandler, rest, setupWorker } from 'msw'
import {
  BeregnSatsRequest,
  BeregnSatsResponse,
  HentBrukerRequest,
  HentBrukerResponse,
  SøknadRequest,
  SøknadResponse,
  TidligereBrukteVirksomheterResponse,
  VilkårsgrunnlagRequest,
  VilkårsgrunnlagResponse,
  VilkårsgrunnlagResultat,
  VirksomhetResponse,
} from '../types'
import { beregnSats } from './beregnSats'

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

  rest.post<HentBrukerRequest, {}, HentBrukerResponse>('/api/innbyggere/sok', (req, res, ctx) => {
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
        sistBrukteOrganisasjon: {
          orgnr: '123456789',
          navn: 'Brillehuset Kristiansand',
          beliggenhetsadresse: 'Kristiansandveien 123',
          forretningsadresse: 'Kristiansandveien 123',
        },
        tidligereBrukteOrganisasjoner: [
          {
            orgnr: '123456789',
            navn: 'Brillehuset Kristiansand',
            beliggenhetsadresse: 'Kristiansandveien 123',
            forretningsadresse: 'Kristiansandveien 123',
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
          orgNavn: 'Manglerud Avtale',
          orgnr: '123456789',
          kontonr: '11111111113',
          harNavAvtale: false,
          forretningsadresse: {
            adresse: ['Mangerudveien 6, 0942 Oslo'],
            postnummer: '0001',
            poststed: 'Oslo',
          },
          erOptikerVirksomhet: true,
        })
      )
    }

    return res(
      ctx.json({
        orgnr: '987654321',
        orgNavn: 'Brillesjø AS',
        kontonr: '11111111113',
        harNavAvtale: true,
        forretningsadresse: {
          adresse: ['Osloveien 1, 0942 Oslo'],
          postnummer: '0001',
          poststed: 'Oslo',
        },
        erOptikerVirksomhet: true,
      })
    )
  }),

  rest.post<VilkårsgrunnlagRequest, {}, VilkårsgrunnlagResponse>('/api/vilkarsgrunnlag', (req, res, ctx) => {
    const { body } = req

    const beregnSatsResponse = beregnSats(body.brilleseddel)

    if (body.fnrBruker === '123') {
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

  rest.post<SøknadRequest, {}, SøknadResponse>('/api/soknader', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ vedtakId: '1337' }))
  }),
]

export const worker = setupWorker(...handlers)
