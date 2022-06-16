import React from 'react'

export default function UpgradeNote(props: {show: boolean}) {
	const { show = false } = props;
	
	if(!show) return null
	return (
		<div className="note text-danger">
			Please upgrade your website to perform the action.
		</div>
	);
}