const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
  console.log('--- AUTH DEBUG ---');
  console.log('body:', req.body);
  console.log('pin recibido:', req.body?.pin);
  console.log('pin esperado:', process.env.ADMIN_PIN);
  console.log('tipos:', typeof req.body?.pin, typeof process.env.ADMIN_PIN);
  console.log('------------------');

  const { pin } = req.body;

  if (!pin || pin !== process.env.ADMIN_PIN) {
    return res.status(401).json({ error: 'PIN inválido' });
  }

  const token = jwt.sign(
    { role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({ token });
};