class JogoDaForcaView{

    buttons = document.querySelectorAll('.btn')
    areaTexto = document.getElementById('txtFedback')
    btnDeletar = document.getElementById('btnDeletar')
    btnChutar = document.getElementById('btnChutar')
    txtPalavraParcial = document.getElementById('txtPalavraParcial')
    imagemForca = document.getElementById('imagemForca');
    notificacao = document.getElementById('notificacaoDerrota');
    
    palavras;
    chars = [];
    
    tentativa;
    palavraSecreta = '';
    letrasDescobertas = '';

    constructor(){
        this.palavras = [ 'ABACATE','ABACAXI','ACEROLA','AÇAÍ',
        'ARAÇA',
        'ABACATE',
        'BACABA',
        'BACURI',
        'BANANA',
        'CAJÁ',
        'CAJÚ',
        'CARAMBOLA',
        'CUPUAÇU',
        'GRAVIOLA',
        'GOIABA',
        'JABUTICABA',
        'JENIPAPO',
        'MAÇÃ',
        'MANGABA',
        'MANGA',    
        'MARACUJÁ',
        'MURICI',
        'PEQUI',
        'PITANGA',
        'PITAYA',
        'SAPOTI',
        'TANGERINA',
        'UMBU',
        'UVA',
        'UVAIA'];
        this.letrasDescobertas = new Array();
        this.tentativa = 0;
        this.palavraSecreta = this.ObterpalavraSercreta();
        this.IniciarPalavraParcial();
        this.registrarEventos();     
          
    }

    IniciarPalavraParcial(){
        this.txtPalavraParcial.textContent = Array(this.palavraSecreta.length).fill("_").join(" ");
   }

    registrarEventos(){
        this.buttons.forEach(btn => {
            btn.addEventListener('click', (e) => this.botaoClicado(e))
        })

        this.btnDeletar.addEventListener('click', () => { this.chars.pop()
            this.areaTexto.value = this.chars.join('')
        })
        btnJogarNovamente.addEventListener('click',() => this.Reiniciar());

        this.btnChutar.addEventListener('click', () => this.Chutar())
    }


    botaoClicado(evento){
        const letraClicada = evento.target.textContent;
  
        const caractereExiste = letraClicada.trim().length > 0;

        if (caractereExiste && letraClicada != letraClicada.toUpperCase()){
            this.areaTexto.value = ' ';
            this.areaTexto.value = letraClicada;
        }
   
    }

    Chutar(){
        let c = this.areaTexto.value;
        let letraChute = c.toUpperCase();
        console.log(c);
        let palavra = this.palavraSecreta;
        console.log(palavra);

        if(this.letrasDescobertas.includes(letraChute)){
            this.areaTexto.value = '';
            return;
        }

        if(this.palavraSecreta.includes(letraChute))
        {
            for(let index = 0; index < this.palavraSecreta.length; index++)
            { 
                if(this.normalizarString(this.palavraSecreta[index]) === letraChute)
                    this.PopularPalavraParcial(index, this.palavraSecreta[index]);
            }
            this.buttons.forEach(btn => {
                if(btn.textContent.toUpperCase() == letraChute)
                {
                    btn.textContent = btn.textContent.toUpperCase();
                    btn.disable = true;            
                    btn.style.color = "green";
                    this.areaTexto.value = '';
                }             
             });
        }
        else
        {
            this.tentativa++;
    
            if(this.tentativa == 6){
                this.JogadorPerdeu();
                return;
            }
               
    
            this.letrasDescobertas.push(letraChute);
            this.imagemForca.setAttribute('src', `ImagensTentativas/Forca${this.tentativa + 2}.png`);
    
            this.buttons.forEach(btn => {
               if(btn.textContent.toUpperCase() == letraChute)
               {
                    btn.disable = true;
                    btn.textContent = btn.textContent.toUpperCase();
                    btn.style.color = "gray";
                    this.areaTexto.value = '';
               }
               
            });
        }   
        const palavraChutada = this.ObterPalavraCompleta();
        if(this.palavraSecreta == palavraChutada)
        {
           this.JogadorVenceu();
           return;
        }

    }

    ObterPalavraCompleta(){

        const letras = this.txtPalavraParcial.textContent.split(' ');
        let palavra = '';
        letras.forEach(letra => {
            palavra += letra;
        });
        return palavra;
    }

    normalizarString(string) {
        return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    JogadorPerdeu(){
        this.buttons.forEach(btn => {
            btn.disable = true;
            btn.textContent = btn.textContent.toUpperCase();
            btn.style.color = "gray";
            this.areaTexto.value = '';           
         });
        
         const notificacaoDerrota = document.createElement('h3');
         notificacaoDerrota.textContent = this.letrasDescobertas.join(" ") + ' Foram as Letras Usadas, Voce Perdeu Tente Novamente! A Palavra era '+ this.palavraSecreta;
         this.notificacao.appendChild(notificacaoDerrota);
    }

    JogadorVenceu(){
        this.buttons.forEach(btn => {
            btn.disable = true;
            btn.textContent = btn.textContent.toUpperCase();
            btn.style.color = "gray";
            this.areaTexto.value = '';           
         });
        
         const notificacaoVitoria = document.createElement('h3');
         notificacaoVitoria.textContent = this.palavraSecreta + ' Foram as Letras Usadas, Voce Acertou com '+ this.tentativa + ' tentativas!';
         this.notificacao.appendChild(notificacaoVitoria);
         this.notificacao.style.color = "green";

    }
    ObterpalavraSercreta(){
        let indice = this.GerarNumeroAleatorio();
        let palavraSecreta = this.palavras[indice];  
        palavraSecreta = this.normalizarString(palavraSecreta.toUpperCase())
        return palavraSecreta;
    }

    GerarNumeroAleatorio()
    {
        return Math.floor((Math.random() * 30) + 1);
    }

    PopularPalavraParcial (index,value){
        let palavra = this.txtPalavraParcial.textContent.split(' ');
        palavra[index] = value;
        this.txtPalavraParcial.textContent = palavra.join(' ');
    }
    Reiniciar()
    {
        location.reload();
    }
}

window.addEventListener('load', () => new JogoDaForcaView());