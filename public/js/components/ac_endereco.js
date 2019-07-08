export default {
    template: ` 
    <v-autocomplete :loading="lendereco" :items="iendereco" item-text="nome" item-value="codigo"
    :search-input.sync="sendereco" v-model="endereco" label="Endereço"></v-autocomplete>
    `,
  
    data: function data() {
      return {
        lendereco: false, iendereco: [], sendereco: null, endereco: null, cidade: 0, uf: 24
      }
    },
    
    watch: {
      sendereco(val) {
        val && this.qendereco(val)
      },   
  
      endereco(){
        this.$emit('change')
      }
    },  
      
    methods: {
      qendereco(v) {
        if (v.length > 2 && this.cidade>0) {
          this.lendereco = true
          this.$http.post("/endereco/cidade_nome", {'est': this.uf, 'cid': this.cidade, 'str': v}).then((res) => {
            this.lendereco = false
            this.iendereco = res.body
          })
        }
      },
    }
  }