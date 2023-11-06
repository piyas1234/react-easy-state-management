import React, {
    ReactNode,
    createContext,
    useEffect,
    useMemo,
    useReducer,
  } from "react";
  import useEasyState from "./useEasyState";
  import { getData, storeData } from "./offlineFunction";
  import { contextCreator, isPromise } from "./helper";
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
      action: { type: any; payload: any; paging: boolean; offline: boolean }
    ) => {
      switch (action.type) {
        case "offlineData":
          return {
            ...state,
            ...action.payload,
          };
    
        default:
          if (action.offline && !action.paging) {
            if (isPromise(action.payload)) {
               action.payload.then((val: any) => {
                storeData(action.type, val);
              });
             return { ...state };
            } else {
              storeData(action.type, action.payload);
              return { ...state }; // Return a new state object
            }
          }
    
          if (action.paging) {
            if (isPromise(action.payload)) {
              return action.payload.then((val: any) => {
                return {
                  ...state,
                  [action.type]: [...state[action.type], ...val],
                };
              });
            } else {
              return {
                ...state,
                [action.type]: [...state[action.type], ...action.payload],
              };
            }
          }
    
          if (isPromise(action.payload)) {
            return action.payload.then((val: any) => {
              return {
                ...state,
                [action.type]: val,
              };
            });
          }
  
          if(!isPromise(action.payload)){
            return {
              ...state,
              [action.type]:action.payload
            };
          }
    
          // For all other cases, return a new state object
          return { ...state };
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
  
    const contextValue: ContextValue = {
      state,
      dispatch,
    };
  
    return (
      <context.Provider key={index} value={contextValue}>
        {children}
      </context.Provider>
    );
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
  
  export { useEasyState };
  