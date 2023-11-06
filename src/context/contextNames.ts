import { ContextName } from "./contextTypes";

const contextNames: Array<ContextName> = [
  {
    contextName: "userContext",
    initialValue: {
      name: "",
      email: "",
      age: [],
      gender: "",
      location: "",
      bio: "",
      image: "",
      followers: [],
      loading:false
    },
  },
];

export default contextNames;
