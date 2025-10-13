package main

import (
	"os"

	"github.com/navikt/hotbff"
	"github.com/navikt/hotbff/decorator"
	"github.com/navikt/hotbff/proxy"
	"github.com/navikt/hotbff/texas"
)

var (
	useMSW = os.Getenv("USE_MSW") == "true"
	idp    = texas.IDPorten
)

func init() {
	if useMSW {
		idp = ""
	}
}

func main() {
	opts := &hotbff.Options{
		BasePath: "/hjelpemidler/barnebriller/",
		RootDir:  "dist",
		DecoratorOpts: &decorator.Options{
			Context: "samarbeidspartner",
			Chatbot: new(bool),
		},
		Proxy: proxy.Map{
			"/api/": &proxy.Options{
				Target:      os.Getenv("BRILLE_API_BASE_URL"),
				StripPrefix: false,
				IDP:         texas.TokenX,
				IDPTarget:   os.Getenv("BRILLE_API_TARGET_AUDIENCE"),
			},
		},
		IDP:     idp,
		EnvKeys: []string{},
	}
	hotbff.Start(opts)
}
