import api from './api';

export const getAllocations = async () => {
  const res = await api.get('/allocations');
  return res.data.data || [];
};

export const createAllocation = async (payload) => {
  const res = await api.post('/allocations', payload);
  return res.data.data;
};

export const returnAllocation = async (id) => {
  const res = await api.put(`/allocations/${id}/return`);
  return res.data.data;
};

export const getAllocationsByEmployee = async (employeeId) => {
  const res = await api.get(`/allocations/employee/${employeeId}`);
  return res.data.data || [];
};

export default {
  getAllocations,
  createAllocation,
  returnAllocation,
  getAllocationsByEmployee,
};
