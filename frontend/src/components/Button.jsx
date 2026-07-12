const Button = ({ text, type }) => {

    return (

        <button
            type={type}
            className="bg-blue-600 text-white w-full p-2 rounded"
        >

            {text}

        </button>

    );

};

export default Button;