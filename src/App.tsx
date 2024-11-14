import { useEffect, useState } from "react";
import { signUp, confirmSignUp,resendSignUpCode } from "aws-amplify/auth"
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";

// const client = generateClient<Schema>();

function App() {
 
  const [otp, setOtp] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  useEffect(() => {
   
  }, []);

  const signUpWithPhone = async () => {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: phone,
        password: "hunter2@44414Frrssss",
        options: {
          userAttributes: {
            email: "hello@mycompany.com",
            gender: 'male',
            phone_number: phone // E.164 number convention
          },
        }
      });
     
      setSuccessMessage(`Please check your phone no ${phone} for the OTP.`);
      setErrorMessage(null);
      console.log(isSignUpComplete, userId, nextStep);
    } catch (error: any) {
      console.log('error==', JSON.stringify(error));
      handleSignUpError(error);
    }
  }

  const  handleSignUpError= (error:any)=>{
    if (error?.name) {
        switch (error.name) {
            case 'EmptySignUpUsername':
                setErrorMessage('Please provide valid phone number.');
                setSuccessMessage(null);
                break;
            case 'UsernameExistsException':
                
                
                resendSignUpCodeWithPhone();
                break;
            default:
                alert('Error occurred: ' + error.message);
        }
    } else {
        alert('Error: ' + error.message);
    }
}

  const confirmSignUpWithPhone = async () => {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: phone,
        confirmationCode: otp
      });
      if(isSignUpComplete){
      setSuccessMessage("Sign up confirmed successfully.");
      setErrorMessage(null);
      }
      console.log(isSignUpComplete, nextStep);
    } catch (error: any) {
      console.log('error', error);
      setErrorMessage(error.message);
      setSuccessMessage(null);
    }
  }

  const resendSignUpCodeWithPhone = async () => {
    try {
      const { destination, deliveryMedium, attributeName } = await resendSignUpCode({
        username: phone
      });
      setSuccessMessage(`Please check your phone no ${destination} for the OTP.`);
      setErrorMessage(null);
      console.log(destination, deliveryMedium, attributeName);
    } catch (error: any) {
      console.log('error', JSON.stringify(error));
      setErrorMessage(error.message);
      setSuccessMessage(null);
    }
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
        <button onClick={confirmSignUpWithPhone}>Confirm Sign Up</button>
      </div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
    </main>
  );
}

export default App;
