module.exports = app => {
  const tasks = require("../controllers/task.controller.js");
  const { Routes } = require("../constants/route.constants.js");

  var router = require("express").Router();

  router.post(Routes.CREATE_TASK_ROUTE, tasks.create);

  router.get(Routes.GET_ALL_TASKS_ROUTE, tasks.findAll);

  router.put(Routes.UPDATE_TASK_ROUTE, tasks.update);

  router.get(Routes.GET_STATUS_METRICS_ROUTE, tasks.getStatusMetrics);

  router.get(Routes.GET_TIMELINE_METRICS_ROUTE, tasks.getTimelineMetrics);

  app.use('/api/tasks', router);
};
