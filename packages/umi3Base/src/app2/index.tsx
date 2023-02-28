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
        name="app2"
        url={'//localhost:5173/'}
        sync={true}
        fetch={fetch}
        props={props}
        alive={true}
        beforeLoad={(appWindow) =>
          console.log(`${appWindow.__WUJIE.id}WujieReact beforeLoad 生命周期`)
        }
      ></WujieReact>
    </div>
  );
}
