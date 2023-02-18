import loading from '../../img/loading.svg'
import style from './Loading.module.css'

export function Loading() {
  return (
    <div className={style.loader_container}>
        <img className={style.loader} src={loading} alt="Loading" />
    </div>
  );
}

export default Loading