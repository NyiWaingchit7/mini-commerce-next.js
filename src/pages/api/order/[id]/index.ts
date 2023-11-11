// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/utlis/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { allowCors } from "../../hello";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "DELETE") {
    const orderId = Number(req.query.id);
    console.log(orderId);

    if (!orderId) return res.status(400).send("bad request");
    const isFound = await prisma.order.findFirst({ where: { id: orderId } });
    if (!isFound) return res.status(400).send("bad request");
    await prisma.orderline.deleteMany({ where: { orderId: orderId } });
    await prisma.order.deleteMany({ where: { id: orderId } });
    return res.send("ok");
  }
  res.status(405).send("Method not allowed.");
}
allowCors(handler);
