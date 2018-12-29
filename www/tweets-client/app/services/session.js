import Service from '@ember/service';

export default Service.extend({
  current_session: null,
  login(session_id){
    this.set('current_session', session_id)
  },
  logout(){
    this.set('current_session', null)
  }
});
