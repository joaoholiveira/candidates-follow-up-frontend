export const API_CONFIG = {
    baseUrl: "http://localhost:8080/"
}

export const ENDPOINTS = {
    FollowUpHabilitados: API_CONFIG.baseUrl + "candidato-retorno",
    FollowUpHabilitadosComDataAtual: API_CONFIG.baseUrl + "candidato-retorno/data-atual-retorno",
    FollowUpHabilitadosPorDescricaoEData: API_CONFIG.baseUrl + "candidato-retorno/nome-candidato-data-retorno"
}