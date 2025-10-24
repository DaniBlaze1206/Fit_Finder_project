const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const gymRoutes = require('./routes/gymRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const authenticationRoutes = require('./routes/authRoutes');

dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
	res.send("FitFinder is running... ");
});



app.use('/users', userRoutes);
app.use('/gyms', gymRoutes);
app.use('/reviews', reviewRoutes);
app.use('/reservation', reservationRoutes);
app.use('/register', authenticationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
})