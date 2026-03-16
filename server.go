package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"
)

type healthResponse struct {
	Status    string `json:"status"`
	Service   string `json:"service"`
	Mode      string `json:"mode"`
	Timestamp string `json:"timestamp"`
	Uptime    string `json:"uptime"`
}

var startedAt = time.Now().UTC()

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	publicRoot, err := os.Getwd()
	if err != nil {
		log.Fatalf("unable to resolve working directory: %v", err)
	}

	fileServer := http.FileServer(http.Dir(publicRoot))
	mux := http.NewServeMux()
	mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, healthResponse{
			Status:    "ok",
			Service:   "my-website-2",
			Mode:      "full-stack",
			Timestamp: time.Now().UTC().Format(time.RFC3339),
			Uptime:    time.Since(startedAt).Round(time.Second).String(),
		})
	})
	mux.Handle("/", withStaticFallback(publicRoot, fileServer))

	server := &http.Server{
		Addr:              ":" + port,
		Handler:           withLogging(withSecurityHeaders(mux)),
		ReadHeaderTimeout: 5 * time.Second,
	}

	log.Printf("serving %s on http://localhost:%s", publicRoot, port)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("server failed: %v", err)
	}
}

func withStaticFallback(root string, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cleanPath := filepath.Clean(strings.TrimPrefix(r.URL.Path, "/"))
		if cleanPath == "." || cleanPath == string(filepath.Separator) {
			http.ServeFile(w, r, filepath.Join(root, "index.html"))
			return
		}

		target := filepath.Join(root, cleanPath)
		info, err := os.Stat(target)
		if err == nil {
			if info.IsDir() {
				indexPath := filepath.Join(target, "index.html")
				if _, indexErr := os.Stat(indexPath); indexErr == nil {
					http.ServeFile(w, r, indexPath)
					return
				}
			}

			next.ServeHTTP(w, r)
			return
		}

		if filepath.Ext(cleanPath) == "" {
			htmlPath := target + ".html"
			if _, htmlErr := os.Stat(htmlPath); htmlErr == nil {
				http.ServeFile(w, r, htmlPath)
				return
			}
		}

		http.NotFound(w, r)
	})
}

func withSecurityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")
		w.Header().Set("X-Frame-Options", "SAMEORIGIN")
		w.Header().Set("Cross-Origin-Opener-Policy", "same-origin")
		next.ServeHTTP(w, r)
	})
}

func withLogging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("%s %s %s", r.Method, r.URL.Path, time.Since(start).Round(time.Millisecond))
	})
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(payload); err != nil {
		log.Printf("json encode failed: %v", err)
	}
}
