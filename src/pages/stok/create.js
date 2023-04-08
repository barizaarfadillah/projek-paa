import React, { useState } from "react";
import { authPage } from '../../../middlewares/authorizationPage';
import Router from 'next/router';

export async function getServerSideProps(ctx) {
    const { token } = await authPage(ctx);

    return {
        props: {
            token
        }
    }
}

export default function StokCreate(props) {
    const [fields, setFields] = useState({
        judul: '',
        stok: '',
        harga: ''
    });

    async function createHandler(e) {
        e.preventDefault();

        const { token } = props;

        const create = await fetch('/api/stok/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fields)
        });

        const res = await create.json();

        Router.push('/stok');
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
                <h1 className="text-2xl font-bold text-center py-3 px-3 font-serif text-slate-600">Tambah data</h1>
                <form onSubmit={createHandler.bind(this)}>
                    <div className="mt-5">
                        <label for="text" className="font-semibold text-lg">Judul</label>
                        <input onChange={fileHandler.bind(this)} type="text" name="judul" className="border w-full px-4 py-3 mt-1 rounded-md shadow-md focus:outline-none" />
                    </div>
                    <div className="mb-4">
                        <label for="text" className="font-semibold text-lg">Stok</label>
                        <input onChange={fileHandler.bind(this)} type="text" name="stok" className="border w-full px-4 py-3 mt-1 rounded-md shadow-md focus:outline-none" />
                    </div>
                    <div className="mb-4">
                        <label for="text" className="font-semibold text-lg">Harga</label>
                        <input onChange={fileHandler.bind(this)} type="text" name="harga" className="border w-full px-4 py-3 mt-1 rounded-md shadow-md focus:outline-none" />
                    </div>

                    <button type="submit" className="bg-blue-600 py-3 w-11/12 rounded-md mt-8 block mx-auto font-semibold text-white">
                        Tambah data
                    </button>
                </form>
            </section>
        </div>
    )
}