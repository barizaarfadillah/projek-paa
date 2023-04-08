import React, { useState } from 'react';
import { authPage } from '../../../../middlewares/authorizationPage';
import Router from 'next/router';

export async function getServerSideProps(ctx) {
    const { token } = await authPage(ctx);

    const { id } = ctx.query;

    const stokReq = await fetch('http://localhost:3000/api/stok/update/' + id, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const res = await stokReq.json();

    return {
        props: {
            token,
            stoks: stoks.data
        }
    }
}

export default function PostEdit(props) {
    const { stok } = props;

    const [fields, setFields] = useState({
        judul: stok.judul,
        stok: stok.stok,
        harga: stok.harga
    });

    const [status, setStatus] = useState('normal');

    async function updateHandler(e) {
        e.preventDefault();

        setStatus('loading');

        const { token } = props;


        const update = await fetch('/api/stok/update/' + stok.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fields)
        });

        if (!update.ok) return setStatus('error');

        const res = await update.json();

        setStatus('success');

        Router.push('/stok');
    }

    function fieldHandler(e) {
        const name = e.target.getAttribute('name');

        setFields({
            ...fields,
            [name]: e.target.value
        });
    }
    return (
        <div>
            <h1>Edit stok</h1>



            <p>Id buku: {stok.id}</p>

            <form onSubmit={updateHandler.bind(this)}>
                <input
                    onChange={fieldHandler.bind(this)}
                    type="text"
                    placeholder="judul"
                    name="judul"
                    defaultValue={stok.judul}
                />
                <br />
                <input
                    onChange={fieldHandler.bind(this)}
                    type="text"
                    placeholder="stok"
                    name="stok"
                    defaultValue={stok.stok}
                />
                <br />
                <input
                    onChange={fieldHandler.bind(this)}
                    type="text"
                    placeholder="harga"
                    name="harga"
                    defaultValue={stok.harga}
                />
                <br />
                <button type="submit">
                    Save Changes
                </button>

            </form>
        </div>
    );
}