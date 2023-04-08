import prisma from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { nama, email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const register = await prisma.user.create({
        data: {
            nama,
            email,
            password: passwordHash
        }
    });


    res.status(200);
    res.json({
        message: 'User registered successfully',
        data: register
    });
}