import Realm from 'realm';

class Agent {}

Agent.schema = {
  name: 'Agent',
  properties: {
    cpf: 'string',
    email: 'string',
    name: 'string',
    token: 'string',
  },
};

export default new Realm({schema: [Agent]});
