import User, { IUser } from "../models/User";

// Create a new User
const createUser = async (userData: IUser): Promise<IUser> => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Get a single user
const getUser = async (name: any, password: any): Promise<any> => {
  try {
    const user = await User.findOne({ name, password });
    return user;
  } catch (error) {
    console.error(error);
  }
};

//Get a single user
const updateUser = async (name: any, token: any): Promise<any> => {
  try {
    const user = await User.updateOne({ name }, { token });
    return user;
  } catch (error) {
    console.error(error);
  }
};

export default {
  createUser,
  getUser,
  updateUser,
};
