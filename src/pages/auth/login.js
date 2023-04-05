import React, { useState } from "react";
import Cookie from 'js-cookie';

export default function Login() {

    const [fields, setFields] = useState({
        email: '',
        password: ''
    });

    const [status, setStatus] = useState('normal');

    async function loginHandler(e) {
        e.preventDefault();

        setStatus('loading')

        const loginReq = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        });

        if (!loginReq.ok) return setStatus('eror ' + loginReq.status);

        const loginRes = await loginReq.json();

        setStatus('success');

        Cookie.set('token', loginRes.token);

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
                <h1 className="text-2xl font-bold text-center py-3 px-3 font-serif text-slate-600">Login</h1>
                <form onSubmit={loginHandler.bind(this)}>
                    <div className="mt-5">
                        <label for="email" className="font-semibold text-lg">Email</label>
                        <input onChange={fileHandler.bind(this)} type="text" name="email" className="border w-full px-4 py-3 mt-1 rounded-md shadow-md focus:outline-none" />
                    </div>
                    <div className="mb-4">
                        <label for="password" className="font-semibold text-lg">Password</label>
                        <input onChange={fileHandler.bind(this)} type="password" name="password" className="border w-full px-4 py-3 mt-1 rounded-md shadow-md focus:outline-none" />
                    </div>

                    <button type="submit" className="bg-blue-600 py-3 w-11/12 rounded-md mt-8 block mx-auto font-semibold text-white">
                        Login
                    </button>
                </form>
                <p className="text-md text-center py-3 px-3 font-serif text-slate-600">Belum punya akun? <a href='/auth/registrasi' className="text-blue-600">Daftar sekarang</a></p>
            </section>
        </div>
    )
}