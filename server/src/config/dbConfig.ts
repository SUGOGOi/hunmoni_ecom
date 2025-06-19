import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // if (process.env.NODE_ENV === "production") {
    //   const { connection } = await mongoose.connect(
    //     `${process.env.MONGO_ONLINE}`
    //   );
    //   console.log(`Mongodb connected ${connection.host}`);
    // } else {
    //   const { connection } = await mongoose.connect(
    //     `${process.env.MONGO_LOCAL}`
    //   );
    //   console.log(`Mongodb connected ${connection.host}`);
    // }

    const { connection } = await mongoose.connect(`${process.env.MONGO_LOCAL}`);

    console.log(`✅ Mongodb connected ${connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
