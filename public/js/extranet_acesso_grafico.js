var vm = new Vue({
    el: '#app',
    data: function data() {
        return {
            rules: {
                required: (value) => !!value || 'Este campo é requerido!'
            }, valid: true,
            data_ini: null, data_ini_Formatted: null, menu_data_ini: false, 
            data_fin: null, data_fin_Formatted: null, menu_data_fin: false,
            equipe_items: [], equipe: null, tipo_imovel_items: [], tipo_imovel: null,
        };
    },
  
    watch: {
        data_ini(val) {
            this.data_ini_Formatted = this.formatDate(this.data_ini)
        },
  
        data_fin(val) {
            this.data_fin_Formatted = this.formatDate(this.data_fin)
        },
    },
  
    methods: {
        parseDate (date) {
            if (!date) return null
            
            day = date.substring(0,2)
            month = date.substring(2,4)
            year = date.substring(4,8)
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
          },
  
        formatDate(date) {
            if (!date) return null
  
            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
    },
  
    created() {
        this.$http.get("dados/equipes").then((res) => {
            this.equipe_items =res.data.equipes
        })

        this.$http.get("dados/tipo_imovel").then((res) => {
            this.tipo_imovel_items =res.data.tipo_imovel
        })
    }
  });