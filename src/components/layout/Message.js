import { useEffect, useState } from 'react';
import styles from './Message.module.css'

export function Message({type, msg}) {

const [visible, setVisible] = useState(false)
const [lastMsg, setLastMsg] = useState()

useEffect(() => {

    if(!msg){
        setVisible(false)
        return
    }

    setVisible(true)

    const timer = setTimeout(() => {
        setVisible(false)
        setLastMsg('falso')
    }, 3000)

    return () => clearTimeout(timer)
}, [msg])
  return (
    <>
    {visible && (
        <div className={`${styles.message} ${styles[type]}`}>
            <p>{msg}</p>
        </div>
    )}
    </>
    
    

    
  );
}

export default Message