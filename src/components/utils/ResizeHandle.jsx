import { PanelResizeHandle } from "react-resizable-panels";

import styles from "./styles.module.css";

function ResizeHandle({className = "", id, orientation}) {
  return (
    <PanelResizeHandle
      className={[styles.ResizeHandleOuter, className].join(" ")}
      id={id}
    >
      <div className={styles.ResizeHandleInner}>
        <span className={`material-symbols-outlined ${styles.Icon}`}
          style={{ rotate: orientation === "vertical" ? "90deg" : "0deg"}}>
          drag_handle
        </span>
      </div>
    </PanelResizeHandle>
  );
}

export default ResizeHandle;