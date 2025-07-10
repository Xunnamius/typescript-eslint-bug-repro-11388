import { MyError } from './index.js';

export type SomethingElse = boolean;

export { MyError };

// The above should not generate an error. If we instead export this runtime
// symbol with "export type" as typescript-eslint demands, importers of this
// file will get linting errors about how "MyError is only exported as a type".
