var app = new Vue({
	el: '#app',
	data: {
		message: 'Busque o endereço do seu CEP!',
		cep:'',
		erro:false,
		resultado:{},
		ceps:[]
	},
	methods:{
		send: function(e) {
			e.preventDefault();
			var self = this;
			self.$http.get('https://viacep.com.br/ws/' + this.cep + '/json/')
			.then(function(result) {
				this.resultado = result.data;
				this.erro = false;
				this.cep = '';
				$('#cep').focus();
				if (this.resultado.logradouro) {
					this.ceps.push(self.resultado);
				}
			})
			.catch(function(err) {
				this.erro = true;
				this.resultado = {};
				this.cep = '';
				$('#cep').focus();
			})
		},
		limpar: function(e) {
			this.ceps = [];
			e.preventDefault();
			this.status = false;
			this.cep = '';
			this.resultado = {};	
		}
	}
})