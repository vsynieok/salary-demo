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
        readOnly
        value={getMessages()}
        style={{ marginBottom: 10 }}
      ></Input.TextArea>
      <Input.TextArea
        autoSize={{ minRows: 15 }}
        readOnly
        value={
          "Use 'Gross' field to input the initial sum in the invoice\n\nUse 'Monthly income' field to input your income manually, or use the 'Issue an invoice' button which will add the NET salary to your monthly income.\n- if monthly income is less than 1200, the tax-free amount is 654 euros;\n- if monthly income reaches 1201, the tax-free amount is calculated using a special formula;\n- if monthly income reaches 2100, the tax-free amount is 0\n\nClick 'Reset month' to reset all fields."
        }
      ></Input.TextArea>
    </div>
  );
};

export default Logger;
