package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

// Пример секрета для подписи JWT
var jwtKey = []byte("PJCorSUn25")

// --- CORS middleware ---
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Разрешаем доступ со всех источников
		w.Header().Set("Access-Control-Allow-Origin", "*")
		// Разрешаем указанные методы
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		// Разрешаем указанные заголовки
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Если запрос OPTIONS, сразу завершаем обработку
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// Структура для входа
type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// Структура для обработки токена
type Claims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

// Генерация токена
func generateJWT(username string) (string, error) {
	expirationTime := time.Now().Add(5 * time.Minute)
	claims := &Claims{
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

// Обработчик логина
func login(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if creds.Username != "admin" || creds.Password != "password" {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	token, err := generateJWT(creds.Username)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, `{"token":"%s"}`, token)
}

// Запуск сервера
func Run() {
	r := mux.NewRouter()

	// Добавляем CORS middleware ко всем маршрутам
	r.Use(corsMiddleware)

	// Маршрут логина
	r.HandleFunc("/login", login).Methods("POST", "OPTIONS")

	log.Fatal(http.ListenAndServe(":8080", r))
}
