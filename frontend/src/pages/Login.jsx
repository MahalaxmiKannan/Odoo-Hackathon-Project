// import { useState } from "react";

// import Input from "../components/Input";
// import Button from "../components/Button";

// import Card from "../components/Card";
// import Modal from "../components/Modal";


// import { useState } from "react";

// const [showForgot, setShowForgot] = useState(false);

// const [showSignup, setShowSignup] = useState(false);

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

import SignupModal from "../components/SignupModal";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import { loginUser } from "../services/authService";

const Login = () => {

    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [showSignup, setShowSignup] = useState(false);
    const [showForgot, setShowForgot] = useState(false);

    const handleChange = (e) => {

        setValues({
            ...values,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await loginUser({
                email: values.email,
                password: values.password,
            });

            if (response?.success) {
                setMessage(response.message || "Login successful");
            } else {
                setMessage(response?.message || "Login failed");
            }
        } catch (error) {
            setMessage(error?.response?.data?.message || "Unable to connect to the server");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white shadow-xl rounded-3xl w-[420px] p-8">

                {/* Header */}

                <h1 className="text-3xl font-bold text-center mb-6">

                    AssetFlow Login

                </h1>

                {/* Logo */}

                <div className="flex justify-center mb-8">

                    <div className="w-20 h-20 rounded-full border flex items-center justify-center text-3xl font-bold">

                        AF

                    </div>

                </div>

                {/* Login Form */}

                <form onSubmit={handleSubmit}>

                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        error={errors.password}
                    />

                    {message && (
                        <div className={`mb-4 rounded-lg p-3 text-sm ${message.toLowerCase().includes("successful") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {message}
                        </div>
                    )}

                    <div className="text-right mb-4">

                        <button
                            type="button"
                            onClick={() => setShowForgot(true)}
                            className="text-blue-600 hover:underline"
                        >

                            Forgot Password?

                        </button>

                    </div>

                    <Button
                        text={loading ? "Logging in..." : "Login"}
                        type="submit"
                    />

                </form>

                {/* Divider */}

                <div className="my-8 border-t"></div>

                {/* Signup */}

                <h2 className="text-xl font-semibold">

                    New here?

                </h2>

                <div className="border rounded-xl p-4 mt-3">

                    <p className="text-gray-600">

                        Sign up creates an employee account.
                        Admin roles will be assigned later.

                    </p>

                    <div className="mt-4">

                        <Button
                            text="Create Account"
                            type="button"
                            onClick={() => setShowSignup(true)}
                        />

                    </div>

                </div>

            </div>

            {/* Forgot Password Modal */}

            {showForgot && (

                <ForgotPasswordModal

                    close={() => setShowForgot(false)}

                />

            )}

            {/* Signup Modal */}

            {showSignup && (

                <SignupModal

                    close={() => setShowSignup(false)}

                />

            )}

        </div>

    );

};

export default Login;
// import { useState } from "react";
// import Input from "../components/Input";
// import Button from "../components/Button";

// const Login = () => {

//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setValues({
//       ...values,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(values);
//   };

//   return (

//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center">

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-2xl rounded-3xl p-8 w-[420px]"
//       >

//         <h1 className="text-3xl font-bold text-center mb-6">
//           AssetFlow
//         </h1>

//         <div className="flex justify-center mb-8">

//           <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg">

//             AF

//           </div>

//         </div>

//         <Input
//           label="Email"
//           type="email"
//           name="email"
//           placeholder="name@company.com"
//           value={values.email}
//           onChange={handleChange}
//           error={errors.email}
//         />

//         <Input
//           label="Password"
//           type="password"
//           name="password"
//           placeholder="********"
//           value={values.password}
//           onChange={handleChange}
//           error={errors.password}
//         />

//         <div className="text-right mb-5">

//           <button
//             type="button"
//             className="text-blue-600 hover:underline"
//           >
//             Forgot Password?
//           </button>

//         </div>

//         <Button
//           text="Login"
//           type="submit"
//         />

//         <hr className="my-6" />

//         <h3 className="font-semibold mb-2">

//           New here?

//         </h3>

//         <p className="text-gray-600 text-sm mb-5">

//           Sign up creates an employee account.
//           Admin roles are assigned later.

//         </p>

//         <Button
//           text="Create Account"
//           type="button"
//         />

//       </form>

//     </div>

//   );

// };

// export default Login;