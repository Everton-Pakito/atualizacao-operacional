function horaArredondada() {
  const agora = new Date();
  agora.setMinutes(0, 0, 0);
  const horaFormatada = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const dataFormatada = agora.toLocaleDateString('pt-BR');
  document.getElementById('horaAtual').textContent = `Atualização — ${dataFormatada} às ${horaFormatada}`;
}

// Função para converter fração em decimal
function converterFracaoParaDecimal(valor) {
  if (!valor) return 0;
  
  // Remove espaços extras
  valor = valor.toString().trim();
  
  // Se já é um número decimal simples, apenas substitui vírgula por ponto
  if (/^\d+[,.]?\d*$/.test(valor)) {
    return parseFloat(valor.replace(',', '.'));
  }
  
  // Padrão para número inteiro seguido de fração (ex: 6 1/4, 5 2/3)
  const fracaoComInteiro = valor.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (fracaoComInteiro) {
    const inteiro = parseInt(fracaoComInteiro[1]);
    const numerador = parseInt(fracaoComInteiro[2]);
    const denominador = parseInt(fracaoComInteiro[3]);
    return inteiro + (numerador / denominador);
  }
  
  // Padrão para apenas fração (ex: 1/4, 3/8)
  const apenasfracao = valor.match(/^(\d+)\/(\d+)$/);
  if (apenasfracao) {
    const numerador = parseInt(apenasfracao[1]);
    const denominador = parseInt(apenasfracao[2]);
    return numerador / denominador;
  }
  
  // Se não conseguiu converter, tenta parseFloat normal
  return parseFloat(valor.replace(',', '.')) || 0;
}

// Função para formatar valor monetário/tonelagem brasileiro
function formatarTonelagem(valor) {
  // Remove tudo que não é número
  let numeros = valor.replace(/\D/g, '');
  
  // Se está vazio, retorna vazio
  if (!numeros) return '';
  
  // Converte para número e divide por 100 para ter 2 casas decimais
  let numero = parseFloat(numeros) / 100;
  
  // Formata no padrão brasileiro
  return numero.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Função para aplicar máscara de tonelagem em tempo real
function aplicarMascaraTonelagem(input) {
  input.addEventListener('input', function(e) {
    let valor = e.target.value;
    let posicaoCursor = e.target.selectionStart;
    let valorAnterior = valor;
    
    // Aplica a formatação
    let valorFormatado = formatarTonelagem(valor);
    
    // Atualiza o valor do campo
    e.target.value = valorFormatado;
    
    // Ajusta a posição do cursor
    let diferencaTamanho = valorFormatado.length - valorAnterior.length;
    let novaPosicao = posicaoCursor + diferencaTamanho;
    
    // Garante que o cursor não saia dos limites
    if (novaPosicao < 0) novaPosicao = 0;
    if (novaPosicao > valorFormatado.length) novaPosicao = valorFormatado.length;
    
    // Define a nova posição do cursor
    setTimeout(() => {
      e.target.setSelectionRange(novaPosicao, novaPosicao);
    }, 0);
  });
  
  // Ao sair do campo, garante formatação correta
  input.addEventListener('blur', function(e) {
    if (e.target.value) {
      e.target.value = formatarTonelagem(e.target.value);
    }
  });
}

// Função para obter valor numérico da tonelagem formatada
function obterValorTonelagem(valorFormatado) {
  if (!valorFormatado) return '';
  
  // Remove pontos e substitui vírgula por ponto
  let numero = valorFormatado.replace(/\./g, '').replace(',', '.');
  let valor = parseFloat(numero);
  
  if (isNaN(valor)) return '';
  
  // Retorna formatado para exibição
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function calcularColheita() {
  const entradaValor = document.getElementById("entrada").value;
  const saidaValor = document.getElementById("saida").value;
  
  const entrada = converterFracaoParaDecimal(entradaValor);
  const saida = converterFracaoParaDecimal(saidaValor);
  
  const resultado = entrada && saida && saida !== 0 ? (entrada / saida) : 0;
  document.getElementById("colheita").value = formatarNumero(resultado);
}

// Função para normalizar entrada de números (aceita tanto vírgula quanto ponto)
function normalizarEntradaNumerica(input) {
  input.addEventListener('input', function() {
    // Para o campo de rotação, permite frações
    if (input.name === 'rotacao') {
      // Permite números, espaços, barras e vírgulas/pontos
      this.value = this.value.replace(/[^0-9\s\/,.]/g, '');
    } else {
      // Para outros campos numéricos, apenas números, vírgulas e pontos
      this.value = this.value.replace(/[^0-9,.]/g, '');
    }
  });
  
  // Ao sair do campo, valida e formata se necessário
  input.addEventListener('blur', function() {
    if (this.name === 'rotacao') {
      const valorDecimal = converterFracaoParaDecimal(this.value);
      if (valorDecimal > 0) {
        // Mantém o formato original se for fração, senão formata como decimal
        if (!/\//.test(this.value)) {
          this.value = formatarNumero(valorDecimal);
        }
      }
    } else if (this.value) {
      const valorDecimal = converterFracaoParaDecimal(this.value);
      this.value = formatarNumero(valorDecimal);
    }
  });
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
        <div class="input-group"><label>🚛 Frota:</label><input type="text" inputmode="numeric" pattern="[0-9]*" value="${item.frota}" onchange="manutencaoData[${i}].frota=this.value; salvarDadosLocais()" oninput="this.value=this.value.replace(/[^0-9]/g,'')"></div>
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
        <div class="input-group"><label>🚛⚠️ Frota:</label><input type="text" inputmode="numeric" pattern="[0-9]*" value="${item.frota}" onchange="ocorrenciaData[${i}].frota=this.value; salvarDadosLocais()" oninput="this.value=this.value.replace(/[^0-9]/g,'')"></div>
        <div class="input-group"><label>📍 Local:</label><input type="text" value="${item.local}" onchange="ocorrenciaData[${i}].local=this.value; salvarDadosLocais()"></div>
        <div class="input-group"><label>🔧 Descrição:</label><input type="text" value="${item.descricao}" onchange="ocorrenciaData[${i}].descricao=this.value; salvarDadosLocais()"></div>
        <div class="input-group"><label>🗒️ Status:</label><input type="text" value="${item.status}" onchange="ocorrenciaData[${i}].status=this.value; salvarDadosLocais()"></div>
        <button type="button" onclick="removerItem('ocorrencia', ${i})">❌ Remover</button>
      </div>
    `;
  });
}

// Função para formatar número para exibição (mantida para outros campos)
function formatarNumero(numero) {
  if (isNaN(numero) || numero === 0) return '';
  return numero.toFixed(2).replace('.', ',');
}

function obterValorFormatado(elemento) {
  const valor = elemento.value;
  
  if (elemento.name === 'rotacao') {
    // Para rotação, retorna o valor original se contém fração, senão formata
    if (/\//.test(valor)) {
      return valor;
    } else {
      const decimal = converterFracaoParaDecimal(valor);
      return decimal > 0 ? decimal.toString().replace('.', ',') : valor;
    }
  } else {
    // Para outros campos, converte e formata
    const decimal = converterFracaoParaDecimal(valor);
    return decimal > 0 ? decimal.toString().replace('.', ',') : valor;
  }
}

function enviarWhatsapp() {
  const form = document.forms['operacaoForm'];
  const dataHora = document.getElementById('horaAtual').textContent;
  let mensagem = `📊 ${dataHora}
━━━━━━━━━━━━━━

📈 Projeção de Entrega: *${obterValorFormatado(form.entrega)} Ton*

➡️ Entrada de CVs (Usina): *${obterValorFormatado(form.entrada)}*

⬅️ Saída de CVs (Usina): *${obterValorFormatado(form.saida)}*

🚛 Retorno Usina: *${obterValorFormatado(form.retorno)}*

🌾 Colheita (Carregamento/Hora): *${form.colheita.value}*

📍 Raio Médio: *${obterValorFormatado(form.raio)} Km*

🔄 Rotação Média na Usina: *${obterValorFormatado(form.rotacao)} Voltas*

🚛 Conjuntos Carregados: *${obterValorFormatado(form.conjuntos)}*

⚖️ Densidade Média: *${obterValorFormatado(form.densidade)}*

🛠️ Veículos em Manutenção: *${manutencaoData.length}*`;
  
  manutencaoData.forEach(item => {
    mensagem += `

🚛 Frota: *${item.frota}*
📍 Local: *${item.local}*
🔧 Descrição: *${item.descricao}*
🗒️ Status: *${item.status}*`;
  });
  
  mensagem += `

━━━━━━━━━━━━━━

🆘 Ocorrências em Andamento: *${ocorrenciaData.length}*`;
  
  ocorrenciaData.forEach(item => {
    mensagem += `

🚛⚠️ Frota: *${item.frota}*
📍 Local: *${item.local}*
🔧 Descrição: *${item.descricao}*
🗒️ Status: *${item.status}*`;
  });
  
  mensagem += `

━━━━━━━━━━━━━━`;
  const link = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}

window.onload = () => {
  horaArredondada();
  calcularColheita();
  renderizarManutencao();
  renderizarOcorrencias();
  
  // Aplicar normalização para todos os campos numéricos (incluindo retorno)
  const camposNumericos = document.querySelectorAll('input[name="entrada"], input[name="saida"], input[name="entrega"], input[name="retorno"], input[name="raio"], input[name="rotacao"], input[name="conjuntos"], input[name="densidade"]');
  camposNumericos.forEach(campo => {
    normalizarEntradaNumerica(campo);
  });
};

// ========================================
// FUNÇÕES PARA GERAR E COMPARTILHAR IMAGEM
// ========================================

function gerarImagem() {
  const form = document.forms['operacaoForm'];
  const dataHora = document.getElementById('horaAtual').textContent;
  
  // Cria canvas A4 (210mm x 297mm em 300 DPI = 2480 x 3508 pixels)
  const canvas = document.getElementById('canvasRelatorio');
  const ctx = canvas.getContext('2d');
  
  // Define dimensões A4 em alta resolução
  canvas.width = 2480;
  canvas.height = 3508;
  
  // Fundo branco
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Variáveis de layout
  let y = 100;
  const margin = 150;
  const contentWidth = canvas.width - (margin * 2);
  
  // ===== CABEÇALHO COM LOGO (Espaço reservado) =====
  ctx.fillStyle = '#2c3e50';
  ctx.fillRect(0, 0, canvas.width, 350);
  
  // Texto indicativo para logo (você vai adicionar depois)
  ctx.fillStyle = '#ffffff';
  ctx.font = 'italic 40px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('[ ESPAÇO PARA SUA LOGO ]', canvas.width / 2, 140);
  
  // Título
  ctx.font = 'bold 80px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('📊 ATUALIZAÇÃO OPERACIONAL', canvas.width / 2, 260);
  
  // Data/Hora
  ctx.font = '45px Arial';
  ctx.fillText(dataHora, canvas.width / 2, 320);
  
  y = 450;
  
  // ===== DADOS OPERACIONAIS =====
  ctx.fillStyle = '#2c3e50';
  ctx.font = 'bold 55px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('DADOS OPERACIONAIS', margin, y);
  
  y += 80;
  
  // Box de fundo para dados
  ctx.fillStyle = '#f8f9fa';
  ctx.fillRect(margin, y, contentWidth, 900);
  ctx.strokeStyle = '#3498db';
  ctx.lineWidth = 5;
  ctx.strokeRect(margin, y, contentWidth, 900);
  
  y += 70;
  ctx.fillStyle = '#2c3e50';
  ctx.font = '45px Arial';
  
  const dados = [
    { emoji: '📈', label: 'Projeção de Entrega:', valor: obterValorFormatado(form.entrega) + ' Ton' },
    { emoji: '➡️', label: 'Entrada de CVs (Usina):', valor: obterValorFormatado(form.entrada) },
    { emoji: '⬅️', label: 'Saída de CVs (Usina):', valor: obterValorFormatado(form.saida) },
    { emoji: '🚛', label: 'Retorno Usina:', valor: obterValorFormatado(form.retorno) },
    { emoji: '🌾', label: 'Colheita (Carregamento/Hora):', valor: form.colheita.value },
    { emoji: '📍', label: 'Raio Médio:', valor: obterValorFormatado(form.raio) + ' Km' },
    { emoji: '🔄', label: 'Rotação Média na Usina:', valor: obterValorFormatado(form.rotacao) + ' Voltas' },
    { emoji: '🚛', label: 'Conjuntos Carregados:', valor: obterValorFormatado(form.conjuntos) },
    { emoji: '⚖️', label: 'Densidade Média:', valor: obterValorFormatado(form.densidade) }
  ];
  
  dados.forEach((item, index) => {
    ctx.fillStyle = '#555';
    ctx.font = '42px Arial';
    ctx.fillText(`${item.emoji} ${item.label}`, margin + 40, y);
    
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(item.valor || '-', canvas.width - margin - 40, y);
    ctx.textAlign = 'left';
    
    y += 95;
  });
  
  y += 60;
  
  // ===== DUAS COLUNAS: MANUTENÇÃO E SOCORROS =====
  const colWidth = (contentWidth - 60) / 2;
  const col1X = margin;
  const col2X = margin + colWidth + 60;
  let y1 = y; // Y da coluna 1
  let y2 = y; // Y da coluna 2
  
  // COLUNA 1 - MANUTENÇÃO
  ctx.fillStyle = '#e67e22';
  ctx.font = 'bold 50px Arial';
  ctx.fillText('🛠️ VEÍCULOS EM MANUTENÇÃO', col1X, y1);
  y1 += 70;
  
  ctx.fillStyle = '#fff3e0';
  const heightManutencao = Math.max(500, manutencaoData.length * 280 + 100);
  ctx.fillRect(col1X, y1, colWidth, heightManutencao);
  ctx.strokeStyle = '#e67e22';
  ctx.lineWidth = 4;
  ctx.strokeRect(col1X, y1, colWidth, heightManutencao);
  
  y1 += 60;
  
  if (manutencaoData.length === 0) {
    ctx.fillStyle = '#999';
    ctx.font = 'italic 38px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Nenhuma manutenção', col1X + colWidth / 2, y1 + 100);
    ctx.textAlign = 'left';
  } else {
    manutencaoData.forEach((item, index) => {
      ctx.fillStyle = '#555';
      ctx.font = '36px Arial';
      ctx.fillText(`🚛 Frota: ${item.frota || '-'}`, col1X + 30, y1);
      y1 += 50;
      ctx.fillText(`📍 Local: ${item.local || '-'}`, col1X + 30, y1);
      y1 += 50;
      ctx.fillText(`🔧 Descrição: ${item.descricao || '-'}`, col1X + 30, y1);
      y1 += 50;
      ctx.fillText(`🗒️ Status: ${item.status || '-'}`, col1X + 30, y1);
      y1 += 80;
    });
  }
  
  // COLUNA 2 - SOCORROS
  ctx.fillStyle = '#e74c3c';
  ctx.font = 'bold 50px Arial';
  ctx.fillText('🆘 OCORRÊNCIAS', col2X, y2);
  y2 += 70;
  
  ctx.fillStyle = '#ffebee';
  const heightOcorrencia = Math.max(500, ocorrenciaData.length * 280 + 100);
  ctx.fillRect(col2X, y2, colWidth, heightOcorrencia);
  ctx.strokeStyle = '#e74c3c';
  ctx.lineWidth = 4;
  ctx.strokeRect(col2X, y2, colWidth, heightOcorrencia);
  
  y2 += 60;
  
  if (ocorrenciaData.length === 0) {
    ctx.fillStyle = '#999';
    ctx.font = 'italic 38px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Nenhuma ocorrência', col2X + colWidth / 2, y2 + 100);
    ctx.textAlign = 'left';
  } else {
    ocorrenciaData.forEach((item, index) => {
      ctx.fillStyle = '#555';
      ctx.font = '36px Arial';
      ctx.fillText(`🚛 Frota: ${item.frota || '-'}`, col2X + 30, y2);
      y2 += 50;
      ctx.fillText(`📍 Local: ${item.local || '-'}`, col2X + 30, y2);
      y2 += 50;
      ctx.fillText(`🔧 Descrição: ${item.descricao || '-'}`, col2X + 30, y2);
      y2 += 50;
      ctx.fillText(`🗒️ Status: ${item.status || '-'}`, col2X + 30, y2);
      y2 += 80;
    });
  }
  
  // Ajusta altura do canvas baseado no conteúdo
  const finalHeight = Math.max(y1, y2) + 300;
  if (finalHeight > canvas.height) {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(canvas, 0, 0);
    
    canvas.height = finalHeight;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);
  }
  
  // ===== RODAPÉ =====
  const footerY = canvas.height - 150;
  ctx.fillStyle = '#2c3e50';
  ctx.fillRect(0, footerY, canvas.width, 150);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '40px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Desenvolvido por Everton Tezzon Ferreira', canvas.width / 2, footerY + 70);
  ctx.font = '32px Arial';
  ctx.fillText(new Date().toLocaleString('pt-BR'), canvas.width / 2, footerY + 115);
  
  // Exibe o modal com a imagem
  document.getElementById('modalImagem').style.display = 'block';
}

function fecharModal() {
  document.getElementById('modalImagem').style.display = 'none';
}

function baixarImagem() {
  const canvas = document.getElementById('canvasRelatorio');
  const link = document.createElement('a');
  const dataHora = new Date().toLocaleString('pt-BR').replace(/[/:]/g, '-').replace(/,/g, '');
  link.download = `relatorio-operacional-${dataHora}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

async function compartilharImagem() {
  const canvas = document.getElementById('canvasRelatorio');
  
  try {
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    const file = new File([blob], 'relatorio-operacional.png', { type: 'image/png' });
    
    if (navigator.share && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: 'Relatório Operacional',
        text: 'Atualização Operacional'
      });
    } else {
      alert('💡 Compartilhamento não suportado.\nUse o botão "Baixar PNG" e envie manualmente.');
    }
  } catch (error) {
    console.error('Erro ao compartilhar:', error);
    alert('Erro ao compartilhar. Use o botão "Baixar PNG".');
  }
}