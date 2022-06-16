import NavBar, { GearComp } from './NavBar'
import Footer from './Footer'
import { useRouter } from 'next/router'
import {isLoggedIn} from 'src/lib/auth/client'
import Link from 'next/link'
import styles from './LayoutDash.module.scss'
import { FontAwesomeIcon } from 'src/lib/react-fontawesome'
import { faGlobe, faRocket, faBars } from '@symbolia/plsicon'
import cx from 'classnames'

const menuItems = [
  {
    href: "/",
    title: 'Dashboard',
    icon: faGlobe,
    activePaths: [ '/', '/websites/[id]']
  },


  {
    href: "/menus",
    title: 'Menus',
    icon: faBars,
    activePaths: [ '/menus']
  },

  // {
  //   href: "/billing/subscriptions",
  //   title: 'Subscriptions',
  //   icon: faRocket,
  //   activePaths: [ '/billing/subscriptions']
  // },

  // {
  //   href: "/profile",
  //   title: 'Edit Profile'
  // }
]


const LayoutDash: React.FC<{}>  = ({ children }) => {
  const router = useRouter()
  // if(typeof window !== 'undefined' && !isLoggedIn()) {
  //   router.push("/auth/login")
  //   return null
  // }

  return (
    
      <main className={styles.LayoutMain}>
        <div className={styles.Sider}>
          <Link href={'/'}>
            <a className="navbar-brand ps-3 pt-3 d-block">
              <img src="/images/logo.png" className="logo" />
            </a>
          </Link>
          <ul className={styles.Menu}>
            {menuItems.map((item, i) => {
              const isActive = item.activePaths.indexOf(router.pathname) !== -1
              const classname = cx({'active' : isActive})
              return (
                <li key={i} className={classname}>
                  <Link href={item.href}>
                    <a aria-current="page">
                    <span><FontAwesomeIcon icon={item.icon} className="me-3" />{item.title}</span>
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
          <GearComp />


        </div>
        <div className={styles.Content}>
        {children}
          {/* <Footer /> */}
        </div>
        
      </main>
    
  )
}

export default LayoutDash