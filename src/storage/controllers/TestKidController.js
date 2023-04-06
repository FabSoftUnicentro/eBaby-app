import realm from '../models/TestKid';
const Agent = require('./AgentController');

module.exports = {
  index() {
    try {
      let agent = Agent.index();
      let testkid = realm
        .objects('TestKid')
        .filtered(`done == true AND cpfAgent == '${agent.cpf}'`);
      return testkid;
    } catch (err) {
      return false;
    }
  },

  show() {
    try {
      let agent = Agent.index();
      let testkid = realm
        .objects('TestKid')
        .filtered(`done == false AND cpfAgent == '${agent.cpf}'`);
      return testkid[0];
    } catch (err) {
      return false;
    }
  },

  store(body) {
    try {
      realm.write(() => {
        realm.create('TestKid', body);
      });
      return true;
    } catch (err) {
      return false;
    }
  },

  update(body) {
    try {
      let testkid = this.show();
      realm.write(() => {
        testkid.itens.push(body);
      });
      return true;
    } catch (err) {
      return false;
    }
  },

  finalize(note) {
    try {
      let testkid = this.show();
      realm.write(() => {
        testkid.done = true;
        testkid.note = note;
      });
      return true;
    } catch (err) {
      return err;
    }
  },

  destroy(tk) {
    try {
      realm.write(() => {
        realm.delete(tk);
      });
      return true;
    } catch (err) {
      return false;
    }
  },
};
