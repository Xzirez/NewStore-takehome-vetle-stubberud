import fetchMock from "jest-fetch-mock";

import { TodoClient, TodoClientImpl } from "./Client";

const defaultHeaders = new Headers({
  Accept: "application/json",
});

const testBaseUrl = "https://url.com";

const successInit = {
  status: 200,
  statusText: "OK",
};

const mockErrorHandler = jest.fn();

describe("TodoClient", () => {
  let todoClient: TodoClient;

  beforeEach(() => {
    fetchMock.resetMocks();
    mockErrorHandler.mockReset();
    todoClient = new TodoClientImpl(testBaseUrl);
  });

  describe("error handling", () => {
    it("throws an error when the request aborts", async () => {
      fetchMock.mockAbortOnce();
      await expect(todoClient.getTodos()).rejects.toThrow(
        "The operation was aborted."
      );
    });

    it("throws an error when the request fails", async () => {
      fetchMock.mockRejectOnce(new Error("fake error message"));
      await expect(todoClient.getTodos()).rejects.toThrow("fake error message");
    });

    it("throws a default error message if no error type was returned", async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}), {
        status: 500,
        statusText: "Internal Server Error",
      });

      await expect(todoClient.getTodos()).rejects.toThrow(
        "An error has occurred, please try again later"
      );
    });
  });

  describe("TodoClient methods", () => {
    describe("getTodos", () => {
      it("calls the correct resource and returns the correct value", async () => {
        const response = [{ name: "todo", description: "A Todo" }];
        fetchMock.mockResponse(JSON.stringify(response), successInit);
        const res = await todoClient.getTodos();

        expect(fetchMock).toBeCalledWith("https://url.com/todo", {
          method: "GET",
          headers: defaultHeaders,
        });

        expect(res).toStrictEqual(response);
      });
    });
  });
});
