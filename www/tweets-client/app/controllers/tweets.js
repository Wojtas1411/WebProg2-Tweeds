import Controller from '@ember/controller';
import Cookies from 'js-cookie';
import $ from 'jquery';
import { inject as service } from '@ember/service';

export default Controller.extend({
  websockets: service(),
  newTweets: null,
  init(){
    this._super(...arguments);
    const socket = this.websockets.socketFor('ws://10.6.0.6:8081/');
    socket.on('open', this.myOpenHandler, this);
    socket.on('message', this.myMessageHandler, this);
  },
  myOpenHandler(event) {
    console.log(`On open event has been called: ${event}`);
  },
  myMessageHandler(event) {
    console.log(`Message: ${event.data}`);

    let temp = this.get('newTweets');
    if(temp == null){
      temp=[];
    }
    temp.pushObject(JSON.parse(event.data));
    this.set('newTweets', temp);
  },
  data: null,
  actions: {
    send(){
      let {course, content} = this.getProperties('course', 'content');
      this.set('course',null);
      this.set('content',null);
      $.getJSON("http://10.6.0.6:8081/channels/reg/"+Cookies.get("session")).then(data => {
        console.log("request from send tweet");
        console.log(data);

        this.set("data", data);

        for(var i=0; i<data.length; i++){
          if(data[i].name.localeCompare(course)==0){
            course = data[i].id;
            break;
          }
        }

        let t = {
          course: course,
          content: content
        };

        $.ajax({
          crossOrigin: true,
          method: "PUT",
          url: 'http://10.6.0.6:8081/tweet/'+Cookies.get("session"),
          data: t
        }).then((data)=>{
          if(data.localeCompare("success")==0){
            this.get('flashMessages').success('Tweet sent successfully');
          } else {
            this.get('flashMessages').danger("Failed to send tweet server rejected");
            console.log("error data: "+data);
          }
        },()=>{
          this.get('flashMessages').danger("Failed to send tweet");
        })


      },()=>{
        this.get('flashMessages').danger("Failed to send tweet");
      })
    }
  }
});
