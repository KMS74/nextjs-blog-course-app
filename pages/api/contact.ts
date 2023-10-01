// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Contact } from "@/types/contact";
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

type Data = {
  message: string;
  data?: Contact;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    //   extract request body data
    const { email, name, message } = req.body as Contact;
    //   validate data
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid inout" });
    }

    // store data in a DB
    const newContactMessage: Contact = {
      email,
      name,
      message,
    };

    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const cluster = process.env.DB_CLUSTER;
    const uri = `mongodb+srv://${username}:${password}@${cluster}.imuiudt.mongodb.net/?retryWrites=true&w=majority`;

    let client: MongoClient;
    try {
      client = await MongoClient.connect(uri);
    } catch (error) {
      return res.status(500).json({ message: "Could not connect to DB" });
    }

    const db = client.db();
    try {
      await db.collection("messages").insertOne(newContactMessage);
    } catch (error) {
      client.close();
      return res.status(500).json({ message: "Storing message failed" });
    }

    client.close();

    res.status(201).json({
      message: "Successfully stored message",
      data: newContactMessage,
    });
  }
}
