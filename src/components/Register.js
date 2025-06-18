import { Link } from "react-router";
import { useFormik } from "formik";
import { basicSchema } from "../schemas";
import { useNavigate } from "react-router";

const Register = () => {
                    const navigate = useNavigate()
  const onSubmit = (values,actions) => {
    console.log( values);
    localStorage.setItem("user",JSON.stringify(values))
    navigate("/login")
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  console.log(formik);
  return (
    <div className="login-page w-full h-full absolute top-[50%] left-[50%] flex justify-center items-center -translate-x-[50%] -translate-y-[50%]">
      <div
        className="login-container login-container w-120 h-[50%] bg-gray-100 flex flex-col justify-around items-center rounded-3xl"
        style={{ backgroundColor: "rgb(220, 203, 245)" }}
      >
        <h1 className="text-3xl font-semibold">Register</h1>
        <form className="flex flex-col justify-center" onSubmit={formik.handleSubmit}>
          {formik.errors.name && formik.touched.name && (
            <p className="error">{formik.errors.name}</p>
          )}
          <input

            type="text"
            className={`
              ${formik.errors.name && formik.touched.name ? "input-error" : ""}
              border-1 border-gray-400 p-2 rounded
            `}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your name"
            id="name"
            name="name"
          ></input>
          <label className="pb-10" htmlFor="name">Enter Your Name</label>

          {formik.errors.email && formik.touched.email && (
            <p className="error">{formik.errors.email}</p>
          )}
          <input
            className={`
              ${formik.errors.email && formik.touched.email ? "input-error" : ""}
              border-1 border-gray-400 p-2 rounded
            `}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            id="email"
            name="email"
            placeholder="abc@gmail.com"
          ></input>
          <label className="pb-8" htmlFor="email">Your Email</label>

          <br></br>
          {formik.errors.password && formik.touched.password && (
            <p className="error">{formik.errors.password}</p>
          )}
          <input
            className={`
              ${formik.errors.password && formik.touched.password
                ? "input-error"
                : ""} border-1 border-gray-400 p-2 rounded
            `}
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
            id="password"
            name="password"
            placeholder="set password"
            onBlur={formik.handleBlur}
          ></input>
          <label className="pb-10" htmlFor="password">New Password</label>

          <button className="px-3 py-2 cursor-pointer hover:bg-gray-500 bg-gray-700 text-white rounded " disabled={formik.isSubmitting} type="submit">Register</button>
          <p className="opacity-50 mt-4">
            Have already an account?
            <Link to="/login" className="login-link font-bold opacity-100">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
