const { ERROR_MESSAGES, MESSAGES } = require("../constants/messages.constants");
const db = require("../models");
const Task = db.tasks;
const Op = db.Sequelize.Op;



exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.description || !req.body.due_date) {
    res.status(400).send({
      message: ERROR_MESSAGES.MISSING_REQUIRED_FIELDS
    });
    return;
  }

  // Create a Task
  const task = {
    title: req.body.title,
    description: req.body.description,
    due_date: req.body.due_date,
  };

  // Save Task in the database
  Task.create(task)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG
      });
    });
};


exports.findAll = (req, res) => {
  // const title = req.query.title;
  const pageNumber = req.query.pageNumber ?? 0;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Task.findAll({ offset: pageNumber * 10, limit: 10 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG
      });
    });
};


exports.getStatusMetrics = (req, res) => {
  Task.findAll({
    attributes: [
      [db.Sequelize.fn('COUNT', db.Sequelize.literal('CASE WHEN status = \'open\' THEN 1 END')), 'open_tasks'],
      [db.Sequelize.fn('COUNT', db.Sequelize.literal('CASE WHEN status = \'ongoing\' THEN 1 END')), 'ongoing_tasks'],
      [db.Sequelize.fn('COUNT', db.Sequelize.literal('CASE WHEN status = \'completed\' THEN 1 END')), 'completed_tasks'],
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG
      });
    });
};


exports.getTimelineMetrics = async (req, res) => {

  try {
    const tasks = await Task.findAll();
    const metricsByMonth = {};

    tasks.forEach(task => {
      const monthYear = task.createdAt.toISOString().slice(0, 7);
      if (!metricsByMonth[monthYear]) {
        metricsByMonth[monthYear] = { open_tasks: 0, inprogress_tasks: 0, completed_tasks: 0 };
      }

      switch (task.status) {
        case 'open':
          metricsByMonth[monthYear].open_tasks++;
          break;
        case 'ongoing':
          metricsByMonth[monthYear].inprogress_tasks++;
          break;
        case 'completed':
          metricsByMonth[monthYear].completed_tasks++;
          break;
        default:
          break;
      }
    });

    const metrics = Object.entries(metricsByMonth).map(([date, metrics]) => ({
      date,
      metrics
    }));
    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).send({
      message:
        err.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG
    });
  }
};


exports.update = (req, res) => {
  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: MESSAGES.UPDATE_SUCCESS_MESSAGE
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Task with id=" + id
      });
    });
};
