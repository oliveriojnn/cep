const app = new Vue({
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
			this.$http.get('https://viacep.com.br/ws/' + this.cep + '/json/')
			.then(function(result) {
				this.resultado = result.data;
				this.erro = false;
				if (this.resultado.logradouro) {
					this.ceps.push(this.resultado);
				}
			})
			.catch(function(err) {
				this.erro = true;
				this.resultado = {};
			})
			.finally( function() {
				this.cep = '';
				$('#cep').focus();
			})
		},
		limpar: function(e) {
			e.preventDefault();
			this.ceps = [];
			this.status = false;
			this.cep = '';
			this.resultado = {};	
		}
	}
})
