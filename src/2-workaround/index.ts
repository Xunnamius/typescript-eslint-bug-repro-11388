/* eslint-disable @typescript-eslint/no-explicit-any */

function decorateErrorClass<T extends new (...args: any[]) => Error>(
  errorConstructor: T
) {
  const decoratedConstructor = errorConstructor as T & {
    additionalStaticProp: boolean;
  };

  decoratedConstructor.additionalStaticProp = true;
  return { MyError: decoratedConstructor };
}

// Exporting the name directly is detectable by the "hack" in https://github.com/typescript-eslint/typescript-eslint/blob/16c344ec7d274ea542157e0f19682dd1930ab838/packages/eslint-plugin/src/rules/consistent-type-exports.ts#L154
// vvv
export const { MyError } = decorateErrorClass(
  class MyError extends Error {
    panic() {
      console.log('panicking!');
    }
  }
);

/**
 * Some commentary that should be exported.
 */
export type MyError = InstanceType<typeof MyError>;

// MyError (class) and myError (instance) are both correctly typed in this file.
const myError = new MyError();
console.log(MyError.additionalStaticProp); // true
myError.panic(); // outputs: "panicking!"
