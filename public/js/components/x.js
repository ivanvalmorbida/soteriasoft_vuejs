export default {
  template: ` 
  <button @click="count++">Você clicou em mim {{ count }} vezes.</button>
  `,  
  data: function data() {
    return {
      count: 0
    }
  }
}          