import { useState, useEffect } from "react";
import ClienteForm from "../components/ClienteForm";

//const clienteMockados = [
// {
//     id: 1,
//     nome: "Isabeli",
//     cpf: "48301925610",
//     telefone: "19665342345",
//     email: "isabeli@gmail.com"
// },
// {
//     id: 2,
//     nome: "Isona",
//     cpf: "98345526543",
//     telefone: "11554334566",
//     email: "isona@gmail.com"
// }
//];

export default function ClientePage() {
    const [clientes, setClientes] = useState([]);
    const [clienteEditando, setClienteEditando] = useState(null);

    const handleCancelarEdicao = () => {
        setClienteEditando(null);
    };

    const handleSalvar = async (dadosClientes) => {
        if (clienteEditando) {
            setClientes(clientes =>
                clientes.map(cliente =>
                    cliente.id === clienteEditando.id
                        ? {
                            ...dadosClientes,
                            id: clienteEditando.id
                        }
                        : cliente
                )
            );

            setClienteEditando(null);
        } else {

            try {

                const resposta = await fetch('http://localhost:3000/api/clientes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dadosClientes)

                })

                const data = await resposta.json();

                const novoCliente = {
                    ...dadosClientes,
                    id: data.id
                };

                setClientes(clientes => [...clientes, novoCliente]);
            } catch (error) {
                console.error('Erro ao criar cliente', error)
            }

        }
    };

    useEffect(() => {

    const buscaClientes = async () => {
        try {
            const resposta = await fetch('http://localhost:3000/api/clientes');

            if (!resposta.ok) {
                throw new Error('Erro ao buscar clientes');
            }

            const data = await resposta.json();

            console.log('Dados recebidos do backend:', data);

            // Verifica se os dados vieram diretamente ou dentro de um objeto
            const listaClientes = Array.isArray(data)
                ? data
                : data.data || data.clientes;

            if (Array.isArray(listaClientes)) {
                setClientes(listaClientes);
            } else {
                console.error('O backend não retornou uma lista de clientes');
            }

        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    };

    buscaClientes();

}, []);

    return (
        <div>
            <h3>Gerenciamento de Clientes</h3>

            <ClienteForm
                clienteEditando={clienteEditando}
                onSalvar={handleSalvar}
                onCancelar={handleCancelarEdicao}
            />

            <table>
                <thead>
                    <tr>
                        <th>Nome do cliente</th>
                        <th>CPF do cliente</th>
                        <th>Telefone do cliente</th>
                        <th>Email do cliente</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.cpf}</td>
                            <td>{cliente.telefone}</td>
                            <td>{cliente.email}</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => setClienteEditando(cliente)}
                                >
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
