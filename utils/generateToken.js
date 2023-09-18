import jwt from 'jsonwebtoken'

export function generateAccessToken (login) {
  return jwt.sign({ login }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10min'
  })
}

export function generateRefreshToken (login) {
  return jwt.sign({ login }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d'
  })
}
