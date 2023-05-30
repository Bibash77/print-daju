import { createRouter } from "next-connect";
import prisma from "../../../libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import cloudinaryConfig from "@/libs/cloudinaryConfig";
import { v2 as cloudinary } from "cloudinary";

const router = createRouter<NextApiRequest, NextApiResponse>();

cloudinaryConfig();

router.get(async (req, res) => {
  const { id } = req.query;
  console.log(id);

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id as string),
      },
      include: {
        image: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.json({ product });
  } catch (error) {
    console.error("Error fetching product", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.delete(async (req, res) => {
  const { id } = req.query;
  try {
    const oldProduct = await prisma.product.findUnique({
      where: {
        id: parseInt(id as string),
      },
      include: {
        image: true,
      },
    });
    const imageId = oldProduct?.image?.public_id;
    await cloudinary.uploader.destroy(imageId || "");

    if (!oldProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    const deleteImage = await prisma.image.delete({
      where: { productId: parseInt(id as string) },
    });
    const product = await prisma.product.delete({
      where: {
        id: parseInt(id as string),
      },
      include: {
        image: true,
      },
    });

    return res.json({ product });
  } catch (error) {
    console.error("Error fetching product", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put(async (req, res) => {
  const { id } = req.query;

  const { name, description, price, image } = req.body;

  try {
    if (!image) {
      throw new Error("Image is required");
    }

    let myCloud;

    myCloud = await cloudinary.uploader.upload(image, {
      folder: "cloud_print",
    });

    const singleProduct = await prisma.product.findUnique({
      where: {
        id: parseInt(id as string),
      },
      include: {
        image: true,
      },
    });

    if (singleProduct && singleProduct.image) {
      const imageId = singleProduct.image.public_id;
      await cloudinary.uploader.destroy(imageId);
    }

    const deleteImage = await prisma.image.delete({
      where: { productId: parseInt(id as string) },
    });
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id as string) },
      data: {
        name,
        description,
        price,
        image: {
          upsert: {
            create: {
              public_id: myCloud.public_id || "",
              imageSrc: myCloud.secure_url || "",
            },
            update: {
              public_id: myCloud.public_id,
              imageSrc: myCloud.secure_url,
            },
          },
        },
      },
      include: {
        image: true,
      },
    });

    return res.json({ product: updatedProduct });
  } catch (error) {
    console.error("Error updating product", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.all((req, res) => {
  return res.json("Methos not Allowed");
});

export default router.handler({
  onError(err, req, res) {
    res.json({ err });
  },
});
