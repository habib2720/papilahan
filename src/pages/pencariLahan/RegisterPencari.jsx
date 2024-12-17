import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../../assets/css/tabler.min.css";
import "../../assets/css/tabler-flags.min.css";
import "../../assets/css/tabler-payments.min.css";
import "../../assets/css/tabler-vendors.min.css";
import "../../assets/css/demo.min.css";
import "../../assets/js/demo-theme.min.js";
import "../../assets/js/tabler.min.js";
import "../../assets/js/demo.min.js";

import image from "../../assets/images/registrasi.png";
import { API_URL } from "../../data.jsx";

const RegisterPencari = () => {
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [onLoading, setOnLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nama = formData.get("nama");
    const no_hp = formData.get("no_hp");
    const email = formData.get("email");
    const password = formData.get("password");
    const password2 = formData.get("password2");
    const robot = formData.get("robot");

    setOnLoading(true);

    if (!nama || !no_hp || !email || !password || !password2) {
      setError("Semua data harus diisi");
      setOnLoading(false);
      return;
    }

    if (password !== password2) {
      setError("Password tidak sama");
      setOnLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email tidak valid");
      setOnLoading(false);
      return;
    }

    if (!robot) {
      setError("Centang 'Saya bukan robot'");
      setOnLoading(false);
      return;
    }

    axios
      .post(
        API_URL + "api/auth/register-pencari-lahan",
        { nama, no_hp, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setAlert("Akun berhasil dibuat, anda akan diarahkan ke halaman login");
        setTimeout(() => {
          window.location.href = "/login-pencari-lahan";
          setOnLoading(false);
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });

    setError(null);
  };

  return (
    <section className="d-flex flex-column">
      <div className="container-fluid mt-2">
        <Link
          to="/login-pencari-lahan"
          className="text-decoration-none text-black fw-bold"
          style={{ fontSize: "1rem" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M5 12l4 4" />
            <path d="M5 12l4 -4" />
          </svg>
          Daftar Akun Penyewa Lahan
        </Link>
      </div>
      <div className="page page-center" style={{ minHeight: "100vh" }}>
        <div className="container container-normal pb-4">
          <div className="row align-items-center g-4">
            <div className="col-lg">
              <div className="container-tight">
                <div className="card card-md">
                  <div className="card-body">
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}

                    {alert && (
                      <div className="alert alert-success" role="alert">
                        {alert}
                      </div>
                    )}
                    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Nama Lengkap</label>
                        <input
                          type="text"
                          name="nama"
                          className="form-control"
                          placeholder="Masukkan nama lengkap sesuai lengkap"
                          autoComplete="off"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Nomor Handphone</label>
                        <input
                          type="number"
                          name="no_hp"
                          className="form-control"
                          placeholder="Masukkan nomor handphone yang aktif"
                          autoComplete="off"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Masukkan email"
                          autoComplete="off"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="input-group input-group-flat">
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password minimal 8 karakter"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Ulangi Password</label>
                        <div className="input-group input-group-flat">
                          <input
                            type="password"
                            name="password2"
                            className="form-control"
                            placeholder="Masukkan kembali password"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="mb-2">
                        <label className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="robot"
                          />
                          <span className="form-check-label">
                            Saya bukan robot
                          </span>
                        </label>
                      </div>
                      <div className="form-footer">
                        <button
                          type="submit"
                          className="btn btn-lime text-black fw-bold w-100 text-white"
                          disabled={onLoading}
                        >
                          {onLoading ? (
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          ) : (
                            "Daftar"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg d-none d-lg-block">
              <img
                src={image}
                height="500"
                className="d-block mx-auto"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPencari;
