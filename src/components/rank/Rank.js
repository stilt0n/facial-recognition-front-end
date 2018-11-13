import React from 'react';

const Rank = ({name, entries}) => {
	return (
		<div>
			<div className='white f3'>
				{`Hello there ${name} your current submit count is...`}
			</div>
			<div className='white f2'>
				{entries}
			</div>
		</div>
	);
}

export default Rank;