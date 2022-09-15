export const API_CONFIG = {
    baseUrl: "http://localhost:8080/"
}

export const ENDPOINTS = {
    FollowUp: API_CONFIG.baseUrl + "candidato-retorno/",
    FollowUpHabilitadosComDataAtual: API_CONFIG.baseUrl + "candidato-retorno/data-atual-retorno/",
    FollowUpHabilitadosPorDescricaoEData: API_CONFIG.baseUrl + "candidato-retorno/nome-candidato-data-retorno/",
    FollowUpHabilitadosPorTipoDeRetorno: API_CONFIG.baseUrl + "candidato-retorno/tipo-retorno/",
    desabilitarFollowUp: API_CONFIG.baseUrl + "candidato-retorno/desabilitar/",
    
    CanalRetorno: API_CONFIG.baseUrl + "tipo-retorno/", 
    listarTodosCanaisDeRetornoHabilitados: API_CONFIG.baseUrl + "tipo-retorno/",
    listarTodosCanaisDeRetornoHabilitadosPorDescricao: API_CONFIG.baseUrl + "tipo-retorno/descricao/",
    desabilitarCanalDeRetorno: API_CONFIG.baseUrl + "tipo-retorno/desabilitar/" 
}