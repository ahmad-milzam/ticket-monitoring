package main

import (
	"embed"
	"net/http"

	"github.com/ahmad-milzam/ticket-monitoring/client"
	"github.com/ahmad-milzam/ticket-monitoring/env"
	"github.com/ahmad-milzam/ticket-monitoring/helper"
	"github.com/ahmad-milzam/ticket-monitoring/middleware"
	"github.com/ahmad-milzam/ticket-monitoring/router"
)

//go:embed resources
var resources embed.FS

func main() {
	router := router.NewRouter(resources)
	client := client.NewClient()
	env, err := env.NewEnv()
	helper.PanicIfError(err)

	server := http.Server{
		Addr:    "0.0.0.0:80",
		Handler: middleware.NewAuthMiddleware(router, client, env),
	}

	err = server.ListenAndServe()
	helper.PanicIfError(err)
}
