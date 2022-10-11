package router

import (
	"embed"
	"fmt"
	"io/fs"
	"net/http"

	"github.com/ahmad-milzam/ticket-monitoring/helper"
	"github.com/julienschmidt/httprouter"
)

func NewRouter(resources embed.FS) *httprouter.Router {
	router := httprouter.New()

	directory, err := fs.Sub(resources, "resources")
	helper.PanicIfError(err)
	router.ServeFiles("/*filepath", http.FS(directory))

	router.PanicHandler = func(w http.ResponseWriter, r *http.Request, err interface{}) {
		fmt.Fprint(w, "Panic : "+err.(string))
	}

	return router
}
