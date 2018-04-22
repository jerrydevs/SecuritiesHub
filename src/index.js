import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react'

import App from './App'
import NewsStore from './components/stores/NewsStore'
import StocksStore from './components/stores/StocksStore'
import CryptosStore from './components/stores/CryptosStore'
import ChartState from './components/stores/ChartState'

import './index.css';

render((
    <Provider ChartState={ChartState} CryptosStore={CryptosStore} StocksStore={StocksStore} NewsStore={NewsStore}>
        <App />
    </Provider>
), document.getElementById('root'));
