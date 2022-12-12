.PHONY: build clean deploy

build:
	env GOARCH=amd64 GOOS=linux go build -ldflags="-s -w" -o bin/functions/createTodo/ pkg/functions/createTodo/main.go
	env GOARCH=amd64 GOOS=linux go build -ldflags="-s -w" -o bin/functions/getTodo/ pkg/functions/getTodo/main.go
	env GOARCH=amd64 GOOS=linux go build -ldflags="-s -w" -o bin/functions/updateTodo/ pkg/functions/updateTodo/main.go
	env GOARCH=amd64 GOOS=linux go build -ldflags="-s -w" -o bin/functions/deleteTodo/ pkg/functions/deleteTodo/main.go

clean:
	rm -rf ./bin ./vendor Gopkg.lock

deploy: clean build
	sls deploy --verbose
