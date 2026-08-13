interface RequestFilters {
  HTTPmethod: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  URL: string;
  headers: string;
  queryParams: string;
  jsonBody: string;
}

class HTTPRequest {
  constructor(public readonly filters: RequestFilters) {}
}

class RequestBuilder {
  private filters: Partial<RequestFilters> = {};

  setHTTPMethod(HTTPmethod: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"): this {
    this.filters.HTTPmethod = HTTPmethod;
    return this;
  }

  setURL(URL: string): this {
    this.filters.URL = URL;
    return this;
  }

  setHeaders(headers: string): this {
    this.filters.headers = headers;
    return this;
  }

  setQueryParams(queryParams: string): this {
    this.filters.queryParams = queryParams;
    return this;
  }

  setJSONBody(jsonBody: string): this {
    this.filters.jsonBody = jsonBody;
    return this;
  }

  build(): HTTPRequest {
    if (!this.filters.URL) {
      throw new Error("URL is required");
    }
    if (this.filters.HTTPmethod === "POST" && !this.filters.jsonBody) {
      throw new Error("POST requires a JSON body");
    }
    return new HTTPRequest(this.filters as RequestFilters);
  }
}

const request = new RequestBuilder()
  .setHTTPMethod("POST")
  .setURL("test-url")
  .setHeaders("test-headers")
  .setQueryParams("test-params")
  .setJSONBody("test-body")
  .build();

console.log(request);
