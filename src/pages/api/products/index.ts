// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "@/utlis/db";
import { NextApiRequest, NextApiResponse } from "next";
import { allowCors } from "../hello";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "GET") {
    const products = await prisma.product.findMany();
    return res.send(products);
  } else if (method === "POST") {
    const data = req.body;
    if (data) {
      const toAdddata: {
        title: string;
        description: string;
        price: number;
        image: string;
      }[] = data.map((d: any) => ({
        title: d.title,
        description: d.description,
        price: d.price,
        image: d.image,
      }));
      const product = await prisma.$transaction(
        toAdddata.map((i) =>
          prisma.product.create({
            data: {
              title: i.title,
              description: i.description,
              price: i.price,
              imageUrl: i.image,
            },
          })
        )
      );

      return res.status(200).send(product);
    } else {
      return res.status(405).send("bad request");
    }
  }
  res.status(405).send("Invalid method.");
}
allowCors(handler);
