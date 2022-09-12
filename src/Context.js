import { useState, createContext } from "react";

const AddressContext = createContext({})
const AddressDispatchContext = createContext(undefined);
const { Provider } = AddressContext;

function AddressProvider ({ children }) {
  const [state, setState] = useState({});
  return (<Provider value={state}>
    <AddressDispatchContext.Provider value={setState}>
      { children }
    </AddressDispatchContext.Provider>
  </Provider>)
}

export { AddressProvider, AddressContext, AddressDispatchContext };