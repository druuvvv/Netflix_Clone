import styles from '../styles/login.module.css'
import Head from 'next/head'
import Image from "next/image";
import Link from "next/link";
import { useState, useContext } from 'react';
import { useRouter } from 'next/router'
import { userContext } from './_app';

const login = () => {
    const [userMessage , setUserMessage] = useState("");
    const router = useRouter();
    const [isLoading , setIsLoading] = useState(false);
    const [userEmail , setUserEmail] = useState("");
    const [userPassword , setUserPassword] = useState("");
  
    const handleLoginWithEmail = async (e) => {
        setIsLoading(true);
        try{
        const response = await fetch("/api/auth/verifyUser",{
          method : "POST",
          headers : {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({
            email : `${userEmail}`,
            password : `${userPassword}`,
          })})
          const user = await response.json();
          console.log(user);
          if(user.isVerified) {
            setUserMessage("Welcome Back!")
            router.push('/')
          };
          setIsLoading(false);
          setUserMessage(user.message);
        }
          catch(error){

          }
        
    }
    const handleOnChangeEmail = async (e) => {
        const email = e.target.value;
        await setUserEmail(email);
    }
    const handleOnChangePassword = async (e) => {
        const password = e.target.value;
        await setUserPassword(password);
    }
    return (
        <div className={styles.container}>
          <Head>
            <title>Netflix SignIn</title>
          </Head>
    
          <header className={styles.header}>
            <div className={styles.headerWrapper}>
              <Link className={styles.logoLink} href="/">
                
                  <div className={styles.logoWrapper}>
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                      alt="Netflix logo"
                      width={128}
                      height={34} />
                  </div>
                
              </Link>
            </div>
          </header>
    
          <main className={styles.main}>
            <div className={styles.mainWrapper}>
              <h1 className={styles.signinHeader}>{"Sign In"}</h1>
    
              <input
                type="text"
                placeholder="Email address"
                className={styles.emailInput}
                onChange={handleOnChangeEmail}
              />
                <input
                type="password"
                placeholder="Password"
                className={styles.emailInput}
                onChange={handleOnChangePassword}
              />
    
              <Link href="/signup" className={styles.userMsg}>{"New to Netflix? Sign up Now!!"}</Link>
              <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
                {isLoading ? "Loading..." : "Sign In"}
              </button>
              {userMessage && <p href="/signup" className={styles.userMsg}>{userMessage}</p>}

            </div>
          </main>
        </div>
      );
}

export default login;