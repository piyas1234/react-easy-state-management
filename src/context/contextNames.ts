import { createContext } from 'react';
import { contextName } from './contextTypes';

// Define the context
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




