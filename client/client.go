package client

import "github.com/imroc/req/v3"

func NewClient() *req.Client {
	return req.C()
}
