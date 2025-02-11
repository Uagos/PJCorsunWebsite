package serverpackage

import (
	"fmt"
	"net/http"
)

type Server struct {
	conn map[string]string
}

func NewServer() *Server {
	return &Server{
		conn: make(map[string]string), // Инициализируем карту
	}
}

func (s *Server) StartServer() {
	fmt.Println("Starting server on :8080")

	// Регистрируем обработчики
	http.HandleFunc("/", s.handleRoot)
	http.HandleFunc("/login", s.handleLogin)

	// Запускаем сервер
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(err)
	}
}

// Базовый обработчик
func (s *Server) handleRoot(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Welcome to main page!"))
}

// Обработчик логина
func (s *Server) handleLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		// Здесь будет логика проверки данных
		http.Redirect(w, r, "/profile", http.StatusSeeOther)
		return
	}
	w.Write([]byte("Login page"))
}
