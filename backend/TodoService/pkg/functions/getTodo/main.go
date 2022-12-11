package main

import (
	"net/http"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbiface"
	"github.com/xzirez/TodoService/pkg/todo"
)

var (
	dynaClient dynamodbiface.DynamoDBAPI
)

const tableName = "TodoTable"

func main() {
	region := os.Getenv("AWS_REGION")
	awsSession, err := session.NewSession(&aws.Config{
		Region: aws.String(region)})

	if err != nil {
		return
	}
	dynaClient = dynamodb.New(awsSession)
	lambda.Start(handler)
}

func handler(req events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	return GetTodo(req, tableName, dynaClient)
}

func GetTodo(req events.APIGatewayProxyRequest, tableName string, dynaClient dynamodbiface.DynamoDBAPI) (
	*events.APIGatewayProxyResponse, error,
) {

	id := req.QueryStringParameters["todoID"]
	if len(id) > 0 {
		result, err := todo.FetchTodo(id, tableName, dynaClient)
		if err != nil {
			return todo.ApiResponse(http.StatusBadRequest, todo.ErrorBody{aws.String(err.Error())})
		}
		return todo.ApiResponse(http.StatusOK, result)
	}

	result, err := todo.FetchTodos(tableName, dynaClient)
	if err != nil {
		return todo.ApiResponse(http.StatusBadRequest, todo.ErrorBody{
			aws.String(err.Error()),
		})
	}
	return todo.ApiResponse(http.StatusOK, result)

}
