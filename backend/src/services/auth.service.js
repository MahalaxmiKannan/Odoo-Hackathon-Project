const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/user.repository");
const { generateToken } = require("../config/jwt");
const roles = require("../constants/roles");
const signup = async (data) => {
  const existingUser =
    await userRepository.findByEmail(
      data.email
    );

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword =
    await bcrypt.hash(data.password, 10);

  const userId =
    await userRepository.createUser({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: roles.EMPLOYEE,
    });

  return await userRepository.findById(
    userId
  );
};
const login = async (data) => {
  const user =
    await userRepository.findByEmail(
      data.email
    );

  if (!user) {
    throw new Error(
      "Invalid email or password"
    );
  }

  const isMatch =
    await bcrypt.compare(
      data.password,
      user.password
    );

  if (!isMatch) {
    throw new Error(
      "Invalid email or password"
    );
  }

  const token = generateToken(user);

  return {
    token,
    user,
  };
};
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