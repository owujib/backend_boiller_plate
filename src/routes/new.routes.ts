import Route from '../utils/Route';

Route.get('/new', (req, res, next) => {
  return res.status(200).json({
    message: 'good',
  });
});
