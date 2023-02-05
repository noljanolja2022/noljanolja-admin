import { TextField } from "@mui/material";

function Signin() {

    return (
        <div className='p-4 flex flex-col items-center w-full'>
            <TextField id="input-email" label="Email" variant="outlined" />
            <TextField id="input-password" label="Password" variant="outlined" />
        </div>
    )
}

export default Signin;