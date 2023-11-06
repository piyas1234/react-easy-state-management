import { useCallback, useContext } from "react";
import { globalContext } from "./index";

export default function useEasyState(contextName: string | object) {
  const contextListState = useContext(globalContext);

  const contextData = () => {
    if (typeof contextName === "string") {
      const matchingContext = contextListState?.find(
        (val: { contextName: string }) => val.contextName === contextName
      );
      if (!matchingContext) {
        throw new Error(`Context with name '${contextName}' not found.`);
      }
      return matchingContext.context;
    } else if (typeof contextName === "object") {
      return contextName;
    } else {
      throw new Error("Invalid context parameter.");
    }
  }

  const { state, dispatch }: { state: any; dispatch: React.Dispatch<any> } = useContext(contextData());

  const showLoader = useCallback(
    async (callback: () => any) => {
      dispatch({
        type: "loading", // Replace with your specific loading action type
        payload: true,
      });
      try {
        const response = await callback();
        return response;
      } finally {
        dispatch({
          type: "loading", // Replace with your specific loading action type
          payload: false,
        });
      }
    },
    [dispatch]
  );

  return [state, dispatch, showLoader];
}
