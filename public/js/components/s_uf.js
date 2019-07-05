export default {
  template: ` 
  <v-select v-model="uf" label="UF" :items="iuf" item-text="nome" item-value="codigo"></v-select>
  `,

  data: function data() {
    return {
      uf: null, iuf: []
    }
  },
  
  watch: {
    uf() {
      this.$emit('change')
    },
  },  

  created() {
    this.$http.post("/estado/todos").then((res) => {
      this.iuf = res.body
    })  
  },
}