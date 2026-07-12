import { useState } from "react";
import { forgotPassword } from "../services/authService";

const Modal = ({ close }) => {

    const [email, setEmail] = useState("");

    const handleSubmit = async () => {

        try {

            const response = await forgotPassword(email);

            alert(response.message);

            close();

        }

        catch {

            alert("Feature coming soon");

        }

    };

    return (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

            <div className="bg-white p-6 rounded-lg w-96">

                <h2 className="text-xl font-bold mb-4">

                    Forgot Password

                </h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className="border w-full p-2 rounded"
                />

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white w-full p-2 mt-4 rounded"
                >
                    Send Reset Link
                </button>

                <button
                    onClick={close}
                    className="mt-3 w-full"
                >
                    Cancel
                </button>

            </div>

        </div>

    );

};

export default Modal;