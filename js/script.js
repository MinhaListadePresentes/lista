/* =====================================================
   POPUP
===================================================== */

function abrirPopup(){

    document
        .getElementById("popupPix")
        .classList.add("ativo");

}


function fecharPopup(){

    document
        .getElementById("popupPix")
        .classList.remove("ativo");

}


document
    .getElementById("popupPix")
    .addEventListener(
        "click",
        function(event){

            if(event.target === this){

                fecharPopup();

            }

        }
    );


/* =====================================================
   CHAVES PIX
===================================================== */

const PIX_PRESENTE_01 = "Chave 01";
const PIX_PRESENTE_02 = "Chave 02";
const PIX_PRESENTE_03 = "Chave 03";
const PIX_PRESENTE_04 = "Chave 04";
const PIX_PRESENTE_05 = "Chave 05";
const PIX_PRESENTE_06 = "Chave 06";
const PIX_PRESENTE_07 = "Chave 07";
const PIX_PRESENTE_08 = "Chave 08";
const PIX_PRESENTE_09 = "Chave 09";
const PIX_PRESENTE_10 = "Chave 10";
const PIX_PRESENTE_11 = "Chave 11";
const PIX_PRESENTE_12 = "Chave 12";


/* =====================================================
   PRESENTEAR
===================================================== */

function presentear(
    botao,
    nome,
    preco,
    chavePix
){

    const card =
        botao.closest(".presente");

    const jaEscolhido =
        card.classList.contains("escolhido");


    if(jaEscolhido){

        card.classList.remove(
            "escolhido"
        );

        botao.innerText =
            "Presentear";

        return;
    }


    card.classList.add(
        "escolhido"
    );

    botao.innerText =
        "✓ Escolhido";


    navigator
        .clipboard
        .writeText(chavePix)

        .then(function(){

            abrirPopup();

        })

        .catch(function(){

            abrirPopup();

        });

}


/* =====================================================
   ORDENAÇÃO
===================================================== */

function ordenarLista(){

    const lista =
        document.getElementById(
            "lista"
        );


    const cards =
        Array.from(
            lista.querySelectorAll(
                ".presente"
            )
        );


    const ordem =
        document.getElementById(
            "ordenacao"
        ).value;


    cards.sort(function(a,b){

        if(ordem === "menor"){

            return (
                parseFloat(
                    a.dataset.preco
                )
                -
                parseFloat(
                    b.dataset.preco
                )
            );

        }


        if(ordem === "maior"){

            return (
                parseFloat(
                    b.dataset.preco
                )
                -
                parseFloat(
                    a.dataset.preco
                )
            );

        }


        if(ordem === "nome"){

            return a.dataset.nome.localeCompare(
                b.dataset.nome
            );

        }

    });


    cards.forEach(function(card){

        lista.appendChild(card);

    });

}


/* =====================================================
   CONTAGEM REGRESSIVA
===================================================== */

const dataCasamento =
    new Date(
        "2026-11-07T00:00:00-03:00"
    ).getTime();


function atualizarContagem(){

    const agora =
        new Date().getTime();


    const diferenca =
        dataCasamento - agora;


    if(diferenca <= 0){

        document
            .getElementById(
                "contagem-regressiva"
            )
            .innerHTML = `

                <div style="
                    font-family:
                        'Cormorant Garamond',
                        Georgia,
                        serif;

                    font-size:26px;

                    color:#536b57;

                    font-weight:500;

                    width:100%;
                ">
                    ♡ Chegou o grande dia! ♡
                </div>

            `;

        return;

    }


    const dias =
        Math.floor(
            diferenca /
            (1000 * 60 * 60 * 24)
        );


    const horas =
        Math.floor(
            (
                diferenca %
                (1000 * 60 * 60 * 24)
            )
            /
            (1000 * 60 * 60)
        );


    const minutos =
        Math.floor(
            (
                diferenca %
                (1000 * 60 * 60)
            )
            /
            (1000 * 60)
        );


    const segundos =
        Math.floor(
            (
                diferenca %
                (1000 * 60)
            )
            /
            1000
        );


    document.getElementById("dias")
        .innerText =
        String(dias).padStart(
            2,
            "0"
        );


    document.getElementById("horas")
        .innerText =
        String(horas).padStart(
            2,
            "0"
        );


    document.getElementById("minutos")
        .innerText =
        String(minutos).padStart(
            2,
            "0"
        );


    document.getElementById("segundos")
        .innerText =
        String(segundos).padStart(
            2,
            "0"
        );

}


atualizarContagem();

setInterval(
    atualizarContagem,
    1000
);


/* =====================================================
   PRAZO DE CONFIRMAÇÃO
===================================================== */

const dataLimiteConfirmacao =
    new Date(
        "2026-10-23T23:59:59-03:00"
    ).getTime();


function verificarPrazoConfirmacao(){

    const agora =
        new Date().getTime();


    const botao =
        document.getElementById(
            "botaoConfirmacao"
        );


    const mensagem =
        document.getElementById(
            "mensagemPrazo"
        );


    if(!botao || !mensagem){

        return;

    }


    /* PRAZO ABERTO */

    if(agora <= dataLimiteConfirmacao){

        botao.classList.remove(
            "encerrado"
        );


        botao.setAttribute(
            "href",
            "https://wa.me/5517997056873?text=Ol%C3%A1%20Gabi%20e%20Tom!%20Gostaria%20de%20confirmar%20minha%20presen%C3%A7a%20no%20casamento%20de%20voc%C3%AAs.%20%F0%9F%92%9A"
        );


        botao.setAttribute(
            "target",
            "_blank"
        );


        botao.innerHTML =
            "<span>♡</span> Confirmar presença";


        mensagem.classList.remove(
            "prazo-expirado"
        );


        mensagem.innerHTML =
            "Sua confirmação nos ajudará a preparar tudo com muito carinho. ♡";


        return;

    }


    /* PRAZO ENCERRADO */

    botao.classList.add(
        "encerrado"
    );


    botao.removeAttribute(
        "href"
    );


    botao.removeAttribute(
        "target"
    );


    botao.innerHTML =
        "Confirmações encerradas";


    mensagem.classList.add(
        "prazo-expirado"
    );


    mensagem.innerHTML =
        "O prazo para confirmação de presença foi encerrado. Agradecemos muito pelo carinho e por fazer parte desse momento. ♡";

}


verificarPrazoConfirmacao();


setInterval(
    verificarPrazoConfirmacao,
    60000
);


/* =====================================================
   ÁLBUM DE FOTOS
===================================================== */

/*

    COLOQUE NA RAIZ DO GITHUB:

    foto1.jpg
    foto2.jpg
    foto3.jpg
    foto4.jpg
    foto5.jpg

*/

const albumFotos = [

    {
        src:"foto1.JPG",
        legenda:"Um momento para guardar no coração."
    },

    {
        src:"foto2.JPG",
        legenda:"Colecionando momentos juntos."
    },

    {
        src:"foto3.JPG",
        legenda:"Nossa história, um capítulo de cada vez."
    },

    {
        src:"foto4.JPG",
        legenda:"Dois corações, muitos momentos."
    },

    {
        src:"foto5.jpeg",
        legenda:"E que venham muitos capítulos."
    }

];


let albumIndice = 0;


const album =
    document.getElementById(
        "album"
    );


const albumFoto =
    document.getElementById(
        "albumFoto"
    );


const albumLegenda =
    document.getElementById(
        "albumLegenda"
    );


const albumPagina =
    document.getElementById(
        "albumPagina"
    );


const albumAnterior =
    document.getElementById(
        "albumAnterior"
    );


const albumProximo =
    document.getElementById(
        "albumProximo"
    );


const albumInstrucao =
    document.getElementById(
        "albumInstrucao"
    );


function atualizarAlbum(
    novoIndice,
    direcao
){

    if(
        novoIndice < 0 ||
        novoIndice >= albumFotos.length
    ){

        return;

    }


    /*
        Impede duas viradas acontecendo
        ao mesmo tempo.
    */

    if(
        album.classList.contains("folha-virando")
    ){

        return;

    }


    album.classList.add(
        "folha-virando"
    );


    /*
        Remove animações anteriores.
    */

    albumFoto.classList.remove(
        "virando-esquerda",
        "virando-direita",
        "nova-folha-esquerda",
        "nova-folha-direita"
    );


    void albumFoto.offsetWidth;


    /*
        PRIMEIRA PARTE:

        A folha atual gira como uma
        página física.
    */

    if(direcao === "esquerda"){

        albumFoto.classList.add(
            "virando-esquerda"
        );

    }else{

        albumFoto.classList.add(
            "virando-direita"
        );

    }


    /*
        Espera a folha praticamente
        terminar de virar antes de
        trocar a fotografia.
    */

    setTimeout(function(){

        const proximaFoto =
            albumFotos[
                novoIndice
            ];


        /*
            Troca a foto enquanto a
            folha está de costas.
        */

        albumFoto.src =
            proximaFoto.src;

        albumFoto.alt =
            "Gabi e Tom";

        albumLegenda.textContent =
            proximaFoto.legenda;


        /*
            Remove a animação anterior.
        */

        albumFoto.classList.remove(
            "virando-esquerda",
            "virando-direita"
        );


        /*
            Prepara a nova fotografia
            do outro lado do álbum.
        */

        if(direcao === "esquerda"){

            albumFoto.classList.add(
                "nova-folha-esquerda"
            );

        }else{

            albumFoto.classList.add(
                "nova-folha-direita"
            );

        }


        /*
            Atualiza o índice.
        */

        albumIndice =
            novoIndice;


        /*
            Atualiza contador.
        */

        albumPagina.textContent =

            String(
                albumIndice + 1
            ).padStart(2,"0")

            +

            " / "

            +

            String(
                albumFotos.length
            ).padStart(2,"0");


        /*
            Botão anterior.
        */

        if(albumIndice === 0){

            albumAnterior.style.opacity =
                ".45";

        }else{

            albumAnterior.style.opacity =
                "1";

        }


        /*
            Botão próximo.
        */

        if(
            albumIndice ===
            albumFotos.length - 1
        ){

            albumProximo.style.opacity =
                ".45";

        }else{

            albumProximo.style.opacity =
                "1";

        }


        /*
            Esconde a instrução depois
            da primeira interação.
        */

        if(albumInstrucao){

            albumInstrucao.classList.add(
                "escondida"
            );

        }


        /*
            Libera a próxima interação
            depois da animação.
        */

        setTimeout(function(){

            albumFoto.classList.remove(
                "nova-folha-esquerda",
                "nova-folha-direita"
            );

            album.classList.remove(
                "folha-virando"
            );

        },720);


    },360);

}


/* =====================================================
   PRÓXIMA FOTO
===================================================== */

function albumProxima(){

    if(
        albumIndice <
        albumFotos.length - 1
    ){

        atualizarAlbum(
            albumIndice + 1,
            "esquerda"
        );

    }

}


/* =====================================================
   FOTO ANTERIOR
===================================================== */

function albumFotoAnterior(){

    if(albumIndice > 0){

        atualizarAlbum(
            albumIndice - 1,
            "direita"
        );

    }

}


albumProximo.addEventListener(
    "click",
    albumProxima
);


albumAnterior.addEventListener(
    "click",
    albumFotoAnterior
);


/* =====================================================
   SWIPE / ARRASTAR
===================================================== */

let albumInicioX = 0;

let albumInicioY = 0;

let albumArrastando = false;

let albumMovimentoX = 0;


album.addEventListener(
    "pointerdown",
    function(event){

        albumInicioX =
            event.clientX;

        albumInicioY =
            event.clientY;

        albumMovimentoX = 0;

        albumArrastando = true;

        album.setPointerCapture(
            event.pointerId
        );

    }
);


album.addEventListener(
    "pointermove",
    function(event){

        if(!albumArrastando){

            return;

        }


        albumMovimentoX =
            event.clientX -
            albumInicioX;

    }
);


album.addEventListener(
    "pointerup",
    function(event){

        if(!albumArrastando){

            return;

        }


        albumArrastando = false;


        const movimentoY =
            event.clientY -
            albumInicioY;


        const distancia =
            Math.abs(
                albumMovimentoX
            );


        /*
            Evita trocar a foto quando
            o movimento for predominantemente
            vertical.
        */

        if(
            distancia > 45 &&
            distancia > Math.abs(movimentoY)
        ){

            if(
                albumMovimentoX < 0
            ){

                albumProxima();

            }else{

                albumFotoAnterior();

            }

        }

    }
);


album.addEventListener(
    "pointercancel",
    function(){

        albumArrastando = false;

    }
);


/* =====================================================
   TECLADO NO COMPUTADOR
===================================================== */

document.addEventListener(
    "keydown",
    function(event){

        if(event.key === "ArrowRight"){

            albumProxima();

        }


        if(event.key === "ArrowLeft"){

            albumFotoAnterior();

        }

    }
);


/* =====================================================
   ESTADO INICIAL DOS BOTÕES
===================================================== */

albumAnterior.style.opacity =
    ".45";

albumProximo.style.opacity =
    "1";


/* =====================================================
   MÚSICA
===================================================== */

function entrarNoSite(){

    musica.volume =
        0.45;


    musica.play()

        .then(function(){

            musicaTocando();

        })

        .catch(function(erro){

            console.log(
                "Não foi possível iniciar a música:",
                erro
            );

        });


    const telaEntrada =
        document.getElementById(
            "telaEntrada"
        );


    telaEntrada.classList.add(
        "saindo"
    );


    document.body.style.overflow =
        "";


    setTimeout(function(){

        telaEntrada.remove();

    },850);

}


const musica =
    document.getElementById(
        "musicaCasamento"
    );


const botaoMusica =
    document.getElementById(
        "botaoMusica"
    );


const playerMusica =
    document.getElementById(
        "playerMusica"
    );


const volumeMusica =
    document.getElementById(
        "volumeMusica"
    );


/* =====================================================
   VOLUME INICIAL
===================================================== */

musica.volume =
    0.45;


/* =====================================================
   TOCANDO
===================================================== */

function musicaTocando(){

    botaoMusica.innerHTML =
        "❚❚";

    playerMusica.classList.add(
        "tocando"
    );

}


/* =====================================================
   PAUSADA
===================================================== */

function musicaPausada(){

    botaoMusica.innerHTML =
        "▶";

    playerMusica.classList.remove(
        "tocando"
    );

}


/* =====================================================
   PLAY / PAUSE
===================================================== */

function alternarMusica(){

    if(musica.paused){

        musica.play()

            .then(function(){

                musicaTocando();

            })

            .catch(function(erro){

                console.log(
                    "Não foi possível reproduzir a música:",
                    erro
                );

            });

    }else{

        musica.pause();

        musicaPausada();

    }

}


/* =====================================================
   VOLUME
===================================================== */

volumeMusica.addEventListener(
    "input",
    function(){

        musica.volume =
            this.value;

    }
);


/* =====================================================
   PAUSE
===================================================== */

musica.addEventListener(
    "pause",
    function(){

        musicaPausada();

    }
);


/* =====================================================
   PLAY
===================================================== */

musica.addEventListener(
    "play",
    function(){

        musicaTocando();

    }
);


/* =====================================================
   VISIBILIDADE
===================================================== */

document.addEventListener(
    "visibilitychange",
    function(){

        if(document.hidden){

            if(!musica.paused){

                musica.pause();

                musicaPausada();

            }

        }

    }
);


/* =====================================================
   PAGEHIDE
===================================================== */

window.addEventListener(
    "pagehide",
    function(){

        musica.pause();

        musica.currentTime =
            0;

        musicaPausada();

    }
);


/* =====================================================
   BEFOREUNLOAD
===================================================== */

window.addEventListener(
    "beforeunload",
    function(){

        musica.pause();

    }
);




