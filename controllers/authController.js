import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';
import postModel from '../models/postModel.js';
import User from '../models/User.js';

const register = async (req, res) => {
  
  const { email, password, firstName,lastName,title } = req.body;

  if (!firstName || !email || !password || !lastName || !title) {
    throw new BadRequestError('please provide all values');
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }

  const user = await User.create({ firstName, email, password,lastName,title });

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
     user:user,
     token:token,
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }
  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({ user,token });
};



const updateUser=async (req,res)=>{
  let {friendId}=req.body
  let Friend=await User.findOne({_id:friendId})
  if(!Friend){
    throw new Error("The User is not prresent")
  }
  

  let currentUser=await User.findOne({_id:req.user.userId})

  let alreadyFriend=currentUser.friends.includes(friendId)

  if(alreadyFriend){
    await User.updateOne({_id:req.user.userId},{$pull:{friends:friendId}})
  }

  else{
    await User.updateOne({_id:req.user.userId},{$push:{friends:friendId}})
  }

  res.status(StatusCodes.OK).json({msg:"Everything is smooth"})
}


const getCurrentUser=async (req,res)=>{
   let currentUser=await User.findOne({_id:req.user.userId}).populate("friends")
   res.status(StatusCodes.OK).json({user:currentUser})
}

const getAllUsers=async (req,res)=>{
   let allUsers=await User.find({})
   res.status(StatusCodes.OK).json({user:allUsers})
}


const getSingleUser=async (req,res)=>{
  let {id}=req.params

  let user=await User.findOne({_id:id}).select("-password")

  if(!user){
    throw new BadRequestError("The User is Not Present")
  }

  let userPosts=await postModel.find({user:id}).populate({path:"user"}).populate({path:"comments",populate : {
    path : 'user'
  }})

  res.status(StatusCodes.OK).json({msg:"Success",user,userPosts})

  
}

export { register, login, updateUser,getCurrentUser,getAllUsers,getSingleUser};


