import jwt, { decode } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

//Armazenamento de tokens inválidos - interrompendo a sessão do usuário
export const tokensInvalidados = new Set();
    
export function authMiddleware (req, res, next) {
    const token = req.cookies.token ||
     (req.headers.authorization && req.headers.authorization.split(' ')[1])

     if(!token || tokensInvalidados.has(token)) {
        return res.status(401).json ({error: 'Acesso negado'})
     }
     jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json ({error: 'Sessão expirada'})
        }
        req.usuario = decoded
        next();
     });
}