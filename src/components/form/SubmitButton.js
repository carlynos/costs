import style from './SubmitButton.module.css'

export function SubmitButton({text}) {
  return (
    <div>
      <button className={style.btn}>{text}</button>
    </div>
  );
}

export default SubmitButton