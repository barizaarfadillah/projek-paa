import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end();

    const stoks = await prisma.book.findMany();

    res.status(200);
    res.json({
        message: 'Data stok',
        data: stoks
    });
};