// const Button = ({ text, type }) => {

//     return (

//         <button
//             type={type}
//             className="bg-blue-600 text-white w-full p-2 rounded">

//             {text}

//         </button>

//     );

// };

// export default Button;


const Button = ({ text, type, onClick }) => {

    return (

        <button
            type={type}
            onClick={onClick}
            className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
        >
            {text}
        </button>

    );

};

export default Button; 

// const Button = ({ text, type = "button", onClick }) => {

//   return (

//     <button
//       type={type}
//       onClick={onClick}
//       className="
//       w-full
//       bg-blue-600
//       hover:bg-blue-700
//       text-white
//       py-3
//       rounded-xl
//       font-semibold
//       transition
//       "
//     >

//       {text}

//     </button>

//   );

// };

// export default Button;