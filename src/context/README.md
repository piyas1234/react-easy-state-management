 
 
# React Easy State Management

A Professional State Management Library for React Applications

[![GitHub issues](https://img.shields.io/github/issues/piyas1234/react-easy-state-management.svg)](https://github.com/piyas1234/react-easy-state-management/issues)
[![GitHub forks](https://img.shields.io/github/forks/piyas1234/react-easy-state-management.svg)](https://github.com/piyas1234/react-easy-state-management/network)
[![GitHub stars](https://img.shields.io/github/stars/piyas1234/react-easy-state-management.svg)](https://github.com/piyas1234/react-easy-state-management/stargazers)
[![GitHub license](https://img.shields.io/github/license/piyas1234/react-easy-state-management.svg)](https://github.com/piyas1234/react-easy-state-management/blob/main/LICENSE)

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
  - [Online Paging with Dispatch](#online-paging-with-dispatch)
  - [Offline Data Storage](#offline-data-storage)
  - [useEasyState Hook](#useeasystate-hook)
- [Context Structure](#context-structure)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Overview

**React Easy State Management** is a professional-grade state management library designed for React applications. It simplifies state management and provides features like online paging and offline data storage. Use it to enhance your React app's development and management.

[Full Documentation](https://piyas1234.github.io/react-easy-state-management/)

## Installation

To integrate **React Easy State Management** into your project, follow these steps:

1. Install the library using npm or yarn:

   ```shell
   npm install react-easy-state-management
   ```

   ```shell
   yarn add react-easy-state-management
   ```

2. Import the required components into your React application:

   ```javascript
   import { Provider, useEasyState } from "react-easy-state-management";
   ```

3. Set up your state context and use the provided hooks to manage and access your application's state.

## Usage

**React Easy State Management** provides a seamless way to manage your React application's state. Below are some advanced features:

### Creating Contexts - easy way 

First, you need to create contexts for your application's different data structures. For example:

```javascript
import { ContextName } from  "./contextTypes";

const contextNames: Array<ContextName> = [
  {
    contextName: "userContext",
    initialValue: {
      name:  "",
      email:  "",
      age: [],
      gender:  "",
      location:  "",
      bio:  "",
      image:  "",
      followers: [],
      loading:  false,
    },
  },
  {
    contextName: "images",
    initialValue: {
      images: [],
    },
  },
];
```


### Creating Contexts another way 

  

First, you need to create contexts for your application's different data structures. For example:

  
  ```javascript
import { ContextName } from  "./contextTypes";
import { createContext } from  'react';

// Create contexts

export  const  userContext  =  createContext<any  |  undefined>(undefined);
export  const  imagesContext  =  createContext<any  |  undefined>(undefined);

const contextNames: Array<ContextName> = [
  {
    contextName: "userContext",
    context:  userContext,
    initialValue: {
      name:  "",
      email:  "",
      age: [],
      gender:  "",
      location:  "",
      bio:  "",
      image:  "",
      followers: [],
      loading:  false,
    },
  },
  {
    contextName: "images",
    context:  imagesContext,
    initialValue: {
      images: [],
    },
  },
];
```

### Using `Provider`

To use this state management package, you can wrap your components with the `Provider` component. This component allows you to set up context providers for your application.

```javascript
import  React  from  'react';
import  ReactDOM  from  'react-dom/client';
import  './index.css';
import  App  from  './App';
import  reportWebVitals  from  './reportWebVitals';
import  contextNames  from  './context/contextNames';
import { Provider } from  'react-easy-state-management';

const  root  =  ReactDOM.createRoot(
  document.getElementById('root')  as  HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider  contextsList={contextNames}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

### Custom Hooks -easy way


 

```javascript
import  React, { useEffect } from  'react';
import { imagesContext, userContext } from  './context/contextNames';
import { useEasyState } from  'react-easy-state-management';

function  App() {
  const [userstate , userDispatch ] =  useEasyState('userContext')
  const [ImageSate , imageDispatch ] =  useEasyState('imagesContext')

  useEffect(()=>{
    userDispatch({
      type:"name",
      payload:"Piyas",
      offline:true
    })
    imageDispatch({
      type:"username",
      payload:"Piyas",
      offline:  false
    })
    userDispatch({
      type:"email",
      payload:"Piyas@gmail.com",
      offline:true
    })
  },[])
  console.log(userstate)
}
```

### Custom Hooks -another way 

You can access state and dispatch functions with custom hooks:

```javascript
import  React, { useEffect } from  'react';
import { imagesContext, userContext } from  './context/contextNames';
import { useEasyState } from  'react-easy-state-management';

function  App() {
  const [userstate , userDispatch ] =  useEasyState(userContext)
  const [ImageSate , imageDispatch ] =  useEasyState(imagesContext)

  useEffect(()=>{
    userDispatch({
      type:"name",
      payload:"Piyas",
      offline:true
    })
    imageDispatch({
      type:"username",
      payload:"Piyas",
      offline:  false
    })
    userDispatch({
      type:"email",
      payload:"Piyas@gmail.com",
      offline:true
    })
  },[])
  console.log(userstate)
}
```

### Offline Data Storage

**React Easy State Management** simplifies offline data storage. You can set offline data using the "key" and "online" properties in the `dispatch` function. Here's how to use it:

```javascript
import React from "react";
import { useEasyState } from "react-easy-state-management";

function MyComponent() {
  const [userData, userDispatch] = useEasyState("userContext");

  // Simulate fetching user data from an API
  const fetchUserData = async () => {
    try {
      const response = await fetch("https://api.example.com/user-data");
      const user = await response.json();

      // Store the user data offline using the "offline" property
      userDispatch({
        type: "userData",
        payload: user,
        offline: true,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
}
```

### useEasyState Hook

The `useEasyState` hook allows you to access your state context easily. Here's how you can use it:

```javascript
import React from "react";
import { useEasyState } from "react-easy-state-management";

function MyComponent() {
  // Access your state context using useEasyState
  const [userState, userDispatch] = useEasyState("userContext");

  // Use userState and userDispatch as needed
}
```

## Context Structure

Customize the context structure to match your application's specific requirements. **React Easy State Management** allows you to create multiple contexts for different sections of your app.



## Contributing

We welcome contributions from the community. To contribute to this project, create a pull request or open an issue. Your feedback and contributions are valuable and appreciated.

## License

This project is licensed under the MIT License. For more information, see the [LICENSE](LICENSE) file.

## Author

- **Piyas Talukder**
- GitHub: [Piyas Talukder on GitHub](https://github.com/piyas1234)

[GitHub Repository](https://github.com/piyas1234/react-easy-state-management)
 

 