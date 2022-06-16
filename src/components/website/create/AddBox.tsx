import { faPlus } from '@symbolia/plsicon'
import { FontAwesomeIcon } from "src/lib/react-fontawesome";
import React from 'react'
import Link from 'next/link';

function AddBox() {
  return (
    <div className="col-md-3 mb-5">
        <Link href="/websites/create"><div className='add-box'><FontAwesomeIcon icon={faPlus} /> Add Website</div></Link>
    </div>
  )
}

export default AddBox