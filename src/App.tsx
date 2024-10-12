 
import { useEffect } from "react";
import { Provider, useEasy, useEasyOffline } from "./context";
 

function App() {
  return (
    <Provider contextsList={contextNames}>
      <HomeScreen />
    </Provider>
  );
}

export default App;



 
// Define HomeScreen component
function HomeScreen() {
  const [state, setState, showLoaderFnc] = useEasy("userContext" );

  console.log(state);

   
  const getData = () =>
    showLoaderFnc(async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const todos = await fetch("https://jsonplaceholder.typicode.com/todos");
        const user = await response.json();
        const todosData  = await todos.json();

        // Set user data in state
        setState({
          userData: user,
          todosData:todosData,
          loading: false,
        });
      } catch (error) {
        console.error("Error:", error);
        setState({ loading: false });
      }
    });

  // Fetch data on component mount
  useEffect(() => {
    getData();
  }, []);

  // Render the user data or a loading message
  return (
    <div style={styles.container}>
      {state?.loading ? (
        <p>Loading...</p>
      ) : (
        state?.userData?.map((user: any) => (
          <div key={user.id} style={styles.itemContainer}>
            <h3 style={styles.itemName}>{user.name}</h3>
            <p style={styles.itemEmail}>{user.email}</p>
          </div>
        ))
      )}
    </div>
  );
}

// Define the context provider with the initial context state
const contextNames = [
  {
    contextName: "userContext",
    initialValue:{
      users:[]
    }
    
  },

  {
    contextName: "postsContext",
    initialValue:{
        posts:[]
    }
    
  },
];

 

// Define styles for the component
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  itemContainer: {
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  itemName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  itemEmail: {
    fontSize: "16px",
    color: "#666",
  },
};
