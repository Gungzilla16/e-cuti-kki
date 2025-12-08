CREATE DATABASE IF NOT EXISTS e_cuti;
USE e_cuti;

-- ==================
-- TABLE SEKOLAH
-- =================
CREATE TABLE sekolah (
    npsn CHAR (8) PRIMARY KEY,
    nama_sekolah VARCHAR (255) NOT NULL,
    kontak CHAR (13) NOT NULL,
    alamat TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =================
-- TABLE USERS (Operator Sekolah)
-- =================
CREATE TABLE users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR (100) UNIQUE NOT NULL,
    password VARCHAR (255) NOT NULL,
    role ENUM ('ks','sekolah','sudin','admin') NOT NULL,
    npsn_sekolah CHAR (8),
    FOREIGN KEY (npsn_sekolah) REFERENCES sekolah(npsn)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =================
-- TABLE: PTK (Pegawai)
-- =================
CREATE TABLE ptk (
    id_ptk INT AUTO_INCREMENT PRIMARY KEY,
    nama_lengkap VARCHAR (255) NOT NULL,
    jenis_kelamin VARCHAR (15),
    tanggal_lahir DATE NOT NULL DEFAULT '2000-01-01',
    nikki CHAR (7),
    jabatan VARCHAR (30),
    npsn_sekolah CHAR (8) NOT NULL,
    FOREIGN KEY (npsn_sekolah) REFERENCES sekolah(npsn)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =================
-- TABLE: Mutasi PTK
-- =================
CREATE TABLE mutasi_ptk (
    id_mutasi INT AUTO_INCREMENT PRIMARY KEY,
    id_ptk INT NOT NULL,
    npsn_lama CHAR (8) NOT NULL,
    npsn_baru CHAR (8) NOT NULL,
    tanggal_mutasi DATETIME NOT NULL,
    id_admin INT NOT NULL,

    FOREIGN KEY (id_ptk) REFERENCES ptk(id_ptk),
    FOREIGN KEY (id_admin) REFERENCES users(id_user),
    FOREIGN KEY (npsn_lama) REFERENCES sekolah(npsn),
    FOREIGN KEY (npsn_baru) REFERENCES sekolah(npsn)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==================
-- TABLE: Jenis Cuti
-- ==================
CREATE TABLE jenis_cuti (
    id_jenis_cuti INT AUTO_INCREMENT PRIMARY KEY,
    nama_jenis_cuti VARCHAR (100) NOT NULL,
    kuota_default INT NOT NULL DEFAULT 12
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==================
-- TABLE: Kuota Cuti
-- ==================
CREATE TABLE kuota_cuti_tahunan (
    id_kuota INT AUTO_INCREMENT PRIMARY KEY,
    id_ptk INT NOT NULL,
    tahun YEAR NOT NULL,
    kuota_tersedia INT NOT NULL DEFAULT 12,
    FOREIGN KEY (id_ptk) REFERENCES ptk(id_ptk)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==================
-- TABLE: Cuti
-- ==================
CREATE TABLE cuti (
    id_cuti INT AUTO_INCREMENT PRIMARY KEY,
    id_ptk INT NOT NULL,
    npsn_sekolah CHAR (8) NOT NULL,
    id_jenis_cuti INT NOT NULL,
    tanggal_mulai DATE NOT NULL,
    tanggal_selesai DATE NOT NULL,
    total_hari INT NOT NULL,
    status ENUM('draft','ks','sudin','disetujui','ditolak') NOT NULL DEFAULT 'draft',

    FOREIGN KEY (id_ptk) REFERENCES ptk(id_ptk),
    FOREIGN KEY (npsn_sekolah) REFERENCES sekolah(npsn),
    FOREIGN KEY (id_jenis_cuti) REFERENCES jenis_cuti(id_jenis_cuti)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==================
-- TABLE: Cuti Aproval Log
-- ==================
CREATE TABLE cuti_approval_log (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    id_cuti INT NOT NULL,
    role_approver ENUM('ks','sudin') NOT NULL,
    id_user INT NOT NULL,
    status ENUM('disetujui','ditolak') NOT NULL,
    tanggal_approval DATETIME NOT NULL,
    catatan TEXT,

    FOREIGN KEY (id_cuti) REFERENCES cuti(id_cuti),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;