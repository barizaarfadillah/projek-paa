import { hash } from "bcrypt";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { nama, email, password } = req.body;

        if (!nama || !email || !password) {
            return res.status(400).json({ message: 'Data tidak boleh kosong' });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah tersedia' })
        }

        const hashedPassword = await hash(password, 10);

        const user = await prisma.user.create({
            data: {
                nama,
                email,
                password: hashedPassword,
            }
        })

        return res.status(200).json({ message: 'Registrasi akun berhasil' })
    } else {
        return res.status(405).end()
    }
}