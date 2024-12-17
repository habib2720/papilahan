import React from 'react'
import { Link } from 'react-router-dom'
import image1 from '../assets/images/login-1.png'
import image2 from '../assets/images/login-2.png'

import '../assets/css/tabler.min.css'
import '../assets/css/tabler-flags.min.css'
import '../assets/css/tabler-payments.min.css'
import '../assets/css/tabler-vendors.min.css'
import '../assets/css/demo.min.css'
import '../assets/js/demo-theme.min.js'
import '../assets/js/tabler.min.js'
import '../assets/js/demo.min.js'

const Home = () => {
    return (
        <section className="d-flex flex-column">
            <div className="page page-center" style={{minHeight: "100vh"}}>
                <div className="container container-tight py-4">
                    <form className="card card-md" action="./" method="get" autoComplete="off" noValidate>
                    <div className="card-body text-center">
                        <div className="mb-4">
                        <h1>Masuk ke Papilahan</h1>
                        <p className="text-secondary">Saya ingin masuk sebagai</p>
                        </div>
                        <div className="mb-2">
                        <Link to="/login-pencari-lahan" className="btn btn-lime w-100 text-black">
                            <img src={image1} alt="" width="32" height="32" className="me-2" />
                            Pencari Lahan
                        </Link>
                        </div>
                        <div>
                        <Link to="/login-pemilik-lahan" className="btn btn-lime w-100 text-black">
                            <img src={image2} alt="" width="32" height="32" className="me-2" />
                            Pemilik Lahan
                        </Link>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Home