const fs = require('fs').promises;
const path = require('path');


const gymFilePath = path.join(__dirname, '../data/gyms.json');

async function readGyms() {
  try {
    const json = await fs.readFile(gymFilePath, 'utf8');
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Error reading gyms file:', error);
    return [];
  }
}

async function writeGyms(gyms) {
  await fs.writeFile(gymFilePath, JSON.stringify(gyms, null, 2), 'utf8');
}

const getAllGyms = async (req, res) => {
  try {
    let gyms = await readGyms();

    const { city, service, maxPrice, name } = req.query;

    if (city) {
      gyms = gyms.filter(g =>
        typeof g.location === 'string' &&
        g.location.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (service) {
      gyms = gyms.filter(g => {
        if (Array.isArray(g.services)) {
          return g.services
            .map(s => String(s).toLowerCase())
            .includes(service.toLowerCase());
        }
        if (typeof g.services === 'string') {
          return g.services.toLowerCase().includes(service.toLowerCase());
        }
        return false;
      });
    }

    if (maxPrice) {
      const max = Number(maxPrice);
      if (!Number.isNaN(max)) {
        gyms = gyms.filter(g => Number(g.price) <= max);
      }
    }

    if (name) {
      gyms = gyms.filter(g =>
        typeof g.name === 'string' &&
        g.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    res.status(200).json(gyms);
  } catch (error) {
    console.error('Error getting gyms:', error);
    res.status(500).json({ message: 'Error getting gyms' });
  }
};


const getGymById = async (req, res) => {
  try {
    const gymId = parseInt(req.params.id, 10);
    if (Number.isNaN(gymId)) {
      return res.status(400).json({ message: 'Invalid gym id' });
    }

    const gyms = await readGyms();
    const gym = gyms.find(g => g.id === gymId);

    if (!gym) {
      return res.status(404).json({ message: 'Gym not found' });
    }

    res.status(200).json(gym);
  } catch (error) {
    console.error('Error getting gym by id:', error);
    res.status(500).json({ message: 'Error getting gym details' });
  }
};


const createGym = async (req, res) => {
  try {
    let { name, location, services, price, hours } = req.body;

    if (!name || !location || !services || !price || !hours) {
      return res.status(400).json({ message: 'name, location, services, price, and hours are required' });
    }


    if (typeof services === 'string') {
      services = services
        .split(',')
        .map(s => s.trim().toLowerCase())
        .filter(Boolean);
    } else if (Array.isArray(services)) {
      services = services.map(s => String(s).toLowerCase());
    } else {
      return res.status(400).json({ message: 'services must be a string or an array' });
    }

    const gyms = await readGyms();

    const newId = gyms.length ? Math.max(...gyms.map(g => g.id || 0)) + 1 : 1;

    const managerId = req.user?.id || null; 
    const newGym = {
      id: newId,
      name,
      location,
      services,
      price: Number(price),
      hours,
      managerId,
      createdAt: new Date().toISOString()
    };

    gyms.push(newGym);
    await writeGyms(gyms);

    res.status(201).json({
      message: 'Gym created successfully',
      gym: newGym
    });

  } catch (error) {
    console.error('Error creating gym:', error);
    res.status(500).json({ message: 'Error creating gym' });
  }
};

module.exports = {
  getAllGyms,
  getGymById,
  createGym,
};
