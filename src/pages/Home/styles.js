import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    height: '100%',
    backgroundColor: '#ffffff',
  },
  menu: {
    flex: 3,
    paddingTop: '5%',
    paddingHorizontal: '5%',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  upperLeftTopic: {
    flex: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperRightTopic: {
    flex: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomLeftTopic: {
    flex: 1,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRightTopic: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
  },
  accpfs: {
    fontSize: 12,
    alignSelf: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
  boxParent: {
    height: 130,
    flexDirection: 'column-reverse',
  },
  openBox: {
    height: 82,
    justifyContent: 'center',
  },
  closedBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    backgroundColor: '#ffffff',
  },
});

export default styles;
