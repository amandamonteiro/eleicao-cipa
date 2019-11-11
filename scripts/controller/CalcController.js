class CalcController {
    constructor() {
        this.candidatos = [];
        this.carregarCandidatos();
    }

    carregarCandidatos() {
        $.getJSON('arquivo/candidatos.json', dados => {
            this.candidatos = dados;
            localStorage.setItem('candidatos', JSON.stringify(this.candidatos));
        });
    }

    exibirResumoCandidatos() {
        this.candidatos = JSON.parse(localStorage.getItem('candidatos'));
        let candidatosDiv = '<div id="candidatos">';
        $.each(this.candidatos, function (key, candidato) {
            candidatosDiv += '<div class="card" style="width:400px">';
            candidatosDiv += '<img class="card-img-top" src=' + candidato.foto + ' alt="Card image" style="width:100%">';
            candidatosDiv += '<div class="card-body">';
            candidatosDiv += '<h4 class="card-title">' + candidato.nome + '</h4>';
            candidatosDiv += '<p>' + candidato.idade + '</p>';
            candidatosDiv += '</div>';
            candidatosDiv += '</div>';
        });

        console.log(window.votos);
        candidatosDiv += '</div>';
        $('#candidatoContainer').html(candidatosDiv);
    }

    exibirCandidatosVotacao() {
        // await this.carregarCandidatos();
        this.candidatos = JSON.parse(localStorage.getItem('candidatos'));
        let candidatosDiv = '<div id="candidatos">';
        $.each(this.candidatos, function (key, candidato) {
            candidatosDiv += '<div class="card" style="width:400px">';
            candidatosDiv += '<img class="card-img-top" src=' + candidato.foto + ' alt="Card image" style="width:100%">';
            candidatosDiv += '<div class="card-body">';
            candidatosDiv += '<h4 class="card-title">' + candidato.nome + '</h4>';
            candidatosDiv += '<p>' + candidato.idade + '</p>';
            candidatosDiv += '<input type="radio" name="votacao" id="candidato' + candidato.id + '"> Selecione para Votar</input>';
            candidatosDiv += '</div>';
            candidatosDiv += '</div>';
        });
        window.votos = [];
        for (let index = 0; index < this.candidatos.length; index++) {
            window.votos.push(0)
        }
        localStorage.setItem('votos', JSON.stringify(window.votos));
        candidatosDiv += '</div>';
        $('#candidatoContainer').html(candidatosDiv);
    }

    votar() {
        this.candidatos = JSON.parse(localStorage.getItem('candidatos'));
        var i;
        for (i = 1; i <= this.candidatos.length; i++) {
            if ($("#candidato" + i).is(":checked")) {
                let valorAntigo = window.votos[i - 1];
                window.votos[i - 1] = valorAntigo + 1;
                alert("voto computado para o candidato " + this.candidatos[i-1].nome);
                break;
            }
            if (i == this.candidatos.length) {
                alert("favor escolher um candidato");
            }
        }
        localStorage.setItem('votos', JSON.stringify(window.votos));
    }

    exibirResultado() {
        window.votos = JSON.parse(localStorage.getItem('votos'));
        console.log(window.votos);
        this.candidatos = JSON.parse(localStorage.getItem('candidatos'));
        let results = '<div id="result">';
        
        for (let i = 0; i < this.candidatos.length; i++) {
            console.log(window.votos);
            results += '<p>' + this.candidatos[i].nome + ' ' + window.votos[i] + ' votos </p>';
        }
        results += '</div>';
        $('#resultado').html(results);

    }


}