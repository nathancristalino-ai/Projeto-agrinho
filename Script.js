// Estado do Jogo
let gameState = {
    production: 0,
    environmentImpact: 0,
    money: 100,
    targetProduction: 500
};

// Configuração das ações possíveis
const actions = {
    tradicional: { prod: 50, env: 25, cost: 0, reward: 20 },
    rotacao:     { prod: 20, env: 5,  cost: 20, reward: 25 },
    tecnologia:  { prod: 40, env: 2,  cost: 50, reward: 40 },
    recuperar:   { prod: 0,  env: -30, cost: 30, reward: 0 }
};

function investAgro(type) {
    const action = actions[type];

    // Verifica se tem dinheiro suficiente
    if (gameState.money < action.cost) {
        alert("Créditos insuficientes para esta ação sustentável!");
        return;
    }

    // Aplica os efeitos da ação
    gameState.money -= action.cost;
    gameState.production += action.prod;
    // O impacto ambiental não pode ser menor que 0%
    gameState.environmentImpact = Math.max(0, gameState.environmentImpact + action.env);
    
    // Ganhos da colheita (se houver produção, gera novos créditos)
    gameState.money += action.reward;

    updateUI();
    checkGameStatus();
}

function updateUI() {
    // Atualiza os textos
    document.getElementById('production-val').innerText = `${gameState.production} / ${gameState.targetProduction}`;
    document.getElementById('env-val').innerText = `${gameState.environmentImpact}%`;
    document.getElementById('money-val').innerText = gameState.money;

    // Atualiza as barras visuais
    const prodPercent = Math.min(100, (gameState.production / gameState.targetProduction) * 100);
    document.getElementById('prod-bar').style.width = `${prodPercent}%`;
    
    const envPercent = Math.min(100, gameState.environmentImpact);
    document.getElementById('env-bar').style.width = `${envPercent}%`;
}

function checkGameStatus() {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const text = document.getElementById('modal-text');

    // Condição de Derrota: Colapso Ambiental
    if (gameState.environmentImpact >= 100) {
        title.innerText = "🚨 Colapso Ecológico!";
        text.innerText = "O solo se esgotou e os recursos hídricos foram poluídos. A sua produção agro faliu por falta de sustentabilidade.";
        modal.classList.remove('hidden');
    } 
    // Condição de Vitória: Meta batida com o ecossistema a salvo
    else if (gameState.production >= gameState.targetProduction) {
        title.innerText = "🌾 Fazenda do Futuro Concluída!";
        text.innerText = `Parabéns! Você atingiu a meta de produção alimentária mantendo o impacto ambiental controlado em apenas ${gameState.environmentImpact}%.`;
        modal.classList.remove('hidden');
    }
}

function resetGame() {
    gameState.production = 0;
    gameState.environmentImpact = 0;
    gameState.money = 100;
    
    document.getElementById('modal').classList.add('hidden');
    updateUI();
}

// Inicializa a interface no carregamento
updateUI();
