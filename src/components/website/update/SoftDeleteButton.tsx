import React, { useState, useEffect } from "react";
import gqlErrorFirstMessage from "src/packages/string-fns/gqlErrorFirstMessage";
import { getGqlClient } from "src/lib/gql";
import { Popconfirm, message } from "antd";
import { mutation_websiteSoftDelete } from "../queries";
import { useSpinner } from "src/components/spinner/Spinner";
import Router, { useRouter } from 'next/router'
import { FontAwesomeIcon } from "src/lib/react-fontawesome";
import { faTrash } from "@symbolia/plsicon";

type SoftDeleteButtonProps = {
  id: string;
  type: "icon" | "button"
};

export default function SoftDeleteButton(props: SoftDeleteButtonProps) {
  const { id, type } = props;
  const spinner = useSpinner();
  const router = useRouter()

  const softDelete = () => {
    // console.log(values);
    // return
    spinner?.show();
    getGqlClient()
      .request(mutation_websiteSoftDelete, {
        id: id,
        // input: values,
      })
      .then((res) => {
        // console.log(res);
        message.success("Website archived successfully.");

        // It should be changed later
        type === "icon" ? router.reload() : router.push("/")
      })
      .catch((err) => {
        // console.log(err);
        const msg = gqlErrorFirstMessage(err, {
          capitalize: true,
        });
        message.error(msg);
      })
      .finally(() => {
        spinner?.hide();
      });
  };

  function confirm() {
    softDelete()
    // message.success('Click on Yes');
  }

  return (
    <>
      <Popconfirm
          title="Are you sure to delete this website?"
          onConfirm={confirm}
          // onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          {type === "icon" ? <FontAwesomeIcon icon={faTrash} color="red" /> : <a href="#" className='btn btn-danger'>Archive Website</a>}
          
        </Popconfirm>
    </>
  );
}
