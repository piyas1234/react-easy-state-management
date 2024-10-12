import { createContext } from "react";

export const contextCreator = (contextNames: any[]) => {
  try {
    const result = contextNames.map(
      (context: { contextName: any; initialValue: any; context: any }) => {
        const setContext =
          context.context || createContext(context.initialValue);
        setContext.displayName = context.contextName;

        return {
          ...context,
          context: setContext
        };
      }
    );

    return result;
  } catch (error) {
    console.error("Error in contextCreator:", error);
    return [];
  }
};

export function isPromise(obj: any) {
  return obj instanceof Promise;
}
