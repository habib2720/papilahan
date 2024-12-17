import React, { useEffect, useState } from "react";
import "../../../assets/css/tabler.min.css";
import "../../../assets/css/tabler-flags.min.css";
import "../../../assets/css/tabler-payments.min.css";
import "../../../assets/css/tabler-vendors.min.css";
import "../../../assets/css/demo.min.css";

import { jwtDecode } from "jwt-decode";

import logo from "../../../assets/images/logo.png";

import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { User } from "lucide-react";
import { API_URL } from "../../../data";

const EditLahan = () => {
    const { id } = useParams();
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [onLoading, setOnLoading] = useState(false);
  const [role, setRole] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  
  const [data, setData] = useState(null);


  const fetchData = async () => {
    try {
        const res = await axios.get(
            API_URL + "api/lahan/detail/" + id,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        setData(res.data);
    } catch (err) {
        console.error(err);
    }
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

  const onSubmit = (e) => {
    e.preventDefault();
    setOnLoading(true);
    const formData = new FormData(e.target);
    const namaLahan = formData.get("namaLahan");
    const alamat = formData.get("alamat");
    const periode = formData.get("periode");
    const luasLahan = formData.get("luasLahan");
    const harga = formData.get("harga");
    const deskripsi = formData.get("deskripsi");
    const tipeLahan = formData.get("tipeLahan");
    const sertifikat = formData.get("sertifikat");
    const linkLokasi = formData.get("linkLokasi");
    const gambar = formData.get("gambar");

    const id_pemilik = jwtDecode(token).id;

    if (
      !namaLahan ||
      !alamat ||
      !periode ||
      !luasLahan ||
      !harga ||
      !deskripsi ||
      !tipeLahan ||
      !sertifikat ||
      !linkLokasi
    ) {
      setError("Semua data harus diisi");
      setOnLoading(false);
      return;
    }

    axios
      .put(
        API_URL + "api/lahan/edit-lahan/" + id,
        {
          id_pemilik,
          namaLahan,
          alamat,
          periode,
          luasLahan,
          harga,
          deskripsi,
          tipeLahan,
          sertifikat,
          linkLokasi,
          gambar
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setAlert(res.data.message);
        setError(null);
        setOnLoading(false);
        document.querySelector("form").reset();
        window.location.reload();
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Gagal membuat lahan");
        setOnLoading(false);
      });
  };

  const cancel = () => {
    document.querySelector("form").reset();
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

      <div
        className="d-flex"
        style={{ marginTop: "50px", justifyContent: "center" }}
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Edit Lahan</h3>
              </div>
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
                <form onSubmit={onSubmit} autoComplete="off" noValidate>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Nama Lahan</label>
                        <div className="input-group input-group-flat">
                          <input
                            type="text"
                            name="namaLahan"
                            className="form-control"
                            placeholder="Masukkan nama lahan"
                            autoComplete="off"
                            defaultValue={data?.nama_lahan}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Alamat</label>
                        <div className="input-group input-group-flat">
                          <textarea
                            name="alamat"
                            className="form-control"
                            placeholder="Masukkan alamat lahan"
                            autoComplete="off"
                            defaultValue={data?.alamat}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Periode (Tahun)</label>
                        <div className="input-group input-group-flat">
                          <input
                            type="text"
                            name="periode"
                            className="form-control"
                            placeholder="Masukkan periode lahan dalam tahun"
                            autoComplete="off"
                            defaultValue={data?.periode}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Luas Lahan</label>
                        <div className="input-group input-group-flat">
                          <input
                            type="number"
                            name="luasLahan"
                            className="form-control"
                            placeholder="Masukkan luas lahan"
                            autoComplete="off"
                            defaultValue={data?.luas_lahan}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Harga</label>
                        <div className="input-group input-group-flat">
                          <input
                            type="number"
                            name="harga"
                            className="form-control"
                            placeholder="Masukkan harga lahan"
                            autoComplete="off"
                            defaultValue={data?.harga}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Deskripsi</label>
                        <div className="input-group input-group-flat">
                          <textarea
                            name="deskripsi"
                            className="form-control"
                            placeholder="Masukkan deskripsi lahan"
                            autoComplete="off"
                            defaultValue={data?.deskripsi}
                          ></textarea>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Tipe Lahan</label>
                        <div className="input-group input-group-flat">
                          <input
                            type="text"
                            name="tipeLahan"
                            className="form-control"
                            placeholder="Masukkan tipe lahan"
                            autoComplete="off"
                            defaultValue={data?.tipe_lahan}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Sertifikat</label>
                        <div className="input-group input-group-flat">
                          <input
                            type="text"
                            name="sertifikat"
                            className="form-control"
                            placeholder="Masukkan sertifikat lahan"
                            autoComplete="off"
                            defaultValue={data?.sertifikat}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Link Lokasi</label>
                        <div className="input-group input-group-flat">
                          <input
                            type="text"
                            name="linkLokasi"
                            className="form-control"
                            placeholder="Masukkan link lokasi lahan"
                            autoComplete="off"
                            defaultValue={data?.link_lokasi}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <img src={API_URL + data?.gambar} alt="gambar" width={100} />
                        <label className="form-label">Gambar</label>
                        <div className="input-group input-group-flat">
                          <input
                            type="file"
                            accept="image/*"
                            name="gambar"
                            className="form-control"
                            placeholder="Masukkan gambar lahan"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="mb-3">
                      <button className="btn btn-primary" disabled={onLoading}>
                        {onLoading ? "Loading..." : "Edit"}
                      </button>
                    </div>
                    <div className="ms-2 mb-3">
                      <a className="btn btn-danger" onClick={() => cancel()}>
                        Reset
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLahan;
