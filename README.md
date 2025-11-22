# 📊 Atualização Operacional – PWA v1.2

![Versão](https://img.shields.io/badge/versão-1.2-blue.svg)
![PWA](https://img.shields.io/badge/PWA-enabled-green.svg)
![Licença](https://img.shields.io/badge/licença-MIT-yellow.svg)

Este projeto é um **formulário responsivo PWA (Progressive Web App)** para registrar e enviar atualizações operacionais diretamente via **WhatsApp** e **Imagem PNG** de alta qualidade, funcionando até mesmo **offline**.

---

## 🚀 Funcionalidades

### ✨ Principais Recursos

- ✅ **Interface amigável e responsiva** (mobile, tablet, desktop)
- ✅ **Dois formatos de saída profissionais:**
  - 📤 **WhatsApp**: Mensagem formatada com negrito e emojis
  - 📸 **Imagem PNG**: Relatório visual em formato A4 de alta qualidade
- ✅ **Campos dinâmicos** com adição/remoção ilimitada
- ✅ **Formatação automática inteligente** em tempo real
- ✅ **Cálculo automático** de colheita (entrada/saída)
- ✅ **Sistema de frações** para rotação com menu suspenso (¼, ½, ¾)
- ✅ **Armazenamento local** (dados persistentes no navegador)
- ✅ **PWA completo** - instalável como app nativo
- ✅ **Funciona offline** (Service Worker ativo)
- ✅ **Logo personalizável** no relatório PNG

### 📋 Campos Operacionais

#### Dados Principais

- **📈 Projeção de Entrega (Ton)**
  - ✨ **Formatação automática** enquanto digita
  - Exemplo: Digite `25236` → Aparece `252,36`
  - Padrão brasileiro: `25.236,50`
  - Cursor inteligente preserva posição

- **➡️ Entrada de CVs (Usina)**
  - Aceita vírgula ou ponto como decimal
  - Formatação ao sair do campo

- **⬅️ Saída de CVs (Usina)**
  - Aceita vírgula ou ponto como decimal
  - Formatação automática

- **🚛 Retorno de CVs Usina**
  - Campo numérico com formatação
  - Aceita decimais

- **🌾 Colheita (Carregamento/Hora)**
  - **Cálculo automático**: Entrada ÷ Saída
  - Atualização em tempo real
  - Somente leitura

- **📍 Raio Médio (Km)**
  - Distância média de transporte
  - Formatação decimal

- **🔄 Rotação Média na Usina (Voltas)**
  - ✨ **Sistema duplo inovador:**
    - Campo para **número inteiro** (ex: 6)
    - Menu suspenso para **fração** (¼, ½, ¾, ou sem fração)
  - Resultado: `6 ¾ Voltas`
  - Exibição idêntica em todos os relatórios

- **🚛 Conjuntos Carregados**
  - Quantidade de veículos
  - Aceita decimais

- **⚖️ Densidade Média**
  - Densidade do material
  - Formatação decimal

#### Campos Dinâmicos

- **🛠️ Veículos em Manutenção**
  - 🚛 Frota (apenas números)
  - 📍 Local
  - 🔧 Descrição
  - 🗒️ Status
  - ➕ Adicionar ilimitados
  - ❌ Remover individualmente

- **🆘 Ocorrências em Andamento**
  - 🚛⚠️ Frota (apenas números)
  - 📍 Local
  - 🔧 Descrição
  - 🗒️ Status
  - ➕ Adicionar ilimitados
  - ❌ Remover individualmente

---

## 📱 Como Usar

### Uso Básico

1. **Abra o `index.html`** no navegador moderno
2. **Preencha os campos** operacionais:
   - Digite valores e veja a formatação automática
   - Use o sistema de frações para rotação
   - Adicione manutenções e ocorrências
3. **Escolha o formato de saída:**
   - 📤 **Enviar para WhatsApp** - Mensagem formatada
   - 📸 **Compartilhar Imagem** - Baixa PNG e abre WhatsApp

### 📤 Envio para WhatsApp

**Processo:**
1. Clique em **"📤 Enviar para WhatsApp"**
2. Mensagem é gerada automaticamente com:
   - ✅ Todos os dados formatados
   - ✅ Valores em **negrito**
   - ✅ Emojis para identificação visual
   - ✅ Separadores organizados
   - ✅ Rotação com frações Unicode (6 ¾)
3. WhatsApp abre com mensagem pronta
4. Escolha contato/grupo e envie!

**Exemplo de mensagem:**
```
📊 Atualização — 22/11/2025 às 14:00
━━━━━━━━━━━━━━

📈 Projeção de Entrega: *25.236,50 Ton*
➡️ Entrada de CVs (Usina): *45*
⬅️ Saída de CVs (Usina): *38*
🚛 Retorno de CVs Usina: *12*
🌾 Colheita (Carregamento/Hora): *1,18*
📍 Raio Médio: *35 Km*
🔄 Rotação Média na Usina: *6 ¾ Voltas*
🚛 Conjuntos Carregados: *28*
⚖️ Densidade Média: *0,85*
```

### 📸 Geração de Imagem PNG

**Processo automatizado:**
1. Clique em **"📸 Compartilhar Imagem"**
2. **Relatório é gerado** em alta qualidade (2480 x 3508 pixels)
3. **Imagem é baixada automaticamente**
4. **WhatsApp abre** com mensagem explicativa
5. **Anexe a imagem** e compartilhe!

**Layout Profissional do Relatório:**

- **🎨 Cabeçalho Premium**
  - Logo da empresa (personalizável)
  - Título em destaque
  - Data/hora com fundo destacado
  - Fundo gradiente azul

- **📊 Dados Operacionais**
  - Box com gradiente sutil
  - Borda azul de 8px
  - Linhas alternadas com fundo claro
  - Emojis + Labels + Valores em negrito
  - Espaçamento otimizado

- **📋 Duas Colunas Lado a Lado**
  - **🛠️ Manutenção** (esquerda, laranja)
    - Gradiente laranja suave
    - Borda laranja de 6px
    - Cards individuais separados
    - Dados organizados por item
  
  - **🆘 Ocorrências** (direita, vermelho)
    - Gradiente vermelho suave
    - Borda vermelha de 6px
    - Cards individuais separados
    - Dados organizados por item

- **👤 Rodapé Profissional**
  - Gradiente escuro elegante
  - Linha decorativa azul
  - Assinatura do desenvolvedor
  - Data/hora de geração

**Opções no Modal:**
- 💾 **Baixar PNG** - Salva apenas a imagem
- 📤 **Baixar e Enviar WhatsApp** - Baixa + Abre WhatsApp

---

## 🔧 Instalação como PWA

### Android / Chrome

1. Abra o site no **Google Chrome**
2. Menu (⋮) → **"Instalar app"**
3. Ou clique no ícone na barra de endereços
4. Confirme a instalação
5. App aparece na tela inicial

### iOS / Safari

1. Abra no **Safari**
2. Ícone **Compartilhar** (□↑)
3. **"Adicionar à Tela Inicial"**
4. Nomeie e confirme
5. Ícone na tela inicial

### Desktop (Chrome/Edge/Firefox)

1. Ícone de instalação na barra de endereços
2. Ou Menu → **"Instalar [nome]"**
3. App instalado como nativo

---

## 🗂️ Estrutura de Arquivos

```
projeto/
├── index.html              # Interface principal
├── app.js                  # Lógica JavaScript completa
│   ├── Formatação automática
│   ├── Sistema de frações
│   ├── Geração de imagem PNG
│   ├── Integração WhatsApp
│   └── Armazenamento local
├── padrao_css_sistema.css  # Estilos responsivos
├── manifest.json           # Configuração PWA
├── service-worker.js       # Cache offline
├── README.md              # Esta documentação
└── [ícones]               # icon-192x192.png, icon-512x512.png
```

---

## 🎯 Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **HTML5** | - | Estrutura semântica moderna |
| **CSS3** | - | Design responsivo com gradientes |
| **JavaScript** | ES6+ | Lógica avançada da aplicação |
| **Canvas API** | - | Geração de imagem PNG em alta resolução |
| **LocalStorage API** | - | Persistência de dados local |
| **Service Worker API** | - | Funcionalidade offline e cache |
| **PWA Manifest** | - | Instalação como app nativo |
| **WhatsApp Business API** | - | Integração de compartilhamento |

---

## 📋 Novidades da Versão 1.2

### 🆕 Funcionalidades Principais

#### 1. **Campo Rotação com Frações**
- ✅ Sistema duplo inovador (inteiro + fração)
- ✅ Menu suspenso com frações Unicode (¼, ½, ¾)
- ✅ Exibição perfeita: `6 ¾ Voltas`
- ✅ Compatível com WhatsApp e imagem PNG

#### 2. **Formatação Automática de Tonelagem**
- ✅ Formatação em tempo real ao digitar
- ✅ Padrão brasileiro: pontos e vírgula
- ✅ Cursor inteligente preserva posição
- ✅ Exemplo: `25236` → `252,36` → `25.236,50`

#### 3. **Campo Retorno de CVs Usina**
- ✅ Novo campo para controle de retorno
- ✅ Formatação automática
- ✅ Integrado em todos os relatórios

#### 4. **Relatório PNG Profissional**
- ✅ Layout A4 de alta qualidade
- ✅ Gradientes e sombras suaves
- ✅ Duas colunas lado a lado
- ✅ Logo personalizável
- ✅ Separadores entre itens
- ✅ Bordas destacadas

#### 5. **Botão Compartilhar Melhorado**
- ✅ Baixa imagem automaticamente
- ✅ Abre WhatsApp com mensagem
- ✅ Cor verde WhatsApp
- ✅ Instruções claras ao usuário
- ✅ Fluxo otimizado

### 🔄 Melhorias Técnicas

- ✅ Código otimizado e modular
- ✅ Funções específicas para cada campo
- ✅ Validação aprimorada
- ✅ Performance melhorada no canvas
- ✅ Tratamento robusto de erros
- ✅ Compatibilidade com caracteres Unicode

---

## 💡 Recursos Avançados

### ⚡ Formatação Inteligente

**Projeção de Entrega:**
```
Digite: 1234567
Vê em tempo real: 1.234,56 → 12.345,67
```

**Outros campos numéricos:**
- Aceita vírgula (,) ou ponto (.)
- Converte ao sair do campo
- Formato padrão: `1.234,56`

**Rotação com frações:**
- Campo inteiro: `6`
- Menu: `¾`
- Resultado: `6 ¾`

### 🧮 Cálculo Automático

- **Colheita** = Entrada ÷ Saída
- Atualização em tempo real
- Formatação automática do resultado
- 2 casas decimais

### 💾 Persistência de Dados

**LocalStorage automático:**
- ✅ Salvamento instantâneo
- ✅ Sem necessidade de botão "Salvar"
- ✅ Dados preservados ao fechar
- ✅ Sincronização entre campos
- ✅ Manutenções e ocorrências salvas

**Armazenamento:**
```javascript
manutencaoData → localStorage
ocorrenciaData → localStorage
```

### ✔️ Validação de Campos

- **Campos numéricos:** Apenas números e separadores
- **Frota:** Apenas números inteiros
- **Rotação inteira:** Apenas números
- **Formatação visual:** Borda verde (válido) / vermelha (inválido)

---

## 🎨 Personalização

### 🖼️ Adicionar Logo no Relatório PNG

**Método 1: Upload via ferramenta**
1. Use o arquivo `upload_logo_test.html`
2. Faça upload da sua logo
3. Gere o código Base64
4. Copie o código

**Método 2: Manual**
1. Converta sua logo para Base64
2. Edite `app.js`, função `gerarImagem()`
3. Localize (linha ~400):
```javascript
logo.src = 'data:image/png;base64,iVBORw...';
```
4. Cole seu código Base64

**Recomendações:**
- Formato: PNG com fundo transparente
- Largura: 1200px (proporção livre)
- Tamanho: Máximo 2MB

### 🎨 Alterar Cores do Sistema

**Arquivo: `padrao_css_sistema.css`**

```css
/* Gradiente de fundo principal */
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Cor do cabeçalho */
.header {
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
}

/* Cor dos botões principais */
.btn {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
}

/* Cor dos botões de sucesso */
.btn-success {
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
}
```

### 🔧 Ajustar Tamanho das Fontes

**No Canvas (arquivo `app.js`):**
```javascript
// Título principal
ctx.font = 'bold 75px Arial';

// Subtítulos
ctx.font = 'bold 60px Arial';

// Dados operacionais
ctx.font = '44px Arial';
ctx.font = 'bold 50px Arial'; // Valores

// Colunas (manutenção/ocorrências)
ctx.font = 'bold 52px Arial'; // Títulos
ctx.font = '36px Arial'; // Dados
```

---

## 📱 Compatibilidade

### ✅ Navegadores Suportados

| Navegador | Versão Mínima | PWA | Offline | Frações |
|-----------|---------------|-----|---------|---------|
| Chrome | 80+ | ✅ | ✅ | ✅ |
| Edge | 80+ | ✅ | ✅ | ✅ |
| Firefox | 75+ | ✅ | ✅ | ✅ |
| Safari | 13+ | ✅ | ✅ | ✅ |
| Samsung Internet | 12+ | ✅ | ✅ | ✅ |
| Opera | 67+ | ✅ | ✅ | ✅ |

### 📱 Dispositivos Testados

- ✅ **Android** 8.0+ (Chrome, Samsung Internet)
- ✅ **iOS** 13+ (Safari)
- ✅ **Windows** 10/11 (Chrome, Edge, Firefox)
- ✅ **macOS** 10.15+ (Safari, Chrome)
- ✅ **Linux** (principais distribuições)

### 🌐 Caracteres Especiais

**Frações Unicode suportadas:**
- ¼ (U+00BC) - Um quarto
- ½ (U+00BD) - Meio
- ¾ (U+00BE) - Três quartos

Compatível com:
- ✅ WhatsApp (todas as plataformas)
- ✅ Canvas API (imagem PNG)
- ✅ Todos os navegadores modernos

---

## 🔒 Privacidade e Segurança

- ✅ **100% local** - Dados apenas no seu dispositivo
- ✅ **Sem servidor** - Nenhum dado enviado externamente
- ✅ **Sem rastreamento** - Zero analytics ou cookies
- ✅ **Sem internet necessária** - Funciona offline
- ✅ **Código aberto** - Totalmente auditável
- ✅ **Sem login** - Acesso imediato
- ✅ **Sem permissões** - Não acessa dados do dispositivo

**O que é armazenado:**
- LocalStorage: Manutenções e ocorrências
- Cache: Arquivos do app (Service Worker)
- Nada mais!

---

## ❓ FAQ - Perguntas Frequentes

### 💬 Geral

**P: O app funciona sem internet?**
R: ✅ Sim! Após a primeira carga, funciona 100% offline.

**P: Os dados são perdidos ao fechar?**
R: ❌ Não! Tudo é salvo automaticamente no LocalStorage.

**P: Posso usar em vários dispositivos?**
R: ⚠️ Os dados ficam em cada dispositivo. Para sincronizar, você precisa exportar/importar manualmente.

**P: Como limpar todos os dados?**
R: Console do navegador (F12):
```javascript
localStorage.clear();
location.reload();
```

### 📊 Sobre os Campos

**P: Por que a tonelagem formata sozinha?**
R: É uma feature! Formatação automática facilita a digitação e evita erros.

**P: Como usar frações na rotação?**
R: Digite o inteiro (ex: 6) e selecione a fração no menu (¼, ½, ¾). Resultado: `6 ¾`

**P: Posso adicionar outras frações?**
R: Sim! Edite o `<select>` no HTML e adicione mais opções (ex: ⅓, ⅔).

**P: A colheita calcula errado?**
R: Verifique se entrada e saída têm valores válidos. Fórmula: Entrada ÷ Saída.

### 📸 Sobre a Imagem PNG

**P: A qualidade é boa para impressão?**
R: ✅ Sim! 2480 x 3508 pixels = A4 em 300 DPI (qualidade profissional).

**P: Como adiciono minha logo?**
R: Use a ferramenta de upload ou edite manualmente o `app.js` (veja seção Personalização).

**P: Por que o botão não funciona?**
R: Aguarde alguns segundos. Se persistir, limpe o cache (Ctrl+Shift+Del).

**P: Posso mudar as cores do relatório?**
R: Sim! Edite as cores no `app.js` na função `gerarImagem()`.

### 📱 Sobre WhatsApp

**P: O botão WhatsApp não abre?**
R: Verifique se tem WhatsApp instalado. Tente WhatsApp Web.

**P: As frações aparecem no WhatsApp?**
R: ✅ Sim! As frações Unicode (¼, ½, ¾) funcionam perfeitamente.

**P: Posso enviar para grupos?**
R: ✅ Sim! Após abrir o WhatsApp, escolha contato ou grupo.

---

## 🐛 Resolução de Problemas

### ⚠️ Problemas Comuns

**Botão de imagem não funciona:**
1. Aguarde 3-5 segundos após clicar
2. Verifique se o navegador suporta Canvas
3. Limpe cache: Ctrl+Shift+Del
4. Recarregue: Ctrl+F5

**Formatação não funciona:**
1. Verifique se o JavaScript está habilitado
2. Use navegador atualizado
3. Não use modo privado/anônimo

**Service Worker não registra:**
1. Certifique-se de usar HTTPS ou localhost
2. Limpe cache do navegador
3. Recarregue completamente (Ctrl+F5)

**Dados não são salvos:**
1. Verifique se LocalStorage está habilitado
2. Não use modo anônimo/privado
3. Verifique espaço disponível (muito raro)

**WhatsApp não abre:**
1. Instale o WhatsApp ou use WhatsApp Web
2. Libere pop-ups no navegador
3. Verifique permissões do navegador

**Frações não aparecem:**
1. Use navegador moderno atualizado
2. Verifique suporte a Unicode
3. Teste em outro navegador

---

## 🚀 Roadmap - Próximas Versões

### v1.3 (Em breve)
- [ ] Upload de logo via interface
- [ ] Exportar/Importar dados em JSON
- [ ] Temas claro/escuro personalizáveis
- [ ] Histórico de relatórios salvos
- [ ] Mais opções de frações (⅓, ⅔, ⅕)

### v1.4 (Planejado)
- [ ] Gráficos de desempenho
- [ ] Comparação entre períodos
- [ ] Exportação em PDF
- [ ] Sincronização em nuvem (opcional)
- [ ] Modo impressão otimizado

### v2.0 (Futuro)
- [ ] Dashboard analítico
- [ ] Relatórios agendados
- [ ] Integração com Telegram
- [ ] API para integrações
- [ ] Multi-idiomas

---

## 👨‍💻 Desenvolvedor

**Everton Tezzon Ferreira**

💼 Desenvolvedor Full Stack  
🎯 Especialista em PWA e Apps Mobile  
📧 Contato disponível no rodapé da aplicação

### 🤝 Contribuições

Sugestões e melhorias são bem-vindas!

---

## 📄 Licença

Este projeto está sob a **Licença MIT**.

```
MIT License

Copyright (c) 2025 Everton Tezzon Ferreira

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Agradecimentos

- Comunidade open source
- Beta testers da Prando Transportes
- Usuários que forneceram feedback valioso
- Todos que contribuíram com sugestões

---

## 📞 Suporte e Contato

**Para dúvidas, sugestões ou melhorias:**

1. 📧 Entre em contato via dados do desenvolvedor
2. 💬 Consulte a seção **FAQ** acima
3. 🐛 Reporte bugs com detalhes (navegador, SO, passos)

**Antes de reportar:**
- ✅ Consulte o FAQ
- ✅ Verifique a seção Resolução de Problemas
- ✅ Teste em outro navegador
- ✅ Limpe cache e tente novamente

---

## 📚 Documentação Técnica

### Estrutura do LocalStorage

```javascript
{
  "manutencaoData": [
    {
      "frota": "123",
      "local": "Pátio A",
      "descricao": "Troca de óleo",
      "status": "Em andamento"
    }
  ],
  "ocorrenciaData": [
    {
      "frota": "456",
      "local": "Rodovia BR-101",
      "descricao": "Pneu furado",
      "status": "Socorro a caminho"
    }
  ]
}
```

### Formato da Rotação

**HTML:**
```html
<input type="text" id="rotacaoInteiro" value="6" />
<select id="rotacaoFracao">
  <option value="¾">¾</option>
</select>
```

**JavaScript:**
```javascript
function obterRotacaoFormatada() {
  const inteiro = document.getElementById('rotacaoInteiro').value;
  const fracao = document.getElementById('rotacaoFracao').value;
  return fracao ? `${inteiro} ${fracao}` : inteiro;
}
// Resultado: "6 ¾"
```

### Canvas API - Especificações

```javascript
canvas.width = 2480;  // 210mm @ 300 DPI
canvas.height = 3508; // 297mm @ 300 DPI
formato = 'image/png';
qualidade = 1.0; // Máxima
```

---

<div align="center">

## 🌟 **Feito com ❤️ por Everton Tezzon Ferreira**

⭐ Se este projeto foi útil, considere dar uma estrela!

📊 **PWA Profissional para Gestão Operacional**

*Versão 1.2 | Atualizado em Novembro 2025*

---

**[↑ Voltar ao topo](#-atualização-operacional--pwa-v12)**

</div>

---

## 🚀 Funcionalidades

### ✨ Principais Recursos

- ✅ **Interface amigável e responsiva** (mobile, tablet, desktop)
- ✅ **Dois formatos de saída:**
  - 📤 **WhatsApp**: Mensagem formatada com negrito e emojis
  - 📸 **Imagem PNG**: Relatório visual em formato A4 profissional
- ✅ **Campos dinâmicos** para manutenções e ocorrências
- ✅ **Cálculo automático** de colheita (entrada/saída)
- ✅ **Suporte a frações** no campo rotação (ex: 6 1/4, 5 2/3)
- ✅ **Formatação automática** de números e tonelagem
- ✅ **Armazenamento local** (dados não são perdidos ao fechar o navegador)
- ✅ **PWA completo** - instalável como app nativo no celular
- ✅ **Funciona offline** (Service Worker ativo)

### 📋 Campos Operacionais

#### Dados Principais
- 📈 **Projeção de Entrega (Ton)** - Com formatação automática
- ➡️ **Entrada de CVs (Usina)** - Aceita decimais
- ⬅️ **Saída de CVs (Usina)** - Aceita decimais
- 🚛 **Retorno Usina** *(NOVO v1.2)* - Controle de retorno
- 🌾 **Colheita (Carregamento/Hora)** - Cálculo automático
- 📍 **Raio Médio (Km)** - Distância média
- 🔄 **Rotação Média na Usina** - Aceita frações (6 1/4) ou decimais (5,75)
- 🚛 **Conjuntos Carregados** - Quantidade de veículos
- ⚖️ **Densidade Média** - Densidade do material

#### Campos Dinâmicos
- 🛠️ **Veículos em Manutenção**
  - Frota, Local, Descrição, Status
  - Adicionar/Remover ilimitados
  
- 🆘 **Ocorrências em Andamento**
  - Frota, Local, Descrição, Status
  - Adicionar/Remover ilimitados

---

## 📱 Como Usar

### Uso Básico

1. **Abra o `index.html`** no navegador moderno
2. **Preencha os campos** operacionais necessários
3. **Adicione manutenções e ocorrências** conforme necessário
4. **Escolha o formato de saída:**
   - 📤 **Enviar para WhatsApp** - Mensagem formatada
   - 📸 **Compartilhar Imagem** - Relatório visual PNG

### 📤 Envio para WhatsApp

- Clique em **"📤 Enviar para WhatsApp"**
- A mensagem é formatada automaticamente com:
  - Valores em **negrito**
  - Emojis para identificação visual
  - Quebras de linha organizadas
  - Separadores entre seções
- Abre o WhatsApp Web ou aplicativo
- Basta escolher o contato/grupo e enviar

### 📸 Geração de Imagem PNG

- Clique em **"📸 Compartilhar Imagem"**
- Um modal abrirá com a visualização do relatório
- **Layout profissional em formato A4:**
  - Cabeçalho azul com espaço para logo
  - Dados operacionais organizados
  - **Duas colunas:** Manutenção (esquerda) e Ocorrências (direita)
  - Rodapé com assinatura e data/hora
- **Opções disponíveis:**
  - 💾 **Baixar PNG** - Salva no dispositivo
  - 📤 **Compartilhar** - Compartilha direto (se suportado)
  - ❌ **Fechar** - Fecha a visualização

---

## 🔧 Instalação como PWA

### Android / Chrome

1. Abra o site no **Google Chrome**
2. Toque no menu (⋮) → **"Instalar app"**
3. Ou clique no ícone de instalação na barra de endereços
4. Confirme a instalação
5. O app aparecerá na tela inicial

### iOS / Safari

1. Abra o site no **Safari**
2. Toque no ícone de **Compartilhar** (□↑)
3. Selecione **"Adicionar à Tela Inicial"**
4. Nomeie o app e confirme
5. O ícone aparecerá na tela inicial

### Desktop / Edge / Firefox

1. Clique no ícone de instalação na barra de endereços
2. Ou vá em Menu → **"Instalar [nome do site]"**
3. O app será instalado como aplicativo nativo

---

## 🗂️ Estrutura de Arquivos

```
projeto/
├── index.html              # Interface principal do app
├── app.js                  # Lógica JavaScript completa
├── padrao_css_sistema.css  # Estilos responsivos e modernos
├── manifest.json           # Configuração PWA
├── service-worker.js       # Cache offline
├── README.md              # Esta documentação
└── [ícones]               # icon-192x192.png, icon-512x512.png
```

---

## 🎯 Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **HTML5** | - | Estrutura semântica |
| **CSS3** | - | Design responsivo e gradientes |
| **JavaScript** | ES6+ | Lógica da aplicação |
| **Canvas API** | - | Geração de imagem PNG |
| **LocalStorage** | - | Persistência de dados |
| **Service Worker** | - | Funcionalidade offline |
| **PWA** | - | Instalação como app nativo |
| **WhatsApp API** | - | Integração de compartilhamento |

---

## 📋 Novidades da Versão 1.2

### 🆕 Novas Funcionalidades

- ✅ **Campo "🚛 Retorno Usina"** adicionado após "Saída de CVs"
- ✅ **Botão "📸 Compartilhar Imagem"** - Gera relatório visual PNG
- ✅ **Layout A4 profissional** com duas colunas
- ✅ **Modal de visualização** da imagem gerada
- ✅ **Opções de download e compartilhamento** da imagem
- ✅ **Espaço reservado para logo** no cabeçalho da imagem

### 🔄 Melhorias

- ✅ Integração WhatsApp atualizada com novo campo
- ✅ Formatação automática mantida para todos os campos
- ✅ Layout em colunas para manutenção e ocorrências na imagem
- ✅ Todas as funcionalidades originais preservadas
- ✅ Performance otimizada

---

## 💡 Recursos Avançados

### Formatação Inteligente de Números

- **Aceita vírgula e ponto** como separador decimal
- **Conversão automática** ao sair do campo
- **Suporte a frações** (6 1/4, 5 2/3, 1/2)
- **Formatação brasileira** (1.234,56)

### Cálculo Automático

- **Colheita** = Entrada ÷ Saída
- Atualização em tempo real
- Formatação automática do resultado

### Persistência de Dados

- **Salvamento automático** no LocalStorage
- Dados preservados ao fechar o navegador
- Sincronização instantânea entre campos
- Sem necessidade de "Salvar"

### Validação de Campos

- **Campos numéricos:** Apenas números e separadores
- **Campos de frota:** Apenas números
- **Formatação visual** de campos válidos/inválidos

---

## 🎨 Personalização

### Adicionar Sua Logo na Imagem

Edite o arquivo `app.js`, função `gerarImagem()`:

```javascript
// Encontre esta seção (linha ~380):
ctx.fillText('[ ESPAÇO PARA SUA LOGO ]', canvas.width / 2, 140);

// Substitua por:
const logo = new Image();
logo.src = 'sua-logo.png'; // Coloque o arquivo na mesma pasta
logo.onload = () => {
  ctx.drawImage(logo, canvas.width/2 - 200, 50, 400, 200);
};
```

### Alterar Cores do Sistema

Edite o arquivo `padrao_css_sistema.css`:

```css
/* Cor principal - Linha 15 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Cor dos botões - Linha 150 */
background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
```

---

## 📱 Compatibilidade

### Navegadores Suportados

| Navegador | Versão Mínima | PWA | Offline |
|-----------|---------------|-----|---------|
| Chrome | 80+ | ✅ | ✅ |
| Edge | 80+ | ✅ | ✅ |
| Firefox | 75+ | ✅ | ✅ |
| Safari | 13+ | ✅ | ✅ |
| Samsung Internet | 12+ | ✅ | ✅ |
| Opera | 67+ | ✅ | ✅ |

### Dispositivos Testados

- ✅ Android 8.0+
- ✅ iOS 13+
- ✅ Windows 10/11
- ✅ macOS 10.15+
- ✅ Linux (principais distribuições)

---

## 🔒 Privacidade e Segurança

- ✅ **Todos os dados são locais** - Armazenados apenas no seu dispositivo
- ✅ **Sem servidor** - Não envia dados para nenhum servidor
- ✅ **Sem rastreamento** - Sem analytics ou cookies
- ✅ **Código aberto** - Totalmente auditável
- ✅ **Funciona offline** - Não precisa de internet

---

## ❓ FAQ - Perguntas Frequentes

### O app funciona sem internet?

✅ **Sim!** Após a primeira carga, o Service Worker mantém o app funcional offline.

### Os dados são perdidos ao fechar o navegador?

❌ **Não!** Tudo é salvo automaticamente no LocalStorage do seu navegador.

### Posso usar em vários dispositivos?

⚠️ Os dados ficam salvos **localmente em cada dispositivo**. Para usar em múltiplos dispositivos, você precisa exportar/importar os dados manualmente ou usar a mesma conta do navegador com sincronização ativa.

### Como limpar todos os dados?

No console do navegador (F12), digite:
```javascript
localStorage.clear();
location.reload();
```

### A imagem PNG tem boa qualidade para impressão?

✅ **Sim!** A imagem é gerada em alta resolução (2480 x 3508 pixels), ideal para impressão A4.

---

## 🐛 Resolução de Problemas

### O botão WhatsApp não abre

- Verifique se tem o WhatsApp instalado
- Tente usar o WhatsApp Web (web.whatsapp.com)
- Alguns navegadores bloqueiam pop-ups (libere na configuração)

### A imagem PNG não é gerada

- Aguarde alguns segundos após clicar
- Verifique se o navegador suporta Canvas API
- Limpe o cache e tente novamente

### Service Worker não funciona

- Certifique-se de estar usando HTTPS ou localhost
- Limpe o cache do navegador
- Recarregue a página (Ctrl+F5)

### Dados não são salvos

- Verifique se o LocalStorage está habilitado
- Alguns navegadores em modo anônimo desabilitam o LocalStorage
- Não use o app em modo privado/anônimo

---

## 🚀 Roadmap - Próximas Versões

### v1.3 (Planejado)
- [ ] Upload de logo via interface
- [ ] Exportar/Importar dados em JSON
- [ ] Temas claro/escuro
- [ ] Histórico de relatórios

### v1.4 (Futuro)
- [ ] Gráficos de desempenho
- [ ] Comparação entre períodos
- [ ] Exportação em PDF
- [ ] Sincronização em nuvem (opcional)

---

## 👨‍💻 Desenvolvedor

**Everton Tezzon Ferreira**

💼 Desenvolvedor Full Stack  
📧 Contato disponível no rodapé da aplicação

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e distribuir.

```
MIT License

Copyright (c) 2025 Everton Tezzon Ferreira

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Agradecimentos

- Comunidade open source
- Usuários que forneceram feedback
- Todos que contribuíram com testes

---

## 📞 Suporte

Para dúvidas, sugestões ou melhorias:

1. Abra uma **Issue** no repositório
2. Entre em contato através dos dados do desenvolvedor
3. Consulte a seção **FAQ** acima

---

<div align="center">

**Feito com ❤️ por Everton Tezzon Ferreira**

⭐ Se este projeto foi útil, considere dar uma estrela!

*Versão 1.2 | Atualizado em Novembro 2025*

</div>