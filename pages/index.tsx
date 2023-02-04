import { Router, useRouter } from "next/router";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";

function Home() {
    const router = useRouter();

    return (
        <div>
            <p className="text-red-500 ">Hey there. If you see this, it means you are logged in</p>
            <button className='border-1 bg-yellow-200 p-2 rounded-md' onClick={() => {
                AuthService.clearToken();
                UserService.saveUser(null);
                router.replace('/login')
            }}>Logout </button>
        </div>
    )
}

export default Home;