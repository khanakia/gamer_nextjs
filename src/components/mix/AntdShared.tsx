import React from "react";
// import { formatMoneyWithSymbol } from "@kookjs-client/util";
import { faTimesCircle, faCheckCircle } from '@symbolia/plsicon'
import { FontAwesomeIcon } from 'src/lib/react-fontawesome'
export const AntStatusColumnRender = (status: boolean, record:any) => {
	// console.log(status)
	const icon = status ? faCheckCircle : faTimesCircle;
	const className = status ? "icon-active" : "icon-disable"
	return (
		<span>
			<FontAwesomeIcon icon={icon} className={className} />
		</span>
	)
}

export const AntDateColumnRender = (value:any, record: any) => {
	var mdate = new Date(value);
	if(isNaN(mdate.getFullYear())  || mdate.getFullYear() < 1900) return

	const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
	const dateString = `${MONTHS[mdate.getMonth()]} ${mdate.getDate()}, ${mdate.getFullYear()}`

	return (
		<span>
			{dateString}
		</span>
	)
}

// export const AntMoneyColumnRender = (value: any, record: any) => {
// 	return (
// 		<span>
// 			{formatMoneyWithSymbol(value)}
// 		</span>
// 	)
// }