package middleware

import (
	"net/http"
	"net/url"

	"github.com/ahmad-milzam/ticket-monitoring/env"
	"github.com/ahmad-milzam/ticket-monitoring/helper"
	"github.com/ahmad-milzam/ticket-monitoring/model/web"
	"github.com/imroc/req/v3"
)

type AuthMiddleware struct {
	Handler http.Handler
	Client  *req.Client
	Env     env.MyEnv
}

func NewAuthMiddleware(handler http.Handler, client *req.Client, env env.MyEnv) *AuthMiddleware {
	return &AuthMiddleware{
		Handler: handler,
		Client:  client,
		Env:     env,
	}
}

func (middleware *AuthMiddleware) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	token := url.QueryEscape(r.URL.Query().Get("token"))

	if token == "" {
		// w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		helper.WriteToResponseBody(w, "Unauthorized!")
		return
	}

	response := web.ClientResponse{}
	endpoint := middleware.Env["EndpointAuthService"] + token
	_, err := middleware.Client.R().
		SetHeader("X-API-Key", middleware.Env["X-API-Key"]).
		SetResult(&response).
		Get(endpoint)
	helper.PanicIfError(err)

	if response.Code == 200 {
		middleware.Handler.ServeHTTP(w, r)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		helper.WriteToResponseBody(w, "Unauthorized!")
	}
}
