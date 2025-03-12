import { compareSync, hashSync } from "bcrypt";
import { dirname } from "path";
import { fileURLToPath } from "url";

export const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname);

export const hashPassword = (password) => hashSync(password, 6)

export const validatePassword = (password, passwordBDD) => compareSync(password, passwordBDD)