import { APIResponse, expect } from "@playwright/test";

export class ResponseHelper {
  public static async logResponse(response: APIResponse) {
    console.log(`Response status: ${response.status()}`);
    console.log(`Response body: ${await response.text()}`);
  }

  public static async validateResponseStatusAndContentType(
    response: APIResponse,
    expectedStatusCode: number
  ) {
    this.logResponse(response);
    expect(response.status()).toBe(expectedStatusCode);

    const contentType = response.headers()["content-type"];
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Empty response body Error"); 
    }

    expect(contentType).toContain("application/json"); 
    return await response.json(); 
  }

  public static async validateBadRequestResponse(
    response: APIResponse,
    expectedStatusCode: number
  ) {
    const responseBody = await this.validateResponseStatusAndContentType(
      response,
      400
    );
    expect(responseBody.error).toContain("Bad Request");
    console.error(`Bad Request: ${responseBody.message}`);
    return responseBody;
  }

  public static async validateNotFoundResponse(
    response: APIResponse,
    expectedStatusCode: number
  ) {
    const responseBody = await this.validateResponseStatusAndContentType(
      response,
      404
    );
    expect(responseBody.error).toContain("Not Found");
    console.error(`Not Found: ${responseBody.message}`);
    return responseBody; 
  }
}
