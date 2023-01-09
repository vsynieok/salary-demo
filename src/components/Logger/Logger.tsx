import { Input } from "antd";
import { useAppSelector } from "../../app/hooks";

const Logger: React.FC = () => {
  const messages = useAppSelector((state) => state.logger.messages);

  const getMessages = () => {
    return messages.join("\n");
  };

  return (
    <div style={{ width: 400, height: "100%" }}>
      <Input.TextArea
        autoSize={{ minRows: 4, maxRows: 10 }}
        rows={4}
        readOnly
        value={getMessages()}
      ></Input.TextArea>
    </div>
  );
};

export default Logger;
