import Controller from '@ember/controller';
import Cookies from 'js-cookie';
import $ from 'jquery';

export default Controller.extend({
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
          if(data[i].name.localeCompare(course)){
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
          if(data.localeCompare("success")){
            this.get('flashMessages').success('Tweet sent successfully');
          } else {
            this.get('flashMessages').danger("Failed to send tweet");
            console.log(data);
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
