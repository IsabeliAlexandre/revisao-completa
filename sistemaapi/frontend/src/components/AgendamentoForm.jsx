import { useEffect, useState } from "react";

export default function AgendamentoForm({ onSalvar, veiculos }) {
    const [formData, setFormData] = useState({
        veiculoId: '',
        dataAgendamento: '',
        descricaoServico: '',
        status: '',
        status: 'Agendado'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSalvar(formData);
        setFormData({
            veiculoId: '',
            dataAgendamento: '',
            descricaoServico: '',
            status: '',
            status: 'Agendado'
        });
    }


    return (
        <div>
            <h5>
                Cadastrar Agendamento
            </h5>

            <form>
                <label>Veículo:</label>
                <select name="veiculoId" value={formData.veiculoId} onChange={handleChange} required>

                    <option value="">Selecione o Veiculo</option>

                    {
                        veiculos.map(
                            veiculo => (
                                <option key={veiculo.id} value={veiculo.id}>{veiculo.modelo} - {veiculo.placa} </option>
                            )
                        )
                    }

                </select>
                <label>Data e horário:</label>
                <input type="datetime-local" name="dataAgendamento" value={formData.dataAgendamento} onChange={handleChange} required />

                <label>Descrição do Serviço</label>
                <textarea rows="2" name="descricaoServico" value={formData.descricaoServico} onChange={handleChange} required> </textarea>

                <button onClick={handleSubmit}>
                    Confirmar Agendamento
                </button>
            </form>
        </div>
    )
}