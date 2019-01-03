import Route from '@ember/routing/route';
import Authenticated from '../mixins/authenticated-route';
import Cookies from "js-cookie";

export default Route.extend(Authenticated, {
  model(){
    //return this.store.findAll('channels');
    return new Promise((resolve, reject) => {
      $.getJSON("http://10.6.0.6:8081/channels/"+Cookies.get("session")).then(data => {
        console.log("request from model channels");
        console.log(data);
        resolve(data);
      },()=>{
        reject();
      })
    })
  }
});
