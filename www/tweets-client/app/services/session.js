import Service from '@ember/service';
import * as shajs from 'sha.js';
import Cookies from 'js-cookie';
import $ from 'jquery';
import { run } from '@ember/runloop';

export default Service.extend({
  current_session: null,
  current_user: null,
  login(userName, password){
    let rand_str = function () {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      let num = Math.floor(Math.random() * 10 + 10);

      for (var i = 0; i < num; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    };

    return new Promise((resolve, reject)=>{
      let r1 = rand_str();
      var r2;

      $.ajax({
        crossOrigin: true,
        method: "POST",
        url: 'http://10.6.0.6:8081/login1/'+r1
      }).then((data)=>{
        r2 = data;
        let hashstr = new shajs.sha256().update(r1+password+r2).digest('hex');

        run($.ajax({
          crossOrigin: true,
          method: "POST",
          url: 'http://10.6.0.6:8081/login2/'+userName+'/'+hashstr,
        }).then((data)=>{

          var session_id = data;
          if(session_id.localeCompare("Invalid login")!==0){
            this.set('current_session', session_id);
            this.set('current_user', userName);
            Cookies.set("session", session_id);
            Cookies.set("user", userName);
            resolve();

          } else {
            reject("3. Wrong username or password");
          }
        },()=>{
          reject("2. Wrong username or password");
        }))
      }, ()=>{
        reject("1. Wrong username or password");
      });

    });

  },
  logout(){
    $.ajax({
      crossOrigin: true,
      method: "POST",
      url: 'http://10.6.0.6:8081/logout/'+Cookies.get("session")
    });

    this.set('current_session', null);
    this.set('current_user', null);
    Cookies.remove("session");
    Cookies.remove("user");
  },
  init(){
    this._super(...arguments);
    let session_id = Cookies.get("session");
    let username = Cookies.get("user");
    if(!session_id){
      this.set('current_session', session_id);
      this.set('current_user', username);
    }
  }
});
