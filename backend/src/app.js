require('dotenv').config();
const express = require('express');
const cors = require('cors');

const ptkRoutes = require('./routes/ptk.routes');
const cutiRoutes = require('./routes/cuti.routes');
const approvalRoutes = require('./routes/approval.routes');
const mutasiRoutes = require('./routes/mutasi.routes');

const app = express();
app.use(cors());
app.use(express.json());

//routes
app.use('/api/ptk', ptkRoutes);
app.use('/api/cuti', cutiRoutes);
app.use('/api/approval', approvalRoutes);
app.use('/api/mutasi', mutasiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));