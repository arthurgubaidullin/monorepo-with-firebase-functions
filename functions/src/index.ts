import * as functions from "firebase-functions";
import { isLeft } from "fp-ts/lib/Either";
import { validatePirojok } from "pirojok";

export const helloWorld = functions.https.onRequest((request, response) => {
  const pirojok = validatePirojok(request.body);

  if (isLeft(pirojok)) {
    response.status(400).json(pirojok.left);
    functions.logger.error("Hello errors!", { errors: pirojok.left });
    return;
  }

  functions.logger.info("Hello logs!", { structuredData: true });
  response.json("Hello from Firebase!");
});
