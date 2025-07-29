function horaArredondada() {
  const agora = new Date();
  agora.setMinutes(0, 0, 0);
  const horaFormatada = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const dataFormatada = agora.toLocaleDateString('pt-BR');
  document.getElementById('horaAtual').textContent = `Atualização – ${dataFormatada} às ${horaFormatada}`;
}

function calcularColheita() {
  const entrada = parseFloat(document.getElementById("entrada").value);
  const saida = parseFloat(document.getElementById("saida").value);
  const resultado = entrada && saida && saida !== 0 ? (entrada / saida).toFixed(2) : '';
  document.getElementById("colheita").value = resultado;
}

let manutencaoData = JSON.parse(localStorage.getItem('manutencaoData') || "[]");
let ocorrenciaData = JSON.parse(localStorage.getItem('ocorrenciaData') || "[]");

function salvarDadosLocais() {
  localStorage.setItem("manutencaoData", JSON.stringify(manutencaoData));
  localStorage.setItem("ocorrenciaData", JSON.stringify(ocorrenciaData));
}

function removerItem(tipo, index) {
  if (tipo === 'manutencao') {
    manutencaoData.splice(index, 1);
    renderizarManutencao();
  } else {
    ocorrenciaData.splice(index, 1);
    renderizarOcorrencias();
  }
  salvarDadosLocais();
}

function adicionarItem(tipo) {
  const novo = { frota: '', local: '', descricao: '', status: '' };
  if (tipo === 'manutencao') {
    manutencaoData.push(novo);
    renderizarManutencao();
  } else {
    ocorrenciaData.push(novo);
    renderizarOcorrencias();
  }
  salvarDadosLocais();
}

function renderizarManutencao() {
  const container = document.getElementById("manutencaoCampos");
  container.innerHTML = "";
  manutencaoData.forEach((item, i) => {
    container.innerHTML += `
      <div class="card">
        <div class="input-group"><label>🚛 Frota:</label><input type="number" value="${item.frota}" onchange="manutencaoData[${i}].frota=this.value; salvarDadosLocais()"></div>
        <div class="input-group"><label>📍 Local:</label><input type="text" value="${item.local}" onchange="manutencaoData[${i}].local=this.value; salvarDadosLocais()"></div>
        <div class="input-group"><label>🔧 Descrição:</label><input type="text" value="${item.descricao}" onchange="manutencaoData[${i}].descricao=this.value; salvarDadosLocais()"></div>
        <div class="input-group"><label>🗒️ Status:</label><input type="text" value="${item.status}" onchange="manutencaoData[${i}].status=this.value; salvarDadosLocais()"></div>
        <button type="button" onclick="removerItem('manutencao', ${i})">❌ Remover</button>
      </div>
    `;
  });
}

function renderizarOcorrencias() {
  const container = document.getElementById("ocorrenciaCampos");
  container.innerHTML = "";
  ocorrenciaData.forEach((item, i) => {
    container.innerHTML += `
      <div class="card">
        <div class="input-group"><label>🚛⚠️ Frota:</label><input type="number" value="${item.frota}" onchange="ocorrenciaData[${i}].frota=this.value; salvarDadosLocais()"></div>
        <div class="input-group"><label>📍 Local:</label><input type="text" value="${item.local}" onchange="ocorrenciaData[${i}].local=this.value; salvarDadosLocais()"></div>
        <div class="input-group"><label>🔧 Descrição:</label><input type="text" value="${item.descricao}" onchange="ocorrenciaData[${i}].descricao=this.value; salvarDadosLocais()"></div>
        <div class="input-group"><label>🗒️ Status:</label><input type="text" value="${item.status}" onchange="ocorrenciaData[${i}].status=this.value; salvarDadosLocais()"></div>
        <button type="button" onclick="removerItem('ocorrencia', ${i})">❌ Remover</button>
      </div>
    `;
  });
}

function enviarWhatsapp() {
  const form = document.forms['operacaoForm'];
  const dataHora = document.getElementById('horaAtual').textContent;
  let mensagem = `📊 ${dataHora}\\n━━━━━━━━━━━━━━\\n`;
  mensagem += `📈 Projeção de Entrega: ${form.entrega.value} Ton\\n`;
  mensagem += `➡️ Entrada de CVs (Usina): ${form.entrada.value}\\n`;
  mensagem += `⬅️ Saída de CVs (Usina): ${form.saida.value}\\n`;
  mensagem += `🌾 Colheita (Carregamento/Hora): ${form.colheita.value}\\n`;
  mensagem += `📏 Raio Médio: ${form.raio.value} Km\\n`;
  mensagem += `🔄 Rotação Média na Usina: ${form.rotacao.value} Voltas\\n`;
  mensagem += `🚛 Conjuntos Carregados: ${form.conjuntos.value}\\n`;
  mensagem += `⚖️ Densidade Média: ${form.densidade.value}\\n`;
  mensagem += `🛠️ Veículos em Manutenção: ${manutencaoData.length}\\n`;
  manutencaoData.forEach(item => {
    mensagem += `🚛 Frota: ${item.frota}\\n📍 Local: ${item.local}\\n🔧 Descrição: ${item.descricao}\\n🗒️ Status: ${item.status}\\n`;
  });
  mensagem += `━━━━━━━━━━━━━━\\n🆘 Ocorrências em Andamento: ${ocorrenciaData.length}\\n`;
  ocorrenciaData.forEach(item => {
    mensagem += `🚛⚠️ Frota: ${item.frota}\\n📍 Local: ${item.local}\\n🔧 Descrição: ${item.descricao}\\n🗒️ Status: ${item.status}\\n`;
  });
  mensagem += `━━━━━━━━━━━━━━`;
  const link = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}

window.onload = () => {
  horaArredondada();
  calcularColheita();
  renderizarManutencao();
  renderizarOcorrencias();
};
