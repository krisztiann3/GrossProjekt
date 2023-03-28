<script setup>
import axios from 'axios';
import { RouterLink, RouterView, useRouter } from 'vue-router'


const router = useRouter();

if (!localStorage.getItem('token')) {
  router.push('/login')
}
</script>

<template>
  <div id="mainNav">
    <div class="row">
      <div class="col">
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
      </div>

    </div>
  </div>

  <div>
    <RouterView />
  </div>
</template>

<style >
body{
  background-color:black;
}
.r-link {
  color: #67597A;
  font-weight: bold;
  text-decoration: none;
  font-size: medium;
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
  color:#AEB4A9 ;
  background-color: #D7DAE5;
  display: block;
  text-align: center;
  margin-top: 20px;
  border-radius: 20px;
  margin-left: 5px;
  margin-right: 5px;
}


#kijel {
  display: inline-block;
}
</style>
<style scoped>
  body{
    color: white;
  }
</style>