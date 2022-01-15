import * as t from "io-ts";
import { failure } from "io-ts/PathReporter";
import * as E from "fp-ts/Either";
import { flow } from "fp-ts/function";

export function validate<I, A>(
  codec: t.Decoder<I, A>
): (i: I) => E.Either<string[], A> {
  return flow(codec.decode, E.mapLeft(failure));
}
