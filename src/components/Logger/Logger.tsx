import { Input } from "antd";
import { useEffect, useState } from "react";
import { store } from "../../app/store";

const Logger: React.FC = () => {
  const loggerState = store.getState().logger;
  const [message, setMessage] = useState<string>("");

  const getMessages = () => {
    let messages = store.getState().logger.messages;
    return messages.join("\n");
  };

  useEffect(() => {
    setMessage(getMessages());
  }, [store.getState().logger.messages]);

  return (
    <div style={{ width: 400, height: "100%" }}>
      <Input.TextArea
        autoSize={{ minRows: 4, maxRows: 10 }}
        rows={4}
        readOnly
        value={message}
      ></Input.TextArea>
    </div>
  );
};

export default Logger;
