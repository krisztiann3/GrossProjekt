<script setup>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2'
import { toValidAssetId } from '@vue/compiler-core';


const kosar = ref([])
const termekek = ref([])
const Route = useRoute()
const Router = useRouter()

const logout = async () => {
    await axios.post('/logout')
    localStorage.clear('token')
    Router.push('/login')
}

onMounted(async () => {
    kosar.value = JSON.parse(localStorage.getItem("kosar")) || [] //a kosár lekérése
}
)

const termek = async (id) => {
    kosar.value.push({
        id: id.id,
        megnevezes: id.megnevezes,
        meret: id.meret,
        osszeg: id.osszeg
    })
}

var vasaroltE = '';
const megrendeles = async () => {
    await axios.post('/vasarlas', {
        kosar: JSON.parse(localStorage.getItem("kosar")),
        vasaroltE:'vasarolt'

    }),Swal.fire(
        'Siker!',
        'Rendelésedet fogadtuk, emailben értesítünk a továbbiakról.',
        'success'
    )
    
    if(vasaroltE != null){
    console.log('vasarolt')
    localStorage.removeItem("kosar")
    }
}


watch(kosar, (torolKosar) => {
    localStorage.setItem("kosar", JSON.stringify(torolKosar))
}, {
    deep: true
})

const torol = async (id) => {
    console.log(id)
    for (let i = 0; i < kosar.value.length; i++) {
        if (i == id && kosar.value[i].mennyiseg < 2) {
            kosar.value.splice(i, 1);
        } else if (i == id && kosar.value[i].mennyiseg >= 2) {
            kosar.value[i].mennyiseg -= 1;
        }
    } Swal.fire(
        'Törölve!',
        'a termék törlésre került kosaradból',
        'success'
    )
}
const uresE = async (kosar) => {
    if (kosar.value.length == 0 || kosar.value[i] == null) {
        uresE == true;
    }
}


</script>

<template>
    <div id="shoppingcart">
        <h1>Kosarad</h1>
        <div v-if="kosar.value == null">
            <p aria-errormessage="Kosarad üres"></p>
        </div>
        <div id="osszesit">
            <div v-for="(items, id) in kosar">
                <div id="megjelenit">
                    <div id="kep">
                        <img src="/gorsskid.jpg" alt="" id="termkep">
                    </div>
                    <div id="adatok">
                        <div id="megnev">Termék megnevezés: {{ items?.megnevezes }}</div>
                        <div id="menny">Darabszám: {{ items?.mennyiseg }}</div>
                        <div id="meret">Mérete: {{ items?.meret }}</div>
                        <div id="ar">Ára: {{ items?.osszeg * items?.mennyiseg}}ft</div>
                        <div id="torol">
                            <button type="submit" @click="torol(id)">Törlés</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="bottom"></div>
            <div id="end">
                <div>
                    <button @click="megrendeles(),check()" type="submit">Megrendelés</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
#shoppingcart {
    padding: 2%;
}

#osszesit {
    border-width: 1px;
    border-top: solid;
}

#data {
    border-style: solid;
    border-width: 2px;
    border-width: 1px;
    width: 160px;
    margin: auto;
}

#termkep {
    width: 140px;
    height: 160px;
    margin-bottom: 8px;
    border-style: solid;
    border-width: 1px;
    border-color: #D7DAE5;
}

#megjelenit {
    border-style: solid;
    border-color: blanchedalmond;
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 1%;
}

#bottom {
    border-width: 1px;
    border-top: solid;
}

#end {
    float: right;

    padding-top: 2%;
    padding-bottom: 2%;
}

#kep {
    display: inline-block;
}

#adatok {
    padding: 2%;
    display: inline-block;

}

#meret {
    padding: 2%;
    display: inline-block;
    color: #D7DAE5;
}

#menny {
    padding: 2%;
    display: inline-block;
    color: #D7DAE5;
}

#megnev {
    padding: 2%;
    display: inline-block;
    color: #D7DAE5;
}

#ar {
    padding: 2%;
    display: inline-block;
    color: #D7DAE5;
}

#logout {
  display: block;
  align-self: center;
  font-weight: bold;
}

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
</style>
<style scoped>
h1{
    color: white;
}
</style>