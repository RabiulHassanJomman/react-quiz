import classes from '../components/styles/Illustration.module.css';

export default function Illustration({imageSrc}) {
  return (
    <div className={classes.illustration}>
      <img src={imageSrc} alt="Signup"/>
    </div>
  );
}
