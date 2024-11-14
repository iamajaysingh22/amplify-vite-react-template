export const  handleSignUpError= (error:any)=>{
    if (error?.name) {
        switch (error.name) {
            case 'EmptySignUpUsername':
                alert('Please provide valid phone number.');
               
                break;
            case 'UsernameExistsException':
                alert('Username already exists. Try a different username.');
                
                break;
            default:
                alert('Error occurred: ' + error.message);
        }
    } else {
        alert('Error: ' + error.message);
    }
}