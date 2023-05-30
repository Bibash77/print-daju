import { createRouter } from "next-connect";
import prisma from "../../../libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import cloudinaryConfig from "@/libs/cloudinaryConfig";
import cloudinary from "cloudinary";
const router = createRouter<NextApiRequest, NextApiResponse>();

cloudinaryConfig();
router.get(async (req, res) => {
  const product = await prisma.product.findMany({
    include: {
      image: true,
    },
  });
  return res.json({ product });
});

router.post(async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  const { name, description, price, image } = req.body;

  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "cloudprint",
    timeout: 120000,
  });
  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      image: {
        create: {
          public_id: result.public_id,
          imageSrc: result.secure_url,
        },
      },
    },
  });
  return res.json({ product });
});

router.all((req, res) => {
  return res.json("Methos not Allowed");
});

export default router.handler({
  onError(err, req, res) {
    res.json({ err });
  },
});
