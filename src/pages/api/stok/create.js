import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { judul, stok, harga } = req.body;

    const create = await prisma.book.create({
        data: {
            judul,
            stok,
            harga
        }
    });

    res.status(200);
    res.json({
        message: 'Data berhasil ditambahkan'
    });
}