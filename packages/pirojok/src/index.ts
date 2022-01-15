import * as t from "io-ts";
import { validate } from "io-ts-validate";

export const Pirojok = t.readonly(
  t.strict({
    ingredients: t.readonlyArray(t.string),
  })
);

export type Pirojok = t.TypeOf<typeof Pirojok>;

export const validatePirojok = validate(Pirojok);
