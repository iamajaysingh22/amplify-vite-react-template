import { useEffect } from "react";
import { signUp } from "aws-amplify/auth"
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";

// const client = generateClient<Schema>();

function App() {
 

  useEffect(() => {
   
  }, []);

  const signUpWithPhone= async()=>{

    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: "+919910184570",
      password: "hunter2@44414Frrssss",
      options: {
        userAttributes: {
          email: "hello@mycompany.com",
          gender:'male',
          phone_number: "+919910184570" // E.164 number convention
        },
      }
    });
    console.log(isSignUpComplete, userId, nextStep);
    // client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <main>
      <h1>My todos</h1>
      {/* <button onClick={createTodo}>+ new</button> */}
      <ul>
        {/* {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))} */}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo. 4232352
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      // create a form to get phone no
      <form>
        <label>
          Phone:
          <input type="text" name="phone" />
        </label>
        </form>
      <div>
        <button onClick={signUpWithPhone}>Sign Up with Phone</button>
      </div>
    </main>
  );
}

export default App;
