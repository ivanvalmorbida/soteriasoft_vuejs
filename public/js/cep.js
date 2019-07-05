import ac_cidade from "./components/ac_cidade.js"
import s_uf from "./components/s_uf.js"

var vm = new Vue({
  el: '#app',
  data: function data() {
      return {
          rules: {
              required: (value) => !!value || 'Este campo é requerido!'
          }, 
          valid: true, cep: null, count: 0, bairro: null, lbairro: false, ibairro: [], sbairro: null,
          iuf: [], uf: null, complemento: null, lendereco: false, iendereco: [], sendereco: null, 
          endereco: null, dialog: false,
      };
  },
  components: {
    ac_cidade,
    s_uf,
  },

  watch: {  
    sbairro(val) {
      val && this.qbairro(val)
    },    
    
    sendereco(val) {
      val && this.qendereco(val)
    },    
  },

  methods: {
    uf_change() {
      this.$refs.ac_cidade.uf = this.$refs.s_uf.uf 
    },

    qbairro(v) {
      if (v.length > 2 && this.cidade>0) {
        this.lbairro = true
        this.$http.post("/bairro/cidade_nome", {'est': this.uf, 'cid': this.cidade, 'str': v}).then((res) => {
          this.lbairro = false
          this.ibairro = res.body
        })
      }
    },

    qendereco(v) {
      if (v.length > 2 && this.cidade>0) {
        this.lendereco = true
        this.$http.post("/endereco/cidade_nome", {'est': this.uf, 'cid': this.cidade, 'str': v}).then((res) => {
          this.lendereco = false
          this.iendereco = res.body
        })
      }
    },

    buscar_cep() {
      if (this.cep.length==8){
        this.$http.post('/cep/cep', {cep: this.cep}).then((res) => {
          if (res.body.length>0){
            this.complemento  = res.body[0].complemento
            this.uf           = res.body[0].estado
            this.$refs.ac_cidade.icidade      = {codigo: res.body[0].cidade, nome: res.body[0].cidade_}
            this.$refs.ac_cidade.cidade       = res.body[0].cidade      
            this.ibairro      = {codigo: res.body[0].bairro, nome: res.body[0].bairro_}
            this.bairro       = res.body[0].bairro
            this.iendereco    = {codigo: res.body[0].endereco, nome: res.body[0].endereco_}
            this.endereco     = res.body[0].endereco
          }
          else{
            this.limpar(false)
          }
        }) 
      }        
    },

    limpar(cep) {
      if (cep==true){this.cep = null}
      this.complemento  = null
      this.uf           = null
      this.$refs.ac_cidade.icidade      = []
      this.$refs.ac_cidade.cidade       = null
      this.ibairro      = []
      this.bairro       = null
      this.iendereco    = []
      this.endereco     = null
    }
  },

  created() {
    this.$http.post("/estado/todos").then((res) => {
        this.iuf = res.body
    })  
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

  $scope.Gravar = function() {
    if($scope.estado==null){estado=0} else{estado=$scope.estado.codigo}
    if($scope.cidade==null){cidade=0} else{cidade=$scope.cidade.codigo}
    if($scope.bairro==null){bairro=0} else{bairro=$scope.bairro.codigo}
    if($scope.endereco==null){endereco=0} else{endereco=$scope.endereco.codigo}
    
    $http.post('/cep/gravar', {cep: $scope.cep, estado: estado, cidade: cidade, 
      bairro: bairro, endereco: endereco, complemento: $scope.complemento}).
    success(function (data, status, headers, config) {
      if (data.dados.length>0){
        ShowSnackBar('Informações salvas com sucesso!')
      }
    }).error(function (data, status, headers, config) {
      //
    })  
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

    $scope.CidadeEstadoNome = function(StrSearch) {
      return $http.get('/cidade/cidade_estado_nome', {
      params: {
        txt: StrSearch,
        est: $scope.l_estado.codigo
      }
      }).then(function(data) {
        return data.data
      })
    }

    $scope.EnderecoCidadeNome = function(StrSearch) {
      return $http.get('/endereco/endereco_cidade_nome', {
      params: {
        txt: StrSearch,
        est: $scope.l_estado.codigo,
        cid: $scope.l_cidade.codigo
      }
      }).then(function(data) {
        return data.data
      })
    }  
     
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

  $scope.EstadoNome = function(StrSearch) {
    return $http.get('/estado/estado_nome', {
    params: {
      txt: StrSearch
    }
    }).then(function(data) {
      return data.data
    })
  }

  $scope.EstadoSigla = function(StrSearch) {
    return $http.get('/estado/estado_sigla', {
    params: {
      txt: StrSearch
    }
    }).then(function(data) {
      return data.data
    })
  }
  
  $scope.CidadeNome = function(StrSearch) {
    return $http.get('/cidade/cidade_nome', {
    params: {
      txt: StrSearch
    }
    }).then(function(data) {
      return data.data
    })
  }
  
  $scope.BairroNome = function(StrSearch) {
    return $http.get('/bairro/bairro_nome', {
    params: {
      txt: StrSearch
    }
    }).then(function(data) {
      return data.data
    })
  }

  $scope.EnderecoNome = function(StrSearch) {
    return $http.get('/endereco/endereco_nome', {
    params: {
      txt: StrSearch
    }
    }).then(function(data) {
      return data.data
    })
  }
  $scope.Limpar()
})*/