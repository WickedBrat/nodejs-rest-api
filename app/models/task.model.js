module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM,
      values: ['open', 'ongoing', 'completed'],
      defaultValue: 'open'
    },
    due_date: {
      type: Sequelize.DATE
    }
  });

  return Task;
};
