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

import { User, ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";

const Profile = () => {
  const [role, setRole] = useState(null);

  const token = localStorage.getItem("token");

  const [userData, setUserData] = useState({
    nama: "",
    no_hp: "",
    email: "",
  });

  const [editedData, setEditedData] = useState({ ...userData });

  useEffect(() => {
    if (token) {
      const { role } = jwtDecode(token);
      setRole(role);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      axios
        .get(API_URL + "api/auth/data-pemilik", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [token]);

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (Object.values(editedData).some((val) => !val)) {
        Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Semua data harus diisi",
            showConfirmButton: false,
            timer: 1500,
        });
        return;
    }
    setUserData(editedData);
    setIsEditing(false);
    axios.put(API_URL + "api/auth/update-pemilik", editedData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Data berhasil diubah",
            showConfirmButton: false,
            timer: 1500,
        });
    })
    .catch((err) => {
        console.error(err);
        Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Terjadi kesalahan saat mengubah data",
            showConfirmButton: false,
            timer: 1500,
        });
    });
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
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
      <div className="container-xl col-lg-6 col-md-8 col-12 mt-4">
        <div className="card shadow-sm rounded-3 p-4">
          <div className="row align-items-center mb-4">
            <div className="col-6 d-flex justify-content-center">
              <div className="position-relative">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                  alt="Profile Avatar"
                    className="rounded-circle"
                    width="200"
                />
              </div>
            </div>

            <div className="col-6">
              {isEditing ? (
                <>
                  <div className="mb-3">
                    <label className="form-label">Nama Lengkap</label>
                    <input
                      type="text"
                      name="nama"
                      defaultValue={editedData.nama}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Nama Lengkap"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nomor Handphone</label>
                    <input
                      type="text"
                      name="no_hp"
                      defaultValue={editedData.no_hp}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Nomor Handphone"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={editedData.email}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="fw-semibold mb-1">Profil</h2>
                  <h3 className="h4 text-muted mb-1 mt-4">Nama Lengkap </h3>
                  <h4 className="text-secondary">{userData.nama}</h4>
                  <h3 className="h4 text-muted mb-1">Nomor Handphone </h3>
                  <h4 className="text-secondary">{userData.no_hp}</h4>
                  <h3 className="h4 text-muted mb-1">Email</h3>
                  <h4 className="text-secondary">{userData.email}</h4>
                </>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            {isEditing ? (
              <>
                <button
                  className="btn btn-outline-secondary px-4"
                  onClick={handleCancel}
                >
                  Batal
                </button>
                <button className="btn bg-lime text-white px-4" onClick={handleSave}>
                  Simpan
                </button>
              </>
            ) : (
              <button
                className="btn bg-lime text-white px-4"
                onClick={() => setIsEditing(true)}
              >
                Edit Profil
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
