import jwt from 'jsonwebtoken';
import pool from '../config/database.js';
import { tokensInvalidados } from '../middleware/authMiddleware.js';

const JWT_SECRET = process.env.JWT_SECRET;

async function login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Informe email e senha' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?;', [email]);
        const usuario = rows[0];

        //Validação em caso de falha na autenticação
        if (!usuario || usuario.senha !== senha) {
            return res.status(401).json({ error: 'E-mail ou senha invalidos' })
        }

        //Geração JWT com expiração (ex:2b)
        const token = jwt.sign(
            {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            },
            JWT_SECRET,
            {
                expiresIn: '2h'
            }
        );

        return res.json({
            message: 'Login realizado com sucesso',
            token,
            usuario:{
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro no servidor', errorMessage: error.message })
    }
}

async function logout(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(token) {
        tokensInvalidados.add(token);
    }

    console.log(tokensInvalidados);
    

    return res.status(200).json({message: 'Sessão encerrada com sucesso.'});
}

async function me(req, res) {
    console.log("teste");
    
    return res.json({
        usuario: req.usuario
    })
}


export default { login, logout, me };