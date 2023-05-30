import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../libs/prismadb";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  //   const session = await getServerSession(req, res, authOptions);
  //   if (!session) {
  //     res.status(401).json({ message: "You must be logged in." });

  //     return;
  //   }
  try {
    const { email, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
