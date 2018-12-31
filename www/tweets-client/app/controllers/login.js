import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend({
  session: service(),
  actions: {
    login(){
      let {userName, password} = this.getProperties('userName', 'password');
      this.get("session").login(userName, password).then(()=>{
        this.get('flashMessages').success('You have signed in successfully');
        this.transitionToPreviousRoute();
      }).catch((reason)=>{
        this.get('flashMessages').danger(reason);
      })
    }
  },
  transitionToPreviousRoute(){
    var previousTransition = this.get('previousTransition');
    if (previousTransition) {
      this.set('previousTransition', null);
      previousTransition.retry();
    } else {
      // Default back to homepage
      this.transitionToRoute('login');
    }
  },
  test(){
    $.post()
  }

});
