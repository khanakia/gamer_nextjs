import React from 'react';
import {isLoggedIn, getLoginUrl} from 'src/lib/auth/client'
import isBlank from 'src/packages/string-fns/isBlank';

/* 
  bypass - We had the event single page which can be private and public both so we created a new
  param bypass which equals to `isPublic` so if bypass is true then we do not need to authenticate
*/
const Authenticate: React.FC<{redirect?: string, bypass?: boolean}>  = ({redirect, bypass, children }) => {
  if(typeof window !== 'undefined' && !isLoggedIn() && !bypass) {
    if(isBlank(redirect)) {
      redirect=window.location.href
    }
    window.location.href = getLoginUrl(redirect)
    return null
  }
  
  return (
    <div>
     {children}
     </div>
  )
}

export default Authenticate