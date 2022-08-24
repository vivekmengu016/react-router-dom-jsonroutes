import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';

import BasicExample from './examples/Basic';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Fragment>
		<BasicExample />
	</Fragment>
);
