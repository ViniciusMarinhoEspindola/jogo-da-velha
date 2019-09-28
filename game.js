const game = {
	espacos : ["","","","","","","","",""],
	simbolos : ["X","O"],
	placar : {"X" : 0 , "O" : 0},
	recomecar : null,
	turno : 0,
	container : null,
	
	fim_de_jogo : false,
	ganhador : "jogo da velha",

	sequencia_vencedora : [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	],

	ini: function(container) {
		this.container = container;
		
		if ( this.verificar_vencedor("X" ) ){
			this.placar["X"]++;
			this.ganhador = "Jogador X venceu!!!";
			this.desenhar();
		}
		if ( this.verificar_vencedor("O" ) ){
			this.placar["O"]++;
			this.ganhador = "Jogador O venceu!!!";
			this.desenhar();
		}
		this.desenhar();
	},

	trocar_turno: function() {
		if( this.turno == 0){
			this.turno = 1;
		}
		else{
			this.turno = 0;
		}
	},

	fazer_jogada: function(posicao) {
		if (this.fim_de_jogo == false) {
			if(this.espacos[posicao] ==	 ""){
				this.espacos[posicao] = this.simbolos[this.turno];
				this.ini(this.container);
				this.trocar_turno();
			}
		}
	},

	recomecar: function(){
		this.espacos = ["","","","","","","","",""];
		this.ganhador = "jogo da velha";
		this.desenhar();
		this.fim_de_jogo = false;

	},

	verificar_vencedor: function (simbolo) {
		for(let i =  0; i <= 7; i++ ){
			if (this.espacos[ this.sequencia_vencedora[i][0] ] === simbolo &&
				this.espacos[ this.sequencia_vencedora[i][1] ] === simbolo &&
				this.espacos[ this.sequencia_vencedora[i][2] ] === simbolo)
			{	
				this.fim_de_jogo = true;
				return true;
			}
		}
	},

	desenhar:function () {
		this.container.innerHTML = "";
		this.container.innerHTML += "<button onclick='game.recomecar();'>Recomeçar</button>"
		this.container.innerHTML += "<div class='titulo'>" + this.ganhador + "</div>";
		this.container.innerHTML += "<div class='placar'><h1>Placar</h1><h3>Jogador X: " + this.placar["X"] + "</h3><h3>Jogador O: " + this.placar["O"] + "</h3></div>";
		for(let i = 0; i <= 8; i++) {
			this.container.innerHTML += "<div onclick='game.fazer_jogada("+ i +")'>" + this.espacos[i] + "</div>";
		}
	}
}