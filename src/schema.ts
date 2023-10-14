import Joi, { ObjectSchema } from "joi";

const PASSWORD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
);

const authSignup = Joi.object().keys({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
});

const signIn = Joi.object().keys({
  name: Joi.string().required(),
  password: Joi.string().required(),
});

const createTask = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date().required(),
  assignedTo: Joi.string().required(),
  category: Joi.string().required(),
  status: Joi.string().optional(),
  creationDate: Joi.string().optional(),
});

const getTaskById = Joi.object().keys({
  id: Joi.string().hex().length(24).required(),
});

const updateTask = Joi.object()
  .keys({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    dueDate: Joi.date().optional(),
    assignedTo: Joi.string().optional(),
    category: Joi.string().optional(),
    status: Joi.string().optional(),
  })
  .min(1);

const deleteTask = Joi.object().keys({
  id: Joi.string().hex().length(24).required(),
});

const getAllTasks = Joi.object().keys({
  limit: Joi.number().optional(),
  page: Joi.number().optional(),
  sort: Joi.string().optional(),
});

const getTasksByAssignedTo = Joi.object().keys({
  username: Joi.string().required(),
});

const getTasksByCategory = Joi.object().keys({
  categoryName: Joi.string().required(),
});

export default {
  signIn: signIn,
  createUser: authSignup,
  createTask: createTask,
  getTaskById: getTaskById,
  updateTask: updateTask,
  deleteTask: deleteTask,
  getAllTasks: getAllTasks,
  getTasksByAssignedTo: getTasksByAssignedTo,
  getTasksByCategory: getTasksByCategory,
} as { [key: string]: ObjectSchema };
