import styles from "../css/Actions.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMousePointer, faCompress } from '@fortawesome/free-solid-svg-icons';

export default function Actions() {

    return (
        <div className={styles.ul}>
            <div className="row my-3">
                <div className="col-md-4 col-sm-12 my-3 text-center">
                    <p>
                        <FontAwesomeIcon icon={faMousePointer} /> Click : <br />
                        <span>Switch cell color</span>
                    </p>
                </div>
                <div className="col-md-4 col-sm-12 my-3 text-center">
                    <p>
                        <FontAwesomeIcon icon={faMousePointer} /> <FontAwesomeIcon icon={faMousePointer} />  Double Click:<br />
                        <span>  Column to cell color</span>
                    </p>
                </div>
                <div className="col-md-4 col-sm-12 my-3 text-center">
                    <p>
                        <FontAwesomeIcon icon={faCompress} /> Long pressing: <br />
                        <span> Selected cells to initial color</span>
                    </p>
                </div>
            </div>
        </div>

    )
}