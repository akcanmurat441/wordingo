const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestApiError, UnAuthorizedApiError } = require("../errors");

const register = async (req, res) => {
  try {
    const { password } = req.body;

    // Şifre uzunluğunu kontrol et
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Şifreniz en az 6 karakterli olmalıdır." });
    }

    // Aynı email ile kayıtlı kullanıcı var mı kontrol et
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({
          error: "Bu email adresiyle kayıtlı bir kullanıcı zaten mevcut.",
        });
    }

    // Kullanıcıyı oluştur ve kaydet
    const user = await User.create({ ...req.body });

    // JWT oluştur
    const token = user.createJWT();

    // Başarılı yanıt dön
    res.status(StatusCodes.CREATED).json({
      user: { name: user.getName() },
      token: token,
    });
  } catch (error) {
    // Hata durumunda hata mesajını döndür
    res
      .status(500)
      .json({ error: "Bir hata meydana geldi. Lütfen tekrar deneyin." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestApiError("Email ve password boş olamaz.");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthorizedApiError("Email veya şifre hatalı.");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthorizedApiError("Email veya şifreniz hatalı.");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: { name: user.getName() },
    token: token,
  });
};

module.exports = {
  login,
  register,
};
