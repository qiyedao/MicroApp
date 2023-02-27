import { MicroApp, Link } from 'umi';
import styles from './index.less';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      {/* <MicroApp name="app1" /> */}
      <Link to={'/app1'}>app1</Link>
      <div></div>
      <Link to={'/app2'}>app2</Link>
    </div>
  );
}
