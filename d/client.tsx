import * as React from 'react';
import { createRoot } from 'react-dom/client';
import NumberBaseBall from './NumberbaseBall';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<NumberBaseBall />);