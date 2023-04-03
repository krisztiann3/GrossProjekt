<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router'


const user = ref('')
const router = useRouter();

const logout = async () => {
  await axios.post('/logout')
  localStorage.clear('token')
  router.push('/login')
}

const vanE = ()=>{
  if(localStorage.getItem('token') == null){
    return false;
  }else{
    return true;
  }
}

const isLoggedin = () =>{
  if(localStorage.getItem('token') == null){
    return false;
  }else{
    return true;
  }
}


if (!localStorage.getItem('token')) {
  router.push('/login')
}
</script>

<template>
  <div>
    <div class="row">
      <div class=" col-lg-12 col-md-12">
      <div id="mainNav">
        <RouterLink to="/" class="r-link">
          Főoldal
        </RouterLink>
        &nbsp;
        <RouterLink to="/termekek/polok" class="r-link">
          Gross pólók
        </RouterLink>
        &nbsp;
        <RouterLink to="/termekek/puloverek" class="r-link">
          Gross Puloverek
        </RouterLink>
        &nbsp;
        <RouterLink to="/termekek/nadragok" class="r-link">
          Gross Nadrágok
        </RouterLink>
        &nbsp;
        <RouterLink to="/kosar" class="r-link">
          Kosarad
        </RouterLink>
        &nbsp;
    <label @click="logout" v-if="vanE()" id="kijel">Kijelentkezés</label>
      </div>

    </div>
  </div>
</div>
  <div>
    <RouterView />
  </div>
</template>

<style >
body{
  background-color: black;
}
.r-link {
  color: #67597A;
  font-weight: bold;
  text-decoration: none;
  font-size: large;
}

.r-link:hover {
  color: crimson;
  font-weight: bold;
}

.Head {
  border-width: 2px;
  border-style: solid;
  text-align: center;
  height: 65px;

}

.row {
  padding-right: 2%;
}

#mainNav {
  padding-top: 20px;
  color:#AEB4A9 ;
  background-color: #D7DAE5;
  /* display: block; */
  text-align: center;
  /* margin-top: 20px; */
  border-radius: 20px;
  margin-left: 5px;
  margin-right: 5px;
  width: 100%;
  height: 165%;
}


#kijel {
  color: #67597A;
  font-weight: bold;
  text-decoration: none;
  font-size: medium;
  display: inline-block;
}
</style>
<style scoped>
#ki {
  float: right;
  margin-right: 15px;
  margin-top: 15px;
  color: white;
  background-color: black;
  border: 2px solid white;
  font-weight: bold;
  height: 40px;
}
  body{
    width: 100%;
    color: white;
    display: flex;
  background-color:black;
  }
</style>