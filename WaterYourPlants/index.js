/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

const plantList = [
  {
    name: 'Rose',
    image: require('./assets/Images/Rose.jpg'),
    timing: 168,
  },
  {
    name: 'Jasmine',
    image: require('./assets/Images/Rose.jpg'),
    timing: 168,
  },
  {
    name: 'Orchid',
    image: require('./assets/Images/Rose.jpg'),
    timing: 168,
  },
  {
    name: 'Peace Lily',
    image: require('./assets/Images/Rose.jpg'),
    timing: 168,
  },
  {
    name: 'Bromeliad',
    image: require('./assets/Images/Rose.jpg'),
    timing: 168,
  },
  {
    name: 'Anthurium',
    image: require('./assets/Images/Rose.jpg'),
    timing: 96,
  },
];

export default plantList;
