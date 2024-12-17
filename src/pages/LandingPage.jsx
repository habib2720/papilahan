import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../assets/css/tabler.min.css";
import "../assets/css/tabler-flags.min.css";
import "../assets/css/tabler-payments.min.css";
import "../assets/css/tabler-vendors.min.css";
import "../assets/css/demo.min.css";

import bg from "../assets/images/bg.png";
import gmail from "../assets/images/gmail.png";
import ig from "../assets/images/ig.png";

import { berita, lahan } from "../data";

import logo from "../assets/images/logo.png";
import bgLan from "../assets/images/bg-lan.png";
import tanya from "../assets/images/tanya.png";

import { jwtDecode } from "jwt-decode";

import { ArrowRight, User } from "lucide-react";
import ChatPopup from "../components/ChatPopup";

const LandingPage = () => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dashboard, setDashboard] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    }
  }, [token]);

  return (
    <div className="page">
      <header className="navbar-expand-md align-items-center bg-white border-bottom shadow-sm pt-3 pt-md-0">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-menu"
          aria-controls="navbar-menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="navbar navbar-expand-lg p-3 fw-bold">
            <div className="container-xl">
              <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3 justify-content-center">
                <Link top="/">
                  <img
                    src={logo}
                    width="70"
                    height="50"
                    alt="Tabler"
                    className=""
                  />
                </Link>
              </div>

              <ul className="navbar-nav mx-auto justify-content-center h3">
                <li className="nav-item text-white ms-lg-8 ms-0 me-lg-5 me-0">
                  <Link
                    className="nav-link"
                    to={
                      role
                        ? role === "pencari"
                          ? "/dashboard-pencari"
                          : "/dashboard-pemilik"
                        : "/"
                    }
                  >
                    Beranda
                  </Link>
                </li>
                <li className="nav-item text-white me-lg-5 me-0">
                  <a className="nav-link" href="#rekomendasi">
                    Katalog
                  </a>
                </li>
                <li className="nav-item text-white me-lg-5 me-0">
                  <a className="nav-link" href="#contact">
                    Hubungi
                  </a>
                </li>
              </ul>

              {token ? (
                <div className="d-flex justify-content-center mt-lg-0 mt-md-0 mt-2">
                  <Link
                    className="bg-white border-0 rounded-3 px-6 py-3 mt-lg-0 mt-md-0 mt-2 text-black text-decoration-none"
                    onClick={() => 
                      {
                        localStorage.removeItem("token")
                        window.location.reload()
                      }
                    }
                    to="/"
                  >
                    Keluar
                  </Link>
                  <Link
                    className="bg-white border-0 rounded-3 mt-lg-0 mt-md-0 mt-2 text-black text-decoration-none ms-3 d-flex align-items-center justify-content-center p-2"
                    to={
                      role === "pencari"
                        ? "/profile-pencari"
                        : "/profile-pemilik"
                    }
                  >
                    <User size={24} />
                  </Link>
                </div>
              ) : (
                <div className="d-flex justify-content-center mt-lg-0 mt-md-0 mt-2">
                  <Link
                    className="bg-white border-0 rounded-3 py-3 px-4 text-black text-decoration-none"
                    to="/auth"
                  >
                    Masuk / Daftar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="page-wrapper">
        <div className="page-body">
          <div
            className="container-fluid d-flex flex-column justify-content-center"
            style={{
              backgroundImage: `url(${bgLan})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "90vh",
            }}
          >
            <div className="row p-3 text-center align-items-center">
              <div className="col">
                <h1
                  style={{ fontSize: "3.5rem" }}
                  className="fw-bold text-wrap"
                >
                  Selamat Datang di Papilahan
                </h1>
                <h2
                  className="mt-4"
                  style={{ fontSize: "2rem", fontWeight: "normal" }}
                >
                  Solusi Sewa Lahan Terbaik!
                </h2>
                <p
                  className="mt-4 px-lg-5 px-md-4"
                  style={{ fontSize: "1.25rem", lineHeight: "1.6" }}
                >
                  Kami menyediakan platform mudah dan terpercaya untuk menyewa
                  lahan secara online. Temukan berbagai pilihan lahan yang
                  sesuai dengan kebutuhan Anda, baik untuk pertanian dan
                  perkebunan. Dengan fitur pencarian yang canggih, sistem
                  pembayaran yang aman, serta kontrak sewa digital, kami
                  memastikan proses sewa lahan menjadi lebih cepat dan praktis.
                  <br />
                  <br />
                  Mulailah cari lahan Anda!
                </p>

                <Link
                  className="btn btn-lime px-8 py-3 w-auto mt-5 rounded-pill h3"
                  to="/auth"
                >
                  Cari Lahan
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-5 mb-lg-8 mb-md-8 mb-0">
            <div className="row text-end align-items-end justify-content-end">
              <div className="col">
                <img
                  src={tanya}
                  alt="Tanya"
                  className="img-fluid position-absolute d-lg-block d-none"
                  style={{ top: "95vh", right: "0" }}
                  onClick={() => setIsOpen(!isOpen)}
                />
                <img
                  src={tanya}
                  alt="Registrasi"
                  className="img-fluid d-lg-none d-inline"
                  onClick={() => setIsOpen(!isOpen)}
                />
              </div>
            </div>
          </div>

          <div className="container-fluid mt-5" id="rekomendasi">
            <div className="row p-3">
              <div className="col">
                <h2 style={{ fontSize: "2rem" }}>Rekomendasi Terbaru</h2>
                <p className="text-secondary">
                  Temukan lahan terbaik yang sesuai dengan kebutuhan Anda
                </p>
              </div>
            </div>
            <div className="row row-cards p-3 justify-content-center align-items-center">
              {lahan.map((item, index) => (
                <div
                  className={`col-md-6 col-lg-4 ${index > 2 ? "mt-6" : null}`}
                  key={index}
                >
                  <div className="card">
                    <img
                      src={item.image}
                      className="card-img-top rounded-top"
                      alt="..."
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h2 className="fw-bold">{item.price}</h2>
                      <h3 className="card-title">{item.name}</h3>
                      <p className="text-secondary">{item.location}</p>
                      <div className="d-flex justify-content-between align-items-center text-secondary mt-3">
                        <p className="text-secondary">{item.status}</p>
                        <p>
                          <Link
                            to="/auth"
                            className="text-secondary text-decoration-none"
                          >
                            Detail Lahan
                          </Link>
                          <ArrowRight size={24} className="ms-2" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row justify-content-center align-items-center">
              <Link
                className="btn btn-lime px-8 py-3 w-auto mt-5 rounded-pill h3"
                to="/auth"
              >
                Muat Lainnya
              </Link>
            </div>
          </div>

          <div className="container-fluid mt-5" id="notifikasi">
            <div className="row p-3">
              <div className="col">
                <h2 style={{ fontSize: "2rem" }}>Berita</h2>
                <p className="text-secondary">
                  Berita terbaru seputar pertanian dan perkebunan
                </p>
              </div>
            </div>
            <div className="row row-cards p-3 justify-content-center align-items-center">
              {berita.map((item, index) => (
                <div className="col-md-6 col-lg-4" key={index}>
                  <div className="card h-100">
                    <div
                      className="card-img-top"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "250px",
                      }}
                    ></div>
                    <div className="card-body">
                      <h3 className="card-title h2 mb-2">{item.title}</h3>
                      <p className="card-text text-muted">{item.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5">
            <div
              className="container-fluid d-flex flex-column justify-content-center align-items-center mt-5"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "30vh",
                color: "white",
                textShadow: "0px 2px 5px rgba(0, 0, 0, 0.7)",
                borderRadius: "15px",
              }}
              id="contact"
            >
              <div className="row w-100 p-4 text-center align-items-center">
                <div className="col">
                  <h2 className="fw-bold mb-3" style={{ fontSize: "3rem" }}>
                    CONTACT US
                  </h2>
                  <h3
                    className="mt-3 fst-italic"
                    style={{
                      fontSize: "1.5rem",
                      color: "#f8f9fa",
                      textShadow: "0px 2px 4px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    Home / Contact Us
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5" id="contact">
            <div className="row align-items-center g-4">
              <div className="col-lg-6">
                <div className="container-tight">
                  <div className="card card-md shadow-sm border-0">
                    <div className="card-body p-5">
                      <h2 className="h2 mb-1 text-center">Ada Pertanyaan?</h2>
                      <h3 className="h4 mb-4 text-center text-muted">
                        Kirim sebuah pesan
                      </h3>
                      <form
                        action="./"
                        method="get"
                        autoComplete="off"
                        noValidate
                      >
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Nama"
                            autoComplete="off"
                          />
                        </div>
                        <div className="mb-3">
                          <div className="row">
                            <div className="col-md-6 mb-3 mb-md-0">
                              <input
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="Email*"
                                autoComplete="off"
                              />
                            </div>
                            <div className="col-md-6">
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Phone*"
                                autoComplete="off"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <textarea
                            className="form-control form-control-lg"
                            placeholder="Pertanyaan"
                            rows="7"
                          ></textarea>
                        </div>
                        <div className="form-footer">
                          <button
                            type="submit"
                            className="btn btn-lime w-100 py-3 rounded-pill"
                          >
                            Kirim Pesan
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 d-flex flex-column justify-content-center align-items-start d-none d-lg-block">
                <h2 className="fw-bold mb-4">Informasi Kontak</h2>
                <p className="fs-4 text-muted mb-5 text-justify">
                  Hubungi kami melalui Email atau Instagram di bawah ini untuk
                  mempermudah komunikasi.
                </p>
                <div>
                  <div className="row mb-4 align-items-center">
                    <div className="col-auto">
                      <img src={gmail} width="48" alt="Gmail Icon" />
                    </div>
                    <div className="col">
                      <span className="fs-5">Email:</span>
                      <br />
                      <span className="text-muted">papilahan@gmail.com</span>
                    </div>
                  </div>

                  <div className="row mb-4 align-items-center">
                    <div className="col-auto">
                      <img src={ig} width="48" alt="Instagram Icon" />
                    </div>
                    <div className="col">
                      <span className="fs-5">Instagram:</span>
                      <br />
                      <span className="text-muted">@papilahan_</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 d-flex flex-column align-items-center text-center d-lg-none">
                <h2 className="fw-bold mb-4">Informasi Kontak</h2>
                <p className="fs-5 text-muted mb-5">
                  Hubungi kami melalui Email atau Instagram di bawah ini untuk
                  mempermudah komunikasi.
                </p>
                <div className="w-100">
                  <div className="d-flex align-items-center justify-content-center mb-4">
                    <div>
                      <span className="fs-6 fw-bold">Email:</span>
                      <br />
                      <span className="text-muted">papilahan@gmail.com</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-center mb-4">
                    <div>
                      <span className="fs-6 fw-bold">Instagram:</span>
                      <br />
                      <span className="text-muted">@papilahan_</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <footer className="footer footer-transparent d-print-none mt-5 bg-lime text-white py-4 text-center mt-5">
              <p className="mb-0">
                &copy; {new Date().getFullYear()} Papilahan. Semua Hak
                Dilindungi.
              </p>
            </footer>
          </div>
        </div>
      </div>

      <ChatPopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default LandingPage;
