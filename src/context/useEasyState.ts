import { useContext } from "react"


export default function useEasyState(context:any) {
  const {state , dispatch }:any = useContext(context)
  return  [state, dispatch]
}
