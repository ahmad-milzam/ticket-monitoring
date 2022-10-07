package web

type ClientResponse struct {
	Code   int    `json:"code,omitempty"`
	Status string `json:"status,omitempty"`
}
