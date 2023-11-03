import React, { ReactNode, useEffect, useMemo, useReducer } from "react";
import { contextName } from "./contextTypes";
import useEasyState from "./useEasyState";
import { getData, storeData } from "./offlineFunction";

type ProviderProps = {
  children: ReactNode;
  contextsList: Array<contextName>;
};

// Define the RenderContext component
function RenderContext({ context, index, children, initialValue }: any) {
  const reducer = (
    state: any,
    action: { type: any; payload: any; paging: boolean; offline: boolean }
  ) => {
    switch (action.type) {
      case action.type === "oflineData":
        return {
          ...state,
          ...action.payload,
        };

      case action.type:
        if (action.offline && !action.paging) {
          storeData(action.type, action.payload);
        }
        if (action.paging) {
          return {
            ...state,
            [action.type]: [...state[action.type], ...action.payload],
          };
        }
        return { ...state, [action.type]: action.payload };
      default:
        return state;
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
        obj[val] = response[Object.keys(state).indexOf(val) || state[val]];
      });

      dispatch({
        type: "oflineData",
        payload: obj,
        paging: false,
        offline: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataFunction();
  }, []);

  // Create a context value object
  const contextValue: Object = {
    state,
    dispatch,
  };

  return (
    <context.Provider key={index} value={contextValue}>
      {children}
    </context.Provider>
  );
}

export function Provider(props: ProviderProps) {
  const { contextsList } = props;

  // Create a nested structure of RenderContext components
  const renderStructure = useMemo(
    () =>
      contextsList.reduceRight(
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
    [contextsList, props.children]
  );

  return <>{renderStructure}</>;
}

export { useEasyState };
