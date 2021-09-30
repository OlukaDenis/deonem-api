const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async.middleware');
const geocoder = require('../utils/gecoder');

/**
 *  @description Get all bootcamps
 *  @route GET /api/v1/bootcamps
 *  @access Public
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
});

/**
 *  @description Get a single bootcamp
 *  @route GET /api/v1/bootcamps/:id
 *  @access Public
 */
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) return next(new ErrorResponse(`Bootcamp of id ${req.params.id} not found.`, 404));

  res.status(200).json({ success: true, data: bootcamp });
});

/**
 *  @description Create a new bootcamp
 *  @route POST /api/v1/bootcamps
 *  @access Private - Token needed
 */
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data: bootcamp });
});

/**
 *  @description Update a bootcamp
 *  @route PUT /api/v1/bootcamps/:id
 *  @access Private - Token needed
 */
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) return next(new ErrorResponse(`Bootcamp of id ${req.params.id} not found.`, 404));

  res.status(200).json({ success: true, data: bootcamp });
});

/**
 *  @description Delete a bootcamp
 *  @route DELETE /api/v1/bootcamps/:id
 *  @access Private - Token needed
 */
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) return next(new ErrorResponse(`Bootcamp of id ${req.params.id} not found.`, 404));

  res.status(200).json({ success: true, data: bootcamp });
});

/**
 *  @description Get bootcamps within a radius
 *  @route DELETE /api/v1/bootcamps/radius/:zipcode/:distance
 *  @access Private - Token needed
 */
exports.getBootCampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calculate radius using radians
  // Earth Radius = 6,378km / 3,963 mi
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lat, lng], radius] } },
  });

  res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
});
