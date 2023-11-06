import React, { ReactNode } from "react";
import useEasyState from "./useEasyState";
import { ContextName } from "./contextTypes";
type ProviderProps = {
    children: ReactNode;
    contextsList: Array<ContextName>;
};
export declare const globalContext: React.Context<any>;
export declare function Provider(props: ProviderProps): React.JSX.Element;
export { useEasyState };
