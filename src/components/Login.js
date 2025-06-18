import { use, useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

const Login = () => {
                    const navigate = useNavigate()
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleLogin = (e) => {
                    e.preventDefault();
                    const loggeduser = JSON.parse(localStorage.getItem("user"));
                    if(input.email === loggeduser.email && input.password === loggeduser.password){
                                        localStorage.setItem("loggedin",true);
                                        navigate("/")
                    }else{
                                        alert("wrong email or password")
                    }
  }
  return (
    <div className="login-page  w-full h-full absolute top-[50%] left-[50%] flex justify-center items-center -translate-x-[50%] -translate-y-[50%]">
      <div className="login-container w-120 h-[50%] bg-gray-100 flex flex-col justify-around items-center rounded-3xl ">
        <h1 className="text-3xl font-semibold">Login</h1>
        <form className="flex flex-col justify-center " onSubmit={handleLogin}>
          <input
          className="border-1 border-gray-400 p-2 rounded"
            value={input.email}
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
            type="email"
            id="email"
            name="email"
            placeholder="abc@gmail.com"
          ></input>
          <br></br>
          <label className="pb-10" htmlFor="email">Your Email</label>
          <br></br>
          <input
          className="border-1 border-gray-400 p-2 rounded"
            value={input.password}
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
            type="password"
            id="password"
            name="password"
            placeholder="password"
          ></input>
          <br></br>
          <label  className="pb-10" htmlFor="password">Password</label>
          <button className="px-3 py-2 cursor-pointer hover:bg-blue-500 bg-blue-400 rounded " type="submit" >Login</button>
          <p className="opacity-70 mt-2">
            Don't have an account? 
            <Link className="login-link font-bold opacity-100" to="/register">
               Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
