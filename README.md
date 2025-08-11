# 📊 Atualização Operacional – PWA

Este projeto é um **formulário responsivo PWA (Progressive Web App)** para registrar e enviar atualizações operacionais diretamente via **WhatsApp**, mesmo **offline**.

## 🚀 Funcionalidades

- ✅ Interface amigável e responsiva (mobile, tablet, desktop)
- ✅ Envio de dados formatados via WhatsApp com 1 clique
- ✅ Formatação profissional das mensagens (valores em **negrito**)
- ✅ Campos dinâmicos:
  - 🛠️ **Veículos em Manutenção**
    - 🚛 Frota
    - 📍 Local
    - 🔧 Descrição
    - 🗒️ Status
  - 🆘 **Ocorrências em Andamento**
    - 🚛⚠️ Frota
    - 📍 Local
    - 🔧 Descrição
    - 🗒️ Status
- ✅ **Cálculo automático** de colheita (entrada/saída)
- ✅ **Suporte a frações** no campo rotação (ex: 6 1/4)
- ✅ **Armazenamento local** dos dados (não perde informações)
- ✅ **PWA completo** - instalável como app nativo
- ✅ **Funciona offline** (com Service Worker)
- ✅ **Rodapé com assinatura** do desenvolvedor

## 📱 Como usar

1. **Abrir `index.html`** em navegador moderno (Chrome, Edge, Firefox, Safari)
2. **Preencher os campos operacionais**
3. **Adicionar manutenções e ocorrências** conforme necessário
4. Clicar em **📤 Enviar para WhatsApp**
5. A mensagem formatada será aberta no WhatsApp Web ou aplicativo
6. **(Opcional)**: Instalar como app no dispositivo móvel

## 🔧 Instalação como PWA

1. **Abra o site** no navegador móvel
2. **Chrome/Edge**: Procure o ícone "Instalar" na barra de endereços
3. **Safari**: Toque em "Compartilhar" → "Adicionar à Tela Inicial"
4. **Firefox**: Menu → "Instalar"

## 📋 Funcionalidades Técnicas

### ⚙️ Campos Inteligentes
- **Projeção de Entrega**: Formatação automática de tonelagem
- **Entrada/Saída CVs**: Cálculo automático da colheita
- **Rotação**: Aceita frações (6 1/4) e decimais (5,75)
- **Validação**: Apenas números nos campos numéricos

### 📤 Mensagem WhatsApp
- **Formatação profissional** com emojis
- **Valores em negrito** para destaque
- **Quebras de linha** para melhor leitura
- **Separadores visuais** entre seções
- **Data/hora** automática da atualização

### 💾 Persistência de Dados
- **LocalStorage**: Salva automaticamente todos os dados
- **Não perde informações** ao fechar o navegador
- **Sincronização instantânea** entre campos

## 🗂️ Estrutura de Arquivos

```
projeto/
├── index.html              # Interface principal
├── app.js                  # Lógica JavaScript
├── padrao_css_sistema.css  # Estilos responsivos
├── manifest.json           # Configuração PWA
├── service-worker.js       # Cache offline
└── README.md              # Esta documentação
```

## 🎯 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Design responsivo e moderno
- **JavaScript ES6+** - Lógica da aplicação
- **PWA** - Service Worker e Manifest
- **LocalStorage** - Persistência de dados
- **WhatsApp API** - Integração de envio

## 📱 Compatibilidade

- ✅ **Chrome/Chromium** (Recomendado)
- ✅ **Microsoft Edge**
- ✅ **Firefox**
- ✅ **Safari** (iOS/macOS)
- ✅ **Samsung Internet**
- ✅ **Opera**

## 🔄 Atualizações Recentes

### Versão 1.1 (Atual)
- ✅ Formatação corrigida das mensagens WhatsApp
- ✅ Valores em **negrito** usando asteriscos
- ✅ Quebras de linha reais (sem caracteres visíveis)
- ✅ Service Worker registrado automaticamente
- ✅ Interface otimizada para mobile

### Versão 1.0
- ✅ Versão inicial do PWA
- ✅ Funcionalidades básicas implementadas

## 👨‍💻 Desenvolvedor

**Feito com ❤️ por Everton Tezzon Ferreira**

### 📞 Suporte

Para dúvidas, sugestões ou melhorias, entre em contato através dos dados disponibilizados pelo desenvolvedor.