export default {
  props: {
    uf: String
  },

  template: ` 
  <v-autocomplete :loading="lcidade" :items="icidade" item-text="nome" item-value="codigo"
  :search-input.sync="scidade" v-model="cidade" label="Cidade"></v-autocomplete>
  `,

  data: function data() {
    return {
      rules: {
        required: (value) => !!value || 'Este campo é requerido!'
      },
      cidade: null, lcidade: false, icidade: [], scidade: null,
    };
  },
  
  watch: {
    scidade(val) {
      val && this.qcidade(val)
    },
  },  
    
  methods: {
    qcidade(v) {
      if (v.length > 2 && 1>0) {
        this.lcidade = true
        this.$http.post("/cidade/uf_nome", {'est': this.uf, 'str': v}).then((res) => {
          this.lcidade = false
          this.icidade = res.body
        })
      }
    }
  }
}