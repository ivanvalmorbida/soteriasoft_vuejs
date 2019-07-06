export default {
  template: ` 
  <v-autocomplete :loading="lcidade" :items="icidade" item-text="nome" item-value="codigo"
  :search-input.sync="scidade" v-model="cidade" label="Cidade"></v-autocomplete>
  `,

  data: function data() {
    return {
      cidade: null, lcidade: false, icidade: [], scidade: null, uf: 24
    }
  },
  
  watch: {
    scidade(val) {
      val && this.qcidade(val)
    },

    cidade(){
      this.$emit('change')
    }
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