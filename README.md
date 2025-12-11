# hm-brille-frontend

Front-end for registrering av brillekrav for autoriserte optikere.
Back-end for appen er [hm-brille-api](https://github.com/navikt/hm-brille-api)

## Om appen

Appen krever at bruker er innlogget via ID-Porten, samt at innlogget person er registrert som
autorisert optiker i Helsepersonellregisteret (HPR).

Før et krav registreres må optiker velge hvilket organisasjonsnr. kravet skal registreres på og
dette organisasjonsnummeret må ha inngått en avtale med NAV om direkteoppgjør for briller til barn.

Optiker registrerer hvilket barn kravet gjelder og relevant informasjon om barnet hentes fra PDL.

Optiker fyller så inn brilleseddel, bestillingsdato og pris på brillen og kravet vilkårsprøves basert
på dette. Dersom vilkårsprøving gir støtte så får optiker mulighet til å sende kravet inn til NAV.

### Overordnet dokumentasjon

Overordnet dokumentasjon av brillestøtte finnes [her](doc/%C3%98kosystem.md)

Koden er delt i to separate moduler:

- `server` – Go-backend
- `client` – React-frontend

## Kom i gang

### Forutsetninger

- Node ≥ 20
- Go (for serveren)

### PNPM

Prosjektet bruker **pnpm** som pakkehåndterer. Hvis du:

- aldri har brukt pnpm før, eller
- har klonet repoet tidligere da det brukte npm

gjør følgende først:

```bash
corepack enable
```

Deretter, én gang etter at du har hentet ned pnpm-endringene:

```bash
# i prosjektroten
rm -rf node_modules package-lock.json
pnpm install

# i client
cd client
rm -rf node_modules package-lock.json
pnpm install
```

Etter dette holder det med:

- `pnpm install` i rot når du får nye root-avhengigheter
- `cd client && pnpm install` når `client/package.json` endrer seg

### Client

For å kjøre frontend lokalt:

```bash
cd client
pnpm run dev
```

MockSeviceWorker brukes for å mocke API-kall lokalt og i labs, se [browser.ts](./client/src/mocks/browser.ts).

### Server

Installer Go:

```bash
brew install go
```


## Deploy

Ved push til main kjøres det deploy til dev-gcp. Appen er tilgjenglig
på [https://brille.intern.dev.nav.no/hjelpemidler/barnebriller](https://brille.intern.dev.nav.no/hjelpemidler/barnebriller).