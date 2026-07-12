const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
}) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label>{label}</label>

      <br />

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "8px",
          marginTop: "5px",
        }}
      />

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;