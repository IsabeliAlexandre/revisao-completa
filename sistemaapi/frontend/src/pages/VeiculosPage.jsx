import { useEffect, useState } from "react";
import VeiculoForm from "../components/VeiculoForm";

export default function VeiculosPage() {
    const [clientes, setClientes] = useState([]);
    const [veiculos, setVeiculos] = useState([]);

    const buscarDados = () => {
        // Busca a lista de veículos
        fetch("http://localhost:3000/api/veiculos")
            .then((res) => res.json())
            .then((data) => {
                const listaVeiculos = Array.isArray(data) 
                    ? data 
                    : (data.veiculos || data.rows || data.data || []);
                setVeiculos(listaVeiculos);
            })
            .catch((err) => console.error("Erro ao buscar veículos:", err));

        // Busca a lista de clientes
        fetch("http://localhost:3000/api/clientes")
            .then((res) => res.json())
            .then((data) => {
                console.log("Resposta bruta da API /clientes:", data);

                // Trata o formato do retorno (Array direto ou encapsulado em objeto)
                let listaBruta = [];
                if (Array.isArray(data)) {
                    listaBruta = data;
                } else if (data && typeof data === 'object') {
                    listaBruta = data.clientes || data.rows || data.data || data.result || [];
                }

                // Normaliza as propriedades de ID e Nome dos clientes
                const clientesTratados = listaBruta.map((c) => ({
                    ...c,
                    id: c.id || c.cliente_id || c.id_cliente,
                    nome: c.nome || c.nome_cliente || c.nomeCliente || c.razao_social || "Sem Nome"
                }));

                setClientes(clientesTratados);
            })
            .catch((err) => console.error("Erro ao buscar clientes:", err));
    };

    useEffect(() => {
        buscarDados();
    }, []);

    const handleSalvar = (dadosVeiculos) => {
        const dadosParaEnviar = {
            ...dadosVeiculos,
            cliente_id: dadosVeiculos.cliente_id || dadosVeiculos.clienteId
        };

        fetch("http://localhost:3000/api/veiculos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosParaEnviar),
        })
            .then((res) => res.json())
            .then(() => {
                buscarDados();
            })
            .catch((err) => console.error("Erro ao salvar veículo:", err));
    };

    return (
        <div>
            <h3>Gerenciamento de Veículos</h3>

            <VeiculoForm
                clientes={clientes}
                onSalvar={handleSalvar}
            />

            <table>
                <thead>
                    <tr>
                        <th>Placa</th>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>Ano</th>
                        <th>Cliente Proprietário</th>
                    </tr>
                </thead>

                <tbody>
                    {Array.isArray(veiculos) && veiculos.map((veiculo, index) => {
                        const clienteProprietario = clientes.find(
                            (cliente) => cliente.id == (veiculo.cliente_id || veiculo.clienteId)
                        );

                        return (
                            <tr key={veiculo.id || veiculo.placa || index}>
                                <td>{veiculo.placa}</td>
                                <td>{veiculo.modelo}</td>
                                <td>{veiculo.marca}</td>
                                <td>{veiculo.ano}</td>
                                <td>
                                    {clienteProprietario
                                        ? clienteProprietario.nome
                                        : "Cliente não encontrado"}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}