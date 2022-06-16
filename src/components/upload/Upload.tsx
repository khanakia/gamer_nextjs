import React, { useState, useRef } from 'react';
import classnames from 'classnames'
import { getToken } from 'src/lib/auth/client';
import { FontAwesomeIcon } from "src/lib/react-fontawesome";
import { faUpload } from "@symbolia/plsicon";

export type UploadResponse = {
  id: number
  url: string
}

type UploadProps = {
  onComplete?: (res: UploadResponse[], file?: File) => void
  onError?: (error: Error, file?: File) => void
  onUploading?: (status: boolean) => void
  inputRef?: HTMLInputElement
  inputClassName?: string
  className?: string
}
const Upload = (props: UploadProps) => {
  const { onComplete, onError, onUploading, inputRef=null, inputClassName, className } = props
  const [selectedFile, setSelectedFile] = useState<File>();
	const [isFilePicked, setIsFilePicked] = useState(false);

  const fileInput = React.useRef(inputRef);

  // console.log(inputRef)

  // const inputRef_ = useRef<HTMLInputElement>(inputRef)
  

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    typeof(onUploading)=="function" && onUploading(true);
    const target= event.target;
    const file: File = (target.files as FileList)[0];
    
		setSelectedFile(file);
		setIsFilePicked(true);
    const formData = new FormData();
    formData.append('file', file);
    const uploadHost = String(process.env.NEXT_PUBLIC_API_HOST + "/upload")
    // const uploadHost = 'http://localhost:2107/media/upload'
    fetch( uploadHost, {
        credentials: 'include',
        method: 'POST',
        body: formData,
        headers: {
          // "Content-Type": "application/json",
          "Accept": "application/json",
          'token': getToken()
        } as any
      }
    )
    .then((res) => {
      if(!res.ok) throw new Error(res.statusText);
      return res.json()
    })
    .then((result: {data: UploadResponse[]}) => {
      // console.log('Success:', result.data);
      typeof(onComplete)=="function" && onComplete(result.data, file)
    })
    .catch((error) => {
      console.error('Error Custom:', error);
      typeof(onError)=="function" && onError(error, file)
      typeof(onUploading)=="function" && onUploading(false);
    });
	};


  // let inputClassNames = classnames('btn btn-secondary', inputClassName);

  const handleBtnClick = () => {
    fileInput && (fileInput as any).current.click();
  }

  return(
    <>
      <div className={className}>
        <button onClick={handleBtnClick} className="btn btn-outline-main " type="button">
          <FontAwesomeIcon icon={faUpload} className="me-2" /> Upload File
        </button>
        <input ref={fileInput} type="file" onChange={changeHandler} className="d-none" />
      </div>
    </>
  )


}

export default Upload