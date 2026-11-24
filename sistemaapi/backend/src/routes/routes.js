import {Router} from 'express'
import ClienteController from '../controllers/ClienteController.js'
import VeiculoController from '../controllers/VeiculoController.js'
import AgendamentoController from '../controllers/AgendamentoController.js'
import dashboardController from '../controllers/dashboardController.js'
import AuthController from '../controllers/AuthController.js'
import {authMiddleware} from '../middleware/authMiddleware.js'

const router = Router();

//Rotas para autenticação
router.post('/login', AuthController.login)


router.use(authMiddleware)

router.post('/logout', AuthController.logout)
router.post('/me', AuthController.me)

//Rotas para o cliente
router.get('/clientes', ClienteController.listar);
router.post('/clientes', ClienteController.criar);

//Rotas para veículos
router.post('/veiculos', VeiculoController.criar);
router.get('/veiculos', VeiculoController.listar);

//Rotas para agendamnetos
router.post('/agendamentos', AgendamentoController.criar);
router.get('/agendamentos', AgendamentoController.listar);
router.patch('/agendamentos/:id/data', AgendamentoController.editarData);

//Rotas para dashboard
router.get('/estatisticas', dashboardController.resumo);

export default router;