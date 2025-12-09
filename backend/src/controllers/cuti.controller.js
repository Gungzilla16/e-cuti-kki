const db = require('../config/db');

exports.create = async (req, res) => {
    try {
        const { id_ptk, 
            npsn_sekolah, 
            id_jenis_cuti, 
            tanggal_mulai, 
            tanggal_selesai, 
            total_hari
            } = req.body;

            //Validasi Input
            if (!id_ptk || !npsn_sekolah || !id_jenis_cuti || !tanggal_mulai || !tanggal_selesai || !total_hari) 
                {
                return res.status(400).json({
                    message: "Semua field wajib diisi."
                });

    }
    
    //Jika lampiran dari multer
    let lampiranPath = null;
    if (req.file) {
        lampiranPath = "/uploads/lampiran/" + req.file.filename;
    }

    const sql = `
    INSERT INTO cuti (
    id_ptk,
    npsn_sekolah,
    id_jenis_cuti,
    tanggal_mulai,
    tanggal_selesai,
    total hari,
    status,
    lampiran,
    draft_pdf,
    signed_pdf
    )
    VALUES (?, ?, ?, ?, ?, ?, 'draft', ?, NULL, NULL)`;

    const params = [
        id_ptk,
        npsn_sekolah,
        id_jenis_cuti,
        tanggal_mulai,
        tanggal_selesai,
        total_hari,
        lampiranPath
    ];

    const [result] = await db.execute(sql, params);

    res.status(201).json({
        message: "Pengajuan cuti berhasil dibuat!",
        id_cuti: result.insertId
    });
    

} catch (error) {
    console.error("Error create cuti:", error);
    res.status(500).json({
        message: "Terjadi kesalahan server."
    });

  }
}