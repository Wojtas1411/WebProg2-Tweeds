import DS from 'ember-data';

export default DS.Model.extend({
  course_id: DS.attr('string'),
  user_id: DS.attr('string'),
  content: DS.attr('string')

});
