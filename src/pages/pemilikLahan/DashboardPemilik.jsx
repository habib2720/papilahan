import React, { useEffect, useState } from "react";
import "../../assets/css/tabler.min.css";
import "../../assets/css/tabler-flags.min.css";
import "../../assets/css/tabler-payments.min.css";
import "../../assets/css/tabler-vendors.min.css";
import "../../assets/css/demo.min.css";

import { Link } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";

import bg from "../../assets/images/bg.png";
import gmail from "../../assets/images/gmail.png";
import ig from "../../assets/images/ig.png";
import lahanImg from "../../assets/images/lahan.png";

import { API_URL, berita } from "../../data";

import tanya from "../../assets/images/tanya.png";

import logo from "../../assets/images/logo.png";
import registrasi from "../../assets/images/registrasi.png";
import { jwtDecode } from "jwt-decode";
import { User } from "lucide-react";

import ChatPopup from "../../components/ChatPopup";

const DashboardPemilik = () => {
  const [countPenyewa, setCountPenyewa] = useState([]);
  const [countPermintaan, setCountPermintaan] = useState([]);
  const [countTotalPendapatan, setCountTotalPendapatan] = useState(0);
  const [dataLahan, setDataLahan] = useState([]);
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);

  const getLahan = (id_pemilik) => {
    axios
      .get(API_URL + "api/lahan/" + id_pemilik)
      .then((res) => {
        setDataLahan(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteLahan = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(API_URL + "api/lahan/hapus-lahan/" + id)
          .then((res) => {
            Swal.fire({
              title: "Berhasil!",
              text: "Data lahan berhasil dihapus!",
              icon: "success",
              showConfirmButton: false,
              timer: 2000
            });
            getLahan(jwtDecode(token).id);
            getAllIndicators(jwtDecode(token).id);
          })
          .catch((err) => {
            Swal.fire({
              title: "Gagal!",
              text: err.response.data.error ? err.response.data.error : "Terjadi kesalahan!", 
              icon: "error",
              showConfirmButton: false,
              timer: 2000
            })
          });
      }
    });
  };

  const terimaPenyewa = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Penyewa akan diterima dan lahan akan disewakan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, terima!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(API_URL + "api/lahan/terima-penyewa/" + id)
          .then((res) => {
            Swal.fire({
              title: "Berhasil!",
              text: "Penyewa berhasil diterima!",
              icon: "success",
              showConfirmButton: false,
              timer: 2000
            });
            getLahan(jwtDecode(token).id);
            getAllIndicators(jwtDecode(token).id);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    })
  };

  const tolakPenyewa = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Penyewa akan ditolak dan lahan tidak akan disewakan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, tolak!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(API_URL + "api/lahan/tolak-penyewa/" + id)
          .then((res) => {
            Swal.fire({
              title: "Berhasil!",
              text: "Penyewa berhasil ditolak!",
              icon: "success",
              showConfirmButton: false,
              timer: 2000
            });
            getLahan(jwtDecode(token).id);
            getAllIndicators(jwtDecode(token).id);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    })
  };

  const getAllIndicators = (id_pemilik) => {
    axios
      .get(API_URL + "api/lahan/cek-penyewa/" + id_pemilik)
      .then((res) => {
        setCountPenyewa(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get(API_URL + "api/lahan/cek-menyewa/" + id_pemilik)
      .then((res) => {
        setCountPermintaan(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get(API_URL + "api/lahan/cek-pendapatan/" + id_pemilik)
      .then((res) => {
        setCountTotalPendapatan(res.data.pendapatan ? res.data.pendapatan : 0);
      })
      .catch((err) => {
        console.error(err);
      });
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    const id_pemilik = jwtDecode(token).id;
    getLahan(id_pemilik);
    getAllIndicators(id_pemilik);
  }, []);

  const countObject = (obj) => {
    return Object.keys(obj).length;
  };

  const formatIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount) + ',00';
  };

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
                <Link to="/">
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
                  <Link className="nav-link" to="/dashboard-pemilik">
                    Beranda
                  </Link>
                </li>
                <li className="nav-item text-white me-lg-5 me-0">
                  <a className="nav-link" href="#laporan">
                    Laporan
                  </a>
                </li>
                <li className="nav-item text-white me-lg-5 me-0">
                  <Link className="nav-link" to="/katalog-pemilik">
                    Katalog
                  </Link>
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
                    onClick={() => localStorage.removeItem("token")}
                    to="/"
                  >
                    Keluar
                  </Link>
                  <Link
                    className="bg-white border-0 rounded-3 mt-lg-0 mt-md-0 mt-2 text-black text-decoration-none ms-3 d-flex align-items-center justify-content-center p-2"
                    to="/profile-pemilik"
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
      <div className="page-wrapper mt-5">
        <div className="page-body">
          <div className="container-xl d-flex flex-column justify-content-center">
            <div className="row g-2 align-items-center">
              <div className="col-lg-6 text-center">
                <h1 className="fw-bold">Selamat Datang di PAPILAHAN</h1>
                <h2>Solusi Sewa Lahan Terbaik !</h2>
                <p className="fs-3 mb-5">
                  Kami menyediakan platform mudah dan terpercaya untuk menyewa
                  lahan secara online. Temukan berbagai pilihan lahan yang
                  sesuai dengan kebutuhan Anda, baik untuk pertanian dan
                  perkebunan. Dengan fitur pencarian yang canggih, sistem
                  pembayaran yang aman, serta kontrak sewa digital, kami
                  memastikan proses sewa lahan menjadi lebih cepat dan praktis.
                </p>
                <p className="fs-3">Mulailah daftarkan lahan anda!</p>
                <Link to="/daftar-lahan" className="btn btn-pill btn-lime w-75">
                  Daftarkan Lahan
                </Link>
              </div>
              <div className="col-lg-6 text-center mt-lg-0 mt-md-0 mt-5">
                <img
                  src={registrasi}
                  height="500"
                  className="d-block mx-auto"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="row text-end align-items-end justify-content-end">
              <div className="col">
                <img src={tanya} alt="Registrasi" className="img-fluid" onClick={() => setIsOpen(!isOpen)} />
              </div>
            </div>
          </div>

          <div
            className="container-fluid d-flex flex-column justify-content-center mt-5"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="row g-2 align-items-center p-3" id="laporan">
              <div className="col-lg-2 text-center">
                <img src={lahanImg} width="128" alt="" />
                <h2 className="fw-bold">Pemilik Lahan</h2>
              </div>
              <div className="col-lg-10">
                <h2 className="fw-bold">Laporan untukmu hari ini!</h2>
                <div className="row row-deck row-cards">
                  <div className="col-sm-6 col-lg-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="subheader">Total Lahan Disewa</div>
                        </div>
                        <div className="h1 mt-5">
                          {countObject(countPenyewa)} Lahan
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="subheader">Permintaan Sewa</div>
                        </div>
                        <div className="h1 mt-5">
                          {countObject(countPermintaan)} Permintaan
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="subheader">Total Pendapatan</div>
                        </div>
                        <div className="h1 mt-5">
                          {formatIDR(countTotalPendapatan)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row row-cards p-3 mb-5">
              <div className="col-lg-12">
                <div className="card">
                  <div className="table-responsive">
                    <table className="table table-vcenter card-table text-center">
                      <thead>
                        <tr>
                          <th>Nama Lahan</th>
                          <th>Nama Penyewa</th>
                          <th>Lokasi</th>
                          <th>Durasi</th>
                          <th>Status</th>
                          <th className="w-1">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataLahan && dataLahan.length === 0 && (
                          <tr style={{ height: "100px" }}>
                            <td colSpan="6">Tidak ada data</td>
                          </tr>
                        )}
                        {dataLahan.map((lahan, index) => (
                          <tr key={index}>
                            <td>{lahan.nama_lahan}</td>
                            <td className="text-secondary">
                              {lahan.id_penyewa ? lahan.nama_penyewa : "Belum Ada Penyewa"}
                            </td>
                            <td className="text-secondary">{lahan.alamat}</td>
                            <td className="text-secondary">{lahan.periode} tahun</td>
                            <td className="text-secondary">{lahan.status}</td>
                            <td>
                              <div className="mb-1">
                                {lahan.status == "Belum Disewa" && (
                                <Link
                                  to={`/edit-lahan/${lahan.id}`}
                                  className="btn btn-yellow text-white w-100"
                                >
                                  Edit
                                </Link>
                                )}
                                {lahan.status == "Calon Penyewa" && (
                                  <>
                                  <a
                                    onClick={() => {
                                      terimaPenyewa(lahan.id);
                                    }}
                                    className="btn btn-green text-white w-100"
                                  >
                                    Terima
                                  </a>
                                  <a
                                    onClick={() => {
                                      tolakPenyewa(lahan.id);
                                    }}
                                    className="btn btn-red text-white w-100 mt-1"
                                  >
                                    Tolak
                                  </a>
                                  </>
                                )}
                              </div>
                              {lahan.status != "Calon Penyewa" && (
                                <div>
                                  <a
                                    onClick={() => {
                                      deleteLahan(lahan.id);
                                    }}
                                    className="btn btn-red text-white w-100"
                                  >
                                    Hapus
                                  </a>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
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
                  <div className="card" style={{ height: "400px"}}>
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

      <ChatPopup isOpen={isOpen} toggleChat={() => setIsOpen(!isOpen)} />
    </div>
  );
};

export default DashboardPemilik;
