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
var jwtKey = []byte("secret_key")

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
	// Время жизни токена
	expirationTime := time.Now().Add(5 * time.Minute)
	claims := &Claims{
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// Подпись токена
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

// Обработчик логина
func login(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	// Прочитаем тело запроса в переменную creds
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Здесь ты можешь добавить свою логику проверки логина и пароля
	if creds.Username != "admin" || creds.Password != "password" {
		http.Error(w, "Неверное имя пользователя или пароль", http.StatusUnauthorized)
		return
	}

	// Генерация токена
	token, err := generateJWT(creds.Username)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Отправка токена пользователю
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, `{"token":"%s"}`, token)
}

// Запуск сервера
func Run() {
	r := mux.NewRouter()
	r.HandleFunc("/login", login).Methods("POST")

	// Запуск сервера
	log.Fatal(http.ListenAndServe(":8080", r))
}
