import React, { useEffect, useState } from "react";
import "../../assets/css/tabler.min.css";
import "../../assets/css/tabler-flags.min.css";
import "../../assets/css/tabler-payments.min.css";
import "../../assets/css/tabler-vendors.min.css";
import "../../assets/css/demo.min.css";

import { jwtDecode } from "jwt-decode";

import logo from "../../assets/images/logo.png";

import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../data";

import { User, MapPin, Expand, Ruler, Crop, File, Grid } from "lucide-react";
import Swal from "sweetalert2";

const DetailLahan = () => {
  const { id } = useParams();
  const [role, setRole] = useState(null);

  const token = localStorage.getItem("token");

  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL + "api/lahan/detail/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const sewaLahan = async (id) => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah anda yakin ingin menyewa lahan ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            API_URL + "api/lahan/sewa/" + id,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            Swal.fire({
              title: "Berhasil",
              text: "Berhasil menyewa lahan",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
            fetchData();
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              title: "Gagal",
              text: "Gagal menyewa lahan",
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
            });
          });
      }
    });
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, []);

  const formatIDR = (amount) => {
    return (
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(amount) + ",00"
    );
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
                  <Link
                    className="nav-link"
                    to={
                      role === "pemilik"
                        ? "/dashboard-pemilik"
                        : "/dashboard-pencari"
                    }
                  >
                    Beranda
                  </Link>
                </li>
                <li className="nav-item text-white me-lg-5 me-0">
                  <Link className="nav-link" to="/dashboard-pemilik">
                    Laporan
                  </Link>
                </li>
                <li className="nav-item text-white me-lg-5 me-0">
                  <Link className="nav-link" to="/katalog-pemilik">
                    Katalog
                  </Link>
                </li>
                <li className="nav-item text-white me-lg-5 me-0">
                  <Link className="nav-link" to="/dashboard-pemilik">
                    Hubungi
                  </Link>
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

      <div className="container mt-5">
        <div className="bg-light min-vh-100 py-5">
          <div className="container py-4">
            <div className="mb-4">
              <h1 className="h3 fw-bold text-dark mb-2"
              style={{ 
                lineHeight: "1.2",
                fontSize: "2rem",
                fontWeight: "700",
              }}
              >{data?.nama_lahan}</h1>
              <div className="d-flex align-items-center text-muted">
                <MapPin className="text-secondary me-2" />{" "}
                <p className="mb-0">{data?.alamat}</p>
              </div>
            </div>

            <div className="mb-4">
              <img
                src={API_URL + data?.gambar}
                alt="Lahan"
                className="img-fluid rounded"
                width={1920}
                height={1080}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  maxHeight: "600px",
                }}
              />
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="card shadow-sm mb-4">
                  <div className="card-body">
                    <h2 className="h5 fw-bold text-dark mb-3">Detail Lahan</h2>
                    <ul className="list-unstyled mb-0">
                      <li className="d-flex align-items-center mb-3">
                        <Ruler className="text-secondary me-3 fs-5" />
                        <div>
                          <p className="mb-0 text-muted">Luas Lahan</p>
                          <p className="fw-semibold mb-0">{data?.luas_lahan} m²</p>
                        </div>
                      </li>
                      <li className="d-flex align-items-center mb-3">
                        <File className="text-secondary me-3 fs-5" />
                        <div>
                          <p className="mb-0 text-muted">Sertifikat</p>
                          <p className="fw-semibold mb-0">{data?.sertifikat}</p>
                        </div>
                      </li>
                      <li className="d-flex align-items-center">
                        <Grid className="text-secondary me-3 fs-5" />
                        <div>
                          <p className="mb-0 text-muted">Tipe Lahan</p>
                          <p className="fw-semibold mb-0">{data?.tipe_lahan}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="card shadow-sm bg-light">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-1">Harga Sewa</p>
                      <h3 className="fw-bold text-black mb-0">
                        {formatIDR(data?.harga)}
                      </h3>
                    </div>
                    {role !== "pemilik" ? (
                      <>
                        {data?.status === "Belum Disewa" ? (
                          <button
                            className="btn bg-lime text-white rounded-pill px-4"
                            onClick={() => sewaLahan(data?.id)}
                          >
                            Sewa Sekarang
                          </button>
                        ) : (
                          <button className="btn bg-danger text-white rounded-pill px-4">
                            Sudah Disewa
                          </button>
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card shadow-sm mb-4">
                  <div className="card-body">
                    <h2 className="h5 fw-bold text-dark mb-3">Deskripsi</h2>
                    <p className="text-muted">
                      {data?.deskripsi || "Tidak ada deskripsi"}
                    </p>
                  </div>
                </div>
                {role !== "pemilik" ? (
                  <a
                    className="btn btn-primary w-100 rounded-pill"
                    href={`https://wa.me/${data?.no_hp_pemilik}`}
                  >
                    Tanyakan Pada Pemilik
                  </a>
                ) : (
                  <Link
                    className="btn btn-primary w-100 rounded-pill"
                    to={`/edit-lahan/${data?.id}`}
                  >
                    Edit Lahan
                  </Link>
                )}
              </div>
            </div>

            <div className="card shadow-sm mt-4">
              <div className="card-body">
                <h2 className="h5 fw-bold text-dark mb-3">Lokasi</h2>
                <div className="d-flex align-items-center mb-3">
                  <MapPin className="text-secondary me-2 fs-5" />
                  <p className="mb-0 text-muted">{data?.alamat}</p>
                </div>
                {data?.link_lokasi.includes(
                  "https://www.google.com/maps/embed?pb="
                ) ? (
                  <iframe
                    src={data?.link_lokasi}
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                ) : (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.013292073073!2d106.9910733147699!3d-6.315125995428073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4b4b4b4b4b5%3A0x2e69f4b4b4b4b4b5!2sUniversitas%20Indonesia!5e0!3m2!1sid!2sid!4v1629783660004!5m2!1sid!2sid"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailLahan;
