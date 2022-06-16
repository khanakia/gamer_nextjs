import React from "react";
import gqlErrorFirstMessage from "src/packages/string-fns/gqlErrorFirstMessage";
import { getGqlClient } from "src/lib/gql";
import { Popconfirm, message } from "antd";
import { mutation_resycnContentful } from "../queries";
import { useSpinner } from "src/components/spinner/Spinner";

type ResyncContentfulButton = {
  id: string;
};

export default function ResyncContentfulButton(props: ResyncContentfulButton) {
  const { id } = props;
  const spinner = useSpinner();

  const resyncContentful = () => {
    spinner?.show();
    getGqlClient()
      .request(mutation_resycnContentful, {id: id})
      .then((res) => {
        message.success("Your data has been resynced succesfully!");
      })
      .catch((err) => {
        console.log(err);
        const msg = gqlErrorFirstMessage(err, {
          capitalize: true,
        });
        message.error(msg);
      })
      .finally(() => {
        spinner?.hide();
      });
  }

  function confirm() {
    resyncContentful()
  }

  return (
    <>
      <Popconfirm
          title="Are you sure to resync this website?"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <a href="#" className='btn btn-main mb-4'>ReSync Contentful</a>
        </Popconfirm>
    </>
  );
}
