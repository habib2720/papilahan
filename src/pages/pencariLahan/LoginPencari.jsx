import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../../assets/css/tabler.min.css";
import "../../assets/css/tabler-flags.min.css";
import "../../assets/css/tabler-payments.min.css";
import "../../assets/css/tabler-vendors.min.css";
import "../../assets/css/demo.min.css";
import { API_URL } from "../../data";

const LoginPencari = () => {
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const no_hp = formData.get("no_hp");
    const password = formData.get("password");

    if (!no_hp || !password) {
      setError("Semua data harus diisi");
      return;
    }

    axios
      .post(
        API_URL + "api/auth/login-pencari-lahan",
        { no_hp, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const token = res.data.token;
        if (!token) {
          setError("Login gagal, token tidak ditemukan.");
          return;
        }else{
            setError(null);
            localStorage.setItem("token", token);
            setAlert("Login berhasil, sedang mengalihkan...");
            setTimeout(() => {
              navigate("/dashboard-pencari");
            }, 2000);
        }

      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || "Login gagal atau akun tidak ditemukan.");
      });
  };

  return (
    <section className="d-flex flex-column">
      <div className="container-fluid mt-2">
        <Link
          to="/"
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
          Kembali
        </Link>
      </div>
      <div className="page page-center" style={{ minHeight: "100vh" }}>
        <div className="container container-tight pb-4">
          <div className="card card-md">
            <div className="card-body">
              <h2 className="h2 text-center mb-4">Login</h2>
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
              <form onSubmit={onSubmit} autoComplete="off" noValidate>
                <div className="mb-3">
                  <label className="form-label">Nomor Handphone</label>
                  <input
                    type="number"
                    name="no_hp"
                    className="form-control"
                    placeholder="Nomor Handphone"
                    autoComplete="off"
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label"> Password </label>
                  <div className="input-group input-group-flat">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      autoComplete="off"
                    />
                    <span className="input-group-text">
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="link-secondary"
                        title="Show password"
                        data-bs-toggle="tooltip"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                          <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>
                <div className="form-footer">
                  <button
                    type="submit"
                    className="btn btn-lime w-100 text-black fw-bold text-white"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="text-center text-secondary">
                Belum punya akun?{" "}
                <Link to="/register-pencari-lahan" className="text-danger">
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPencari;
