import prisma from "../../../../../lib/prisma";

export default async function handler(req, res) {
    if (req.method !== 'PUT') return res.status(405).end();

    const { id } = (req.query);
    // console.log(id);

    const update = await prisma.book.update({
        where: { id: Number(id) }, data: {
            judul: 'buku sejarah'
        }
    })

    res.status(200);
    res.json({
        message: 'Data berhasil diupdate'
    })
}