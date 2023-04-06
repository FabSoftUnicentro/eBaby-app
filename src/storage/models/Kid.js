import Realm from 'realm';

class Kid {}

Kid.schema = {
  name: 'Kid',
  properties: {
    cpf: 'string',
    name: 'string',
    birthAge: 'string',
    gestationalAge: 'string',
    sex: 'string',
  },
};

export default new Realm({schema: [Kid]});
