const express = require('express');
const {
  getCourses,
  getCourse,
  createCourse,
} = require('../controllers/courses.controller');

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(getCourses)
  .post(createCourse);

router.route('/:id')
  .get(getCourse);

module.exports = router;
