const Joi = require("joi");

function validateTask(task) {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    completed: Joi.boolean().strict(true).required(),
  });

  return schema.validate(task);
}

module.exports = { validateTask };
