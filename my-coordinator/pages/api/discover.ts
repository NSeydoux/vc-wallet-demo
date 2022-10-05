// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { COORDINATOR_BASE_IRI } from '../../constants'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['GET'],
  origin: "*"
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors)

  // Return the VP request interaction endpoint
  res.json({
    query: [
      {
        type: "QueryByExample",
        credentialQuery: [
          {
            "example": {
              "@context": ["https://www.w3.org/2018/credentials/v1"],
              "type": "http://www.w3.org/TR/webid/",
            }
          }
        ]
      }
    ],
    interact: {
      service: [{
        type: "UnmediatedHttpPresentationService2021",
        serviceEndpoint: new URL("exchanges/webid", COORDINATOR_BASE_IRI).href
      }]
    }
  });
}
