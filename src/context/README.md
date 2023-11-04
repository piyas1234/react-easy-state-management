# `<react-easy-state-management />` [![npm](https://img.shields.io/npm/v/react-customs-hooks.svg)](https://github.com/piyas1234/react-easy-state-management) [![npm](https://img.shields.io/npm/dm/react-easy-state-management.svg)](https://github.com/piyas1234/react-easy-state-management)


 A flexible and efficient state management library for React applications. Simplify state handling and improve code maintainability.
 
 

## Installation

You can install this package via npm:

```bash
npm install react-easy-state-management
```

You can install this package via yarn:

```bash
yarn install react-easy-state-management
```

## Usage

### Creating Contexts

First, you need to create contexts for your application's different data structures. For example:

```javascript
import { createContext } from 'react';

// Create contexts
export const userContext = createContext<any | undefined>(undefined);
export const imagesContext = createContext<any | undefined>(undefined);


const contextNames:Array<contextName> = [
    {
        contextName: 'userContext',
        context: userContext,
        initialValue:{
            name: '',
            email: '',
            age:[],
            gender: '',
            location: '',
            bio: '',
            image: '',
            followers: [],
        }
    },

    {
        contextName: 'imagesContext',
        context: imagesContext,
        initialValue:{
            images: [],
            
        }
    },
     
]


export default  contextNames
```

### Using `Provider`

To use this state management package, you can wrap your components with the `Provider` component. This component allows you to set up context providers for your application.

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import contextNames from './context/contextNames';
import { Provider } from './context';
 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider contextsList={contextNames}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

### Custom Hooks

You can access state and dispatch functions with custom hooks:

```javascript
 import React, { useEffect } from 'react';
import { imagesContext, userContext } from './context/contextNames';
import { useEasyState } from 'react-easy-state-management';
 
 
function App() {
  
  const  [userstate , userDispatch ] = useEasyState(userContext)
  const [ImageSate , imageDispatch ] = useEasyState(imagesContext)

  useEffect(()=>{
    userDispatch({
    type:"name",
    payload:"Piyas",
    offline:true
  }) 
  imageDispatch({
    type:"username",
    payload:"Piyas",
    offline: false

  })
  userDispatch({
    type:"email",
    payload:"Piyas@gmail.com",
    offline:true
  })
 
  },[])


  console.log(userstate)



  return (
    <div className="App">
    {userstate.name}
    </div>
  );
}

export default App;

```

## API

### `Provider`

- `<Provider contextsList={[]}>{/* Your app here */}</Provider>`

  The `Provider` component is used to wrap your app and provide context providers for state management. Pass an array of contexts to set up providers for your application.

### `useEasyState`

- `const [state, setState] = useEasyState(context)`

  A custom hook that allows components to access state and dispatch functions for the specified context.

## Examples

For more examples, check the `https://github.com/piyas1234/react-easy-state-management` directory in this repository.

## Configuration

Explain any configuration options, if applicable.

## Contributing

Contributions are welcome! If you want to contribute to this project, follow the guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file.
`https://github.com/piyas1234/react-easy-state-management`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have questions or need assistance, feel free to contact us at contact@yourwebsite.com.

Your Website: [https://sites.google.com/view/piyastalukder/home](https://sites.google.com/view/piyastalukder/home)

---
**Note**: Customize this template with your package-specific details. Provide comprehensive documentation and examples to help users understand and use your state management package effectively.
```

 