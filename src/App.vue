
<template>
  <div id="app">
   <template v-if="currentUser">
    <Navbar></Navbar>
    <div class="container-fluid page-body-wrapper">
     <Sidebar></Sidebar>
       <router-view></router-view>
    </div> 
      <Footer></Footer>
   </template>
   <template v-else>
         <router-view></router-view>
   </template>   
   
  
  </div> 
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Sidebar from '@/components/sidebar'

export default {
 name: 'app',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  created () {
    this.checkCurrentLogin()
  },
  updated () {
    this.checkCurrentLogin()
  },
  methods: {
    checkCurrentLogin () {
      if (!this.currentUser && this.$route.path !== '/') {
        this.$router.push('/?redirect=' + this.$route.path)
      }
    }
  },
  components: {
    Navbar,
    Footer,
    Sidebar
  },
  mounted(){
   
  }
}
</script>

