export default {
  template: ` 
  <v-autocomplete :loading="lbairro" :items="ibairro" item-text="nome" item-value="codigo"
  :search-input.sync="sbairro" v-model="bairro" label="Bairro"></v-autocomplete>
  `,
  
  data: function data() {
    return {
      bairro: null, lbairro: false, ibairro: [], sbairro: null, uf: 24, cidade: 0,
    }
  },
    
  watch: {
    sbairro(val) {
      val && this.qbairro(val)
    },        
  },  
      
  methods: {
    qbairro(v) {
      if (v.length > 2 && this.cidade>0) {
        this.lbairro = true
        this.$http.post("/bairro/cidade_nome", {'est': this.uf, 'cid': this.cidade, 'str': v}).then((res) => {
          this.lbairro = false
          this.ibairro = res.body
        })
      }
    },      
  }
}