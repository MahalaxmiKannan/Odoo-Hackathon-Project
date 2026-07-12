const allocationRepository = require(
  "../repositories/allocation.repository"
);

const assetRepository = require(
  "../repositories/asset.repository"
);

const employeeRepository = require(
  "../repositories/employee.repository"
);

// Get all allocations
const getAllAllocations = async () => {
  return await allocationRepository.getAllAllocations();
};

// Allocate asset
const createAllocation = async (
  data
) => {
  // Check asset exists
  const asset =
    await assetRepository.findById(
      data.asset_id
    );

  if (!asset) {
    throw new Error(
      "Asset not found"
    );
  }

  // Check employee exists
  const employee =
    await employeeRepository.findById(
      data.employee_id
    );

  if (!employee) {
    throw new Error(
      "Employee not found"
    );
  }

  // Check asset already allocated
  const activeAllocation =
    await allocationRepository.findActiveAllocationByAsset(
      data.asset_id
    );

  if (activeAllocation) {
    throw new Error(
      "Asset is already allocated"
    );
  }

  // Create allocation
  const allocationId =
    await allocationRepository.createAllocation(
      data
    );

  // Update asset status
  await assetRepository.updateAsset(
    data.asset_id,
    {
      asset_name: asset.asset_name,
      description: asset.description,
      category_id: asset.category_id,
      purchase_date: asset.purchase_date,
      purchase_cost: asset.purchase_cost,
      status: "ALLOCATED",
    }
  );

  return await allocationRepository.findById(
    allocationId
  );
};

// Return asset
const returnAsset = async (
  allocationId
) => {
  const allocation =
    await allocationRepository.findById(
      allocationId
    );

  if (!allocation) {
    throw new Error(
      "Allocation not found"
    );
  }

  if (
    allocation.status === "RETURNED"
  ) {
    throw new Error(
      "Asset already returned"
    );
  }

  await allocationRepository.returnAsset(
    allocationId
  );

  const asset =
    await assetRepository.findById(
      allocation.asset_id
    );

  await assetRepository.updateAsset(
    allocation.asset_id,
    {
      asset_name: asset.asset_name,
      description: asset.description,
      category_id: asset.category_id,
      purchase_date: asset.purchase_date,
      purchase_cost: asset.purchase_cost,
      status: "AVAILABLE",
    }
  );

  return {
    message:
      "Asset returned successfully",
  };
};

// Get employee allocations
const getAllocationsByEmployee =
  async (employeeId) => {
    return await allocationRepository.getAllocationsByEmployee(
      employeeId
    );
  };

module.exports = {
  getAllAllocations,
  createAllocation,
  returnAsset,
  getAllocationsByEmployee,
};