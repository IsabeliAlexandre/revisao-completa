import { useEffect, useState } from "react";

export default function VeiculoForm({
    clientes = [],
    veiculoEditando,
    onSalvar,
    onCancelar
}) {
    const [formData, setFormData] = useState({
        placa: "",
        modelo: "",
        marca: "",
        ano: "",
        cliente_id: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.cliente_id) {
            alert("Por favor, selecione um cliente proprietário.");
            return;
        }

        onSalvar(formData);

        setFormData({
            placa: "",
            modelo: "",
            marca: "",
            ano: "",
            cliente_id: ""
        });
    };

    const handleCancelar = () => {
        setFormData({
            placa: "",
            modelo: "",
            marca: "",
            ano: "",
            cliente_id: ""
        });

        if (onCancelar) onCancelar();
    };

    useEffect(() => {
        if (veiculoEditando) {
            setFormData({
                placa: veiculoEditando.placa || "",
                modelo: veiculoEditando.modelo || "",
                marca: veiculoEditando.marca || "",
                ano: veiculoEditando.ano || "",
                cliente_id: veiculoEditando.cliente_id || veiculoEditando.clienteId || ""
            });
        } else {
            setFormData({
                placa: "",
                modelo: "",
                marca: "",
                ano: "",
                cliente_id: ""
            });
        }
    }, [veiculoEditando]);

    return (
        <div>
            <h5>
                {veiculoEditando
                    ? `Editando Veículo: ${veiculoEditando.placa}`
                    : "Cadastrar Novo Veículo"}
            </h5>

            <form onSubmit={handleSubmit}>
                <label>Placa Veículo:</label>
                <input
                    type="text"
                    name="placa"
                    value={formData.placa}
                    onChange={handleChange}
                    required
                />

                <label>Modelo:</label>
                <input
                    type="text"
                    name="modelo"
                    value={formData.modelo}
                    onChange={handleChange}
                    required
                />

                <label>Marca:</label>
                <input
                    type="text"
                    name="marca"
                    value={formData.marca}
                    onChange={handleChange}
                    required
                />

                <label>Ano:</label>
                <input
                    type="number"
                    name="ano"
                    value={formData.ano}
                    onChange={handleChange}
                    required
                />

                <label>Proprietário do veículo:</label>
                <select
                    name="cliente_id"
                    value={formData.cliente_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione um cliente...</option>
                    {Array.isArray(clientes) && clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.nome}
                        </option>
                    ))}
                </select>

                {veiculoEditando && (
                    <button
                        type="button"
                        onClick={handleCancelar}
                    >
                        Cancelar
                    </button>
                )}

                <button type="submit">
                    Salvar Veículo
                </button>
            </form>
        </div>
    );
}