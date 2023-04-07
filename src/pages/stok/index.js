import { authPage } from "../../../middlewares/authorizationPage";

export async function getServerSideProps(ctx) {
    const { token } = await authPage(ctx);

    const postReq = await fetch('/api/')
    return { props: {} }
}

export default function StokIndex() {
    return (
        <div>
            <h1>Data Stok Buku</h1>

        </div>
    );
}