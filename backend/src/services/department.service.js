const departmentRepository = require(
  "../repositories/department.repository"
);

// Get all departments
const getAllDepartments = async () => {
  return await departmentRepository.getAllDepartments();
};

// Create department
const createDepartment = async (data) => {
  // Check if code already exists
  const existingDepartment =
    await departmentRepository.findByCode(
      data.code
    );

  if (existingDepartment) {
    throw new Error(
      "Department code already exists"
    );
  }

  // Create department
  const departmentId =
    await departmentRepository.createDepartment(
      data
    );

  return await departmentRepository.findById(
    departmentId
  );
};

// Update department
const updateDepartment = async (
  id,
  data
) => {
  const department =
    await departmentRepository.findById(id);

  if (!department) {
    throw new Error(
      "Department not found"
    );
  }

  await departmentRepository.updateDepartment(
    id,
    data
  );

  return await departmentRepository.findById(
    id
  );
};

// Delete department
const deleteDepartment = async (id) => {
  const department =
    await departmentRepository.findById(id);

  if (!department) {
    throw new Error(
      "Department not found"
    );
  }

  await departmentRepository.deleteDepartment(
    id
  );

  return {
    message:
      "Department deleted successfully",
  };
};

module.exports = {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};