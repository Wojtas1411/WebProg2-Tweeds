import DS from 'ember-data';

export default DS.Model.extend({
  id: DS.attr(),
  course_id: DS.attr(),
  user_id: DS.attr(),
  content: DS.attr()

});
