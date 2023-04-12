<script setup >
import axios from 'axios'
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2'

const router = useRouter();
const felhasznalonev = ref('');
const emailcim = ref('');
const jelszo = ref('');
const jelszo2 = ref('');
const outPut = ref('');

const register = async () => {
    const result = await axios.post('/register', {
        felhasznalonev: felhasznalonev.value,
        emailcim: emailcim.value,
        jelszo: jelszo.value,
        jelszo2: jelszo2.value
    })

    console.log(result.data.status)
    if (result.data.status == 'succesful') {
        Swal.fire(
            'Sikeres regisztráció',
            'A bejelentkezés oldalon már be is jelentkezhetsz',
            'success'
        ).then(
            router.push('/login')
        )
    }
    else if (result.data.status == 'missingCred') {
        Swal.fire(
            'Hiányzó adatok',
            'Kérjük próbáld újra',
            'error'
        ).then(
            router.push('/register')
        )
    }
    else if (result.data.status == 'passwordError') {
        Swal.fire(
            'Hibás jelszó',
            'Kérjük próbáld újra',
            'error'
        ).then(
            router.push('/register')
        )
    }
    else if (result.data.status == 'inUse') {
        Swal.fire(
            'Foglalt',
            'Kérjük próbáld újra',
            'error'
        ).then(
            router.push('/register')
        )
    }
}



</script>

<template>
    <div>

        <div v-show="outPut">
            {{ outPut }}
            <br>
        </div>
        <div class="row">
            <div class="col">
                <div id="regist">
                    <div id="registIn">
                        <form @submit.prevent="register" id="registIn">
                            <h4>Regisztráció:</h4>
                            <input type="text" v-model="felhasznalonev" placeholder="Felhasználó név:"><br><br>
                            <input type="text" v-model="emailcim" placeholder="Email Cím:"><br><br>
                            <input type="password" v-model="jelszo" placeholder="Jelszó:"><br><br>
                            <input type="password" v-model="jelszo2" placeholder="Jelszó:"><br><br>
                            <button type="submit">Bejelentkezés</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
#regist {
    padding-top: 3%;
    height: 400px;
    background-color: #451f55;
}

h4 {
    color: #EBF8B8;
}

#registIn {
    padding-top: 3px;
    padding-bottom: 3px;
    border-radius: 25px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 2px;
    background-color: #724e91;
    text-align: center;
}
</style>