import { Input } from "antd";
import { useAppSelector } from "../../app/hooks";

const Logger: React.FC = () => {
  const messages = useAppSelector((state) => state.logger.messages);

  const getMessages = () => {
    return messages.join("\n");
  };

  return (
    <div style={{ width: 400 }}>
      <Input.TextArea
        autoSize={{ minRows: 10, maxRows: 10 }}
        autoFocus
        readOnly
        value={getMessages()}
      ></Input.TextArea>
    </div>
  );
};

export default Logger;
