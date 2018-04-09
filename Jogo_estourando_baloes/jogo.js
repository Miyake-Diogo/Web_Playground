var timerId = null // variavel que armazena a chamada da função timeOut

function iniciaJogo(){

    var url = window.location.search

    var nivel_jogo = url.replace("?", "")

    var tempo_segundos = 0

    if(nivel_jogo == 1) {//1 fácil -> 120 segundos
        tempo_segundos = 120
    }
    if(nivel_jogo == 2) {//2 nromal -> 60 segundos
        tempo_segundos = 60
    }
    if(nivel_jogo == 3) {//3 díficil -> 30 segundos
        tempo_segundos = 30
    }

    //inserindo segundos no span
    document.getElementById('cronometro').innerHTML = tempo_segundos

    // quantidade de balões
    var quantidade_baloes = 80

    cria_baloes(quantidade_baloes)

    //imprimir quantidade de balões inteiros
    document.getElementById('baloes_inteiros').innerHTML = quantidade_baloes
    //imprimir quantidade de balões estourados
    document.getElementById('baloes_estourados').innerHTML = 0
    contagem_tempo(tempo_segundos + 1)
}
function contagem_tempo(segundos){

    segundos = segundos-1

    if(segundos == -1){
        clearTimeout(timerId) // para a execução da função do setTimeOut
        game_over()
        return false
    }
    document.getElementById('cronometro').innerHTML = segundos

    timerId = setTimeout ("contagem_tempo("+segundos+")", 1000)
}

function game_over (){
    remove_eventos_baloes()
    alert('Fim de jogo, você não conseguiu estourar todos os balões a tempo')
}

function cria_baloes(quantidade_baloes){

        for(var i = 1; i<= quantidade_baloes; i++){
            
            var balao = document.createElement("img")
            balao.src = 'imagens/balao_azul_pequeno.png'
            balao.style.margin = "10px"
            balao.id = 'b'+i
            balao.onclick = function(){estourar(this)}

            document.getElementById('cenario').appendChild(balao)
        }
}
function estourar(e){
    var id_balao = e.id
    document.getElementById(id_balao).setAttribute("onclick","")
    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png'
    pontuacao(-1)
}

function pontuacao(pontos){

    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML

    baloes_inteiros = parseInt(baloes_inteiros)
    baloes_estourados = parseInt(baloes_estourados)

    baloes_inteiros = baloes_inteiros + pontos
    baloes_estourados = baloes_estourados - pontos

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados
    
    situacao_jogo(baloes_inteiros)
}

function situacao_jogo(baloes_inteiros){
    if(baloes_inteiros == 0){
        alert('Parabéns, você conseguiu estourar todos os balões')
        parar_jogo()
    }
}
function parar_jogo(){
    clearTimeout(timerId)
}
function remove_eventos_baloes () {
    var j = 1 // contado para recuperar os balões por id
    //percorre os elementos de acordo com o id e só irá sair do laço quando não houver correspondencia com o elemento
    while (document.getElementById('b'+j)){
        //retira o evento onclick do elemento
        document.getElementById('b'+1).onclick = ''
        j++ // faz a iteração da variável j
    }
}