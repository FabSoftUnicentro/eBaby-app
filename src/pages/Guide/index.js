import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { exp } from 'react-native/Libraries/Animated/src/Easing';
import styles from './styles';

const Answer = ({content}) => {
  
    return (
        <Text style={styles.answerText}>{content}</Text>
    )
}

const Question = ({title, content}) => {
  const [expanded, setExpanded] = useState(false);
  const expand_less = 'expand-less';
  const expand_more = 'expand-more';

  return (
    <>
      <TouchableOpacity
        style={styles.question} 
        onPress={() => {setExpanded(!expanded)}}>
        <Text style={styles.questionText}>{title}</Text>
        <Icon style={styles.icon} name={expanded ? expand_less : expand_more} size={48} color="#000"/>
      </TouchableOpacity>
        {expanded && (
          <Answer content={content}/>
        )}
    </>
  )
}

const Guide = ({navigation}) => {
  const [expanded, setExpanded] = useState(false);
  const dataArray = [
                      {title: 'Qual o objetivo do aplicativo?', content: 'Acompanhar o crescimento e desenvolvimento de crianças entre 0 e 2 anos, e identificar precocemente possíveis riscos. Foi desenvolvido para detectar e monitorar possíveis alterações, através da aplicação de testes rápidos em busca de proporcionar melhores condições à saúde da criança.'}, 
                      {title:'Qual a importância de acompanhar o desenvolvimento infantil?', content: 'É fundamental na atenção à saúde da criança e essencial nos dois primeiros anos de vida, etapa em que o organismo está mais suscetível a agravos. A identificação de alterações aliada a intervenção precoce pode promover desenvolvimento mais saudável, prevenir alterações futuras e levar ao acompanhamento regular e adequado.'},
                      {title: 'Em que método de avaliação o aplicativo foi inspirado?', content: 'Inspirado no Teste de Triagem do Desenvolvimento Denver II  desenvolvido na Universidade de Colorado Medical Center - Estados Unidos. É um método de avaliação infantil que realiza uma triagem global. Investiga quatro áreas do desenvolvimento infantil: pessoal-social, motor fino, linguagem e motor grosseiro. Historicamente, o método Denver tem sido um dos instrumentos de triagem mais utilizados no mundo.'},
                      {title: 'Por que este aplicativo é destinado aos profissionais da linha de frente?', content: 'Profissionais que são a principal ligação entre a comunidade e os profissionais da Unidade Básica de Saúde. Possuem o importante papel de visualizar situações de risco, promover a busca de ações que auxiliem na resolução de problemas, orientar as famílias e realizar encaminhamentos aos profissionais de saúde.'},
                      {title: 'Como realizar uma avaliação com a criança?', content: 'No Menu Inicial é possível visualizar a opção Iniciar Teste. Escolhendo essa opção será necessário informar dados da criança a ser realizado o teste. Após cadastro da criança será disponibilizado uma listagem com os itens a serem testados, separados pelos tópicos: Pessoal-Social; Motor Fino-Adaptativo; Linguagem; Motor-Grosseiro. Os itens são auto-explicativos e é necessário realizar todos os itens para poder finalizar o teste.'},
                      {title: 'Como realizar o envio de dados para o profissional responsável?', content: 'Caso tenha conexão com a internet na finalização de um teste os dados serão enviados automaticamente. Testes que foram realizados mas não foram enviados ficam disponiveís na página Envios Pendentes (disponível no Menu Inicial). Nessa página é possível realizar o envio dos dados caso exista conexão com a internet'}
                    ];

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      colors={['#c0dfdf', '#ACD2EA', '#5aabab']}
      style={{flex: 1}}
      >
      <ScrollView>
        {dataArray.map(item => (<Question title={item.title} content={item.content}/>))}

        <TouchableOpacity style={styles.question} onPress={() => {setExpanded(!expanded)}}>
          <Text style={styles.questionText}>Visualizar Itens</Text>
          <Icon style={styles.icon} name={expanded ? 'expand-less' : 'expand-more'} size={48} color="#000"/>
        </TouchableOpacity>
        {expanded && (
          <>
          <TouchableOpacity style={styles.topic} onPress={() => {
            navigation.navigate('GuideListItens', {type: 1})
          }}>
            <Text style={styles.topicText}>Linguagem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topic} onPress={() => {
            navigation.navigate('GuideListItens', {type: 2})
          }}>
            <Text style={styles.topicText}>Motor Fino-Adaptativo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topic} onPress={() => {
            navigation.navigate('GuideListItens', {type: 3})
          }}>
            <Text style={styles.topicText}>Motor Grosseiro</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topic} onPress={() => {
            navigation.navigate('GuideListItens', {type: 4})
          }}>
            <Text style={styles.topicText}>Pessoal Social</Text>
          </TouchableOpacity>
          </>
        )}
      </ScrollView>  
    </LinearGradient>
  );
}

export default Guide;