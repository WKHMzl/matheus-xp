document.addEventListener('DOMContentLoaded', function() {
    
    // --- INÍCIO LÓGICA OTIMIZADA PARA O HEADER ANIMADO (Digitação JS) ---
    const loadingSequenceDiv = document.getElementById('header-loading-sequence');
    const mainHeaderContentDiv = document.getElementById('header-main-content');
    const initiateAnalysisButton = document.getElementById('initiate-analysis-button');
    
    // const nomeDoColega = "Matheus"; // Você pode usar esta variável se precisar

    const textElements = [
        document.getElementById('load-line1'),
        document.getElementById('load-line2'),
        document.getElementById('load-line3')
    ];
    const loadingBarContainer = document.querySelector('.loading-bar-container');
    const loadingBarFill = document.getElementById('loading-bar-fill');

    // Ajuste estes valores para controlar a velocidade:
    const TYPING_SPEED_MS = 35;         // Milissegundos por caractere (menor = mais rápido)
    const PAUSE_BETWEEN_LINES_MS = 300; // Pausa entre o final de uma linha e o início da próxima
    const LOADING_BAR_DURATION_MS = 800; // Duração da animação da barra de loading
    const PAUSE_AFTER_BAR_MS = 150;     // Pequena pausa após a barra antes de mostrar o conteúdo

    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let typingTimeout;

    function typeCharacter() {
        if (currentLineIndex < textElements.length) {
            const currentLineElement = textElements[currentLineIndex];
            if (!currentLineElement) { // Adiciona verificação se o elemento existe
                console.warn(`Elemento de texto da linha ${currentLineIndex + 1} não encontrado.`);
                currentLineIndex++;
                currentCharIndex = 0;
                typeCharacter(); // Tenta a próxima linha
                return;
            }
            const textToType = currentLineElement.dataset.textContent || "";

            if (currentCharIndex < textToType.length) {
                currentLineElement.textContent += textToType.charAt(currentCharIndex);
                currentCharIndex++;
                typingTimeout = setTimeout(typeCharacter, TYPING_SPEED_MS);
            } else {
                // Linha concluída
                currentLineElement.classList.remove('typing'); // Para o cursor de piscar

                currentLineIndex++;
                currentCharIndex = 0;
                if (currentLineIndex < textElements.length) {
                    // Prepara próxima linha
                    const nextLineElement = textElements[currentLineIndex];
                    if (nextLineElement) {
                        nextLineElement.style.opacity = '1';
                        nextLineElement.classList.add('typing');
                    }
                    typingTimeout = setTimeout(typeCharacter, PAUSE_BETWEEN_LINES_MS);
                } else {
                    // Todas as linhas digitadas, iniciar barra de loading
                    if (loadingBarContainer) loadingBarContainer.style.opacity = '1';
                    if (loadingBarFill) {
                        loadingBarFill.style.width = '100%';
                        setTimeout(showMainHeaderContent, LOADING_BAR_DURATION_MS + PAUSE_AFTER_BAR_MS);
                    } else {
                        showMainHeaderContent(); // Se não houver barra
                    }
                }
            }
        }
    }
    
    function startLoadingAnimation() {
        // Limpa textos anteriores e reseta para a primeira linha
        textElements.forEach((el, index) => {
            if(el) {
                el.textContent = '';
                el.classList.remove('typing');
                el.style.opacity = (index === 0) ? '1' : '0'; // Só a primeira linha visível inicialmente
                if (index === 0) {
                    el.classList.add('typing'); // Adiciona cursor à primeira linha
                }
            }
        });

        currentLineIndex = 0;
        currentCharIndex = 0;
        clearTimeout(typingTimeout); // Limpa timeouts anteriores se houver
        typeCharacter();
    }

    function showMainHeaderContent() {
        if (loadingSequenceDiv) {
            loadingSequenceDiv.style.transition = 'opacity 0.4s ease-out';
            loadingSequenceDiv.style.opacity = '0';
            setTimeout(() => {
                loadingSequenceDiv.style.display = 'none';
            }, 400); // Mesmo tempo da transição de opacidade
        }
        if (mainHeaderContentDiv) {
            mainHeaderContentDiv.classList.remove('hidden-initially');
            void mainHeaderContentDiv.offsetWidth; 
            mainHeaderContentDiv.classList.add('visible-content');
        }
    }

    // Iniciar a animação de loading do header
    if (textElements.every(el => el) && loadingSequenceDiv && mainHeaderContentDiv) {
       setTimeout(startLoadingAnimation, 200); // Pequeno delay inicial para garantir que tudo carregou
    } else {
        console.warn("Elementos do header para animação de loading não encontrados. Mostrando conteúdo principal diretamente.");
        if (mainHeaderContentDiv) {
            mainHeaderContentDiv.classList.remove('hidden-initially');
            mainHeaderContentDiv.classList.add('visible-content');
        }
    }

    if (initiateAnalysisButton) {
        initiateAnalysisButton.addEventListener('click', function() {
            const primeiraDobra = document.getElementById('dobra1-meta-funil'); 
            if (primeiraDobra) {
                primeiraDobra.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    // --- FIM LÓGICA PARA O HEADER ANIMADO ---

    
    // --- INÍCIO DA LÓGICA PARA DOBRA 1: META-FUNIL INTERATIVO ---
    const metaFunnelCanvas = document.getElementById('meta-funnel-canvas');
    const metaDetailsPanel = document.getElementById('meta-funnel-details-panel-dobra1');
    const metaStageTitlePanel = document.getElementById('meta-stage-title-dobra1');
    const metaStageDescriptionPanel = document.getElementById('meta-stage-description-dobra1');
    const closeMetaDetailsButton = document.getElementById('close-meta-details-dobra1');
    const resetMetaPositionsButton = document.getElementById('reset-meta-funnel-positions');
    const simulateMetaFlowButton = document.getElementById('simulate-meta-funnel-flow');
    const metaConnectorSvg = document.getElementById('meta-connector-svg');

    // Dados ATUALIZADOS das etapas do meta-funil
    // Exemplo de um SVG simples para "Chat" (você deve obter os SVGs reais que deseja usar)
    const chatIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>';

    // Exemplo de um SVG simples para "Calendário"
    const calendarIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>';

    // E para o seu ícone de lâmpada (💡), você já está usando um emoji, o que é válido.
    // Se quiser um SVG:
    const lightbulbIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>';

    // E para WhatsApp, Site, Vídeo:
    const whatsappIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.712-1.005zm-2.985-4.965c-.078-.12-.273-.19-.57-.347-.297-.157-.592-.312-.942-.528-.35-.217-.608-.348-.867-.589-.258-.241-.39-.499-.39-.767s.131-.528.37-.737c.238-.208.528-.313.829-.313.302-.001.56.001.769.001.272.001.571-.003.87.479.3.482.51.965.51 1.093 0 .128-.07.273-.228.428-.158.156-.347.241-.57.241-.224 0-.428-.078-.616-.238-.188-.16-.404-.39-.683-.691-.279-.302-.503-.559-.683-.771-.18-.212-.27-.36-.27-.434s-.011-.188.078-.293c.089-.104.194-.17.312-.17.117 0 .223.046.339.131.115.085.208.191.33.404.122.212.217.347.287.404.147.147.293.223.479.223.188 0 .347-.079.479-.238.131-.159.198-.348.198-.568 0-.22-.06-.416-.18-.589-.12-.173-.301-.313-.542-.418-.241-.105-.502-.157-.781-.157h-.03c-.301 0-.602.052-.903.157-.301.104-.542.258-.722.463s-.27.45-.27.737c0 .348.12.659.36.928.24.27.608.559 1.092.867.484.308.904.559 1.242.768.339.209.608.36.797.463.189.104.306.209.357.36.098.273.098.616 0 .928-.098.313-.36.559-.797.737-.436.179-1.045.268-1.826.268-.301 0-.59-.011-.87-.03-.279-.02-.528-.04-.747-.06-.219-.02-.436-.04-.655-.06-.219-.02-.409-.02-.57-.02-.319 0-.592.078-.82.238-.228.159-.342.375-.342.647s.098.499.293.658c.195.159.422.238.681.238.259 0 .528-.078.808-.238.279-.159.502-.312.671-.462.17-.15.318-.241.447-.27.128-.03.258-.04.39-.04.24 0 .479.052.719.157s.422.258.542.462c.12.209.18.45.18.728zm3.263-4.007c.12-.078.179-.208.179-.386 0-.22-.078-.401-.238-.542s-.348-.209-.57-.209c-.222 0-.403.078-.542.238s-.209.347-.209.57c0 .22.079.401.238.542.159.141.348.211.57.211.222 0 .403-.079.541-.238z"/></svg>';
    const siteIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v10z"/></svg>';
    const videoIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>';


    // Atualize seu metaStageData:
    const metaStageData = {
        'whatsapp-inicial': {
            title: "Etapa 1: O Convite (WhatsApp)",
            description: "Você recebeu um vídeo criativo e uma mensagem: o ponto de partida para explorarmos juntos novas facetas da EasyChatia.",
            iconPlaceholder: whatsappIconSvg, // Usa a variável com o SVG
            bgColor: '#FF8C00' // Laranja
        },
        'criativo-video': {
            title: "Etapa 2: A Faísca (Vídeo VEO 3)",
            description: "Uma prévia visual e instigante, desenhada para acender a curiosidade e condução ao link encaminhado.",
            iconPlaceholder: videoIconSvg,
            bgColor: '#FFD700' // Amarelo
        },
        'pagina-apresentacao': {
            title: "Etapa 3: O Briefing Estratégico (Você está Aqui!)",
            description: "Esta plataforma interativa. Navegue pelas seções para descobrir análises e visões de futuro para a sua ferramenta.",
            iconPlaceholder: siteIconSvg,
            bgColor: '#FF69B4' // Rosa
        },
        'whatsapp-conversa': {
            title: "Etapa 4: Alinhamento (Chat WhatsApp)",
            description: "Após esta exploração, uma conversa direta para você questionar 'pra que tudo isso?' e eu falar (né?).",
            iconPlaceholder: chatIconSvg, // Usa a variável com o SVG
            bgColor: '#9370DB' // Roxo
        },
        'calendly-agendamento': {
            title: "Etapa 5: Aprofundamento (Agendamento)",
            description: "Calendly dançando, mas só depois que cantarmos o motivo.",
            iconPlaceholder: calendarIconSvg, // Usa a variável com o SVG
            bgColor: '#00BFFF' // Azul
        },
        'segredo-proposta': {
            title: "Etapa 6: Segredo",
            description: "Eu insisto.",
            iconPlaceholder: lightbulbIconSvg, // Usa a variável com o SVG (ou mantenha "💡")
            bgColor: '#32CD32' // Verde
        }
    };

    const metaCardElements = {}; 
    const initialMetaPositions = [
        { id: 'whatsapp-inicial', xPercent: 5, yPercent: 40 },
        { id: 'criativo-video', xPercent: 25, yPercent: 15 },
        { id: 'pagina-apresentacao', xPercent: 45, yPercent: 40 },
        { id: 'whatsapp-conversa', xPercent: 65, yPercent: 15 },
        { id: 'calendly-agendamento', xPercent: 85, yPercent: 40 },
        { id: 'segredo-proposta', xPercent: 50, yPercent: 75, anchor: 'center' }
    ];

    let activeMetaCardElement = null;
    let isMetaCardDragging = false;
    const META_DRAG_THRESHOLD_PX = 5;
    let metaPointerInitialX = 0, metaPointerInitialY = 0;
    let metaCardInitialElementOffsetX = 0, metaCardInitialElementOffsetY = 0;

    function createMetaFunnelCards() {
        if (!metaFunnelCanvas) {
            console.warn("Canvas do meta-funil (Dobra 1) não encontrado.");
            return;
        }
        const existingCards = metaFunnelCanvas.querySelectorAll('.meta-funnel-stage-card');
        existingCards.forEach(card => card.remove());
        Object.keys(metaCardElements).forEach(key => delete metaCardElements[key]); // Limpa o objeto

        const canvasWidth = metaFunnelCanvas.clientWidth;
        const canvasHeight = metaFunnelCanvas.clientHeight;

        initialMetaPositions.forEach(posData => {
            const stageKey = posData.id;
            const stage = metaStageData[stageKey];
            if (!stage) {
                console.warn(`Dados para a etapa ${stageKey} não encontrados.`);
                return;
            }

            const card = document.createElement('div');
            card.id = `meta-${stageKey}`;
            card.className = 'meta-funnel-stage-card';
            
            let cardLeft = (posData.xPercent / 100) * canvasWidth;
            let cardTop = (posData.yPercent / 100) * canvasHeight;
            
            const cardWidth = 160; 
            const cardHeight = 80; 

            if (posData.anchor === 'center') {
                cardLeft -= cardWidth / 2;
                cardTop -= cardHeight / 2;
            }
            cardLeft = Math.max(0, Math.min(cardLeft, canvasWidth - cardWidth));
            cardTop = Math.max(0, Math.min(cardTop, canvasHeight - cardHeight));

            card.style.left = `${cardLeft}px`;
            card.style.top = `${cardTop}px`;
            card.dataset.stageKey = stageKey;

            card.innerHTML = `
                <div class="meta-stage-icon" style="background-color: ${stage.bgColor};">
                    ${stage.iconPlaceholder}
                </div>
                <div class="meta-stage-name">${stage.title.substring(stage.title.indexOf(' ') + 1)}</div>
            `;

            metaFunnelCanvas.appendChild(card);
            metaCardElements[stageKey] = card;

            card.addEventListener('mousedown', onMetaPointerDown);
            card.addEventListener('touchstart', onMetaPointerDown, { passive: false });
        });
        drawMetaConnectors();
    }
    
    function getMetaCardConnectionPoint(cardId, fromSide = 'center', toSide = 'center') {
        const card = metaCardElements[cardId];
        if (!card) return { x: 0, y: 0 };

        const xPos = card.offsetLeft;
        const yPos = card.offsetTop;
        const width = card.offsetWidth;
        const height = card.offsetHeight;
        
        let point = { x: xPos + width / 2, y: yPos + height / 2 }; 

        switch (fromSide) { 
            case 'top':    point.y = yPos; break;
            case 'bottom': point.y = yPos + height; break;
            case 'left':   point.x = xPos; break;
            case 'right':  point.x = xPos + width; break;
        }
        // O toSide aqui na verdade deveria ser para o *outro* card,
        // mas a estrutura atual da função usa toSide para o *mesmo* card.
        // Para manter a lógica original, não vou alterar a assinatura,
        // mas a chamada em drawMetaConnectors é quem define o lado.
        // Se toSide fosse para ajustar o ponto do *próprio* card para chegada,
        // a lógica seria similar ao fromSide.
        // No entanto, o uso em drawMetaConnectors sugere que fromSide e toSide
        // são contextuais ao card de origem (from) e destino (to).

        return point;
    }

    function drawMetaConnectors() {
        if (!metaConnectorSvg || Object.keys(metaCardElements).length < 2) return;
        metaConnectorSvg.innerHTML = ''; 

        const connections = [
            { from: 'whatsapp-inicial', to: 'criativo-video', fromSide: 'right', toSide: 'left' },
            { from: 'criativo-video', to: 'pagina-apresentacao', fromSide: 'bottom', toSide: 'top' },
            { from: 'pagina-apresentacao', to: 'whatsapp-conversa', fromSide: 'right', toSide: 'left' },
            { from: 'whatsapp-conversa', to: 'calendly-agendamento', fromSide: 'bottom', toSide: 'top' },
            { from: 'calendly-agendamento', to: 'segredo-proposta', fromSide: 'bottom', toSide: 'top' }
        ];
        
        let defs = metaConnectorSvg.querySelector('defs');
        if (!defs) {
            defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
            marker.setAttribute('id', 'meta-arrowhead-dobra1');
            marker.setAttribute('markerWidth', '10');
            marker.setAttribute('markerHeight', '7');
            marker.setAttribute('refX', '8'); 
            marker.setAttribute('refY', '3.5');
            marker.setAttribute('orient', 'auto');
            const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
            polygon.setAttribute('class', 'arrow-head'); 
            marker.appendChild(polygon); // Adiciona o polygon ao marker
            defs.appendChild(marker);    // Adiciona o marker ao defs
            metaConnectorSvg.appendChild(defs); // Adiciona o defs ao SVG
        }

        connections.forEach(conn => {
            const startCard = metaCardElements[conn.from];
            const endCard = metaCardElements[conn.to];

            if (!startCard || !endCard) return;

            // Ajuste aqui: getMetaCardConnectionPoint deve usar o lado do respectivo card
            const startPoint = getMetaCardConnectionPoint(conn.from, conn.fromSide); 
            const endPoint = getMetaCardConnectionPoint(conn.to, conn.toSide);


            if (startPoint && endPoint && (startPoint.x !== 0 || startPoint.y !== 0) && (endPoint.x !== 0 || endPoint.y !== 0)) {
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                let d;
                const dx = endPoint.x - startPoint.x;
                const dy = endPoint.y - startPoint.y;
                
                // Fator de curvatura (pode ser ajustado)
                // Para conexões horizontais (direita para esquerda), a curva é vertical
                // Para conexões verticais (baixo para cima), a curva é horizontal
                const curveFactor = 0.4; // Aumentar para mais "barriga"
                let cp1x, cp1y, cp2x, cp2y;

                if (conn.fromSide === 'right' && conn.toSide === 'left') { // Conexão horizontal
                    const midY = startPoint.y + dy / 2;
                    cp1x = startPoint.x + dx * curveFactor;
                    cp1y = startPoint.y; //startPoint.y - dy * (dx > 0 ? curveFactor : -curveFactor) ; //startPoint.y;
                    cp2x = endPoint.x - dx * curveFactor;
                    cp2y = endPoint.y; //endPoint.y + dy * (dx > 0 ? curveFactor : -curveFactor); //endPoint.y;
                    d = `M ${startPoint.x} ${startPoint.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endPoint.x} ${endPoint.y}`;
                } else if (conn.fromSide === 'bottom' && conn.toSide === 'top') { // Conexão vertical
                    cp1x = startPoint.x; //startPoint.x + dx * (dy > 0 ? curveFactor : -curveFactor); //startPoint.x;
                    cp1y = startPoint.y + dy * curveFactor;
                    cp2x = endPoint.x; //endPoint.x - dx * (dy > 0 ? curveFactor : -curveFactor); //endPoint.x;
                    cp2y = endPoint.y - dy * curveFactor;
                    d = `M ${startPoint.x} ${startPoint.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endPoint.x} ${endPoint.y}`;
                } else { 
                    // Fallback para linha reta se a combinação de lados não for tratada especificamente para curva
                    d = `M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`;
                }
                
                path.setAttribute('d', d);
                path.setAttribute('marker-end', 'url(#meta-arrowhead-dobra1)');
                metaConnectorSvg.appendChild(path);
            }
        });
    }

    function onMetaPointerDown(e) {
        activeMetaCardElement = this;
        isMetaCardDragging = false; // Reset a flag de arrasto
        activeMetaCardElement.classList.add('is-dragging-meta');

        metaCardInitialElementOffsetX = activeMetaCardElement.offsetLeft;
        metaCardInitialElementOffsetY = activeMetaCardElement.offsetTop;

        if (e.type === "touchstart") {
            metaPointerInitialX = e.touches[0].clientX;
            metaPointerInitialY = e.touches[0].clientY;
            document.addEventListener('touchmove', onMetaPointerMove, { passive: false });
            document.addEventListener('touchend', onMetaPointerUp);
        } else { 
            metaPointerInitialX = e.clientX;
            metaPointerInitialY = e.clientY;
            document.addEventListener('mousemove', onMetaPointerMove);
            document.addEventListener('mouseup', onMetaPointerUp);
        }
    }

    function onMetaPointerMove(e) {
        if (!activeMetaCardElement) return;

        let currentPointerX, currentPointerY;
        if (e.type === "touchmove") {
            currentPointerX = e.touches[0].clientX;
            currentPointerY = e.touches[0].clientY;
        } else { 
            currentPointerX = e.clientX;
            currentPointerY = e.clientY;
        }

        const deltaX = currentPointerX - metaPointerInitialX;
        const deltaY = currentPointerY - metaPointerInitialY;

        if (!isMetaCardDragging && (Math.abs(deltaX) > META_DRAG_THRESHOLD_PX || Math.abs(deltaY) > META_DRAG_THRESHOLD_PX)) {
            isMetaCardDragging = true; // Inicia o arrasto
        }
        
        if (isMetaCardDragging) { 
            e.preventDefault(); 
            let newLeft = metaCardInitialElementOffsetX + deltaX;
            let newTop = metaCardInitialElementOffsetY + deltaY;

            const canvasWidth = metaFunnelCanvas.clientWidth;
            const canvasHeight = metaFunnelCanvas.clientHeight;
            const cardWidth = activeMetaCardElement.offsetWidth;
            const cardHeight = activeMetaCardElement.offsetHeight;
            const padding = 5; 

            newLeft = Math.max(padding, Math.min(newLeft, canvasWidth - cardWidth - padding));
            newTop = Math.max(padding, Math.min(newTop, canvasHeight - cardHeight - padding));

            activeMetaCardElement.style.left = `${newLeft}px`;
            activeMetaCardElement.style.top = `${newTop}px`;
            drawMetaConnectors();
        }
    }

    function onMetaPointerUp() {
        if (!activeMetaCardElement) return;

        if (!isMetaCardDragging) { 
            const stageKey = activeMetaCardElement.dataset.stageKey;
            const details = metaStageData[stageKey];
            if (details && metaStageTitlePanel && metaStageDescriptionPanel && metaDetailsPanel) {
                metaStageTitlePanel.textContent = details.title;
                metaStageDescriptionPanel.textContent = details.description;
                if (window.innerWidth < 992) { 
                    metaDetailsPanel.style.display = 'block';
                    metaDetailsPanel.classList.remove('details-panel-hidden'); // Para CSS
                } else { 
                    metaDetailsPanel.style.display = 'block'; 
                    metaDetailsPanel.classList.remove('details-panel-hidden'); // Para CSS
                }
                
                document.querySelectorAll('.meta-funnel-stage-card').forEach(c => c.classList.remove('active-meta-stage'));
                activeMetaCardElement.classList.add('active-meta-stage');
            }
        }
        
        activeMetaCardElement.classList.remove('is-dragging-meta');
        activeMetaCardElement = null; 
        isMetaCardDragging = false; // Reseta a flag aqui também

        document.removeEventListener('touchmove', onMetaPointerMove);
        document.removeEventListener('touchend', onMetaPointerUp);
        document.removeEventListener('mousemove', onMetaPointerMove);
        document.removeEventListener('mouseup', onMetaPointerUp);
    }
    
    if (closeMetaDetailsButton && metaDetailsPanel) {
        closeMetaDetailsButton.addEventListener('click', () => {
            if (window.innerWidth < 992) { 
                metaDetailsPanel.style.display = 'none';
                metaDetailsPanel.classList.add('details-panel-hidden'); // Para CSS
            }
            document.querySelectorAll('.meta-funnel-stage-card').forEach(c => c.classList.remove('active-meta-stage'));
        });
    }

    if (resetMetaPositionsButton) {
        resetMetaPositionsButton.addEventListener('click', () => {
            createMetaFunnelCards(); // Recria os cards e já chama drawMetaConnectors
            if(metaStageTitlePanel) metaStageTitlePanel.textContent = "Início da Exploração";
            if(metaStageDescriptionPanel) metaStageDescriptionPanel.textContent = "Esta é a jornada que preparamos para você, Matheus, visualizar o potencial máximo da EasyChatia. Clique ou arraste uma etapa para começar.";
            if(metaDetailsPanel) {
                 metaDetailsPanel.style.display = 'block';
                 metaDetailsPanel.classList.remove('details-panel-hidden'); // Para CSS
            }
            document.querySelectorAll('.meta-funnel-stage-card').forEach(c => c.classList.remove('active-meta-stage'));
        });
    }
    
    if (simulateMetaFlowButton) {
        let simulationMetaTimeout;
        simulateMetaFlowButton.addEventListener('click', () => {
            if (!metaDetailsPanel || !metaStageTitlePanel || !metaStageDescriptionPanel) return;
            clearTimeout(simulationMetaTimeout);
            let delay = 0;
            const duration = 1200;
            const interval = 300;
            const stagesInOrder = initialMetaPositions.map(p => p.id);

            document.querySelectorAll('.meta-funnel-stage-card').forEach(card => card.classList.remove('active-meta-stage'));
            metaDetailsPanel.style.display = 'block'; 
            metaDetailsPanel.classList.remove('details-panel-hidden'); // Para CSS

            stagesInOrder.forEach((stageKey, index) => {
                simulationMetaTimeout = setTimeout(() => {
                    if (index > 0) {
                        const prevCard = metaCardElements[stagesInOrder[index - 1]];
                        if (prevCard) prevCard.classList.remove('active-meta-stage');
                    }
                    const currentCard = metaCardElements[stageKey];
                    const details = metaStageData[stageKey];
                    if (currentCard && details) {
                        currentCard.classList.add('active-meta-stage');
                        metaStageTitlePanel.textContent = details.title;
                        metaStageDescriptionPanel.textContent = details.description;
                        
                        if (metaFunnelCanvas.scrollHeight > metaFunnelCanvas.clientHeight) {
                            const cardTopRelativeToCanvas = currentCard.offsetTop;
                            const cardBottomRelativeToCanvas = currentCard.offsetTop + currentCard.offsetHeight;
                            if (cardTopRelativeToCanvas < metaFunnelCanvas.scrollTop || cardBottomRelativeToCanvas > metaFunnelCanvas.scrollTop + metaFunnelCanvas.clientHeight) {
                                metaFunnelCanvas.scrollTo({
                                    top: cardTopRelativeToCanvas - (metaFunnelCanvas.clientHeight / 2) + (currentCard.offsetHeight / 2),
                                    behavior: 'smooth'
                                });
                            }
                        }
                    }
                    if (index === stagesInOrder.length - 1) {
                        setTimeout(() => {
                            if (currentCard) currentCard.classList.remove('active-meta-stage');
                        }, duration);
                    }
                }, delay);
                delay += duration + interval;
            });
        });
    }

    // Inicialização da Dobra 1
    if (metaFunnelCanvas) {
        createMetaFunnelCards(); 
        setTimeout(() => { // Delay para garantir que o canvas tenha dimensões
            drawMetaConnectors();
             if(metaStageTitlePanel && metaStageDescriptionPanel && metaDetailsPanel) {
                  metaStageTitlePanel.textContent = "Início da Exploração";
                  metaStageDescriptionPanel.textContent = "Esta é a jornada que preparamos para você, Matheus, visualizar o potencial máximo da EasyChatia. Clique ou arraste uma etapa para começar.";
                  if (window.innerWidth >= 992 || !document.querySelector('.meta-funnel-stage-card.active-meta-stage')) {
                      metaDetailsPanel.style.display = 'block'; 
                      metaDetailsPanel.classList.remove('details-panel-hidden');
                  } else {
                      metaDetailsPanel.style.display = 'none';
                      metaDetailsPanel.classList.add('details-panel-hidden');
                  }
             }
        }, 100); 

        window.addEventListener('resize', () => {
            // Apenas redesenha conectores e reposiciona os cards baseados nas posições iniciais percentuais
            // Se quiser manter posições arrastadas, precisaria de lógica mais complexa
            if (metaFunnelCanvas.clientWidth > 0 && metaFunnelCanvas.clientHeight > 0) { 
                Object.values(metaCardElements).forEach(card => {
                    const stageKey = card.dataset.stageKey;
                    const posData = initialMetaPositions.find(p => p.id === stageKey);
                    if (posData) {
                        let cardLeft = (posData.xPercent / 100) * metaFunnelCanvas.clientWidth;
                        let cardTop = (posData.yPercent / 100) * metaFunnelCanvas.clientHeight;
                        const cardWidth = card.offsetWidth; // Usa a largura real do card
                        const cardHeight = card.offsetHeight; // Usa a altura real do card
                        if (posData.anchor === 'center') {
                            cardLeft -= cardWidth / 2;
                            cardTop -= cardHeight / 2;
                        }
                        card.style.left = `${Math.max(0, Math.min(cardLeft, metaFunnelCanvas.clientWidth - cardWidth))}px`;
                        card.style.top = `${Math.max(0, Math.min(cardTop, metaFunnelCanvas.clientHeight - cardHeight))}px`;
                    }
                });
                drawMetaConnectors();
            }
        });
        
    } else {
        console.warn("Elemento #meta-funnel-canvas (Dobra 1) não encontrado.");
    }
    // --- FIM LÓGICA PARA DOBRA 1 ---


// --- INÍCIO DA LÓGICA PARA DOBRA 2 - PERFIL FORENSE ---
const forensicBoardD2 = document.getElementById('forensic-board');
const forensicDetailsPanelD2 = document.getElementById('forensic-details-panel-dobra2');
const forensicClueTitleD2 = document.getElementById('forensic-clue-title-dobra2');
const closeForensicPanelButtonD2 = document.getElementById('close-forensic-panel-dobra2');

const dataDemographicSpanD2 = document.getElementById('data-demographic');
const dataPsychographicSpanD2 = document.getElementById('data-psychographic');
const dataBehavioralSpanD2 = document.getElementById('data-behavioral');
const dataInsightSpanD2 = document.getElementById('data-insight');

// --- INÍCIO DA LÓGICA PARA DOBRA 2 - PERFIL FORENSE ---
// (Mantenha as declarações de constantes para os elementos do DOM como antes)
// const forensicBoardD2 = ...
// const forensicDetailsPanelD2 = ...
// etc.

// DADOS ATUALIZADOS E PERSONALIZADOS PARA AS PISTAS (DOBRA 2):
const forensicClueDataD2 = {
    'avatar_pioneiro_resiliente': {
        title: "O Pioneiro Resiliente",
        demographic: "Jovem empreendedor (origens no Piauí), com histórico de superar adversidades desde cedo e transformar desafios em motor de crescimento (ex: investimento inicial em cripto).",
        psychographic: "Visão aguçada para novas tecnologias (criptomoedas), resiliência notável, automotivado para projetos de impacto, evoluindo de uma persona pública para um perfil mais estratégico e reservado.",
        behavioral: "Investe em tecnologia disruptiva, proativamente constrói soluções para otimizar suas próprias operações (como a gênese da EasyChatIA), focado em resultados e eficiência.",
        insight: "Para este perfil, a EasyChatIA não é apenas uma ferramenta, mas a materialização da sua filosofia de otimização e superação, permitindo escalar com inteligência."
    },
    'avatar_construtor_automatico': {
        title: "O Arquiteto da Automação",
        demographic: "Perfil técnico e empreendedor que não apenas utiliza, mas CRIA ferramentas de automação para resolver problemas práticos, visando eficiência e escalabilidade.",
        psychographic: "Interesse genuíno por tecnologia que simplifica e potencializa. Pragmatismo em aplicar conhecimento técnico para ganhos reais ('preguiçoso inteligente').",
        behavioral: "Desenvolveu a EasyChatIA inicialmente para uso próprio, demonstrando a capacidade de identificar uma dor e construir a solução de forma autônoma.",
        insight: "Entende o 'core' da automação. A EasyChatIA é um reflexo dessa habilidade, e há um vasto campo para evoluir e integrar ainda mais essa visão."
    },
    'avatar_multi_negocios': {
        title: "O Gestor Multi-Empresarial",
        demographic: "Empresário que equilibra com sucesso negócios consolidados (logística com 19 colaboradores) e novas frentes de alto crescimento (marketing digital, e-books).",
        psychographic: "Capacidade de gerenciar múltiplos projetos e equipes, visão estratégica para identificar e capitalizar em mercados emergentes (ex: LATAM para e-books).",
        behavioral: "Opera em setores distintos (logística física e produtos digitais), buscando sinergias e otimizações em cada um. Conexões com iniciativas de investimento (Investe Piauí).",
        insight: "A EasyChatIA pode ser um hub de comunicação inteligente para seus diversos empreendimentos, otimizando desde o suporte na logística até a venda de infoprodutos."
    },
    'avatar_estrategista_global': {
        title: "O Estrategista com Visão Global",
        demographic: "Empreendedor com atuação comprovada em mercados internacionais, especificamente na América Latina, com resultados financeiros expressivos (centenas de milhares com e-books).",
        psychographic: "Mentalidade de expansão, adaptabilidade a diferentes culturas de mercado, busca por crescimento exponencial além das fronteiras nacionais.",
        behavioral: "Já desbravou o mercado LATAM com produtos digitais, indicando familiaridade com as nuances e potencial da região.",
        insight: "A EasyChatIA tem um potencial imenso de expansão para a LATAM sob esta liderança, aproveitando o know-how já existente em marketing e vendas para este público."
    },
    'avatar_tech_lifestyle': {
        title: "Tech-Driven & Lifestyle Focused",
        demographic: "Jovem que alia sucesso nos negócios com um estilo de vida que valoriza bem-estar e experiências (mora na praia, gosta de viagens), financiado por inteligência em tecnologia.",
        psychographic: "Valoriza liberdade e flexibilidade, aprecia a tecnologia como facilitadora (games, automações), equilíbrio entre trabalho focado e lazer. Humildade e sensatez.",
        behavioral: "Adoção precoce de tecnologias (cripto), busca por qualidade de vida, mantém laços familiares fortes, presença digital consciente e mais reservada atualmente.",
        insight: "A EasyChatIA é a ferramenta perfeita para quem busca otimizar negócios para manter um lifestyle desejado, automatizando para liberar tempo e recursos."
    },
    'avatar_influenciador_discreto': {
        title: "O Conector de Alto Impacto",
        demographic: "Indivíduo que, mesmo com um perfil mais reservado nos últimos anos, construiu uma base de credibilidade e demonstra um desejo genuíno de ajudar outros a alcançar o sucesso.",
        psychographic: "Liderança pelo exemplo, humildade, forte conexão com valores (família), capacidade de inspirar e compartilhar conhecimento (Instagram anterior).",
        behavioral: "Transição de uma comunicação mais aberta para uma mais focada, mas mantendo a essência de impactar positivamente seu círculo e além.",
        insight: "Este perfil pode alavancar a EasyChatIA não só como usuário, mas como um case de sucesso e um ponto de conexão para outros empreendedores visionários."
    }
};

if (forensicBoardD2 && forensicDetailsPanelD2 && forensicClueTitleD2 && dataDemographicSpanD2 && dataPsychographicSpanD2 && dataBehavioralSpanD2 && dataInsightSpanD2) {
    const clueCardsDobra2 = forensicBoardD2.querySelectorAll('.clue-card');

    clueCardsDobra2.forEach(card => {
        card.addEventListener('click', function() {
            const clueId = this.dataset.clueId;
            const data = forensicClueDataD2[clueId];
            const clueCardTitleElement = this.querySelector('.clue-title'); 

            if (data) {
                forensicClueTitleD2.textContent = clueCardTitleElement ? clueCardTitleElement.textContent : data.title;
                dataDemographicSpanD2.innerHTML = data.demographic ? data.demographic.replace(/\n/g, '<br>') : "N/A";
                dataPsychographicSpanD2.innerHTML = data.psychographic ? data.psychographic.replace(/\n/g, '<br>') : "N/A";
                dataBehavioralSpanD2.innerHTML = data.behavioral ? data.behavioral.replace(/\n/g, '<br>') : "N/A";
                dataInsightSpanD2.innerHTML = data.insight ? data.insight.replace(/\n/g, '<br>') : "N/A";
                
                forensicDetailsPanelD2.style.display = 'block';
                forensicDetailsPanelD2.classList.remove('details-panel-hidden');

                clueCardsDobra2.forEach(c => c.classList.remove('active-clue'));
                this.classList.add('active-clue');

            } else {
                console.warn(`Dados para a pista ${clueId} não encontrados.`);
                forensicClueTitleD2.textContent = "Detalhes da Pista";
                dataDemographicSpanD2.textContent = "Informação não disponível.";
                dataPsychographicSpanD2.textContent = "Informação não disponível.";
                dataBehavioralSpanD2.textContent = "Informação não disponível.";
                dataInsightSpanD2.textContent = "Informação não disponível.";
            }
        });
    });

    if (closeForensicPanelButtonD2) {
        closeForensicPanelButtonD2.addEventListener('click', () => {
            forensicDetailsPanelD2.style.display = 'none';
            forensicDetailsPanelD2.classList.add('details-panel-hidden');
            clueCardsDobra2.forEach(c => c.classList.remove('active-clue'));
        });
    }
    
    // Estado inicial do painel de detalhes na Dobra 2
    if (window.innerWidth >= 992) { 
        forensicDetailsPanelD2.style.display = 'block';
        forensicDetailsPanelD2.classList.remove('details-panel-hidden');
        forensicClueTitleD2.textContent = "Análise da Evidência do Perfil"; // Título genérico inicial
        dataDemographicSpanD2.innerHTML = "Clique em uma evidência à esquerda para ver os detalhes."; // Instrução inicial
        dataPsychographicSpanD2.innerHTML = ""; 
        dataBehavioralSpanD2.innerHTML = "";
        dataInsightSpanD2.innerHTML = "";
    } else { // Em mobile, começa escondido
        forensicDetailsPanelD2.style.display = 'none';
        forensicDetailsPanelD2.classList.add('details-panel-hidden');
    }

} else {
    console.warn("Um ou mais elementos da Dobra 2 (Perfil Forense) não foram encontrados para inicializar o JS.");
}
// --- FIM LÓGICA DOBRA 2 ---

    // --- INÍCIO DA LÓGICA PARA DOBRA 3 - MAPA ESTRATÉGICO INTERATIVO ---
    const strategyNodes = document.querySelectorAll('.strategy-node');
    const strategyDetailsPanel = document.getElementById('strategy-details-panel');
    const closeStrategyDetailsButton = document.getElementById('close-strategy-details');

    const strategyDetailTitle = document.getElementById('strategy-detail-title');
    const strategyDetailStatus = document.getElementById('strategy-detail-status');
    const strategyDetailProposalList = document.getElementById('strategy-detail-proposal');
    const strategyDetailContributionList = document.getElementById('strategy-detail-contribution');

    // Dados dos Planos de Expansão (espelhando o HTML original e adicionando detalhes)
    const expansionPlansData = {
        'latam': {
            title: "Missão: Conquistar a LATAM",
            status: "Inteligência de Mercado Coletada",
            statusClass: "status-collected",
            proposal: [
                "Adaptação cultural e linguística (Espanhol fluente é um plus).",
                "Parcerias com influenciadores/empresas locais chave.",
                "Funis de venda e marketing de conteúdo otimizados para o público hispânico.",
                "Suporte ao cliente adaptado às necessidades regionais."
            ],
            contribution: [
                "Pesquisa de mercado aprofundada e análise de concorrência na LATAM.",
                "Desenvolvimento e adaptação de copywriting e materiais de marketing.",
                "Planejamento e gestão de campanhas de lançamento segmentadas.",
                "Identificação e negociação com parceiros estratégicos locais."
            ]
        },
        'ecommerce': {
            title: "Alvo: Dominar em E-commerces",
            status: "Análise de Sinergia em Andamento",
            statusClass: "status-analysis",
            proposal: [
                "Integração nativa/facilitada com plataformas populares (Shopify, WooCommerce, etc.).",
                "Funis de recuperação de carrinho abandonado via WhatsApp.",
                "Suporte automatizado para FAQs de produtos e status de pedidos.",
                "Notificações proativas (confirmação, envio, entrega)."
            ],
            contribution: [
                "Mapeamento de requisitos técnicos para integrações.",
                "Criação de fluxos de automação específicos para e-commerce.",
                "Desenvolvimento de estratégias de marketing para atrair lojistas.",
                "Criação de conteúdo educativo sobre como usar EasyChatia para e-commerce."
            ]
        },
        'creators': {
            title: "Nicho: Influencers & Freelancers",
            status: "Prototipagem de Solução em Vista",
            statusClass: "status-prototyping",
            proposal: [
                "Planos de entrada acessíveis com funcionalidades essenciais.",
                "Funis para agendamento de consultorias e venda de serviços/infoprodutos.",
                "Automação de respostas para DMs e comentários frequentes.",
                "Criação de comunidades VIP gerenciadas via EasyChatia."
            ],
            contribution: [
                "Definição da Proposta Única de Valor (PUV) para este público.",
                "Criação de templates de funis e fluxos de mensagens.",
                "Estratégias de marketing de conteúdo para atrair freelancers e influenciadores.",
                "Desenvolvimento de parcerias com plataformas de criadores."
            ]
        },
        'logistica': {
            title: "Setor Especial: Logística Inteligente",
            status: "Conhecimento de Campo Aplicável!",
            statusClass: "status-applicable",
            proposal: [
                "Adaptação da IA para rastreamento de cargas em tempo real.",
                "Agendamento e confirmação automatizada de coletas/entregas.",
                "Canal de cotações rápidas e SAC especializado para transportadoras.",
                "Notificações proativas para clientes sobre o status da entrega."
            ],
            contribution: [
                "Desenvolvimento de fluxos de conversa específicos para o setor logístico.",
                "Consultoria na adaptação e teste da ferramenta para este nicho.",
                "Criação de cases de uso e materiais de venda para empresas de logística.",
                "Identificação de dores específicas do setor que a EasyChatia pode resolver."
            ]
        }
    };

    if (strategyNodes.length > 0 && strategyDetailsPanel && closeStrategyDetailsButton && strategyDetailTitle && strategyDetailStatus && strategyDetailProposalList && strategyDetailContributionList) {
        
        strategyNodes.forEach(node => {
            node.addEventListener('click', function() {
                const planId = this.dataset.planId;
                const planData = expansionPlansData[planId];

                if (planData) {
                    // Preencher o painel
                    strategyDetailTitle.textContent = planData.title;
                    strategyDetailStatus.textContent = planData.status;
                    strategyDetailStatus.className = planData.statusClass; // Para estilizar o span do status se necessário

                    // Limpar listas anteriores e preencher novas
                    strategyDetailProposalList.innerHTML = '';
                    planData.proposal.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        strategyDetailProposalList.appendChild(li);
                    });

                    strategyDetailContributionList.innerHTML = '';
                    planData.contribution.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        strategyDetailContributionList.appendChild(li);
                    });

                    // Remover classe 'active-node' de outros nós e adicionar ao clicado
                    strategyNodes.forEach(n => n.classList.remove('active-node'));
                    this.classList.add('active-node');

                    // Mostrar o painel
                    strategyDetailsPanel.classList.remove('details-panel-hidden');
                }
            });
        });

        closeStrategyDetailsButton.addEventListener('click', function() {
            strategyDetailsPanel.classList.add('details-panel-hidden');
            strategyNodes.forEach(n => n.classList.remove('active-node')); // Remover destaque do nó
        });

    } else {
        console.warn("Elementos da Dobra 3 (Mapa Estratégico) não foram todos encontrados para inicializar o JS.");
    }
    // --- FIM LÓGICA DOBRA 3 ---

    // --- INÍCIO DA LÓGICA PARA DOBRA 4 - ARQUITETURA DA PERFORMANCE ---
    const departmentModules = document.querySelectorAll('#dobra4-arquitetura-performance .department-module');

    if (departmentModules.length > 0) {
        departmentModules.forEach(module => {
            const synergyDetails = module.querySelector('.synergy-details');

            // Adiciona listener de clique apenas se houver detalhes de sinergia
            if (synergyDetails) {
                module.addEventListener('click', function() {
                    // Fecha outros módulos expandidos (opcional, para ter apenas um aberto por vez)
                    /*
                    departmentModules.forEach(otherModule => {
                        if (otherModule !== module && otherModule.classList.contains('expanded')) {
                            otherModule.classList.remove('expanded');
                        }
                    });
                    */
                    
                    // Alterna a classe 'expanded' no módulo clicado
                    this.classList.toggle('expanded');
                });
            } else {
                // Para módulos sem synergy-details, podemos adicionar um feedback visual diferente ou nenhum
                module.style.cursor = 'default'; // Ou mantenha 'pointer' e adicione um efeito visual sutil
            }
        });
    } else {
        console.warn("Módulos de departamento da Dobra 4 não encontrados.");
    }
// --- FIM LÓGICA DOBRA 4 ---

    // --- INÍCIO DA LÓGICA PARA DOBRA 7 - CTA WHATSAPP ---
    const finalWhatsAppLink = document.getElementById('final-whatsapp-link');
    if (finalWhatsAppLink) {
        // IMPORTANTE: Substitua "SEU_NUMERO_DE_TELEFONE_AQUI" pelo número real, incluindo o código do país (ex: 55119XXXXXXXX para Brasil, SP)
        const numeroTelefone = "SEU_NUMERO_DE_TELEFONE_AQUI"; 
        const mensagemPadrao = `Olá! Naveguei pela apresentação estratégica da EasyChatia e gostaria de entender o 'porquê' por trás de tudo isso. Podemos conversar?`;
        
        if (numeroTelefone === "SEU_NUMERO_DE_TELEFONE_AQUI" || numeroTelefone.trim() === "") {
            console.warn("Número de telefone para o WhatsApp não configurado na Dobra 7.");
            finalWhatsAppLink.addEventListener('click', (e) => {
                e.preventDefault();
                alert("O link de contato ainda não foi configurado. Por favor, avise o desenvolvedor.");
            });
        } else {
            const linkWhatsapp = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${encodeURIComponent(mensagemPadrao)}`;
            finalWhatsAppLink.setAttribute('href', linkWhatsapp);
            finalWhatsAppLink.setAttribute('target', '_blank'); // Abrir em nova aba
        }
    } else {
        console.warn("Link do WhatsApp (#final-whatsapp-link) não encontrado na Dobra 7.");
    }

    // --- INÍCIO DA LÓGICA PARA DOBRA 5 - FLUXOGRAMA DE COMPETÊNCIAS ---
    const skillNodesD5 = document.querySelectorAll('#dobra5-meu-arsenal .skill-node');

    if (skillNodesD5.length > 0) {
        // 1. Interatividade ao clicar para mostrar a "prova"
        skillNodesD5.forEach(node => {
            const proofText = node.dataset.proofText;
            const proofDiv = node.querySelector('.skill-proof');

            if (proofText && proofDiv) {
                proofDiv.textContent = proofText; // Preenche o div de prova

                node.addEventListener('click', function() {
                    // Opcional: fechar outros abertos
                    // skillNodesD5.forEach(otherNode => {
                    //     if (otherNode !== this) {
                    //         otherNode.classList.remove('showing-proof');
                    //     }
                    // });
                    this.classList.toggle('showing-proof');
                });
            } else {
                node.style.cursor = 'default'; // Se não há prova, não faz nada ao clicar
            }
        });

        // 2. Animação de revelação progressiva ao rolar (Intersection Observer)
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.2 // 20% do elemento visível
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('skill-node-visible'); // Adiciona classe para animar
                    // Se quiser animar setas também, precisaria de uma lógica similar para elas
                    observer.unobserve(entry.target); // Observa apenas uma vez
                }
            });
        };

        const skillObserver = new IntersectionObserver(observerCallback, observerOptions);
        skillNodesD5.forEach(node => {
            skillObserver.observe(node);
        });

        // Para as setas (se quiser animá-las também)
        const flowArrowsD5 = document.querySelectorAll('#dobra5-meu-arsenal .flow-arrow');
        flowArrowsD5.forEach(arrow => {
            skillObserver.observe(arrow); // Reutiliza o mesmo observer e callback (ajuste a classe no callback se precisar de animação diferente)
        });

    } else {
        console.warn("Nós de habilidade da Dobra 5 não encontrados.");
    }

    // Adicione esta classe ao seu CSS para a animação de entrada dos nós/setas:
    /*
    .skill-node, .flow-arrow {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .skill-node.skill-node-visible, .flow-arrow.skill-node-visible { // Usando a mesma classe para simplicidade
        opacity: 1;
        transform: translateY(0);
    }
    */
    // --- FIM LÓGICA DOBRA 5 ---

    // --- INÍCIO DA LÓGICA OPCIONAL PARA ANIMAÇÃO NA DOBRA 6 ---
    const narrativeBlocksD6 = document.querySelectorAll('#dobra6-narrativa-logistica .narrative-block, #dobra6-narrativa-logistica .narrative-connector-arrow');

    if (narrativeBlocksD6.length > 0) {
        const observerOptionsD6 = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // 15% do elemento visível
        };

        const observerCallbackD6 = (entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Adiciona um delay escalonado para cada elemento
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                    entry.target.classList.add('narrative-element-visible');
                    observer.unobserve(entry.target);
                }
            });
        };

        const narrativeObserverD6 = new IntersectionObserver(observerCallbackD6, observerOptionsD6);
        narrativeBlocksD6.forEach(block => {
            narrativeObserverD6.observe(block);
        });
    }
    // --- FIM LÓGICA OPCIONAL DOBRA 6 ---

    // --- INÍCIO DA LÓGICA REFEITA PARA DOBRA 7 - O CONVITE ---
    const dobra7SectionEl = document.getElementById('dobra7-convite-final');
    const finalCtaButtonElD7 = document.getElementById('final-whatsapp-button-d7'); // ID do botão atualizado

    // Parte 1: Configurar o link do WhatsApp IMEDIATAMENTE
    if (finalCtaButtonElD7) {
        const directWhatsAppLink = "https://wa.me/5511977506530?text=Pra%20que%20tudo%20isso%3F"; // Link exato fornecido
        finalCtaButtonElD7.setAttribute('href', directWhatsAppLink);
        finalCtaButtonElD7.setAttribute('target', '_blank'); // Garante que abra em nova aba
        console.log("Link do WhatsApp (Dobra 7) configurado DIRETAMENTE para:", directWhatsAppLink);

        // O botão começa com a classe 'cta-btn-hidden-d7', o JS de animação vai torná-lo visível.
        // Não adicionamos mais o listener de alerta aqui, pois o link será funcional.
    } else {
        console.warn("Botão final do WhatsApp (#final-whatsapp-button-d7) não encontrado.");
    }

    // Parte 2: Animações (se os elementos existirem)
    const ctaStatusSequenceElD7 = document.getElementById('cta-status-sequence-d7');
    const statusLine1ElD7 = document.getElementById('status-line-1-d7');
    const statusLine2ElD7 = document.getElementById('status-line-2-d7');
    const statusLine3ElD7 = document.getElementById('status-line-3-d7');
    const ctaQuestionTextElD7 = document.querySelector('#dobra7-convite-final .cta-question-text-d7');
    const ctaNoteElD7 = document.querySelector('#dobra7-convite-final .cta-note-text-d7');

    const statusMessagesD7_revised = [
        "> ANÁLISE ESTRATÉGICA CONCLUÍDA...",
        "> POTENCIAL DE SINERGIA IDENTIFICADO...",
        "> PRÓXIMO PASSO: ALINHAMENTO DIRETO."
    ];
    const statusElementsD7_revised = [statusLine1ElD7, statusLine2ElD7, statusLine3ElD7];
    const TYPING_SPEED_D7_REVISED = 50;
    const PAUSE_BETWEEN_STATUS_LINES_D7_REVISED = 200;

    let currentStatusLineIndexD7_revised = 0;
    let currentStatusCharIndexD7_revised = 0;
    let typingTimeoutD7_revised;

    function typeStatusCharacterD7_revised() {
        if (currentStatusLineIndexD7_revised < statusMessagesD7_revised.length) {
            const currentLineEl = statusElementsD7_revised[currentStatusLineIndexD7_revised];
            const textToType = statusMessagesD7_revised[currentStatusLineIndexD7_revised];

            if (currentLineEl) {
                currentLineEl.style.opacity = '1';
                currentLineEl.style.transform = 'translateY(0)';
                if (currentStatusCharIndexD7_revised < textToType.length) {
                    currentLineEl.textContent += textToType.charAt(currentStatusCharIndexD7_revised);
                    currentStatusCharIndexD7_revised++;
                    typingTimeoutD7_revised = setTimeout(typeStatusCharacterD7_revised, TYPING_SPEED_D7_REVISED);
                } else {
                    currentStatusLineIndexD7_revised++;
                    currentStatusCharIndexD7_revised = 0;
                    if (currentStatusLineIndexD7_revised < statusMessagesD7_revised.length) {
                        typingTimeoutD7_revised = setTimeout(typeStatusCharacterD7_revised, PAUSE_BETWEEN_STATUS_LINES_D7_REVISED);
                    } else {
                        revealFinalCtaElementsD7_revised();
                    }
                }
            } else {
                currentStatusLineIndexD7_revised++; // Pula linha se elemento não existir
                currentStatusCharIndexD7_revised = 0;
                if (currentStatusLineIndexD7_revised < statusMessagesD7_revised.length) {
                    typingTimeoutD7_revised = setTimeout(typeStatusCharacterD7_revised, PAUSE_BETWEEN_STATUS_LINES_D7_REVISED);
                } else {
                    revealFinalCtaElementsD7_revised(); // Ainda revela o resto se todas as linhas de status foram processadas
                }
            }
        }
    }

    function revealFinalCtaElementsD7_revised() {
        if (ctaQuestionTextElD7) ctaQuestionTextElD7.classList.add('visible-d7');
        if (finalCtaButtonElD7) { // Usa o botão já referenciado
            finalCtaButtonElD7.classList.remove('cta-btn-hidden-d7');
            finalCtaButtonElD7.classList.add('cta-btn-visible-d7');
        }
        if (ctaNoteElD7) ctaNoteElD7.classList.add('visible-d7');
    }

    function startDobra7Animations_revised() {
        // Verifica se todos os elementos da sequência de status existem
        if (ctaStatusSequenceElD7 && statusElementsD7_revised.every(el => el)) {
            statusElementsD7_revised.forEach(el => {
                el.textContent = '';
                el.style.opacity = '0';
                el.style.transform = 'translateY(10px)';
            });
            currentStatusLineIndexD7_revised = 0;
            currentStatusCharIndexD7_revised = 0;
            clearTimeout(typingTimeoutD7_revised);
            typingTimeoutD7_revised = setTimeout(typeStatusCharacterD7_revised, 300); // Pequeno delay antes de iniciar
        } else {
            console.warn("Elementos da sequência de status da Dobra 7 não encontrados. Revelando CTA diretamente.");
            revealFinalCtaElementsD7_revised(); // Revela o CTA diretamente se a animação de status não puder rodar
        }
    }

    // Intersection Observer para iniciar animações da Dobra 7
    if (dobra7SectionEl) {
        const observerOptionsD7_revised = { root: null, rootMargin: '0px', threshold: 0.4 };
        const dobra7Observer_revised = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startDobra7Animations_revised();
                    observer.unobserve(entry.target); // Anima apenas uma vez
                }
            });
        }, observerOptionsD7_revised);
        dobra7Observer_revised.observe(dobra7SectionEl);
    } else {
        console.warn("Seção #dobra7-convite-final não encontrada. Animações e CTA podem não funcionar.");
        // Tenta revelar os elementos CTA como fallback se a seção não for observável
        revealFinalCtaElementsD7_revised();
    }
    // --- FIM LÓGICA REFEITA DOBRA 7 ---

    // --- INÍCIO DA LÓGICA PARA O FOOTER (ANO ATUAL) ---
    const footerYearSpan = document.getElementById('footer-current-year');
    if (footerYearSpan) {
        footerYearSpan.textContent = new Date().getFullYear();
    }
    // --- FIM LÓGICA FOOTER ---

}); // FIM DO ÚNICO DOMContentLoaded