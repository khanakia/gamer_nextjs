import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import Image from "next/image";
import styleAnt from "styles/Ant.module.scss";

export default function FinalizeForm(props: {imagesrc: string, url: string}) {
  const { imagesrc, url } = props
  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => {
    setIsVisible(true);
  };

  const handleOk = () => {
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };


  return (
    <>
      <div style={{cursor: "pointer"}} className="unset-img mb-4">
        <Image src={imagesrc} alt={""} layout="fill" className="nimg" onClick={showModal} />
      </div>

      {isVisible?
        <Modal wrapClassName={styleAnt.ModalPlain} visible={isVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <iframe height="315" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </Modal>
        : null
      }
      
    </>
  );
}
