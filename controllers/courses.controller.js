const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async.middleware');

/**
 *  @description Get all courses
 *  @route GET /api/v1/courses
 *  @route GET /api/v1/bootcamps/:bootcampId/courses
 *  @access Public
 */
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description website',
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

/**
 *  @description Get a single course
 *  @route GET /api/v1/courses/:id
 *  @access Private
 */
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description website',
  });

  if (!course) return next(new ErrorResponse(`Course with id ${req.params.id} not found`));

  res.status(200).json({
    success: true,
    data: course,
  });
});

/**
 *  @description Create a new course
 *  @route POST /api/v1/bootcamps/:bootcampId/courses
 *  @access Private
 */exports.createCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  const bootcamp = Bootcamp.findById(req.body.bootcampId);

  if (!bootcamp) return next(new ErrorResponse(`Bootcamp with id ${req.params.bootcampId} not found`));

  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    data: course,
  });
});
