import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
	const { user } = useContext(AuthContext);
	const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

	if (!user && !token) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default ProtectedRoute;
