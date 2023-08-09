/** @jsxRuntime automatic */
/** @jsxImportSource ai-jsx */
import { toStreamResponse } from 'ai-jsx/stream';
import { ChatCompletion, UserMessage } from 'ai-jsx/core/completion';
import type { APIGatewayEvent, Context } from 'aws-lambda'

import { Readable } from "stream"

import { logger } from 'src/lib/logger'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event: APIGatewayEvent, _context: Context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405 }
  }
  logger.info(`${event.httpMethod} ${event.path}: poem function`)

  // Body might be base64 encoded, see https://github.com/redwoodjs/redwood/issues/1410#issuecomment-825156426
  const body = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf-8') : event.body;
  const { topic } = JSON.parse(body);

  return {
    statusCode: 200,
    headers: {
      // N.B. Use application/event-stream rather than text/event-stream to convince middleware not to compress it.
      'Content-Type': 'application/event-stream',
    },
    body: Readable.from(
      toStreamResponse(
        <ChatCompletion temperature={1}>
          <UserMessage>Write me a poem about {topic}</UserMessage>
        </ChatCompletion>
      ).body
    ),
  }
}
