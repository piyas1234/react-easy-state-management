import React, {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useReducer
} from "react";
import useEasyState from "./useEasyState";
import useEasy from "./useEasy";
import useEasyOffline from "./useEasyOffline";
import { getData, getKeys, storeData } from "./offlineFunction";
import { contextCreator } from "./helper";
import { ContextName } from "./contextTypes";

type ProviderProps = {
  children: ReactNode;
  contextsList: Array<ContextName>;
};

type ContextValue = {
  state: any;
  dispatch: React.Dispatch<any>;
};

function RenderContext({ context, index, children, initialValue = {} }: any) {
  const reducer = (
    state: any,
    action: { type: any; payload: any; paging?: boolean; offline?: boolean }
  ) => {
    switch (action.type) {
      case "offlineData":
        return {
          ...state,
          ...action.payload
        };

      case "useEasy":
        return {
          ...state,
          ...action.payload
        };
      case "useEasyOffline":
        return {
          ...state,
          ...action.payload
        };

      default:
        return { ...state, [action.type]: action.payload };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialValue);

  const getDataFunction = async () => {
    try {
      const offlineStateKeys: string[] = await getKeys();
      const stateKeys = Object.keys(state);
      const combinedKeys = new Set([...stateKeys, ...offlineStateKeys]);

      const promises = Array.from(combinedKeys).map(async (key) => {
        const data = await getData(key);
        return { key, data };
      });
      const responses = await Promise.all(promises);
      const mergedState: any = {};
      responses.forEach(({ key, data }) => {
        const keyArray = key.split(",");

        if (keyArray?.[0] === context.displayName) {
          mergedState[key] = data !== null ? data : state[key];
        }
      });

      dispatch({
        type: "offlineData",
        payload: mergedState
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDataFunction();
  }, []);

  const contextValue: ContextValue = {
    state,
    dispatch
  };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
}

export const globalContext = createContext<any | undefined>(undefined);

export function Provider(props: ProviderProps) {
  const { contextsList } = props;
  const contextList = contextCreator(contextsList);

  const renderStructure = useMemo(
    () =>
      contextList.reduceRight(
        (children, data, index) => (
          <RenderContext
            context={data.context}
            initialValue={data?.initialValue}
            key={index}
          >
            {children}
          </RenderContext>
        ),
        props.children
      ),
    [contextList, props.children]
  );

  return (
    <globalContext.Provider value={contextList}>
      {renderStructure}
    </globalContext.Provider>
  );
}

export { useEasyState, useEasy, useEasyOffline };
