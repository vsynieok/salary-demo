import { Button, Form, Input } from "antd";
import { useAppDispatch } from "../../app/hooks";
import { addMessage } from "../Logger/LoggerSlice";

const Calculator: React.FC = () => {
  const dispatch = useAppDispatch();

  const onValuesChange = (c: any, v: any) => {
    console.log(c);
    console.log(v);
  };

  const onClick = () => {
    dispatch(addMessage("test"));
  };

  return (
    <div style={{ width: 400 }}>
      <Form onValuesChange={onValuesChange}>
        <Form.Item label="Salary" name="salary">
          <Input></Input>
        </Form.Item>
        <Form.Item label="Salary2" name="salary2">
          <Input></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={onClick}>
            Pay salary
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Calculator;
