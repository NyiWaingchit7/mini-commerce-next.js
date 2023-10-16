// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@/utlis/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  console.log(method);

  if (method === "GET") {
    const products = await prisma.product.findMany();
    return res.send(products);
  } else if (method === "POST") {
    const { title, description, price, image } = req.body;

    const isValidate = title && description && price && image;
    if (!isValidate) return res.status(400).send("Bad Request");
    const product = await prisma.product.create({
      data: { title, description, price, imageUrl: image },
    });
    return res.status(200).send(product);
  }
  res.status(405).send("Invalid method.");
}
