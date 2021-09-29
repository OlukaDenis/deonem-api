/**
 *  @description Get all bootcamps
 *  @route GET /api/v1/bootcamps
 *  @access Public
 */
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true });
};

/**
 *  @description Get a single bootcamp
 *  @route GET /api/v1/bootcamps/:id
 *  @access Public
 */
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true });
};

/**
 *  @description Create a new bootcamp
 *  @route POST /api/v1/bootcamps
 *  @access Private - Token needed
 */
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true });
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
