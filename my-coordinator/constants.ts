const IS_LOCAL = false;
export const COORDINATOR_PORT = 3001;
export const COORDINATOR_BASE_IRI = IS_LOCAL ? `http://localhost:${COORDINATOR_PORT}/` : "https://vc-coordinator-demo.vercel.app/";

export const discoveryVp = {
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
      serviceEndpoint: new URL("api/exchanges/webid", COORDINATOR_BASE_IRI).href
    }]
  }
}