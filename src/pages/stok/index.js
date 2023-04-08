import React, { useState } from 'react';
import Router from 'next/router';
import { authPage } from "../../../middlewares/authorizationPage";

export async function getServerSideProps(ctx) {
    const { token } = await authPage(ctx);

    const stokReq = await fetch('http://localhost:3000/api/stok', {
        headers: {
            'Authorization': 'Bearer' + token
        }
    });

    const stoks = await stokReq.json();

    return {
        props: {
            stoks: stoks.data
        }
    }
}

export default function StokIndex(props) {
    const [stoks, setStoks] = useState(props.stoks);

    async function deleteHandler(id, e) {
        e.preventDefault();

        const { token } = props;

        const ask = confirm('Apakah data ini akan dihapus?');

        if (ask) {
            const deletePost = await fetch('/api/stok/delete/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            const res = await deletePost.json();

            const stoksFiltered = stoks.filter(stok => {
                return stok.id !== id && stok;
            })

            setStoks(stoksFiltered);

            console.log(stoksFiltered);
        }
    }
    function createHandler() {
        Router.push('/stok/create/');
    }

    function editHandler(id) {
        Router.push('/stok/edit/' + id);
    }

    return (
        <div className="flex flex-col mt-5">
            <div className='w-full text-center font-bold font-weight-bold text-lg'> DATA STOK BUKU
                <div className='relative shadow rounded-lg mt-3 text-left'>
                    <button onClick={createHandler.bind(this)} className="font-medium bg-green-400 hover:bg-green-500 px-4 py-3 rounded-md text-white mr-1">Tambah produk</button>
                    <table className='w-full text-left text-gray-500'>
                        <thead className='text-xs text-grey-700 uppercase bg-gray-100'>
                            <tr>
                                <th className='py-3 px-1 text-center'>ID</th>
                                <th className='py-3 px-6 text-center'>Judul</th>
                                <th className='py-3 px-3 text-center'>Stok</th>
                                <th className='py-3 px-3 text-center'>Harga</th>
                                <th className='py-3 px-1 text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stoks.map(stok => (
                                <tr className='bg-white border-b' key={stok.id}>
                                    <td className='py-3 px-1 text-center'>{stok.id}</td>
                                    <td className='py-3 px-6 text-center'>{stok.judul}</td>
                                    <td className='py-3 px-3 text-center'>{stok.stok}</td>
                                    <td className='py-3 px-3 text-center'>{stok.harga}</td>
                                    <td className='py-3 px-1 text-center'>
                                        <button onClick={editHandler.bind(this, stok.id)} className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded-md text-white mr-1">Edit</button>
                                        <button onClick={deleteHandler.bind(this, stok.id)} className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded-md text-white mr-1">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}