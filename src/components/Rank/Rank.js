import React from 'react';

const Rank =({name,entris}) => {
	return (
			<div className='white'>
			<div className='f3'> {`${name}, Your Rank is...`}</div>
			<div className='f2'> {entris} </div>

			 </div>
		);
}
export default Rank;