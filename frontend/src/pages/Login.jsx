// import { useState } from "react";

// import Input from "../components/Input";
// import Button from "../components/Button";

// const Login = () => {

//     const [values, setValues] = useState({

//         email: "",

//         password: ""

//     });

//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {

//         setValues({

//             ...values,

//             [e.target.name]: e.target.value

//         });

//     };

//     const handleSubmit = (e) => {

//         e.preventDefault();

//         console.log(values);

//     };

//     return (

//         <div className="flex justify-center items-center h-screen">

//             <form
//                 onSubmit={handleSubmit}
//                 className="border p-6 rounded w-96"
//             >

//                 <h2 className="text-2xl mb-4">
//                     Login
//                 </h2>

//                 <Input
//                     label="Email"
//                     name="email"
//                     type="email"
//                     value={values.email}
//                     onChange={handleChange}
//                     error={errors.email}
//                 />

//                 <Input
//                     label="Password"
//                     name="password"
//                     type="password"
//                     value={values.password}
//                     onChange={handleChange}
//                     error={errors.password}
//                 />

//                 <Button
//                     text="Login"
//                     type="submit"
//                 />

//             </form>

//         </div>

//     );

// };

// export default Login;

import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl p-8 w-[420px]"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          AssetFlow
        </h1>

        <div className="flex justify-center mb-8">

          <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg">

            AF

          </div>

        </div>

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="name@company.com"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="********"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="text-right mb-5">

          <button
            type="button"
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>

        </div>

        <Button
          text="Login"
          type="submit"
        />

        <hr className="my-6" />

        <h3 className="font-semibold mb-2">

          New here?

        </h3>

        <p className="text-gray-600 text-sm mb-5">

          Sign up creates an employee account.
          Admin roles are assigned later.

        </p>

        <Button
          text="Create Account"
          type="button"
        />

      </form>

    </div>

  );

};

export default Login;