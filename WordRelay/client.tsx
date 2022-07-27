import * as React from 'react';
import { createRoot } from 'react-dom/client';
import WordRelay from './WordRelay';
import WordRelayClass from './WordRelayClass';

const container = document.getElementById('root');
const root = createRoot(container!); 
root.render(<WordRelayClass />);