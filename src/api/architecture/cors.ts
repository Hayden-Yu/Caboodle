export function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

  if (req.method === 'OPTIONS') {
    res.status(200).send();
  } else {
    next();
  }
}
