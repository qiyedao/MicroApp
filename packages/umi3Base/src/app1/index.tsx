import { Link } from 'umi';
import styles from './index.less';
import WujieReact from 'wujie-react';
export default function IndexPage(props) {
  return (
    <div>
      <h1 className={styles.title}>app1</h1>
      <WujieReact
        width="100%"
        height="100%"
        name="app1"
        url={'//localhost:8001/'}
        sync={true}
        fetch={fetch}
        props={props}
      ></WujieReact>
    </div>
  );
}
