<script setup>
    import {onMounted,ref} from 'vue'
    import axios from 'axios'
    import {useRouter} from 'vue-router'
    import Swal from 'sweetalert2'


    const felhnev = ref('');
    const jelszo = ref('');
    const router = useRouter();

    const adminNev = ref('admin');
    const adminJel = ref('admin');
    const tokenE = ref('')

    const login = async()=>{
        await axios.post('/login',{
            nev: felhnev.value,
            jelszo: jelszo.value,
            adminNev: felhnev.value,
            adminJel: jelszo.value
        }).then(
            function(response){
                if(felhnev.value != adminNev.value){
                localStorage.setItem('token',JSON.stringify(response.data.token))
                console.log(response.data.token)
                router.push('/')
                Swal.fire(
                'Üdv '+felhnev.value+' !',
                'Sikeres bejelentkezés',
                'success'
                )
                }else if(felhnev.value == adminNev.value){
                localStorage.setItem('token',JSON.stringify(response.data.token))
                console.log(response.data.token)
                router.push('/admin')
                console.log('admin vagy, hajrá')
                }
            }
        ).catch(
            function(error) {
                console.log(error)
            }
        )
    }
  
</script>

<template>
<br>
<div class="row">
    <div class="col"></div>
    <div class="col"></div>
    <div class="col">
        <div id="login">
            <h5>Belépés</h5>
    <form @submit.prevent="login">
        <input type="text" v-model="felhnev" placeholder="Felhasználó név:"><br><br><br>
        <input type="password" v-model="jelszo" placeholder="Jelszó:"><br><br>
        <button type="submit">Bejelentkezés</button>
    </form>
    <RouterLink to="/register" class="r-link" id="registLink">
     Vagy regisztrálj...
    </RouterLink>
        </div>
    </div>
    <div class="col"></div>
    <div class="col"></div>
</div>
</template>
<style scoped>
    h5{
    text-align: left;
    padding-left: 4%;
    padding-top:2% ;
    }
    #login{
    border-radius: 25px;
    background-color: #3D5467;
    text-align: center;
    padding-top: 5%;
    width: 400px;
    height: 300px;
    }
    #registLink{
        padding-top: 2%;
        padding-bottom: 2%;
    }
</style>