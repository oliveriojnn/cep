var app = new Vue({
	el: '#app',
	data: {
		message: 'Busque o endereço do seu CEP!',
		cep:'',
		status:false,
		resultado:{}
	},
	methods:{
		send: function(e) {
			e.preventDefault();
			var self = this;
			self.$http.get('http://viacep.com.br/ws/' + this.cep + '/json/').then(function(result) {
				self.resultado = result.data;
				this.status = false;
				self.cep = '';
				$('#cep').focus();
			})
			.catch(function(err) {
				this.status = true;
				this.resultado = {};
				this.cep = '';
				$('#cep').focus();
			})
		},
		limpar: function(e) {
			e.preventDefault();
			this.status = false;
			this.cep = '';
			this.resultado = {};	
		}
	}
})