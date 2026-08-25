/* =====================================================
   POPUP
===================================================== */

function abrirPopup(){

    const popup =
        document.getElementById("popupPix");

    if(popup){

        popup.classList.add("ativo");

    }

}


function fecharPopup(){

    const popup =
        document.getElementById("popupPix");

    if(popup){

        popup.classList.remove("ativo");

    }

}


const popupPix =
    document.getElementById("popupPix");


if(popupPix){

    popupPix.addEventListener(
        "click",
        function(event){

            if(event.target === this){

                fecharPopup();

            }

        }
    );

}


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

    if(!card){

        return;

    }


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


    if(
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
    ){

        navigator.clipboard
            .writeText(chavePix)

            .then(function(){

                abrirPopup();

            })

            .catch(function(){

                abrirPopup();

            });

    }else{

        abrirPopup();

    }

}


/* =====================================================
   ORDENAÇÃO
===================================================== */

function ordenarLista(){

    const lista =
        document.getElementById("lista");

    if(!lista){

        return;

    }


    const cards =
        Array.from(
            lista.querySelectorAll(".presente")
        );


    const campo =
        document.getElementById("ordenacao");

    if(!campo){

        return;

    }


    const ordem =
        campo.value;


    cards.sort(function(a,b){

        if(ordem === "menor"){

            return (
                parseFloat(a.dataset.preco || 0)
                -
                parseFloat(b.dataset.preco || 0)
            );

        }


        if(ordem === "maior"){

            return (
                parseFloat(b.dataset.preco || 0)
                -
                parseFloat(a.dataset.preco || 0)
            );

        }


        if(ordem === "nome"){

            return (
                (a.dataset.nome || "")
                .localeCompare(
                    b.dataset.nome || "",
                    "pt-BR"
                )
            );

        }


        return 0;

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


    const contador =
        document.getElementById(
            "contagem-regressiva"
        );


    if(!contador){

        return;

    }


    if(diferenca <= 0){

        contador.innerHTML = `

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


    const elementoDias =
        document.getElementById("dias");

    const elementoHoras =
        document.getElementById("horas");

    const elementoMinutos =
        document.getElementById("minutos");

    const elementoSegundos =
        document.getElementById("segundos");


    if(elementoDias){

        elementoDias.innerText =
            String(dias).padStart(2,"0");

    }


    if(elementoHoras){

        elementoHoras.innerText =
            String(horas).padStart(2,"0");

    }


    if(elementoMinutos){

        elementoMinutos.innerText =
            String(minutos).padStart(2,"0");

    }


    if(elementoSegundos){

        elementoSegundos.innerText =
            String(segundos).padStart(2,"0");

    }

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

let albumOcupado = false;


/* =====================================================
   ELEMENTOS
===================================================== */

const album =
    document.getElementById("album");


const albumFoto =
    document.getElementById("albumFoto");


const albumLegenda =
    document.getElementById("albumLegenda");


const albumPagina =
    document.getElementById("albumPagina");


const albumAnterior =
    document.getElementById("albumAnterior");


const albumProximo =
    document.getElementById("albumProximo");


const albumInstrucao =
    document.getElementById("albumInstrucao");


/* =====================================================
   CRIA O VERSO DA FOLHA
===================================================== */

let albumVerso = null;

let albumSombra = null;


function criarElementos3D(){

    if(!album || !albumFoto){

        return;

    }


    const folha =
        document.getElementById("albumFolha");


    if(!folha){

        return;

    }


    /*
       Cria a fotografia que fica
       atrás da página durante a virada.
    */

    albumVerso =
        document.createElement("img");

    albumVerso.className =
        "album-pagina-verso";

    albumVerso.alt =
        "";

    albumVerso.setAttribute(
        "aria-hidden",
        "true"
    );


    /*
       O verso inicialmente usa
       a própria foto atual.
    */

    albumVerso.src =
        albumFoto.src;


    folha.insertBefore(
        albumVerso,
        albumFoto
    );


    /*
       Camada de sombra que acompanha
       visualmente a página.
    */

    albumSombra =
        document.createElement("div");

    albumSombra.className =
        "album-sombra-virada";

    folha.appendChild(
        albumSombra
    );

}


criarElementos3D();


/* =====================================================
   ATUALIZA CONTADOR
===================================================== */

function atualizarControlesAlbum(){

    if(!albumPagina){

        return;

    }


    albumPagina.textContent =
        String(albumIndice + 1).padStart(2,"0")
        +
        " / "
        +
        String(albumFotos.length).padStart(2,"0");


    if(albumAnterior){

        albumAnterior.style.opacity =
            albumIndice === 0
                ? ".45"
                : "1";

    }


    if(albumProximo){

        albumProximo.style.opacity =
            albumIndice === albumFotos.length - 1
                ? ".45"
                : "1";

    }

}


/* =====================================================
   ATUALIZA ALBUM
===================================================== */

function atualizarAlbum(novoIndice,direcao){

    if(!album || !albumFoto || !albumVerso){
        return;
    }

    if(
        novoIndice < 0 ||
        novoIndice >= albumFotos.length
    ){
        return;
    }

    if(
        albumOcupado ||
        novoIndice === albumIndice
    ){
        return;
    }


    albumOcupado = true;

    album.classList.add(
        "folha-virando"
    );


    const proximaFoto =
        albumFotos[novoIndice];


    /*
       O verso recebe a próxima fotografia
       antes da folha começar a virar.
    */

    albumVerso.src =
        proximaFoto.src;


    /*
       Limpa animações anteriores.
    */

    albumFoto.classList.remove(
        "virando-esquerda",
        "virando-direita",
        "nova-folha-esquerda",
        "nova-folha-direita"
    );


    void albumFoto.offsetWidth;


    /*
       A folha atual começa a virar.
    */

    albumFoto.classList.add(

        direcao === "esquerda"

            ? "virando-esquerda"

            : "virando-direita"

    );


    /*
       Quando a folha chega aproximadamente
       à metade da virada, trocamos a foto.
    */

    setTimeout(function(){

        albumIndice =
            novoIndice;


        albumFoto.src =
            proximaFoto.src;


        albumFoto.alt =
            "Gabi e Tom";


        if(albumLegenda){

            albumLegenda.textContent =
                proximaFoto.legenda;

        }


        /*
           Remove a primeira parte da animação.
        */

        albumFoto.classList.remove(
            "virando-esquerda",
            "virando-direita"
        );


        void albumFoto.offsetWidth;


        /*
           Agora a nova folha aparece
           voltando para a posição frontal.
        */

        albumFoto.classList.add(

            direcao === "esquerda"

                ? "nova-folha-esquerda"

                : "nova-folha-direita"

        );


        atualizarControlesAlbum();


        if(albumInstrucao){

            albumInstrucao.classList.add(
                "escondida"
            );

        }

    },440);


    /*
       Finaliza a animação.
    */

    setTimeout(function(){

        albumFoto.classList.remove(
            "nova-folha-esquerda",
            "nova-folha-direita",
            "virando-esquerda",
            "virando-direita"
        );


        albumVerso.src =
            albumFotos[albumIndice].src;


        album.classList.remove(
            "folha-virando"
        );


        albumOcupado = false;

    },900);

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


/* =====================================================
   BOTÕES
===================================================== */

if(albumProximo){

    albumProximo.addEventListener(
        "click",
        albumProxima
    );

}


if(albumAnterior){

    albumAnterior.addEventListener(
        "click",
        albumFotoAnterior
    );

}


/* =====================================================
   SWIPE / ARRASTAR
===================================================== */

let albumInicioX = 0;

let albumInicioY = 0;

let albumArrastando = false;

let albumMovimentoX = 0;


if(album){

    album.addEventListener(
        "pointerdown",
        function(event){

            if(albumOcupado){

                return;

            }


            albumInicioX =
                event.clientX;

            albumInicioY =
                event.clientY;

            albumMovimentoX = 0;

            albumArrastando = true;


            try{

                album.setPointerCapture(
                    event.pointerId
                );

            }catch(error){

                console.log(error);

            }

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
               Só reconhece swipe horizontal.
            */

            if(
                distancia > 45 &&
                distancia > Math.abs(movimentoY)
            ){

                if(albumMovimentoX < 0){

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

}


/* =====================================================
   TECLADO
===================================================== */

document.addEventListener(
    "keydown",
    function(event){

        /*
           Não interfere quando o usuário
           estiver digitando em um campo.
        */

        const tag =
            document.activeElement
                ? document.activeElement.tagName
                : "";


        if(
            tag === "INPUT" ||
            tag === "TEXTAREA" ||
            tag === "SELECT"
        ){

            return;

        }


        if(event.key === "ArrowRight"){

            albumProxima();

        }


        if(event.key === "ArrowLeft"){

            albumFotoAnterior();

        }

    }
);


/* =====================================================
   ESTADO INICIAL
===================================================== */

atualizarControlesAlbum();


/* =====================================================
   MÚSICA
===================================================== */

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

if(musica){

    musica.volume =
        0.45;

}


/* =====================================================
   TOCANDO
===================================================== */

function musicaTocando(){

    if(botaoMusica){

        botaoMusica.innerHTML =
            "❚❚";

    }


    if(playerMusica){

        playerMusica.classList.add(
            "tocando"
        );

    }

}


/* =====================================================
   PAUSADA
===================================================== */

function musicaPausada(){

    if(botaoMusica){

        botaoMusica.innerHTML =
            "▶";

    }


    if(playerMusica){

        playerMusica.classList.remove(
            "tocando"
        );

    }

}


/* =====================================================
   PLAY / PAUSE
===================================================== */

function alternarMusica(){

    if(!musica){

        return;

    }


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

if(volumeMusica && musica){

    volumeMusica.addEventListener(
        "input",
        function(){

            musica.volume =
                parseFloat(this.value);

        }
    );

}


/* =====================================================
   EVENTO PAUSE
===================================================== */

if(musica){

    musica.addEventListener(
        "pause",
        function(){

            musicaPausada();

        }
    );


    musica.addEventListener(
        "play",
        function(){

            musicaTocando();

        }
    );

}


/* =====================================================
   VISIBILIDADE
===================================================== */

document.addEventListener(
    "visibilitychange",
    function(){

        if(
            document.hidden &&
            musica &&
            !musica.paused
        ){

            musica.pause();

            musicaPausada();

        }

    }
);


/* =====================================================
   PAGEHIDE
===================================================== */

window.addEventListener(
    "pagehide",
    function(){

        if(!musica){

            return;

        }


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

        if(musica){

            musica.pause();

        }

    }
);


/* =====================================================
   ENTRADA NO SITE
===================================================== */

function entrarNoSite(){

    if(musica){

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

    }


    const telaEntrada =
        document.getElementById(
            "telaEntrada"
        );


    if(!telaEntrada){

        return;

    }


    telaEntrada.classList.add(
        "saindo"
    );


    document.body.style.overflow =
        "";


    setTimeout(function(){

        telaEntrada.remove();

    },850);

}
