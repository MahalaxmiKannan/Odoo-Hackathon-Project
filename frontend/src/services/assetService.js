import api from "./api";

export const getAssets = async () => {
  const response = await api.get("/assets");
  return response.data.data;
};

export const createAsset = async (asset) => {
  const response = await api.post("/assets", asset);
  return response.data.data;
};

export const updateAsset = async (id, asset) => {
  const response = await api.put(`/assets/${id}`, asset);
  return response.data.data;
};

export const deleteAsset = async (id) => {
  const response = await api.delete(`/assets/${id}`);
  return response.data;
};
