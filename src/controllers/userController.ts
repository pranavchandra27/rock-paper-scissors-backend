import { Request, Response } from "express";
import { collections } from "@configs/database";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await collections.users?.find({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const users = await collections.users?.findOne({ username });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateScore = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const body = req.body;
    const updatedUser = await collections.users?.findOneAndUpdate(
      { username },
      {
        $set: {
          ...body,
        },
      },
      { returnDocument: "after" }
    );

    if (updatedUser) {
      res.status(200).json(updatedUser?.value);
    } else {
      res.status(500).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const registerOrLogin = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const user = await collections.users?.findOne({ username });
    if (!user) {
      const newUser = await collections.users?.insertOne({
        username,
        score: 0,
        gamePlayed: 0,
        lost: 0,
        won: 0,
        draw: 0,
      });
      const user = await collections.users?.findOne({
        _id: newUser?.insertedId,
      });
      res.status(201).json(user);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
