import Route from '@ember/routing/route';
import Authenticated from '../mixins/authenticated-route';
import $ from 'jquery';
import Cookies from 'js-cookie';

export default Route.extend(Authenticated, {
  model(){
    //return this.store.findAll('tweet');
    return new Promise((resolve, reject) => {
      let arr = {
        tweets :null,
        channels: null
      };
      $.getJSON("http://10.6.0.6:8081/tweet/"+Cookies.get("session")).then(data => {
        console.log("request from model tweets");
        console.log(data);
        //resolve(data);
        arr.tweets = data;
        if(arr.channels != null){
          resolve(arr);
        }
      },()=>{
        reject();
      });
      $.getJSON("http://10.6.0.6:8081/channels/reg/"+Cookies.get("session")).then(data => {
        console.log("request from model tweets channels");
        console.log(data);
        //resolve(data);
        arr.channels = data;
        if(arr.tweets != null){
          resolve(arr);
        }

      },()=>{
        reject();
      })
    })
    //   .then(function (result) {
    //   return result;
    // }, function (err) {
    //   console.log(err);
    //   return null;
    // })
  }
});
