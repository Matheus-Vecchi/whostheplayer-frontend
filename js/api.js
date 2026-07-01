const API_BASE = "http://localhost:8080";


export async function listAllPlayers() {
    const res = await fetch (`${API_BASE}/game/players`);
    if (!res.ok) throw new Error(`Erro ao buscar jogadores: ${res.status}`);
    return res.json();
}

export async function startGame() {
    const res = await fetch(`${API_BASE}/game/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`Erro ao iniciar jogo: ${res.status}`);
    return res.json();
}

export async function guess(gameId, playerId) {
    const res = await fetch(`${API_BASE}/game/guess`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({gameId, playerId})
    });
    if (!res.ok) throw new Error(`Erro ao processar palpite: ${res.status}`);
    return res.json();
}