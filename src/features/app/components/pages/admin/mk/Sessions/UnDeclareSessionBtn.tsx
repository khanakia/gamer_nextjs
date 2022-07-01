import React, { useState, useEffect } from "react";
import { message } from "antd";
import gqlErrorFirstMessage from "packages/string-fns/gqlErrorFirstMessage";
import { ShowWrap, useSpinner } from "src/features/bite/components";
import { getGqlClient } from "src/features/bite";
import { mutation_mk_adm_unDeclareSession} from "src/features/app";
import { useUserRole } from "src/features/auth";
type FormProps = {
  id?: string;
  onSubmit?: Function;
};

export default function DeclareSessionBtn(props: FormProps) {
  const { id, onSubmit } = props;

  const spinner = useSpinner();

  const handleSubmit = (values: any) => {
    let gqlInput = {};
    let mutation = mutation_mk_adm_unDeclareSession;
    gqlInput = {
      input: values,
    };
    spinner?.show ();
    getGqlClient()
      .request(mutation, gqlInput)
      .then((res) => {
        // console.log(res);
        message.success("Declared successfully.");

        if (typeof onSubmit == "function") {
          onSubmit();
        }
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

  return (
    <>
      <button className="btn btn-danger btn-sm" onClick={handleSubmit}>UnDeclare Session</button>
    </>
  );
}
