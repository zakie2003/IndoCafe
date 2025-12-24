import Outlet from '../models/Outlet.js';
import User from '../models/User.js';
import { sendResponse } from '../utils/responseHandler.js';

// @desc    Create a new Outlet
// @route   POST /api/admin/outlets
// @access  Private (Super Admin)
export const createOutlet = async (req, res) => {
  try {
    const { name, address, type, phoneNumber, location } = req.body;

    const outlet = await Outlet.create({
      name,
      address,
      type,
      phoneNumber,
      location
    });

    sendResponse(res, 201, outlet, 'Outlet created successfully', true);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, null, error.message, false);
  }
};

// @desc    Get all outlets (id and name only)
// @route   GET /api/admin/outlets
// @access  Private (Super Admin)
export const getAllOutlets = async (req, res) => {
  try {
    const outlets = await Outlet.find({}, 'name _id type isActive');
    sendResponse(res, 200, outlets, 'Outlets retrieved successfully', true);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, null, error.message, false);
  }
};

// @desc    Create a new User (Manager/Staff)
// @route   POST /api/admin/users
// @access  Private (Super Admin)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, phoneNumber, outletId } = req.body;

    // Validate outletId for operational roles
    if (!outletId && ['OUTLET_MANAGER', 'CASHIER', 'KITCHEN', 'WAITER', 'DISPATCHER', 'RIDER'].includes(role)) {
      return sendResponse(res, 400, null, 'Outlet ID is required for operational roles', false);
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendResponse(res, 400, null, 'User already exists', false);
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      phoneNumber,
      defaultOutletId: outletId
    });

    sendResponse(res, 201, {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      defaultOutletId: user.defaultOutletId
    }, 'User created successfully', true);

  } catch (error) {
    console.error(error);
    sendResponse(res, 500, null, error.message, false);
  }
};
