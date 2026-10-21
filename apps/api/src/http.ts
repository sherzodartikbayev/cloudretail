import zod from 'zod';
import { RequestHandler } from 'express';

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
