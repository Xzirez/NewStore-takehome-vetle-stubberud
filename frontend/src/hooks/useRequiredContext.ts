import { Context, createContext, useContext } from "react";

const createRequiredContext = <T>(): Context<T | undefined> =>
  createContext<T | undefined>(undefined);

const useRequiredContext = <T>(context: Context<T>): NonNullable<T> => {
  const value = useContext(context);
  if (!value) {
    throw new Error(`${context.displayName} is required!`);
  }

  return value as NonNullable<T>;
};

export { createRequiredContext, useRequiredContext };
