import prisma from "../../../../../lib/prisma";

export default async function handler(req, res) {
    if (req.method !== 'DELETE') return res.status(405).end();

    const { id } = req.query;

    const deleteRow = await prisma.book.delete({ where: { id: Number(id) } });

    res.status(200);
    res.json({
        message: 'Data berhasil dihapus'
    })
}