init();

function init() {
    if (window.main == null)
        window.main = new CalcController();
}
function exibirResumoCandidatos() {
    window.main.exibirResumoCandidatos();
}

function exibirCandidatosVotacao() {
    window.main.exibirCandidatosVotacao();
}

function votar(){
    window.main.votar();
}

function exibirResultado(){
    window.main.exibirResultado();
}