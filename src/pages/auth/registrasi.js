import React, { useState } from 'react';

export default function Register() {
    const [fields, setFields] = useState({
        nama: '',
        email: '',
        password: ''
    });

    const [status, setStatus] = useState('normal');

    async function registerHandler(e) {
        e.preventDefault();

        setStatus('loading')

        const registerReq = await fetch('/api/auth/register', {
            method: 'PUT',
            body: JSON.stringify(fields),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!registerReq.ok) return setStatus('eror' + registerReq.status)

        const registerRes = await registerReq.json();

        setStatus('success');

    }

    function fileHandler(e) {
        const name = e.target.getAttribute('name');

        setFields({
            ...fields,
            [name]: e.target.value
        });
    }

    return (
        <div className="bg-slate-100 h-screen flex items-center justify-center">
            <section className="bg-white w-10/12 py-3 px-4 rounded-md shadow-md sm:w-4/12">
                <h1 className="text-2xl font-bold text-center px-3 py-3 font-serif text-slate-600">Daftar Akun</h1>
                <form onSubmit={registerHandler.bind(this)}>
                    <div className="mt-5">
                        <label for="nama" className="font-semibold text-lg">Nama</label>
                        <input onChange={fileHandler.bind(this)} type="text" name="nama" className="border w-full px-4 py-3 mt-1 rounded-md shadow-md focus:outline-none" />
                    </div>
                    <div className="mt-5">
                        <label for="email" className="font-semibold text-lg">Email</label>
                        <input onChange={fileHandler.bind(this)} type="text" name="email" className="border w-full px-4 py-3 mt-1 rounded-md shadow-md focus:outline-none" />
                    </div>
                    <div className="mb-4">
                        <label for="password" className="font-semibold text-lg">Password</label>
                        <input onChange={fileHandler.bind(this)} type="password" name="password" className="border w-full px-4 py-3 mt-1 rounded-md shadow-md focus:outline-none" />
                    </div>

                    <button type="submit" className="bg-blue-600 py-3 w-11/12 rounded-md mt-8 block mx-auto font-semibold text-white">
                        Daftar
                    </button>
                </form>
                <p className="text-md text-center py-3 px-3 font-serif text-slate-600">Sudah punya akun? <a href='/auth/login' className="text-blue-600">Login disini</a></p>
            </section>
        </div>
    )
}