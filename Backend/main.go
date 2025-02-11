package main

import (
	serverpackage "sitebackend/server" // замените на реальный модульный путь
)

func main() {
	s := serverpackage.NewServer()
	s.StartServer()
}
