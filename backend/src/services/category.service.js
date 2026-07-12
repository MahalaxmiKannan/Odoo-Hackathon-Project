const categoryRepository = require(
  "../repositories/category.repository"
);

// Get all categories
const getAllCategories = async () => {
  return await categoryRepository.getAllCategories();
};

// Create category
const createCategory = async (data) => {
  const existingCategory =
    await categoryRepository.findByName(
      data.name
    );

  if (existingCategory) {
    throw new Error(
      "Category already exists"
    );
  }

  const categoryId =
    await categoryRepository.createCategory(
      data
    );

  return await categoryRepository.findById(
    categoryId
  );
};

// Update category
const updateCategory = async (
  id,
  data
) => {
  const category =
    await categoryRepository.findById(id);

  if (!category) {
    throw new Error(
      "Category not found"
    );
  }

  await categoryRepository.updateCategory(
    id,
    data
  );

  return await categoryRepository.findById(
    id
  );
};

// Delete category
const deleteCategory = async (id) => {
  const category =
    await categoryRepository.findById(id);

  if (!category) {
    throw new Error(
      "Category not found"
    );
  }

  await categoryRepository.deleteCategory(
    id
  );

  return {
    message:
      "Category deleted successfully",
  };
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};