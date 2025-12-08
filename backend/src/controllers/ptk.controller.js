const db = require('../config/db');

exports.getAll = async (req, res) => {
    try{
        const [rows] = await db.query('SELECT * FROM ptk');
        res.json(rows);
    } catch (err) {
        res.status(500).json({error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const[[row]] = await db.query('SELECT * FROM ptk WHERE id_ptk = ?', [id]);
        if (!row) return res.status(404).json({message: 'PTK not found' });
        res.json(row);
    } catch (err) {
        res.status(500).json({error: err.message });
    }
        
};

exports.create = async (req, res) => {
    try {
        const { nama_lengkap, nikki, jenis_kelamin, tanggal_lahir, jabatan, npsn_sekolah } = req.body;
        const [result] = await db.query(
            `INSERT INTO ptk (nama_lengkap, nikki, jenis_kelamin, tanggal_lahir, jabatan, npsn_sekolah)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [nama_lengkap, nikki, jenis_kelamin, tanggal_lahir, jabatan, npsn_sekolah]
        );
        res.status(201).json({message: 'PTK created', id: result.inserID });
    } catch (err) {
        res.status(500).json({error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const {nama_lengkap, jabatan, npsn_sekolah } = req.body;
        await db.query(
            'UPDATE ptk SET nama_lengkap=?, jabatan=?, npsn_sekolah=? WHERE id_ptk=?',
            [nama_lengkap, jabatan, npsn_sekolah, id]
        );
        res.json({message: 'PTK updated' });
    } catch (err) {
        res.status(500).json({error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        await db.query('DELETE FROM ptk WHERE id_ptk = ?', [id]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};