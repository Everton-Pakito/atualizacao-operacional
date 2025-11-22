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

// Função para aplicar máscara de tonelagem em tempo real ao campo de Projeção de Entrega
function aplicarMascaraEntrega(input) {
  input.addEventListener('input', function(e) {
    let valor = e.target.value;
    let posicaoCursor = e.target.selectionStart;
    
    // Salva quantos separadores existiam antes do cursor
    let separadoresAntes = (valor.substring(0, posicaoCursor).match(/[.,]/g) || []).length;
    
    // Aplica a formatação
    let valorFormatado = formatarTonelagem(valor);
    
    // Atualiza o valor do campo
    e.target.value = valorFormatado;
    
    // Conta quantos separadores existem agora antes do cursor
    let separadoresDepois = (valorFormatado.substring(0, posicaoCursor).match(/[.,]/g) || []).length;
    
    // Ajusta a posição do cursor baseado na diferença de separadores
    let novaPosicao = posicaoCursor + (separadoresDepois - separadoresAntes);
    
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
    // Para campos numéricos, apenas números, vírgulas e pontos
    this.value = this.value.replace(/[^0-9,.]/g, '');
  });
  
  // Ao sair do campo, valida e formata se necessário
  input.addEventListener('blur', function() {
    if (this.value) {
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

// Função para obter o valor da rotação formatado (inteiro + fração)
function obterRotacaoFormatada() {
  const inteiro = document.getElementById('rotacaoInteiro').value;
  const fracao = document.getElementById('rotacaoFracao').value;
  
  if (!inteiro) return '';
  
  if (fracao) {
    return `${inteiro} ${fracao}`;
  }
  
  return inteiro;
}

function obterValorFormatado(elemento) {
  const valor = elemento.value;
  
  // Para o campo de entrega, apenas retorna o valor já formatado
  if (elemento.name === 'entrega') {
    return valor;
  }
  
  // Para outros campos, converte e formata
  const decimal = converterFracaoParaDecimal(valor);
  return decimal > 0 ? decimal.toString().replace('.', ',') : valor;
}

function enviarWhatsapp() {
  const form = document.forms['operacaoForm'];
  const dataHora = document.getElementById('horaAtual').textContent;
  const rotacao = obterRotacaoFormatada();
  
  let mensagem = `📊 ${dataHora}
━━━━━━━━━━━━━━

📈 Projeção de Entrega: *${form.entrega.value} Ton*

➡️ Entrada de CVs (Usina): *${obterValorFormatado(form.entrada)}*

⬅️ Saída de CVs (Usina): *${obterValorFormatado(form.saida)}*

🚛 Retorno de CVs Usina: *${obterValorFormatado(form.retorno)}*

🌾 Colheita (Carregamento/Hora): *${form.colheita.value}*

📍 Raio Médio: *${obterValorFormatado(form.raio)} Km*

🔄 Rotação Média na Usina: *${rotacao} Voltas*

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
  
  // Aplica máscara de formatação automática ao campo de Projeção de Entrega
  const campoEntrega = document.getElementById('entrega');
  if (campoEntrega) {
    aplicarMascaraEntrega(campoEntrega);
  }
  
  // Aplicar normalização para os outros campos numéricos (exceto entrega e rotação)
  const camposNumericos = document.querySelectorAll('input[name="entrada"], input[name="saida"], input[name="retorno"], input[name="raio"], input[name="conjuntos"], input[name="densidade"]');
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
  const rotacao = obterRotacaoFormatada();
  
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
  
  // ===== CABEÇALHO COM LOGO =====
  ctx.fillStyle = '#2c3e50';
  ctx.fillRect(0, 0, canvas.width, 350);
  
  // Carrega e desenha a logo
  const logo = new Image();
  logo.crossOrigin = 'anonymous';
  logo.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAADICAYAAADKyTgzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSogMABBAAQAAlBAQgFCAAiABBAAUAAQABAAEAASAIAAIDwUABAAEAAEAAgAkACAABAAAQABAAgABACAAJwBAAAAAABAACAAFABAACwAQAAIAEgAIAAAABAADABAACgANABQAHAAeAB4ABAAIAAwAEAAeABIAHAARABQAFAAUABAAHwAUAAwACAAAAAAACACBAAAAAAABAAEAAAABAAEAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAEAAEAAMAAAAAAACAAIAAgAIAAcABAAEAAcACAAYAAgAEAAIAAwADAAUABQAFAAYABgAGgAcABwAHAAcACgAJAAoACgAKAAqACgAKgAsACgALgAuAC4ALgAuAC4ALgAuADAALgAwADAAMAAwADAAMAAwADAAOAA4ADgAOAA4ADgAOAA4ADgAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAARABEAEQARABEAEQARABEAEQARABEAEQARABIAEgASABIAEgASABIAEgASABIAEgASABIAEgASABIAEwATABMAEwATABMAEwATABMAEwATABMAEwATABMAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFQAVABUAFQAVABUAFQAVABUAFQAVABUAFQAVABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABkAGQAZABkAGQAZABkAGQAZABkAGQAZABkAGQAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAiACIAIgAiACIAIgAiACIAIgAiACIAIgAiACMAIwAjACMAIwAjACMAIwAjACMAIwAjACMAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAmACYAJgAmACYAJgAmACYAJgAmACYAJgAmACcAJwAnACcAJwAnACcAJwAnACcAJwAnACcAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACkAKQApACkAKQApACkAKQApACkAKQApACkAKQAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsAKwArACsAKwArACsAKwArACsALAAsACwALAAsACwALAAsACwALAAsACwALAAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC4ALgAuAC4ALgAuAC4ALgAuAC4ALgAuAC8ALwAvAC8ALwAvAC8ALwAvAC8ALwAvAC8AMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADEAMQAxADEAMQAxADEAMQAxADEAMQAxADEAMgAyADIAMgAyADIAMgAyADIAMgAyADIAMgAzADMAMwAzADMAMwAzADMAMwAzADMAMwAzADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANQA1ADUANQA1ADUANQA1ADUANQA1ADUANQA1ADYANQA2ADYANQA2ADYANQA2ADYANQA2ADYANQA3ADcANwA3ADcANwA3ADcANwA3ADcANwA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA5ADkAOQA5ADkAOQA5ADkAOQA5ADkAOQA6ADoAOgA6ADoAOgA6ADoAOgA6ADoAOgA7ADsAOwA7ADsAOwA7ADsAOwA7ADsAOwA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA9AD0APQA9AD0APQA9AD0APQA9AD0APQA+AD4APgA+AD4APgA+AD4APgA+AD4APgA/AD8APwA/AD8APwA/AD8APwA/AD8APwBAAEAAQABAAEAAQABAAEAAQABAAEAAQABBAEEAQQBBAEEAQQBBAEEAQQBBAEEAQQBCAEIAQgBCAEIAQgBCAEIAQgBCAEIAQgBDAEMAQwBDAEMAQwBDAEMAQwBDAEMAQwBEAEQARABEAEQARABEAEQARABEAEQARABFAEUARQBFAEUARQBFAEUARQBFAEUARQBGAEYARgBGAEYARgBGAEYARgBGAEYARgBHAEcARwBHAEcARwBHAEcARwBHAEcARwBIAEgASABIAEgASABIAEgASABIAEgASABJAEkASQBJAEkASQBJAEkASQBJAEkASQBKAEoASgBKAEoASgBKAEoASgBKAEoASgBLAEsASwBLAEsASwBLAEsASwBLAEsASwBMAEwATABMAEwATABMAEwATABMAEwATABNAE0ATQBNAE0ATQBNAE0ATQBNAE0ATQBOAEUATgBOAE4ATgBOAE4ATgBOAE4ATgBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBSAFIAUgBSAFIAUgBSAFIAUgBSAFIAUgBTAFMAUwBTAFMAUwBTAFMAUwBTAFMAUwBUAFQAVABUAFQAVABUAFQAVABUAFQAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBbAFsAWwBbAFsAWwBbAFsAWwBbAFsAWwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABdAF0AXQBdAF0AXQBdAF0AXQBdAF0AXQBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgBfAF8AXwBfAF8AXwBfAF8AXwBfAF8AXwBgAGAAYABgAGAAYABgAGAAYABgAGAAYABhAGEAYQBhAGEAYQBhAGEAYQBhAGEAYQBiAGIAYgBiAGIAYgBiAGIAYgBiAGIAYgBjAGMAYwBjAGMAYwBjAGMAYwBjAGMAYwBkAGQAZABkAGQAZABkAGQAZABkAGQAZABlAGUAZQBlAGUAZQBlAGUAZQBlAGUAZQBmAGYAZgBmAGYAZgBmAGYAZgBmAGYAZgBnAGcAZwBnAGcAZwBnAGcAZwBnAGcAZwBoAGgAaABoAGgAaABoAGgAaABoAGgAaABpAGkAaQBpAGkAaQBpAGkAaQBpAGkAaQBqAGoAagBqAGoAagBqAGoAagBqAGoAagBrAGsAawBrAGsAawBrAGsAawBrAGsAawBsAGwAbABsAGwAbABsAGwAbABsAGwAbABtAG0AbQBtAG0AbQBtAG0AbQBtAG0AbQBuAG4AbgBuAG4AbgBuAG4AbgBuAG4AbgBvAG8AbwBvAG8AbwBvAG8AbwBvAG8AbwBwAHAAcABwAHAAcABwAHAAcABwAHAAcABxAHEAcQBxAHEAcQBxAHEAcQBxAHEAcQByAHIAcgByAHIAcgByAHIAcgByAHIAcgBzAHMAcwBzAHMAcwBzAHMAcwBzAHMAcwB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB3AHcAdwB3AHcAdwB3AHcAdwB3AHcAdwB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB5AHkAeQB5AHkAeQB5AHkAeQB5AHkAeQB6AHoAegB6AHoAegB6AHoAegB6AHoAegB7AHsAewB7AHsAewB7AHsAewB7AHsAewB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB9AH0AfQB9AH0AfQB9AH0AfQB9AH0AfQB+AH4AfgB+AH4AfgB+AH4AfgB+AH4AfgB/AH8AfwB/AH8AfwB/AH8AfwB/AH8AfwCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIEAgQCBAIEAgQCBAIEAgQCBAIEAgQCBAIIAggCCAIIAggCCAIIAggCCAIIAggCCAIMAgwCDAIMAgwCDAIMAgwCDAIMAgwCDAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIUAhQCFAIUAhQCFAIUAhQCFAIUAhQCFAIYAhgCGAIYAhgCGAIYAhgCGAIYAhgCGAIcAhwCHAIcAhwCHAIcAhwCHAIcAhwCHAIgAiACIAIgAiACIAIgAiACIAIgAiACIAIkAiQCJAIkAiQCJAIkAiQCJAIkAiQCJAIoAigCKAIoAigCKAIoAigCKAIoAigCKAIsAiwCLAIsAiwCLAIsAiwCLAIsAiwCLAIwAjACMAIwAjACMAIwAjACMAIwAjACMAI0AjQCNAI0AjQCNAI0AjQCNAI0AjQCNAI4AjgCOAI4AjgCOAI4AjgCOAI4AjgCOAI8AjwCPAI8AjwCPAI8AjwCPAI8AjwCPAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJEAkQCRAJEAkQCRAJEAkQCRAJEAkQCRAJIAkgCSAJIAkgCSAJIAkgCSAJIAkgCSAJIAkwCTAJMAkwCTAJMAkwCTAJMAkwCTAJMAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlQCVAJUAlQCVAJUAlQCVAJUAlQCVAJUAlgCWAJYAlgCWAJYAlgCWAJYAlgCWAJYAlwCXAJcAlwCXAJcAlwCXAJcAlwCXAJcAmACYAJgAmACYAJgAmACYAJgAmACYAJgAmQCZAJkAmQCZAJkAmQCZAJkAmQCZAJkAmgCaAJoAmgCaAJoAmgCaAJoAmgCaAJoAmwCbAJsAmwCbAJsAmwCbAJsAmwCbAJsAnACcAJwAnACcAJwAnACcAJwAnACcAJwAnQCdAJ0AnQCdAJ0AnQCdAJ0AnQCdAJ0AngCeAJ4AngCeAJ4AngCeAJ4AngCeAJ4AnwCfAJ8AnwCfAJ8AnwCfAJ8AnwCfAJ8AoAC';
  
  logo.onload = function() {
    // Desenha a logo no cabeçalho (centralizada)
    const logoWidth = 800;
    const logoHeight = 180;
    const logoX = (canvas.width - logoWidth) / 2;
    const logoY = 60;
    ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
    
    // Título abaixo da logo
    ctx.font = 'bold 75px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('ATUALIZAÇÃO OPERACIONAL', canvas.width / 2, 290);
    
    // Data/Hora com destaque
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(canvas.width / 2 - 400, 310, 800, 60);
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 42px Arial';
    ctx.fillText(dataHora, canvas.width / 2, 350);
    
    y = 450;
    
    // ===== DADOS OPERACIONAIS COM VISUAL MELHORADO =====
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'left';
    
    // Box com sombra para o título
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 5;
    ctx.fillText('DADOS OPERACIONAIS', margin, y);
    ctx.shadowBlur = 0;
    
    y += 90;
    
    // Box de fundo com gradiente simulado
    const gradient = ctx.createLinearGradient(margin, y, margin, y + 950);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(1, '#f8f9fa');
    ctx.fillStyle = gradient;
    ctx.fillRect(margin, y, contentWidth, 950);
    
    // Borda mais destacada
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 8;
    ctx.strokeRect(margin, y, contentWidth, 950);
    
    y += 75;
    ctx.fillStyle = '#2c3e50';
    ctx.font = '45px Arial';
    
    const dados = [
      { emoji: '📈', label: 'Projeção de Entrega:', valor: form.entrega.value + ' Ton' },
      { emoji: '➡️', label: 'Entrada de CVs (Usina):', valor: obterValorFormatado(form.entrada) },
      { emoji: '⬅️', label: 'Saída de CVs (Usina):', valor: obterValorFormatado(form.saida) },
      { emoji: '🚛', label: 'Retorno de CVs Usina:', valor: obterValorFormatado(form.retorno) },
      { emoji: '🌾', label: 'Colheita (Carregamento/Hora):', valor: form.colheita.value },
      { emoji: '📍', label: 'Raio Médio:', valor: obterValorFormatado(form.raio) + ' Km' },
      { emoji: '🔄', label: 'Rotação Média na Usina:', valor: rotacao + ' Voltas' },
      { emoji: '🚛', label: 'Conjuntos Carregados:', valor: obterValorFormatado(form.conjuntos) },
      { emoji: '⚖️', label: 'Densidade Média:', valor: obterValorFormatado(form.densidade) }
    ];
    
    dados.forEach((item, index) => {
      // Fundo alternado para melhor leitura
      if (index % 2 === 0) {
        ctx.fillStyle = 'rgba(52, 152, 219, 0.05)';
        ctx.fillRect(margin + 20, y - 45, contentWidth - 40, 90);
      }
      
      ctx.fillStyle = '#555';
      ctx.font = '44px Arial';
      ctx.fillText(`${item.emoji} ${item.label}`, margin + 50, y);
      
      ctx.fillStyle = '#2c3e50';
      ctx.font = 'bold 50px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(item.valor || '-', canvas.width - margin - 50, y);
      ctx.textAlign = 'left';
      
      y += 100;
    });
    
    y += 60;
    
    // ===== DUAS COLUNAS: MANUTENÇÃO E SOCORROS =====
    const colWidth = (contentWidth - 60) / 2;
    const col1X = margin;
    const col2X = margin + colWidth + 60;
    let y1 = y;
    let y2 = y;
    
    // COLUNA 1 - MANUTENÇÃO (Visual melhorado)
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 5;
    ctx.fillStyle = '#e67e22';
    ctx.font = 'bold 52px Arial';
    ctx.fillText('🛠️ VEÍCULOS EM MANUTENÇÃO', col1X, y1);
    ctx.shadowBlur = 0;
    y1 += 75;
    
    // Box com gradiente
    const gradientMan = ctx.createLinearGradient(col1X, y1, col1X, y1 + heightManutencao);
    gradientMan.addColorStop(0, '#fff3e0');
    gradientMan.addColorStop(1, '#ffe0b2');
    ctx.fillStyle = gradientMan;
    ctx.fillRect(col1X, y1, colWidth, heightManutencao);
    ctx.strokeStyle = '#e67e22';
    ctx.lineWidth = 6;
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
        // Card individual para cada manutenção
        if (index > 0) {
          ctx.strokeStyle = '#e67e22';
          ctx.lineWidth = 2;
          ctx.setLineDash([10, 5]);
          ctx.beginPath();
          ctx.moveTo(col1X + 30, y1 - 40);
          ctx.lineTo(col1X + colWidth - 30, y1 - 40);
          ctx.stroke();
          ctx.setLineDash([]);
        }
        
        ctx.fillStyle = '#d35400';
        ctx.font = 'bold 38px Arial';
        ctx.fillText(`🚛 Frota: ${item.frota || '-'}`, col1X + 40, y1);
        y1 += 55;
        ctx.fillStyle = '#555';
        ctx.font = '36px Arial';
        ctx.fillText(`📍 Local: ${item.local || '-'}`, col1X + 40, y1);
        y1 += 55;
        ctx.fillText(`🔧 Descrição: ${item.descricao || '-'}`, col1X + 40, y1);
        y1 += 55;
        ctx.fillText(`🗒️ Status: ${item.status || '-'}`, col1X + 40, y1);
        y1 += 90;
      });
    }
    
    // COLUNA 2 - SOCORROS (Visual melhorado)
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 5;
    ctx.fillStyle = '#e74c3c';
    ctx.font = 'bold 52px Arial';
    ctx.fillText('🆘 OCORRÊNCIAS', col2X, y2);
    ctx.shadowBlur = 0;
    y2 += 75;
    
    // Box com gradiente
    const gradientOco = ctx.createLinearGradient(col2X, y2, col2X, y2 + heightOcorrencia);
    gradientOco.addColorStop(0, '#ffebee');
    gradientOco.addColorStop(1, '#ffcdd2');
    ctx.fillStyle = gradientOco;
    ctx.fillRect(col2X, y2, colWidth, heightOcorrencia);
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 6;
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
        // Card individual para cada ocorrência
        if (index > 0) {
          ctx.strokeStyle = '#e74c3c';
          ctx.lineWidth = 2;
          ctx.setLineDash([10, 5]);
          ctx.beginPath();
          ctx.moveTo(col2X + 30, y2 - 40);
          ctx.lineTo(col2X + colWidth - 30, y2 - 40);
          ctx.stroke();
          ctx.setLineDash([]);
        }
        
        ctx.fillStyle = '#c0392b';
        ctx.font = 'bold 38px Arial';
        ctx.fillText(`🚛 Frota: ${item.frota || '-'}`, col2X + 40, y2);
        y2 += 55;
        ctx.fillStyle = '#555';
        ctx.font = '36px Arial';
        ctx.fillText(`📍 Local: ${item.local || '-'}`, col2X + 40, y2);
        y2 += 55;
        ctx.fillText(`🔧 Descrição: ${item.descricao || '-'}`, col2X + 40, y2);
        y2 += 55;
        ctx.fillText(`🗒️ Status: ${item.status || '-'}`, col2X + 40, y2);
        y2 += 90;
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
    
    // ===== RODAPÉ COM VISUAL MELHORADO =====
    const footerY = canvas.height - 180;
    
    // Gradiente no rodapé
    const gradientFooter = ctx.createLinearGradient(0, footerY, 0, canvas.height);
    gradientFooter.addColorStop(0, '#34495e');
    gradientFooter.addColorStop(1, '#2c3e50');
    ctx.fillStyle = gradientFooter;
    ctx.fillRect(0, footerY, canvas.width, 180);
    
    // Linha decorativa
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, footerY);
    ctx.lineTo(canvas.width, footerY);
    ctx.stroke();
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '42px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('💼 Desenvolvido por Everton Tezzon Ferreira', canvas.width / 2, footerY + 80);
    ctx.font = '36px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(`📅 ${new Date().toLocaleString('pt-BR')}`, canvas.width / 2, footerY + 130);
    
    // Exibe o modal com a imagem
    document.getElementById('modalImagem').style.display = 'block';
  };
  
  // Se a imagem não carregar, gera sem logo
  logo.onerror = function() {
    console.log('Logo não carregada, gerando relatório sem logo...');
    gerarRelatorioSemLogo();
  };
}

function gerarRelatorioSemLogo() {
  const form = document.forms['operacaoForm'];
  const dataHora = document.getElementById('horaAtual').textContent;
  const rotacao = obterRotacaoFormatada();
  const canvas = document.getElementById('canvasRelatorio');
  const ctx = canvas.getContext('2d');
  
  canvas.width = 2480;
  canvas.height = 3508;
  
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  let y = 100;
  const margin = 150;
  const contentWidth = canvas.width - (margin * 2);
  
  // Cabeçalho simples sem logo
  ctx.fillStyle = '#2c3e50';
  ctx.fillRect(0, 0, canvas.width, 300);
  
  ctx.font = 'bold 80px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText('📊 ATUALIZAÇÃO OPERACIONAL', canvas.width / 2, 150);
  
  ctx.font = '45px Arial';
  ctx.fillText(dataHora, canvas.width / 2, 230);
  
  y = 400;
  
  // Restante do código igual (dados, colunas, rodapé)
  ctx.fillStyle = '#2c3e50';
  ctx.font = 'bold 55px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('DADOS OPERACIONAIS', margin, y);
  
  y += 80;
  
  ctx.fillStyle = '#f8f9fa';
  ctx.fillRect(margin, y, contentWidth, 900);
  ctx.strokeStyle = '#3498db';
  ctx.lineWidth = 5;
  ctx.strokeRect(margin, y, contentWidth, 900);
  
  y += 70;
  
  const dados = [
    { emoji: '📈', label: 'Projeção de Entrega:', valor: form.entrega.value + ' Ton' },
    { emoji: '➡️', label: 'Entrada de CVs:', valor: obterValorFormatado(form.entrada) },
    { emoji: '⬅️', label: 'Saída de CVs:', valor: obterValorFormatado(form.saida) },
    { emoji: '🚛', label: 'Retorno de CVs Usina:', valor: obterValorFormatado(form.retorno) },
    { emoji: '🌾', label: 'Colheita:', valor: form.colheita.value },
    { emoji: '📍', label: 'Raio Médio:', valor: obterValorFormatado(form.raio) + ' Km' },
    { emoji: '🔄', label: 'Rotação Média:', valor: rotacao + ' Voltas' },
    { emoji: '🚛', label: 'Conjuntos:', valor: obterValorFormatado(form.conjuntos) },
    { emoji: '⚖️', label: 'Densidade:', valor: obterValorFormatado(form.densidade) }
  ];
  
  dados.forEach((item) => {
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
  
  // Duas colunas
  const colWidth = (contentWidth - 60) / 2;
  const col1X = margin;
  const col2X = margin + colWidth + 60;
  let y1 = y;
  let y2 = y;
  
  // Manutenção
  ctx.fillStyle = '#e67e22';
  ctx.font = 'bold 50px Arial';
  ctx.fillText('🛠️ MANUTENÇÃO', col1X, y1);
  y1 += 70;
  
  ctx.fillStyle = '#fff3e0';
  const hMan = Math.max(500, manutencaoData.length * 280 + 100);
  ctx.fillRect(col1X, y1, colWidth, hMan);
  ctx.strokeStyle = '#e67e22';
  ctx.lineWidth = 4;
  ctx.strokeRect(col1X, y1, colWidth, hMan);
  y1 += 60;
  
  if (manutencaoData.length === 0) {
    ctx.fillStyle = '#999';
    ctx.font = 'italic 38px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Nenhuma', col1X + colWidth / 2, y1 + 100);
    ctx.textAlign = 'left';
  } else {
    manutencaoData.forEach((item) => {
      ctx.fillStyle = '#555';
      ctx.font = '36px Arial';
      ctx.fillText(`Frota: ${item.frota || '-'}`, col1X + 30, y1);
      y1 += 50;
      ctx.fillText(`Local: ${item.local || '-'}`, col1X + 30, y1);
      y1 += 50;
      ctx.fillText(`Desc: ${item.descricao || '-'}`, col1X + 30, y1);
      y1 += 50;
      ctx.fillText(`Status: ${item.status || '-'}`, col1X + 30, y1);
      y1 += 80;
    });
  }
  
  // Ocorrências
  ctx.fillStyle = '#e74c3c';
  ctx.font = 'bold 50px Arial';
  ctx.fillText('🆘 OCORRÊNCIAS', col2X, y2);
  y2 += 70;
  
  ctx.fillStyle = '#ffebee';
  const hOco = Math.max(500, ocorrenciaData.length * 280 + 100);
  ctx.fillRect(col2X, y2, colWidth, hOco);
  ctx.strokeStyle = '#e74c3c';
  ctx.lineWidth = 4;
  ctx.strokeRect(col2X, y2, colWidth, hOco);
  y2 += 60;
  
  if (ocorrenciaData.length === 0) {
    ctx.fillStyle = '#999';
    ctx.font = 'italic 38px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Nenhuma', col2X + colWidth / 2, y2 + 100);
    ctx.textAlign = 'left';
  } else {
    ocorrenciaData.forEach((item) => {
      ctx.fillStyle = '#555';
      ctx.font = '36px Arial';
      ctx.fillText(`Frota: ${item.frota || '-'}`, col2X + 30, y2);
      y2 += 50;
      ctx.fillText(`Local: ${item.local || '-'}`, col2X + 30, y2);
      y2 += 50;
      ctx.fillText(`Desc: ${item.descricao || '-'}`, col2X + 30, y2);
      y2 += 50;
      ctx.fillText(`Status: ${item.status || '-'}`, col2X + 30, y2);
      y2 += 80;
    });
  }
  
  const finalHeight = Math.max(y1, y2) + 300;
  if (finalHeight > 3508) {
    canvas.height = finalHeight;
  }
  
  // Rodapé
  const footerY = canvas.height - 150;
  ctx.fillStyle = '#2c3e50';
  ctx.fillRect(0, footerY, canvas.width, 150);
  ctx.fillStyle = '#ffffff';
  ctx.font = '40px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Desenvolvido por Everton Tezzon Ferreira', canvas.width / 2, footerY + 70);
  ctx.font = '32px Arial';
  ctx.fillText(new Date().toLocaleString('pt-BR'), canvas.width / 2, footerY + 115);
  
  document.getElementById('modalImagem').style.display = 'block';
}
  
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
    // Gera o blob da imagem
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 1.0));
    
    // Nome do arquivo com data/hora
    const dataHora = new Date().toLocaleString('pt-BR').replace(/[/:]/g, '-').replace(/,/g, '');
    const nomeArquivo = `relatorio-operacional-${dataHora}.png`;
    
    // Baixa a imagem automaticamente
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    
    // Aguarda 500ms para garantir que o download iniciou
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mensagem para o WhatsApp
    const mensagemWhatsApp = `📊 *RELATÓRIO OPERACIONAL*

Segue em anexo o relatório operacional atualizado.

_Gerado em: ${new Date().toLocaleString('pt-BR')}_

📎 Arquivo: ${nomeArquivo}`;
    
    // Abre o WhatsApp com a mensagem
    const linkWhatsApp = `https://wa.me/?text=${encodeURIComponent(mensagemWhatsApp)}`;
    window.open(linkWhatsApp, '_blank');
    
    // Fecha o modal após 1 segundo
    setTimeout(() => {
      fecharModal();
    }, 1000);
    
    // Mostra instrução para o usuário
    alert('✅ Imagem baixada com sucesso!\n\n📱 O WhatsApp será aberto.\n\n💡 Dica: Anexe a imagem que acabou de baixar à conversa do WhatsApp.');
    
  } catch (error) {
    console.error('Erro ao compartilhar:', error);
    alert('❌ Erro ao gerar imagem.\n\n💡 Tente usar o botão "Baixar PNG" e envie manualmente pelo WhatsApp.');
  }
}