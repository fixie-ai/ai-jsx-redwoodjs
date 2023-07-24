import { mockHttpEvent } from '@redwoodjs/testing/api'

import { handler } from './poem'
import { toStreamResponse } from 'ai-jsx/stream';
import { jest } from '@jest/globals';

jest.mock('ai-jsx/stream');

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-functions

describe('poem function', () => {
  it('Should respond with 200', async () => {
    const httpEvent = mockHttpEvent({
      httpMethod: "POST",
      payload: {
        topic: "tests"
      }
    })

    // @ts-expect-error
    toStreamResponse.mockReturnValue({ body: ["chunk 1", "chunk 2"] });

    const response = await handler(httpEvent, null)

    expect(response.statusCode).toBe(200)
    expect(response.headers['Content-Type'] === "application/event-stream")

    let chunkCount = 0;
    for await (const chunk of response.body) {
      ++chunkCount;
      expect(chunk).toBe(`chunk ${chunkCount}`);
    }
  })

  // You can also use scenarios to test your api functions
  // See guide here: https://redwoodjs.com/docs/testing#scenarios
  //
  // scenario('Scenario test', async () => {
  //
  // })
})
