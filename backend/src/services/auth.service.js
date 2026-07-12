const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/user.repository");
const { generateToken } = require("../config/jwt");
const roles = require("../constants/roles");

// Signup
const signup = async (data) => {
  // Check if email already exists
  const existingUser = await userRepository.findByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create user
  const userId = await userRepository.createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: roles.EMPLOYEE,
  });

  // Fetch created user
  const user = await userRepository.findById(userId);

  // Remove password before sending response
  delete user.password;

  return user;
};

// Login
const login = async (data) => {
  // Find user
  const user = await userRepository.findByEmail(data.email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare password
  const isMatch = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT Token
  const token = generateToken(user);

  // Remove password before sending response
  delete user.password;

  return {
    token,
    user,
  };
};

// Forgot Password
const forgotPassword = async () => {
  return {
    message:
      "Password reset functionality is currently unavailable.",
  };
};

module.exports = {
  signup,
  login,
  forgotPassword,
};