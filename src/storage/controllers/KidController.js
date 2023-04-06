import realm from '../models/Kid';
const TestKid = require('./TestKidController');

module.exports = {
  index(cpf) {
    try {
      let kid = realm.objects('Kid').filtered(`cpf == '${cpf}'`);
      return kid[0];
    } catch (err) {
      return false;
    }
  },

  getAllDone() {
    try {
      var tk = TestKid.show();
      console.log(tk);
      var cpfKid = null;
      console.log(cpfKid);
      if (tk != undefined){
        cpfKid = tk.cpfKid
        console.log('aaa');
        console.log(cpfKid);
      }
      var kid = null;
      if (cpfKid != null) {    
        kid = realm.objects('Kid').filtered(`cpf != '${cpfKid}'`);
      } else {
        kid = realm.objects('Kid');
      }
      return kid;
    } catch (err) {
      return false;
    }
  },

  show() {
    try {
      let testkid = TestKid.show();
      let cpf = testkid.cpfKid;
      let kid = realm.objects('Kid').filtered(`cpf == '${cpf}'`);
      return kid[0];
    } catch (err) {
      return false;
    }
  },

  store(body) {
    try {
      realm.write(() => {
        realm.create('Kid', body);
      });
      return true;
    } catch (err) {
      return false;
    }
  },

  update(req, res) {},

  destroy(kid) {
    try {
      realm.write(() => {
        realm.delete(kid);
      });
      return true;
    } catch (err) {
      return false;
    }
  },
};
