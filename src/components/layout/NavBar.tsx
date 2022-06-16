import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "src/lib/react-fontawesome";
import { faCog, faPlus, faUser, faSignOut, faQuestionCircle, faRocket } from "@symbolia/plsicon";
import { logout, isLoggedIn, getUserID, getUserEmail, getTokenDecoded } from "src/lib/auth/client";
import useLoggedIn from "src/components/hooks/useLoggedIn";
import Dropdown from "react-bootstrap/Dropdown";
import { Navbar, Nav } from "react-bootstrap";

export const GearComp = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  function handleLogOut(e: any) {
    e.preventDefault();
    logout();
    setMounted(false);
    router.push("/auth/login");
  }

  useEffect(() => {
    setMounted(isLoggedIn());
  }, []);

  const email = getUserEmail();

  const user = getTokenDecoded()

  return mounted ? (
    <Dropdown>
      <Dropdown.Toggle variant='link' className='nav-link nav-link dropdown-toggle d-flex align-items-center dropdown-user-link'>
        {/* <FontAwesomeIcon icon={faCog} /> */}
        <span className='b-avatar badge-minimal badge-light-primary rounded-circle'>
          <span className='b-avatar-img'>
            <img src='/images/user-avatar.jpg' alt='avatar' />{" "}
          </span>
        </span>
        <div className='d-sm-flex d-none user-nav me-2 lh-100'>
          <p className='user-name fw-bold mb-0 mf-2'>{user?.name}</p>
          <span className='user-status'>{user?.company}</span>
        </div>
        
      </Dropdown.Toggle>

      <Dropdown.Menu align='end'>
        {/* <Link href="/me/edit"><a className="dropdown-item">Edit Profile</a></Link> */}
   
        <a className='dropdown-item' href={`/billing/subscriptions`}>
          <FontAwesomeIcon icon={faRocket} className='me-2' />
          Subscriptions
        </a>
        <a className='dropdown-item' href={`/help`}>
          <FontAwesomeIcon icon={faQuestionCircle} className='me-2' />
          Help
        </a>
        <a className='dropdown-item' href='#' onClick={handleLogOut}>
          <FontAwesomeIcon icon={faSignOut} className='me-2' />
          Sign Out
        </a>
        <hr className='dropdown-divider' />
        <span className='p-2 note'>{email}</span>
      </Dropdown.Menu>
    </Dropdown>
  ) : null;
};

const LoginButton = () => {
  const mounted = useLoggedIn();
  // console.log(mounted)
  const url = "/auth/login";
  return !mounted ? (
    <a href={url} className='btn btn-primary btn-sm1 mb-2 mb-sm-0'>
      <FontAwesomeIcon icon={faUser} className='me-2' />
      LOGIN or REGISTER
    </a>
  ) : null;
};

const NavBar = () => {
  const router = useRouter();
  //  console.log(router.pathname)
  const [mounted, setMounted] = useState(false);

  function handleLogOut(e: any) {
    e.preventDefault();
    logout();
    router.push("/auth/login");
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  const email = getUserEmail();

  if (!mounted) return null;

  return (
    <>
      <Navbar expand='lg' bg='light' variant='dark' className={"primary-nav rounded-3"}>
        <div className='container-fluid navinner'>
          {/* <Link href={'/'}>
            <a className="navbar-brand">
              <img src="/images/logo.png" className="logo" />
            </a>
          </Link> */}
          {/* <div>
            You are logged in as:<span className="p-2 note">{email}</span>
          </div> */}

          <div>
            <Link href='/websites/create'>
              <a className='btn btn-main '>Create Website</a>
            </Link>
          </div>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse className='justify-content-end'>
            {/* <Nav className="me-auto1">
              <Link href="/">
                <a className="nav-link" aria-current="page">Home</a>
              </Link>
            </Nav> */}
            {/* <LoginButton /> */}

            {/* <a className="dropdown-item1 btn btn-main me-3" href={`/help`}>
            <FontAwesomeIcon icon={faQuestionCircle} className="me-2" />Help
            </a>
            <a className="dropdown-item1 btn btn-main" href="#" onClick={handleLogOut}>
              <FontAwesomeIcon icon={faSignOut} className="me-2" />Sign Out
            </a> */}
            <GearComp />
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default NavBar;
