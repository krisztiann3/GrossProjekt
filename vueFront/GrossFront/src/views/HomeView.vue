<script setup >
import { routerKey, RouterLink, RouterView } from 'vue-router'
import axios from 'axios'
import { useRouter } from 'vue-router'




const router = useRouter();



</script>

<template>
  <div class="row">
    <br>
    <div>
      <div class="col col-lg-12 col-md-12 col-sm-12" width="100%" id="kep">
        <img src="../../kepek/gk_tags.jpg" id="tags" alt="">
      </div>
    </div>
    <br>


    <div class="contaioner" id="about">
      <div class="row">
        <div class="col col-lg-4 col-md-4 col-sm-12 ">
          <iframe style="border-radius:12px"
            src="https://open.spotify.com/embed/playlist/7mIA2wJilXJVFsV09Xcvmc?utm_source=generator&theme=0" width="100%"
            height="352" frameBorder="" allowfullscreen="" id="spotify"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
        <div id="glog" class="col col-lg-4 col-md-4 col-sm-12">
          <img id="logo" src="../../kepek/grosskidz_logo.jpg" class="responsive" alt="">
        </div>
        <div id="about" class="col col-lg-4 col-md-4 col-sm-12">
          <div class="Head">
            <h3>Termék infók</h3>
          </div><br>
          <p id="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec metus lacus. Cras finibus
            eleifend porttitor.
            In tellus mi, pulvinar in auctor quis, malesuada eu eros. Mauris nec velit tincidunt mauris elementum
            scelerisque. Phasellus tempus nisi eget ex semper, et consequat lacus viverra. Nullam nec eros ac ex
            condimentum
            ultricies ultricies et metus. Nullam vulputate id enim a gravida. Vestibulum malesuada risus quis viverra
            congue. Maecenas eu auctor mauris. Phasellus scelerisque tristique dui, quis dictum leo congue eget. Fusce
            volutpat vestibulum fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
            cubilia
            curae; Cras feugiat elit at ex dapibus dignissim.

            Donec sagittis eget urna quis ultricies. Sed tristique lacus vel cursus bibendum. Aliquam feugiat enim at
            porta
            efficitur. In tincidunt pharetra nibh vel rhoncus. Quisque finibus et nisl in efficitur. Proin a odio ipsum.
            Integer rutrum libero ut nunc pretium, sit amet blandit ligula tristique. Nam sollicitudin non elit nec
            lacinia.
            Cras nulla nisi, finibus nec dui eu, semper rutrum magna. Vivamus quis dictum mauris. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed eu felis diam. Ut vehicula velit urna,
            eget accumsan felis sollicitudin eu. Vivamus sit amet urna ex. Vestibulum purus enim, rutrum et congue at,
            suscipit quis magna. Vestibulum posuere pulvinar nisi nec molestie.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#tags {
  padding-top: 2%;
  padding-bottom: 2%;
  padding: auto;
  width: 100%;
  min-width: 400px;
  min-height: 302px;
  border-style: solid;
  border-width: 1px;
  display: inline-flex;
}

#glog {
  padding: auto;
  padding-top: 3%;
  padding-bottom: 3%;

}

/* #tags {
  flex-direction: column;
  align-self: center;
  display: inline-flex;
   align-self: center;
  height: 70%;
} */

p,
h3 {
  color: white;
}

body {
  flex-direction: column;
  display: flex;
  width: fit-content;
  color: white;
}

.r-link {
  color: white;
  text-decoration: none;
  font-size: x-large;
  font-family: 'Garamond';
}

.r-link:hover {
  color: crimson;
  font-weight: bold;
}

.r-link-kosar {
  color: white;
  text-decoration: none;
  font-size: x-large;
  font-family: 'Garamond';
}

.r-link-kosar:hover {
  color: crimson;
  font-weight: bold;
}

.Head {
  border-width: 2px;
  border-style: solid;
  text-align: center;
  height: 65px;
  padding: 2%;
  padding-bottom: 4%;
}

body {
  background-color: black;
  color: white;
}

#about {
  padding: auto;
}
</style>

<style>
#about {
  border-top: 0px;
  border-style: solid;
  padding: 15px;
  height: 25%;
  display: block;
}

#navi {
  display: block;
  text-align: center;
  margin-top: 20px;
}

#logout {
  display: block;
  align-self: center;
  font-weight: bold;
}

#logo {
  padding: auto;
  width: 100%;
  min-height: 302px;
  border-style: solid;
  border-width: 1px;
}

#spotify {
  display: flex;
  height: 450px;
  border-style: solid;
  border-color: white;
  border-width: 2px;
}

#paragraph {
  text-align: justify;
}</style>