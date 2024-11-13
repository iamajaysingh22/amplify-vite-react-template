import { useEffect, useState } from "react";
import { signUp, confirmSignUp,resendSignUpCode } from "aws-amplify/auth"
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";

// const client = generateClient<Schema>();

function App() {
 
  const [otp ,setOtp]=useState<string>('');
  const [phone ,setPhone]=useState<string>('');
  useEffect(() => {
   
  }, []);

  const signUpWithPhone= async()=>{

    try {

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
  } catch (error:any) {
    console.log('error',error);
    if(error.code==='UsernameExistsException'){
      console.log('User already exists');
      resendSignUpCodeWithPhone();
    }
    
  }
    // client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  const confirnSignUpWithPhone= async()=>{
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: "+919910184570",
      confirmationCode: otp
    });
    console.log(isSignUpComplete, nextStep);
  }
  const resendSignUpCodeWithPhone= async()=>{
   const {destination,deliveryMedium,attributeName }  = await resendSignUpCode({
      username: "+919910184570"
    });
    console.log(destination,deliveryMedium,attributeName);
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
          <input type="text" name="phone" value={phone} onChange={(e)=> setPhone(e.target.value)} />
        </label>
        <label>
          OTP:
          <input type="text" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} />
        </label>
        </form>
      <div>
        <button onClick={signUpWithPhone}>Sign Up with Phone</button>
      </div>
      <div>
        <button onClick={confirnSignUpWithPhone}>Confirn signUp!</button>
      </div>
    </main>
  );
}

export default App;
