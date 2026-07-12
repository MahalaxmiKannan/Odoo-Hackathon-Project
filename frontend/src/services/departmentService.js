import api from "./api";

export const getDepartments = async () => {
  const response = await api.get("/departments");
  return response.data.data;
};

export const createDepartment = async (department) => {
  const response = await api.post("/departments", department);
  return response.data.data;
};
