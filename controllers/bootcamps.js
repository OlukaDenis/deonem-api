const Bootcamp = require('../models/Bootcamp');

/**
 *  @description Get all bootcamps
 *  @route GET /api/v1/bootcamps
 *  @access Public
 */
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({ success: true, data: bootcamps });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

/**
 *  @description Get a single bootcamp
 *  @route GET /api/v1/bootcamps/:id
 *  @access Public
 */
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) return res.status(400).json({ success: false });

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

/**
 *  @description Create a new bootcamp
 *  @route POST /api/v1/bootcamps
 *  @access Private - Token needed
 */
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

/**
 *  @description Update a bootcamp
 *  @route PUT /api/v1/bootcamps/:id
 *  @access Private - Token needed
 */
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({ success: true });
};

/**
 *  @description Delete a bootcamp
 *  @route DELETE /api/v1/bootcamps/:id
 *  @access Private - Token needed
 */
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({ success: true });
};
