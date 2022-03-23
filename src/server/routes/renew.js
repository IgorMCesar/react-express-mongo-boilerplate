import router from './auth';

router.get('/renew', (req, res) => {
  res.json({
    msg: 'hola mundo'
  });
});
