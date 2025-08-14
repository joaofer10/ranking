const loadingIndicator = document.querySelector('.loading-indicator');
// Dados de exemplo para simular o banco de dados
// Substitua por dados reais da sua API futuramente
const rankingData = {
    linguagens: [
        { id: 1, nome: "João Silva", pontuacao: 980 },
        { id: 2, nome: "Maria Oliveira", pontuacao: 955 },
        { id: 3, nome: "Pedro Souza", pontuacao: 920 },
        { id: 4, nome: "Ana Santos", pontuacao: 880 },
        { id: 5, nome: "Lucas Pereira", pontuacao: 850 },
        { id: 6, nome: "Julia Lima", pontuacao: 830 },
        { id: 7, nome: "Gabriel Costa", pontuacao: 790 },
        { id: 8, nome: "Isabela Martins", pontuacao: 760 },
        { id: 9, nome: "Felipe Rodrigues", pontuacao: 745 },
        { id: 10, nome: "Camila Almeida", pontuacao: 720 },
        { id: 11, nome: "Seu Nome Aqui", pontuacao: 500, isCurrentUser: true }
    ],
    humanas: [
        { id: 1, nome: "João Silva", pontuacao: 990 },
        { id: 2, nome: "Pedro Souza", pontuacao: 960 },
        { id: 3, nome: "Lucas Pereira", pontuacao: 940 },
        { id: 4, nome: "Seu Nome Aqui", pontuacao: 910, isCurrentUser: true },
        { id: 5, nome: "Maria Oliveira", pontuacao: 880 },
        { id: 6, nome: "Ana Santos", pontuacao: 850 },
        { id: 7, nome: "Julia Lima", pontuacao: 820 },
        { id: 8, nome: "Gabriel Costa", pontuacao: 790 },
        { id: 9, nome: "Isabela Martins", pontuacao: 750 },
        { id: 10, nome: "Felipe Rodrigues", pontuacao: 730 },
        { id: 11, nome: "Camila Almeida", pontuacao: 710 }
    ],
    natureza: [
        { id: 1, nome: "Maria Oliveira", pontuacao: 970 },
        { id: 2, nome: "Pedro Souza", pontuacao: 950 },
        { id: 3, nome: "Felipe Rodrigues", pontuacao: 930 },
        { id: 4, nome: "João Silva", pontuacao: 900 },
        { id: 5, nome: "Ana Santos", pontuacao: 870 },
        { id: 6, nome: "Lucas Pereira", pontuacao: 840 },
        { id: 7, nome: "Seu Nome Aqui", pontuacao: 810, isCurrentUser: true },
        { id: 8, nome: "Julia Lima", pontuacao: 780 },
        { id: 9, nome: "Gabriel Costa", pontuacao: 750 },
        { id: 10, nome: "Isabela Martins", pontuacao: 720 },
        { id: 11, nome: "Camila Almeida", pontuacao: 700 }
    ],
    matematica: [
        { id: 1, nome: "Felipe Rodrigues", pontuacao: 995 },
        { id: 2, nome: "Maria Oliveira", pontuacao: 980 },
        { id: 3, nome: "João Silva", pontuacao: 960 },
        { id: 4, nome: "Pedro Souza", pontuacao: 940 },
        { id: 5, nome: "Ana Santos", pontuacao: 910 },
        { id: 6, nome: "Lucas Pereira", pontuacao: 890 },
        { id: 7, nome: "Julia Lima", pontuacao: 860 },
        { id: 8, nome: "Gabriel Costa", pontuacao: 830 },
        { id: 9, nome: "Isabela Martins", pontuacao: 800 },
        { id: 10, nome: "Seu Nome Aqui", pontuacao: 770, isCurrentUser: true },
        { id: 11, nome: "Camila Almeida", pontuacao: 740 }
    ],
    redacao: [
        { id: 1, nome: "Ana Santos", pontuacao: 990 },
        { id: 2, nome: "Julia Lima", pontuacao: 970 },
        { id: 3, nome: "Gabriel Costa", pontuacao: 950 },
        { id: 4, nome: "Isabela Martins", pontuacao: 920 },
        { id: 5, nome: "Felipe Rodrigues", pontuacao: 890 },
        { id: 6, nome: "João Silva", pontuacao: 860 },
        { id: 7, nome: "Maria Oliveira", pontuacao: 830 },
        { id: 8, nome: "Pedro Souza", pontuacao: 800 },
        { id: 9, nome: "Lucas Pereira", pontuacao: 770 },
        { id: 10, nome: "Camila Almeida", pontuacao: 740 },
        { id: 11, nome: "Seu Nome Aqui", pontuacao: 650, isCurrentUser: true }
    ]
};

const rankingList = document.getElementById('ranking-list');
const rankingTitle = document.getElementById('ranking-title');
const materiaButtons = document.querySelectorAll('.materia-btn');

const materiaColors = {
    linguagens: 'var(--cor-linguagens)',
    humanas: 'var(--cor-humanas)',
    natureza: 'var(--cor-natureza)',
    matematica: 'var(--cor-matematica)',
    redacao: 'var(--cor-redacao)'
};

// Função para renderizar o ranking na tela
// Função para renderizar o ranking na tela
function renderRanking(materia) {
    // 1. ADICIONE ESTA LINHA: Mostra o indicador de carregamento
    loadingIndicator.style.display = 'block';

    // Adiciona a classe fade-out para iniciar a animação de saída
    rankingList.classList.remove('fade-in');
    rankingList.classList.add('fade-out');

    // Espera a animação de saída terminar para então renderizar a nova lista
    setTimeout(() => {
        // Limpa a lista atual
        rankingList.innerHTML = '';

        // Obtém os dados da matéria e ordena por pontuação
        let sortedRanking = [...rankingData[materia]].sort((a, b) => b.pontuacao - a.pontuacao);

        const currentUser = sortedRanking.find(user => user.isCurrentUser);
        const currentUserIndex = sortedRanking.indexOf(currentUser);
        const top10 = sortedRanking.slice(0, 10);
        
        if (currentUser && currentUserIndex >= 10) {
            currentUser.posicao = currentUserIndex + 1;
            top10.push(currentUser);
        }

        top10.forEach((item, index) => {
            const li = document.createElement('li');
            const isTop3 = index < 3;
            const isCurrentUser = item.isCurrentUser;
            
            li.classList.add('ranking-item');
            if (isTop3) {
                li.classList.add('top-3');
            }
            if (isCurrentUser) {
                li.classList.add('user-highlight');
            }

            const color = materiaColors[materia];
            li.style.borderLeftColor = color;

            li.innerHTML = `
                <div class="ranking-info">
                    <span class="ranking-position">${isCurrentUser && currentUserIndex >= 10 ? item.posicao : index + 1}</span>
                    <span class="ranking-name">${item.nome}</span>
                </div>
                <span class="ranking-score">${item.pontuacao} Pontos</span>
            `;
            
            // Adiciona a animação de entrada sequencial
            setTimeout(() => {
                li.classList.add('visible');
            }, 100 * (index + 1)); // Adiciona um pequeno delay para cada item
            
            rankingList.appendChild(li);
        });

        // Atualiza o título e a cor
        const titleText = `Ranking de ${materia.charAt(0).toUpperCase() + materia.slice(1)}`;
        rankingTitle.textContent = titleText;
        rankingTitle.style.color = materiaColors[materia];

        // 2. ADICIONE ESTA LINHA: Esconde o indicador de carregamento
        loadingIndicator.style.display = 'none';

        // Adiciona a classe fade-in para a animação de entrada da nova lista
        rankingList.classList.remove('fade-out');
        rankingList.classList.add('fade-in');

    }, 500); // O tempo de espera deve ser igual à transição do fade-out
}

// Adiciona event listeners nos botões
materiaButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe 'active' de todos os botões
        materiaButtons.forEach(btn => btn.classList.remove('active'));
        
        // Adiciona a classe 'active' no botão clicado
        button.classList.add('active');
        
        // Obtém a matéria do atributo data
        const materia = button.dataset.materia;
        
        // Renderiza o ranking da matéria selecionada
        renderRanking(materia);
    });
});

// Renderiza o ranking inicial (Linguagens)
renderRanking('linguagens');
// ... (rankingData e outras variáveis permanecem) ...



// Adiciona event listeners nos botões
materiaButtons.forEach(button => {
    button.addEventListener('click', () => {
        materiaButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const materia = button.dataset.materia;
        renderRanking(materia);
    });
});

// Renderiza o ranking inicial (Linguagens)
renderRanking('linguagens');
// ... (seu código de variáveis rankingData, rankingList, rankingTitle, etc.) ...

// ADICIONE ESTE BLOCO AQUI
const backBtn = document.querySelector('.back-btn');

backBtn.addEventListener('click', () => {
    // Substitua a URL abaixo pelo endereço da sua página inicial
    const paginaInicialUrl = "https://arineto1.github.io/sistema/menu.html"; 
    
    // Redireciona o usuário para a URL especificada
    window.location.href = paginaInicialUrl;
});

// ... (o restante do seu código JavaScript, incluindo as funções renderRanking e os event listeners) ...
top10.forEach((item, index) => {
            const li = document.createElement('li');
            const isTop3 = index < 3;
            const isCurrentUser = item.isCurrentUser;
            
            li.classList.add('ranking-item');
            if (isTop3) {
                li.classList.add('top-3');
            }
            if (isCurrentUser) {
                li.classList.add('user-highlight');
            }
            
            // Não é mais necessário manipular a cor da borda aqui no JS,
            // pois o CSS já cuida disso.

            li.innerHTML = `
                <div class="ranking-info">
                    <span class="ranking-position">${isCurrentUser && currentUserIndex >= 10 ? item.posicao : index + 1}</span>
                    <span class="ranking-name">${item.nome}</span>
                </div>
                <span class="ranking-score">${item.pontuacao} Pontos</span>
            `;
            
            setTimeout(() => {
                li.classList.add('visible');
            }, 100 * (index + 1));
            
            rankingList.appendChild(li);
        });