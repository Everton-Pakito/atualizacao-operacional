function horaArredondada() {
  const agora = new Date();
  agora.setMinutes(0, 0, 0);
  const horaFormatada = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const dataFormatada = agora.toLocaleDateString('pt-BR');
  document.getElementById('horaAtual').textContent = `Atualização – ${dataFormatada} às ${horaFormatada}`;
}

function atualizarManutencao() {
  const container = document.getElementById("manutencaoCampos");
  container.innerHTML = "";
  const qtd = parseInt(document.getElementById("manutencao").value);
  for (let i = 1; i <= qtd; i++) {
    container.innerHTML += `
      <div class="input-group">
        <label>🚛 Frota ${i}:</label>
        <input type="text" name="frota_${i}">
      </div>
      <div class="input-group">
        <label>📍 Local ${i}:</label>
        <input type="text" name="local_${i}">
      </div>
      <div class="input-group">
        <label>🗒️ Descrição ${i}:</label>
        <input type="text" name="descricao_${i}">
      </div>
    `;
  }
}

function enviarWhatsapp() {
  const form = document.forms['operacaoForm'];
  const dataHora = document.getElementById('horaAtual').textContent;
  let mensagem = `📊 ${dataHora}
━━━━━━━━━━━━━━
`;
  mensagem += `📈 Projeção de Entrega: ${form.entrega.value}T
`;
  mensagem += `➡️ Entrada de CVs (Usina): ${form.entrada.value}
`;
  mensagem += `⬅️ Saída de CVs (Usina): ${form.saida.value}
`;
  mensagem += `🌾 Colheita (Carregamento/Hora): ${form.colheita.value}
`;
  mensagem += `📏 Raio Médio: ${form.raio.value}Km
`;
  mensagem += `🔄 Rotação Média na Usina:
${form.rotacao.value} Voltas
`;
  mensagem += `🚛 Conjuntos Carregados: ${form.conjuntos.value}
`;
  mensagem += `⚖️ Densidade Média: ${form.densidade.value}
`;
  mensagem += `🛠️ Veículos em Manutenção: ${form.manutencao.value}
━━━━━━━━━━━━━━
`;

  const qtd = parseInt(form.manutencao.value);
  if (qtd > 0) {
    for (let i = 1; i <= qtd; i++) {
      const frota = form[`frota_${i}`].value;
      const local = form[`local_${i}`].value;
      const descricao = form[`descricao_${i}`].value;
      mensagem += `🚛 Frota: ${frota}
📍 Local: ${local}
🗒️ Descrição: ${descricao}
`;
    }
  }
  mensagem += `
🆘 Ocorrências em Andamento: 0`;
  const link = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}

window.onload = () => {
  horaArredondada();
  atualizarManutencao();
};