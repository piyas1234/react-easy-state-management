import { useCallback, useContext } from "react";
import { globalContext } from "./index";

export default function useEasy(
  contextName: string | object,
  Initialize?: object
) {
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
  };

  const { state, dispatch }: { state: any; dispatch: React.Dispatch<any> } =
    useContext(contextData());

  const setState = (data: object |  any) => {
       if(typeof data==="object"){
        setTimeout(() => {
          dispatch({
            type: "useEasy", // Replace with your specific loading action type
            payload: data,
          });
        }, 1);
       }
       else{
        throw new Error("Data type should be object");
       }
  };

  const showLoader = useCallback(async (callback: () => any) => {
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
  }, []);

  return [{ ...Initialize, ...state }, setState, showLoader];
}
