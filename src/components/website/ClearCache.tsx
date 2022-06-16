import React, { useState, useEffect } from "react";
import gqlErrorFirstMessage from "src/packages/string-fns/gqlErrorFirstMessage";
import { getGqlClient } from "src/lib/gql";
import { message } from "antd";
import { mutation_websiteCacheClearAll } from "./queries";
import { useSpinner } from "src/components/spinner/Spinner";

type ClearCacheProps = {
  id: string;
};

export default function ClearCache(props: ClearCacheProps) {
  const { id } = props;
  const spinner = useSpinner();

  const clearCache = (values: any) => {
    // console.log(values);
    // return
    spinner?.show();
    getGqlClient()
      .request(mutation_websiteCacheClearAll, {
        id: id,
        // input: values,
      })
      .then((res) => {
        // console.log(res);
        message.success("Cache Cleared successfully.");
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
      <button type="button" className='btn btn-main ' onClick={clearCache}>
        Clear Cache
      </button>
    </>
  );
}
