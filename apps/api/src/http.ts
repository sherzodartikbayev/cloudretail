import zod from 'zod';
import { RequestHandler, Router } from 'express';

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    readonly message: string,
  ) {
    super(message);
  }
}

export class HttpResponse<Body> {
  constructor(
    public readonly status: number,
    public readonly body: Body,
  ) {}
}

type CreateHandlerOptions<RequestBody, ResponseBody> = {
  bodySchema: zod.ZodSchema<RequestBody>;
  process: (params: {
    body: RequestBody;
  }) => Promise<HttpResponse<ResponseBody>>;
};

export const createHandler = <RequestParams, RequestBody, ResponseBody>({
  bodySchema,
  process,
}: CreateHandlerOptions<RequestBody, ResponseBody>): RequestHandler<
  RequestParams,
  ResponseBody,
  RequestBody
> => {
  return async (request, response) => {
    const { status, body } = await process({
      body: bodySchema.parse(request.body),
    });
    response.status(status).json(body);
  };
};

export const createRoute = <RequestParams, RequestBody, ResponseBody>(
  route: Route<RequestParams, RequestBody, ResponseBody>,
) => route;

export type Route<RequestParams, RequestBody, ResponseBody> = {
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
  handler: RequestHandler<RequestParams, ResponseBody, RequestBody>;
};

export const registerRoute = <RequestParams, RequestBody, ResponseBody>(
  router: Router,
  route: Route<RequestParams, RequestBody, ResponseBody>,
) => {
  router[route.method](route.path, route.handler);
};

export type Fetcher<Handler> =
  Handler extends RequestHandler<
    infer RequestParams,
    infer ResponseBody,
    infer RequestBody
  >
    ? (options: {
        params: RequestParams;
        body: RequestBody;
      }) => Promise<ResponseBody>
    : never;
