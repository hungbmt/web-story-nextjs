var jwt = require("jsonwebtoken");
const connect = require("./connectMySql");

const accesstoken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "30d",
    }
  );
};
const generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: "1h",
    }
  );
  try {
    const maxTokens = 2;
    const [tokens] = await connect.query(
      "SELECT id FROM refresh_tokens WHERE user_id = ? ORDER BY created_at ASC",
      [user.id]
    );
    if (tokens.length >= maxTokens) {
      const tokenIdToRemove = tokens[0].id;
      await connect.query("DELETE FROM refresh_tokens WHERE id = ?", [
        tokenIdToRemove,
      ]);
    }
    await connect.query(
      "INSERT INTO refresh_tokens (token, user_id) VALUES (?, ?)",
      [refreshToken, user.id]
    );
  } catch (error) {
    console.log(error);
  }
  return refreshToken;
};

module.exports = { accesstoken, generateRefreshToken };
