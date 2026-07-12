const allocationService = require("../services/allocation.service");

exports.getAllAllocations = async (req, res) => {
  try {
    const allocations =
      await allocationService.getAllAllocations();

    res.status(200).json({
      success: true,
      data: allocations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createAllocation = async (req, res) => {
  try {
    const allocation =
      await allocationService.createAllocation(
        req.body
      );

    res.status(201).json({
      success: true,
      message: "Asset allocated successfully",
      data: allocation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.returnAsset = async (req, res) => {
  try {
    const result =
      await allocationService.returnAsset(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllocationsByEmployee =
  async (req, res) => {
    try {
      const allocations =
        await allocationService.getAllocationsByEmployee(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data: allocations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };