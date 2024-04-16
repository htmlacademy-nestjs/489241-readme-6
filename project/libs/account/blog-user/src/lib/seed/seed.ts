import mongoose from "mongoose";
import dotenv from "dotenv";
import dayjs from "dayjs";

import { UserRole } from "@project/shared-core";

import { BlogUserEntity } from "../entities/blog-user.entity";
import { BlogUserModel, BlogUserSchema } from "../models/blog-user.model";

function getBlogUsers() {
  return [
    {
      id: '',
      email: 'alice.doe@noname.com',
      firstName: 'Alice',
      lastName: 'Doe',
      dateOfBirth: dayjs().toDate(),
      role: UserRole.User,
      avatarImage: '',
      passwordHash: ''
    },
    {
      id: '',
      email: 'bob.doe@noname.com',
      firstName: 'Bob',
      lastName: 'Doe',
      dateOfBirth: dayjs().toDate(),
      role: UserRole.User,
      avatarImage: '',
      passwordHash: ''
    },
  ];
}

async function bootstrap() {
  dotenv.config();
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  mongoose.connection.on("connected", () => {
    console.log("connected to mongodb ");
  });
  mongoose.connection.on("error", (error) => {
    console.log("connection error", error.message);
  });
  await mongoose.connect(process.env.MONGODB_URI);
  const model = mongoose.model<BlogUserModel>("BlogUserModel", BlogUserSchema);
  const mockUsers = getBlogUsers();
  for (const user of mockUsers) {
    const userEntity = await new BlogUserEntity(user)
      .setPassword('qwaszx@12345');
    const newEntity = new model(userEntity.toPOJO());
    await newEntity.save();
  }

  console.log("migration completed");
  mongoose.disconnect();
  console.log("db disconnected");
}

bootstrap();
