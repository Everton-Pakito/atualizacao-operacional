function horaArredondada() {
  const agora = new Date();
  agora.setMinutes(0, 0, 0);
  const horaFormatada = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const dataFormatada = agora.toLocaleDateString('pt-BR');
  document.getElementById('horaAtual').textContent = `Atualização – ${dataFormatada} às ${horaFormatada}`;
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
  
  // Para o campo de projeção de entrega, retorna o valor já formatado
  if (elemento.name === 'entrega') {
    return valor; // Já está formatado
  } else if (elemento.name === 'rotacao') {
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
  let mensagem = `📊 ${dataHora}\\n━━━━━━━━━━━━━━\\n`;
  mensagem += `📈 Projeção de Entrega: ${obterValorFormatado(form.entrega)} Ton\\n`;
  mensagem += `➡️ Entrada de CVs (Usina): ${obterValorFormatado(form.entrada)}\\n`;
  mensagem += `⬅️ Saída de CVs (Usina): ${obterValorFormatado(form.saida)}\\n`;
  mensagem += `🌾 Colheita (Carregamento/Hora): ${form.colheita.value}\\n`;
  mensagem += `📏 Raio Médio: ${obterValorFormatado(form.raio)} Km\\n`;
  mensagem += `🔄 Rotação Média na Usina: ${obterValorFormatado(form.rotacao)} Voltas\\n`;
  mensagem += `🚛 Conjuntos Carregados: ${obterValorFormatado(form.conjuntos)}\\n`;
  mensagem += `⚖️ Densidade Média: ${obterValorFormatado(form.densidade)}\\n`;
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
  
  // Aplicar máscara de tonelagem para o campo de projeção de entrega
  const campoEntrega = document.querySelector('input[name="entrega"]');
  if (campoEntrega) {
    aplicarMascaraTonelagem(campoEntrega);
  }
  
  // Aplicar normalização para outros campos numéricos (exceto entrega)
  const camposNumericos = document.querySelectorAll('input[name="entrada"], input[name="saida"], input[name="raio"], input[name="rotacao"], input[name="conjuntos"], input[name="densidade"]');
  camposNumericos.forEach(campo => {
    normalizarEntradaNumerica(campo);
  });
};
