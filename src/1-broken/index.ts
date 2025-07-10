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

const { MyError } = decorateErrorClass(
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
export { MyError };

// MyError (class) and myError (instance) are both correctly typed in this file.
const myError = new MyError();
console.log(MyError.additionalStaticProp); // true
myError.panic(); // outputs: "panicking!"
