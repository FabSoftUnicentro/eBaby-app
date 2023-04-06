import realm from '../models/Agent';

module.exports = {
  index() {
    try {
      let agent = realm.objects('Agent');
      return agent[0];
    } catch (err) {
      return false;
    }
  },

  show() {
    try {
      let agent = realm.objects('Agent');
      return agent;
    } catch (err) {
      return false;
    }
  },

  store(body) {
    try {
      realm.write(() => {
        realm.create('Agent', body);
      });
      return true;
    } catch (err) {
      return false;
    }
  },

  update() {},

  destroy(agent) {
    try {
      realm.write(() => {
        realm.delete(agent);
      });
      return true;
    } catch (err) {
      return false;
    }
  },
};
