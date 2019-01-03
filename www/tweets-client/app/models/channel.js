import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  program: DS.attr(),
  lecturer: DS.attr()
});
