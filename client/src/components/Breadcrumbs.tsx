import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { baseUrl } from '../http'
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler'

const Breadcrumbs = () => {
  const location = useLocation()
  useEffect(() => {
    const { pathname } = location
    let subBreadcrumbs = []
    if (pathname.indexOf('/oversikt') === 0) {
      subBreadcrumbs.push({ url: baseUrl('/oversikt'), title: 'Innsendte krav' })
      if (pathname.indexOf('/oversikt/') === 0) {
        subBreadcrumbs.push({ url: baseUrl(pathname), title: 'Krav' })
      }
    }
    if (pathname.indexOf('/krav') === 0) {
      subBreadcrumbs.push({ url: baseUrl('/krav'), title: 'Send krav' })
      if (pathname.indexOf('/krav/oppsummering') === 0) {
        subBreadcrumbs.push({ url: baseUrl('/krav/oppsummering'), title: 'Oppsummering' })
      }
    }
    setBreadcrumbs([
      { url: 'https://www.nav.no/barnebriller', title: 'Briller til barn – optikers rolle' },
      { url: baseUrl('/'), title: 'Krav om direkte oppgjør' },
      ...subBreadcrumbs,
    ])
  }, [location])

  return null
}

export default Breadcrumbs
