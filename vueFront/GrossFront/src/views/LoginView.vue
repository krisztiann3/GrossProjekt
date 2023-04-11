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
        console.log("Login request")
        await axios.post('/login',{
            nev: felhnev.value,
            jelszo: jelszo.value,
            adminNev: adminNev.value,
            adminJel: adminJel
        }).then(
            
            function(response){
                if(response.data.status == "succes"){
                
                localStorage.setItem('token',JSON.stringify(response.data.token))
                router.push('/')
                Swal.fire(
                'Üdv '+felhnev.value+' !',
                'Sikeres bejelentkezés',
                'success'
                )
                }else{
                Swal.fire(
                'Nem sikerült !',
                'Sikertelen bejelentkezés',
                'error'
                ).then(
                    router.push('/login')
                )
                }
                if(felhnev.value == adminNev.value){
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
    <div class="col-lg-12">
        <label>Belépés</label>
        <div id="login">
            <div id="innerLogin">
                <br>
                <form @submit.prevent="login" class="responsive" >
                    
                    <input type="text" v-model="felhnev" placeholder="Felhasználó név:"><br><br>
                    <input type="password" v-model="jelszo" placeholder="Jelszó:"><br><br>
                    <button type="submit">Bejelentkezés</button>
                </form><br>
                <RouterLink to="/register" class="r-link" id="registLink">
                Vagy regisztrálj...
                </RouterLink>
            </div>
            <br>
        </div>
    </div>
</div>
</template>
<style scoped>
    body{
    max-width: 100%;
    }
    /* h4{
        color: whitesmoke;
    } */
    #innerLogin{
        border-radius: 25px;
        background-color: #a09cb0;
        padding-bottom: 5px;
        margin-left: 15px;
        margin-right: 15px;
        margin-top: 2px;
        
    }
    label{
    float: left;
    color: #f2f4f3;
    font-weight: bolder;
    font-size: 30px;
    padding-left: 4%;
    padding-top: 9px;
    }
    #login{
    border-radius: 25px;
    background-color: #3D5467;
    text-align: center;
    padding-top: 4%;
    min-width: 420px;
    min-height: 320px;
    }
    #registLink{
        font-size: 20px;
        padding-top: 2%;
        padding-bottom: 6%;
        color:#bdede0;
        margin-bottom: 2px;
    }

</style>