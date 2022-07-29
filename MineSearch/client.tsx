import * as React from 'react';
import { createRoot } from 'react-dom/client';

import MineSearch from './MineSearch';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<MineSearch />);