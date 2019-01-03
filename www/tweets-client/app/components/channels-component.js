import Component from '@ember/component';
import $ from 'jquery';
import Cookies from 'js-cookie';

export default Component.extend({
  actions:{
    follow(channel){
      return new Promise((resolve, reject)=>{
        $.ajax({
          crossOrigin: true,
          method: "PUT",
          url: 'http://10.6.0.6:8081/channels/'+channel.id+'/'+Cookies.get('session')
        }).then((data)=>{
          //console.log(typeof (data));
          if(data.localeCompare("success")==0){
            //console.log("xd");
            //channel.follows = 1;
            //console.log("follows");
            this.set("channel.follows",1);
            resolve();
          } else {
            reject();
          }
        }, ()=>{
          reject();
        })
      });
    },
    unfollow(channel){
      return new Promise((resolve, reject)=>{
        $.ajax({
          crossOrigin: true,
          method: "DELETE",
          url: 'http://10.6.0.6:8081/channels/'+channel.id+'/'+Cookies.get('session')
        }).then((data)=>{
          //console.log(typeof (data));
          if(data.localeCompare("success")==0){
            //console.log("xd");
            //channel.follows = 0;
            //console.log("unfollows");
            this.set("channel.follows",0);
            resolve();
          } else {
            reject();
          }
        }, ()=>{
          reject();
        })
      });
    }
  }
});
