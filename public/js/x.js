import s_uf from "./components/s_uf.js"
import ac_cidade from "./components/ac_cidade.js"
import ac_bairro from "./components/ac_bairro.js"
import ac_endereco from "./components/ac_endereco.js"

var vm = new Vue({
  el: '#app',
  data: function data() {
      return {
          rules: {
              required: (value) => !!value || 'Este campo é requerido!'
          }, 
          valid: true, cep: null, count: 0, complemento: null, dialog: false,
      };
  },
  components: {
    s_uf,
    ac_cidade,
    ac_bairro,
    ac_endereco,
  },
});