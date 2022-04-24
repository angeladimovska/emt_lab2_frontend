import axios from "axios";

//axios-biblioteka koja ovozmozuva pravenje http baranje ili povik kon nadvoresni resursi
//ovaa instanca e za da gi pravam site axios povici
const instance = axios.create({
    baseURL : 'http://localhost:8080/api',
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
})
//axios raboti so promises- toa e wraper nad samiot objekt koj ke go prakjame
// ili vrakjme kako response i ke bide lesno da se nadovrzeme so streamovi na nego

//ova za da mozam da ja pristapam od drugi delovi
export default instance;