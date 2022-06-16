import { useEffect, useState, useCallback } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { Card, Avatar, message, Empty } from "antd";
import LayoutDash from "src/components/layout/LayoutDash";
import gqlErrorFirstMessage from "src/packages/string-fns/gqlErrorFirstMessage";
import { getGqlClient } from "src/lib/gql";
import objGetPath from "src/packages/string-fns/objGetPath";
import { queryWebsites } from "src/queries";
import styles from "styles/Websites.module.scss";
import { FontAwesomeIcon } from "src/lib/react-fontawesome";
import { faExternalLink, faPencil, faPlus, faTrash } from "@symbolia/plsicon";
import { useSpinner } from 'src/components/spinner/Spinner'
import ShowWrap from "src/components/mix/ShowWrap";
import { ProtectRoute } from 'src/contexts/auth'

const Dash = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true)
  
  const spinner = useSpinner()
  const fetchSites = useCallback(() => {
    spinner?.show();
    
    getGqlClient()
      .request(queryWebsites)
      .then((res) => {
        // console.log(res);
        const items = objGetPath(res, "websites");
        setItems(items);
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
        setLoading(false)
      });
  }, [spinner])

  // useEffect(() => {
  //   fetchSites();
  // }, [fetchSites]);


  return (
    <LayoutDash>
      <Head>
        <title>Users</title>
      </Head>
     
    </LayoutDash>
  );
};

// export default Dash;
export default function DashProtected()  {
  return (
    <ProtectRoute>
      <Dash />
    </ProtectRoute>
  )
}

