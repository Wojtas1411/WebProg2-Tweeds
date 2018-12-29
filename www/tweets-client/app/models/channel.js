import DS from 'ember-data';

export default DS.Model.extend({
  id: DS.attr(),
  name: DS.attr(),
  program: DS.attr(),
  lecturer: DS.attr()
});
