import React, { useEffect, useState } from "react";
import "../../assets/css/tabler.min.css";
import "../../assets/css/tabler-flags.min.css";
import "../../assets/css/tabler-payments.min.css";
import "../../assets/css/tabler-vendors.min.css";
import "../../assets/css/demo.min.css";

import { Link } from "react-router-dom";
import axios from "axios";

import { API_URL, berita } from "../../data";

import logo from "../../assets/images/logo.png";
import { jwtDecode } from "jwt-decode";
import { ChevronLeftIcon, ChevronRightIcon, User } from "lucide-react";

const Katalog = () => {
  const [originalDataLahan, setOriginalDataLahan] = useState([]);
  const [dataLahan, setDataLahan] = useState([]);
  const [filterHarga, setFilterHarga] = useState([]);
  const [filterLuas, setFilterLuas] = useState([]);
  const [filterTipe, setFilterTipe] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const token = localStorage.getItem("token");
  const [hiddenFilter, setHiddenFilter] = useState(false);

  const getLahan = (id_pemilik) => {
    axios
      .get(API_URL + "api/lahan/" + id_pemilik)
      .then((res) => {
        setDataLahan(res.data);
        setOriginalDataLahan(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const applyFilters = () => {
    let filtered = originalDataLahan;

    if (filterHarga.length > 0) {
      filtered = filtered.filter((lahan) => {
        return filterHarga.some((range) => {
          const [min, max] = range.split("-");
          return lahan.harga >= parseInt(min) && lahan.harga <= parseInt(max);
        });
      });
    }

    if (filterLuas.length > 0) {
      filtered = filtered.filter((lahan) => {
        return filterLuas.some((range) => {
          const [min, max] = range.split("-");
          return (
            lahan.luas_lahan >= parseInt(min) &&
            lahan.luas_lahan <= parseInt(max)
          );
        });
      });
    }

    if (filterTipe.length > 0) {
      filtered = filtered.filter((lahan) =>
        filterTipe.includes(lahan.tipe_lahan.toLowerCase())
      );
    }

    setDataLahan(filtered);
    setCurrentPage(1);
  };

  const handleCheckboxChange = (event, filterType) => {
    const value = event.target.value;
    const checked = event.target.checked;

    if (filterType === "harga") {
      setFilterHarga((prev) =>
        checked ? [...prev, value] : prev.filter((item) => item !== value)
      );
    } else if (filterType === "luas") {
      setFilterLuas((prev) =>
        checked ? [...prev, value] : prev.filter((item) => item !== value)
      );
    } else if (filterType === "tipe") {
      setFilterTipe((prev) =>
        checked ? [...prev, value] : prev.filter((item) => item !== value)
      );
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filterHarga, filterLuas, filterTipe]);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (isMobile) {
      setHiddenFilter(true);
    }
  }, [isMobile]);

  const searchLahan = (search) => {
    if (!search) {
      setDataLahan(originalDataLahan);
      return;
    }

    const filteredLahan = originalDataLahan.filter((lahan) =>
      lahan.nama_lahan.toLowerCase().includes(search.toLowerCase())
    );
    setDataLahan(filteredLahan);
    setCurrentPage(1);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id_pemilik = jwtDecode(token).id;
    getLahan(id_pemilik);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataLahan.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataLahan.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
      <div className="page-wrapper mt-0 mt-md-5 mt-lg-5">
        <div className="page-body">
          <div className="container-fluid mt-4">
            <div className="row">
              <aside className="col-lg-3 filter-section bg-light p-4 rounded shadow-sm">
                <div className="justify-content-between d-flex mb-3">
                  <h4 className="fw-bold">Filter Pencarian</h4>
                  <button
                    className="btn bg-lime text-white"
                    onClick={() => setHiddenFilter(!hiddenFilter)}
                  >
                    {hiddenFilter ? "Tampilkan Filter" : "Sembunyikan Filter"}
                  </button>
                </div>
                {!hiddenFilter && (
                  <>
                    <div className="input-group mb-4">
                      <input
                        type="text"
                        onChange={(e) => searchLahan(e.target.value)}
                        id="keyword"
                        className="form-control"
                        placeholder="Cari lahan..."
                      />
                      <button
                        className="btn bg-lime text-white"
                        type="button"
                        onClick={searchLahan}
                      >
                        Cari
                      </button>
                    </div>
                    <div className="mb-4">
                      <h5 className="fw-semibold text-secondary mb-3">
                        Harga Lahan
                      </h5>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="harga1"
                          value="2500000-5000000"
                          onChange={(e) => handleCheckboxChange(e, "harga")}
                        />
                        <label className="form-check-label" htmlFor="harga1">
                          2,5 jt - 5 jt
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="harga2"
                          value="5000000-10000000"
                          onChange={(e) => handleCheckboxChange(e, "harga")}
                        />
                        <label className="form-check-label" htmlFor="harga2">
                          5 jt - 10 jt
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="harga3"
                          value="10000000-15000000"
                          onChange={(e) => handleCheckboxChange(e, "harga")}
                        />
                        <label className="form-check-label" htmlFor="harga3">
                          10 jt - 15 jt
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="harga4"
                          value="15000000-20000000"
                          onChange={(e) => handleCheckboxChange(e, "harga")}
                        />
                        <label className="form-check-label" htmlFor="harga3">
                          15 jt - 20 jt
                        </label>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h5 className="fw-semibold text-secondary mb-3">
                        Luas Tanah
                      </h5>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="luas1"
                          value="250-500"
                          onChange={(e) => handleCheckboxChange(e, "luas")}
                        />
                        <label className="form-check-label" htmlFor="luas1">
                          250 m² - 500 m²
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="luas2"
                          value="500-1000"
                          onChange={(e) => handleCheckboxChange(e, "luas")}
                        />
                        <label className="form-check-label" htmlFor="luas2">
                          500 m² - 1000 m²
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="luas3"
                          value="1000-2000"
                          onChange={(e) => handleCheckboxChange(e, "luas")}
                        />
                        <label className="form-check-label" htmlFor="luas2">
                          1000 m² - 2000 m²
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="luas4"
                          value="2000-3000"
                          onChange={(e) => handleCheckboxChange(e, "luas")}
                        />
                        <label className="form-check-label" htmlFor="luas2">
                          2000 m² - 3000 m²
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="luas5"
                          value="3000-4000"
                          onChange={(e) => handleCheckboxChange(e, "luas")}
                        />
                        <label className="form-check-label" htmlFor="luas2">
                          3000 m² - 4000 m²
                        </label>
                      </div>
                    </div>
                    <div>
                      <h5 className="fw-semibold text-secondary mb-3">
                        Tipe Lahan
                      </h5>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="tipe1"
                          value="sawah"
                          onChange={(e) => handleCheckboxChange(e, "tipe")}
                        />
                        <label className="form-check-label" htmlFor="tipe1">
                          Sawah
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="tipe2"
                          value="ladang"
                          onChange={(e) => handleCheckboxChange(e, "tipe")}
                        />
                        <label className="form-check-label" htmlFor="tipe2">
                          Ladang
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="tipe3"
                          value="kebun"
                          onChange={(e) => handleCheckboxChange(e, "tipe")}
                        />
                        <label className="form-check-label" htmlFor="tipe2">
                          Kebun
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </aside>

              <section className="col-lg-9">
                <div className="row g-4">
                  {currentItems.length === 0 && (
                    <div className="col-12">
                      <div className="alert alert-danger">
                        Tidak ada lahan yang ditemukan
                      </div>
                    </div>
                  )}
                  {currentItems.map((lahan, index) => (
                    <div className="col-md-6 col-lg-4" key={index}>
                      <div className="card property-card">
                        <img
                          src={API_URL + lahan.gambar}
                          alt="..."
                          width={300}
                          height={180}
                          className="card-img-top"
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                        <div className="card-body">
                          <h5 className="card-title fw-bold">
                            {formatIDR(lahan.harga)}
                          </h5>
                          <p className="card-text">{lahan.nama_lahan}</p>
                          <p className="text-muted small">{lahan.alamat}</p>
                          <Link
                            to={`/detail-lahan/${lahan.id}`}
                            className="text-secondary text-decoration-none"
                          >
                            Detail Lahan →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="mt-4">
                    <nav>
                      <ul className="pagination justify-content-center">
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            <ChevronLeftIcon />
                          </button>
                        </li>

                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <li
                            key={page}
                            className={`page-item ${
                              page === currentPage ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link mx-1"
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </button>
                          </li>
                        ))}

                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            <ChevronRightIcon />
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Katalog;
