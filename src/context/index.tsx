import React, {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import useEasyState from "./useEasyState";
import useEasy from "./useEasy";
import useEasyOffline from "./useEasyOffline";
import { getData, storeData } from "./offlineFunction";
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

function RenderContext({ context, index, children, initialValue }: any) {
  const reducer = (
    state: any,
    action: { type: any; payload: any; paging?: boolean; offline?: boolean }
  ) => {
    switch (action.type) {
      case "offlineData":
        return {
          ...state,
          ...action.payload,
        };

      case "useEasy":
        return {
          ...state,
          ...action.payload,
        };
      case "useEasyOffline":
        return {
          ...state,
          ...action.payload,
        };

      default:
        if (action.offline) {
          storeData(action.type, action.payload);
        }
        if (action.paging) {
          return {
            ...state,
            [action.type]: [...state[action.type], ...action.payload],
          };
        }
        return { ...state, [action.type]: action.payload };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialValue);

  const getDataFunction = async () => {
    try {
      const promises = Object.keys(state).map(async (key) => {
        const data = await getData(key);
        return data;
      });
      const response = await Promise.all(promises);

      const obj: any = {};

      Object.keys(state).map((val) => {
        const result = response[Object.keys(state).indexOf(val)];
        obj[val] = result ? result : state[val];
      });

      dispatch({
        type: "offlineData",
        payload: obj,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataFunction();
  }, []);

  const contextValue: ContextValue = {
    state,
    dispatch,
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
            initialValue={data.initialValue}
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

export { useEasyState, useEasy , useEasyOffline};
