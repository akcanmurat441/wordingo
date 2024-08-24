const tooManyRequest = (req, res) =>
  res.status(429).json({
    message: "Çok fazla istek atıldı. Daha sonra tekrar deneyiniz.",
  });

module.exports = tooManyRequest;
