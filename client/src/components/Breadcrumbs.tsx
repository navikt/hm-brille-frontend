import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { baseUrl } from '../http'
import { setBreadcrumbs, onBreadcrumbClick } from '@navikt/nav-dekoratoren-moduler'

const Breadcrumbs = () => {
  const location = useLocation()
  useEffect(() => {
    const { pathname } = location
    let subBreadcrumbs = []
    if (pathname.indexOf('/oversikt') === 0) {
      subBreadcrumbs.push({ url: baseUrl('/oversikt'), title: 'Innsendte krav', handleInApp: true })
      if (pathname.indexOf('/oversikt/') === 0) {
        subBreadcrumbs.push({ url: baseUrl(pathname), title: 'Krav', handleInApp: true })
      }
    }
    if (pathname.indexOf('/krav') === 0) {
      subBreadcrumbs.push({ url: baseUrl('/krav'), title: 'Send krav', handleInApp: true })
      if (pathname.indexOf('/krav/oppsummering') === 0) {
        subBreadcrumbs.push({ url: baseUrl('/krav/oppsummering'), title: 'Oppsummering', handleInApp: true })
      }
    }
    setBreadcrumbs([
      { url: 'https://www.nav.no/barnebriller', title: 'Briller til barn – optikers rolle' },
      { url: baseUrl('/'), title: 'Krav om direkte oppgjør', handleInApp: true },
      ...subBreadcrumbs,
    ])
  }, [location])

  // For breadcrumbs that have "handleInApp=true" specified we have to ourselves specify how to navigate inside our app.
  const navigate = useNavigate()
  onBreadcrumbClick((bc) => {
    navigate(bc.url)
  })

  return null
}

export default Breadcrumbs
