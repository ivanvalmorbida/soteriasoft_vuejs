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

  methods: {
    uf_change() {
      this.$refs.ac_cidade.uf = this.$refs.s_uf.uf
      this.$refs.ac_bairro.uf = this.$refs.s_uf.uf 
      this.$refs.ac_endereco.uf = this.$refs.s_uf.uf 
    },
    
    cidade_change() {
      this.$refs.ac_bairro.uf = this.$refs.s_uf.uf 
      this.$refs.ac_bairro.cidade = this.$refs.ac_cidade.cidade
      this.$refs.ac_endereco.uf = this.$refs.s_uf.uf 
      this.$refs.ac_endereco.cidade = this.$refs.ac_cidade.cidade
    },

    buscar_cep() {
      if (this.cep.length==8){
        this.$http.post('/cep/cep', {cep: this.cep}).then((res) => {
          if (res.body.length>0){
            this.complemento                  = res.body[0].complemento
            this.$refs.s_uf.uf                = res.body[0].estado
            this.$refs.ac_cidade.icidade      = [{codigo: res.body[0].cidade, nome: res.body[0].cidade_}]
            this.$refs.ac_cidade.cidade       = res.body[0].cidade      
            this.$refs.ac_bairro.ibairro      = [{codigo: res.body[0].bairro, nome: res.body[0].bairro_}]
            this.$refs.ac_bairro.bairro       = res.body[0].bairro
            this.$refs.ac_endereco.iendereco  = [{codigo: res.body[0].endereco, nome: res.body[0].endereco_}]
            this.$refs.ac_endereco.endereco   = res.body[0].endereco
          }
          else{
            this.limpar(false)
          }
        }) 
      }        
    },

    limpar(cep) {
      if (cep==true){this.cep = null}
      this.complemento                  = null
      this.$refs.s_uf.uf                = null
      this.$refs.ac_cidade.icidade      = []
      this.$refs.ac_cidade.cidade       = null
      this.$refs.ac_bairro.ibairro      = []
      this.$refs.ac_bairro.bairro       = null
      this.$refs.ac_endereco.iendereco  = []
      this.$refs.ac_endereco.endereco   = null
    },

    gravar() {
      var estado=0
      var cidade=0
      var bairro=0
      var endereco=0

      if(this.$refs.s_uf.uf!=null) {estado=this.$refs.s_uf.uf}
      if(this.$refs.ac_cidade.cidade!=null) {cidade=this.$refs.ac_cidade.cidade}
      if(this.$refs.ac_bairro.bairro!=null) {bairro=this.$refs.ac_bairro.bairro}
      if(this.$refs.ac_endereco.endereco!=null) {endereco=this.$refs.ac_endereco.endereco}
      if(this.complemento==null) {this.complemento=""}

      this.$http.post('/cep/gravar',{cep: this.cep, estado: estado, cidade: cidade, 
      bairro: bairro, endereco: endereco, complemento: this.complemento}).then((res) => {

      })
    },
  },
});

/*
angular.module('Soteriasoft', ['ngMaterial', 'Soteriasoft.Comum'])
.controller('Soteriasoft.Control', function($http,$scope, $mdDialog) {
  function format(mask, number) {
    var s = ''+number, r = '';
    for (var im=0, is = 0; im<mask.length && is<s.length; im++) {
      r += mask.charAt(im)=='#' ? s.charAt(is++) : mask.charAt(im)
    }
    return r
  }

  $scope.Localizar = function(ev) {
    $mdDialog.show({
      controller: LocalizarController,
      templateUrl: './cep/dlg/localizar',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: {EstadoSigla: $scope.EstadoSigla}      
    }).then(function(answer) {
      if (answer>0){
        $scope.cep = format('#####-###', answer)
        $scope.BuscarCEP()
      }      
    }, function() {
      console.dir('You cancelled the dialog.')
    })
  }
  
  function LocalizarController($scope, $mdDialog, EstadoSigla) {
    $scope.EstadoSigla = EstadoSigla

    $scope.Cancel = function() {
      $mdDialog.cancel()
    }

    $scope.LocalizarExe = function() {
      $http.post('/cep/endereco', { estado: $scope.l_estado.codigo,
      cidade: $scope.l_cidade.codigo, endereco: $scope.l_endereco.codigo}).
      success(function (data, status, headers, config) {
        $scope.l_dados = data.dados
      }).error(function (data, status, headers, config) {
        //
      }) 
    }

    $scope.ExibirCEP = function(answer) {
      $mdDialog.hide(answer)
    }
  }

  $scope.Apagar = function(ev) {
    $mdDialog.show({
      controller: ApagarController,
      templateUrl: './cep/dlg/apagar',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: {cep: $scope.cep }
    })
    .then(function(answer) {
      $http.post('/cep/apagar', {cep: $scope.cep}).
      success(function (data, status, headers, config) {
        $scope.Limpar()
      }).error(function (data, status, headers, config) {
        //
      })        
    }, function() {
      
    })
  }
  
  function ApagarController($scope, $mdDialog, cep) {
    $scope.cep = cep

    $scope.Cancel = function() {
      $mdDialog.cancel()
    }

    $scope.Efetivar = function(answer) {
      $mdDialog.hide(answer)
    }
  }
  $scope.Limpar()
})*/