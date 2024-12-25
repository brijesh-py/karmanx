const setCookie = (res, token) => {
  res.cookie("access_token", token, {
    // httpOnly: true,
    maxAge: 60 * 1000 * 5,
  });
};

module.exports = setCookie;
