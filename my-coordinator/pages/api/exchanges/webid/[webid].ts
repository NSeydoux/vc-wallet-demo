// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { COORDINATOR_BASE_IRI } from '../../../../constants'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['PUT'],
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

  if (req.method !== "PUT") {
    res.status(405);
    res.statusMessage = "Method not allowed";
    return;
  }

  // Rest of the API logic
  res.json({
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://www.w3.org/2018/credentials/examples/v1"
    ],
    id: new URL("/webid/some-id", COORDINATOR_BASE_IRI).href,
    type: ["VerifiableCredential", "http://www.w3.org/TR/webid/"],
    issuer: "https://id.inrupt.com",
    issuanceDate: "2010-01-01T19:23:24Z",
    credentialSubject: {
      id: "https://id.inrupt.com/foo",
      webid: "https://id.inrupt.com/foo",
    },
    proof: {
      type: "Ed25519Signature2020",
      created: "2021-11-13T18:19:39Z",
      verificationMethod: "https://example.edu/issuers/14#key-1",
      proofPurpose: "assertionMethod",
      proofValue: "z58DAdFfa9SkqZMVPxAQpic7ndSayn1PzZs6ZjWp1CktyGesjuTSwRdoWhAfGFCF5bppETSTojQCrfFPP2oumHKtz"
    }
  })
}
