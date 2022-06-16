import React from 'react'

export default function AntFormErrorsDisplay(props: any) {
	const { errors = [] } = props;
	
	if (Object.keys(errors).length === 0 && errors.constructor === Object) return null;
	return (
		<div className="AntFormErrorsDisplayComp">
			{Object.keys(errors).map((item, i) => {
				return (
					<div key={Math.random()} className="error">
						{errors[item]["errors"][0]}
					</div>
				);
			})}
		</div>
	);
}
