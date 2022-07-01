import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQueryMkSession } from "src/features/app";
import FormNew from './FormNew'
import { SimpleLoader } from "src/features/bite/components"
import { listPageLink, titleSingular } from "./constant"
import moment from 'moment';
import UnDeclareSessionBtn from "./UnDeclareSessionBtn"

export default function SessionEdit() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useQueryMkSession({id: id as any});
  
  const handleSubmit = (redirect: boolean) => {
    if(!redirect) return
    router.push(`${listPageLink}`)
  }

  const data_ = {...data, ...{
    startTime: data?.startTime ? moment(data?.startTime) : moment(),
    endTime: data?.endTime ? moment(data?.endTime) : moment(),
  }}

  return (
    <>
      {isLoading ? <SimpleLoader overlay={true} /> : null}
      <h5>{titleSingular}</h5>
      
      <div className='mb-4 text-end'>
        <Link href={`${listPageLink}/${id}/declare`}>
          <a className='btn btn-success btn-sm me-2'>Declare {titleSingular}</a>
        </Link>
        <UnDeclareSessionBtn />
      </div>
      
      <FormNew data={data_} id={id as any} onSubmit={handleSubmit} />
    </>
  );
}
