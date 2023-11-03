import React, { ReactNode } from "react";
import { contextName } from "./contextTypes";
import useEasyState from "./useEasyState";
type ProviderProps = {
    children: ReactNode;
    contextsList: Array<contextName>;
};
export declare function Provider(props: ProviderProps): React.JSX.Element;
export { useEasyState };
