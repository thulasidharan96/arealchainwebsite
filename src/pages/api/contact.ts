// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { fullName, email } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  const params = {
    TableName: "Contact_Form",
    Item: {
      email,
      fullName,
      createdAt: new Date().toISOString(),
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("DynamoDB Error:", error);
    return res.status(500).json({ message: "Server error." });
  }
}
