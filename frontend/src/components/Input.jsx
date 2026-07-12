// const Input = ({
//   label,
//   type = "text",
//   name,
//   value,
//   onChange,
//   error,
// }) => {
//   return (
//     <div style={{ marginBottom: "15px" }}>
//       <label>{label}</label>

//       <br />

//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         style={{
//           width: "100%",
//           padding: "8px",
//           marginTop: "5px",
//         }}
//       />

//       {error && (
//         <p style={{ color: "red" }}>
//           {error}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Input;

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  placeholder,
}) => {
  return (
    <div className="mb-5">
      <label className="block text-gray-700 font-medium mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          px-4
          py-3
          border
          border-gray-300
          rounded-xl
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          transition
        "
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;