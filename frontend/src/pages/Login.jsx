import { useState } from "react";

import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {

    const [values, setValues] = useState({

        email: "",

        password: ""

    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {

        setValues({

            ...values,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(values);

    };

    return (

        <div className="flex justify-center items-center h-screen">

            <form
                onSubmit={handleSubmit}
                className="border p-6 rounded w-96"
            >

                <h2 className="text-2xl mb-4">
                    Login
                </h2>

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

                <Button
                    text="Login"
                    type="submit"
                />

            </form>

        </div>

    );

};

export default Login;