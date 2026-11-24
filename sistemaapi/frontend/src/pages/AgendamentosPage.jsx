import { use, useEffect, useState } from "react";
import AgendamentoForm from "../components/AgendamentoForm.jsx";
import AlterarDataForm from "../components/AlterarDataForm.jsx";

// const veiculosMockados = [
//   {
//     id: 1,
//     placa: "ABC-1234",
//     modelo: "Palio",
//     marca: "Fiat",
//     ano: 2008,
//   },
//   {
//     id: 2,
//     placa: "XYZ-1234",
//     modelo: "Jetta",
//     marca: "Volkswagen",
//     ano: 2008,
//   },
// ];

// const agendamentosMockados = [
//   {
//     id: 1,
//     veiculoId: 1,
//     dataAgendamento: "2026-10-31T09:00:00",
//     descricaoServico: "Troca de óleo",
//     status: "Agendado",
//   },
//   {
//     id: 2,
//     veiculoId: 2,
//     dataAgendamento: "2026-10-31T14:30:00",
//     descricaoServico: "Trocar o motor, o último explodiu",
//     status: "Agendado",
//   },
// ];

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [veiculos] = useState([]);

  const handleSalvar = async (dadosAgendamento) => {

    try {
      const resposta = await fetch('http://localhost:3000/api/agendamentos',{
        method: 'POST', 
        headers:{
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(dadosAgendamento)
      })
       const novoAgendamento = {
      ...dadosAgendamento,
      id: crypto.randomUUID,
    };


    setAgendamentos((agendamentosAtuais) => [
      ...agendamentosAtuais,
      novoAgendamento,
    ]);

    } catch (error) {
      console.error('Erro no agendamento', error);
    }
  };
  
  const [ordenacao, setOrdenacao] = useState("dia");

  useEffect(() => {
    const agendamentosOrdenados = [...agendamentos];

    if (ordenacao == "dia") {
      agendamentosOrdenados.sort(
        (a, b) => new Date(a.dataAgendamento) - new Date(b.dataAgendamento),
      );
    }

    if (ordenacao == "mes") {
      agendamentosOrdenados.sort(
        (a, b) =>
          new Date(a.dataAgendamento).getMonth() -
          new Date(b.dataAgendamento).getMonth(),
      );
    }

    if (ordenacao == "ano") {
      agendamentosOrdenados.sort(
        (a, b) =>
          new Date(a.dataAgendamento).getFullYear() -
          new Date(b.dataAgendamento).getFullYear(),
      );
    }
    setAgendamentos(agendamentosOrdenados);
  }, [ordenacao]);

  const [agendamentoForm, setAgendamentoForm] = useState(null);

  const handleSalvarNovaData = async (novaData)=>{
    setAgendamentos(agendamentos.map(
        agendamento => {
            if(agendamento.id == agendamentoForm.id){
                return {...agendamento, dataAgendamento: novaData}
            }

            return agendamento;
        }
    ))

    setAgendamentoForm(null);
  } 
  
  return (
    <div>
      <h3>Gerenciamento de Agendamentos</h3>

      <AgendamentoForm veiculos={veiculos} onSalvar={handleSalvar} />
      <span>Critério de Ordenação</span>
      <button onClick={() => setOrdenacao("dia")}>Por dia</button>
      <button onClick={() => setOrdenacao("mes")}>Por mês</button>
      <button onClick={() => setOrdenacao("ano")}>Por ano</button>

      <table>
        <thead>
          <tr>
            <th>Data e Horário</th>
            <th>Serviço</th>
            <th>Veículo</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {agendamentos.map((agendamento) => {
            const veiculo = veiculos.find(
              (veiculo) => veiculo.id === agendamento.veiculoId,
            );

            const data = new Date(agendamento.dataAgendamento);

            return (
              <tr key={agendamento.id}>
                <td>
                  {data.toLocaleDateString("pt-BR")}{" "}
                  {data.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>

                <td>{agendamento.descricaoServico}</td>

                <td>
                  {veiculo
                    ? `${veiculo.modelo} - ${veiculo.placa}`
                    : "Veículo não encontrado"}
                </td>

                <td>{agendamento.status}</td>

                <td>
                    <button onClick={()=> setAgendamentoForm(agendamento)}>Alteral data</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <AlterarDataForm
        isOpen={!!agendamentoForm}
        agendamento={agendamentoForm}
        onFechar={() => setAgendamentoForm(null)}
        onSalvar={handleSalvarNovaData}
      />
    </div>
  );
}
