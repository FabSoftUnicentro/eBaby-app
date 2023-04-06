import Realm from 'realm';

class Itens {}

Itens.schema = {
  name: 'Itens',
  properties: {
    name: 'string',
    result: 'string',
  },
};

class TestKid {}

TestKid.schema = {
  name: 'TestKid',
  properties: {
    cpfKid: 'string',
    cpfAgent: 'string',
    weight: 'string',
    length: 'string',
    itens: {type: 'list', objectType: 'Itens'},
    note: 'string',
    done: 'bool',
  },
};

export default new Realm({schema: [TestKid, Itens]});
