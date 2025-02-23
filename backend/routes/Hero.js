app.get('/api/zodiac/:sign', authenticate, async (req, res) => {
    try {
      const zodiac = await Zodiac.findOne({ sign: req.params.sign });
      if (!zodiac) return res.status(404).json({ message: 'Sign not found' });
      res.json(zodiac);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  