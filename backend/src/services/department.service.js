const departmentRepository =
require("../repositories/department.repository");
const createDepartment =
async (data) => {

  const departmentId =
    await departmentRepository
      .createDepartment(data);

  return await departmentRepository
    .findById(departmentId);
};const updateDepartment =
async (id, data) => {

  await departmentRepository
    .updateDepartment(id, data);

  return await departmentRepository
    .findById(id);
};const deleteDepartment =
async (id) => {

  const department =
    await departmentRepository
      .findById(id);

  if (!department) {
    throw new Error(
      "Department not found"
    );
  }

  await departmentRepository
    .deleteDepartment(id);
};module.exports = {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
};