
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
      <div class="separator">━━━━━━━━━━━━━━</div>
      <div class="input-group"><label>🚛 Frota:</label><input type="text" name="frota_${i}"></div>
      <div class="input-group"><label>📍 Local:</label><input type="text" name="local_${i}"></div>
      <div class="input-group"><label>🔧 Descrição:</label><input type="text" name="descricao_${i}"></div>
      <div class="input-group"><label>🗒️ Status:</label><input type="text" name="status_${i}"></div>
    `;
  }
}

function atualizarOcorrencias() {
  const container = document.getElementById("ocorrenciaCampos");
  container.innerHTML = "";
  const qtd = parseInt(document.getElementById("ocorrencias").value);
  for (let i = 1; i <= qtd; i++) {
    container.innerHTML += `
      <div class="separator">━━━━━━━━━━━━━━</div>
      <div class="input-group"><label>🚛⚠️ Frota:</label><input type="text" name="frotaOc_${i}"></div>
      <div class="input-group"><label>📍 Local:</label><input type="text" name="localOc_${i}"></div>
      <div class="input-group"><label>🔧 Descrição:</label><input type="text" name="descOc_${i}"></div>
      <div class="input-group"><label>🗒️ Status:</label><input type="text" name="statusOc_${i}"></div>
    `;
  }
}

function enviarWhatsapp() {
  const form = document.forms['operacaoForm'];
  const dataHora = document.getElementById('horaAtual').textContent;
  let mensagem = `📊 ${dataHora}\n━━━━━━━━━━━━━━\n`;
  mensagem += `📈 Projeção de Entrega: ${form.entrega.value}T\n`;
  mensagem += `➡️ Entrada de CVs (Usina): ${form.entrada.value}\n`;
  mensagem += `⬅️ Saída de CVs (Usina): ${form.saida.value}\n`;
  mensagem += `🌾 Colheita (Carregamento/Hora): ${form.colheita.value}\n`;
  mensagem += `📏 Raio Médio: ${form.raio.value}Km\n`;
  mensagem += `🔄 Rotação Média na Usina: \n${form.rotacao.value} Voltas\n`;
  mensagem += `🚛 Conjuntos Carregados: ${form.conjuntos.value}\n`;
  mensagem += `⚖️ Densidade Média: ${form.densidade.value}\n`;

  mensagem += `🛠️ Veículos em Manutenção: ${form.manutencao.value}\n`;
  for (let i = 1; i <= parseInt(form.manutencao.value); i++) {
    mensagem += `━━━━━━━━━━━━━━\n🚛 Frota: ${form['frota_' + i].value}\n📍 Local: ${form['local_' + i].value}\n🔧 Descrição: ${form['descricao_' + i].value}\n🗒️ Status: ${form['status_' + i].value}\n`;
  }

  mensagem += `🆘 Ocorrências em Andamento: ${form.ocorrencias.value}\n`;
  for (let i = 1; i <= parseInt(form.ocorrencias.value); i++) {
    mensagem += `━━━━━━━━━━━━━━\n🚛⚠️ Frota: ${form['frotaOc_' + i].value}\n📍 Local: ${form['localOc_' + i].value}\n🔧 Descrição: ${form['descOc_' + i].value}\n🗒️ Status: ${form['statusOc_' + i].value}\n`;
  }

  mensagem += `━━━━━━━━━━━━━━`;
  const link = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}

window.onload = () => {
  horaArredondada();
  atualizarManutencao();
  atualizarOcorrencias();
};
