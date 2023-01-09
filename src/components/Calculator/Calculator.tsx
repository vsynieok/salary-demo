import { Button, Form, Input, Radio } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addMessage } from "../Logger/LoggerSlice";

const Calculator: React.FC = () => {
  const [form] = useForm();

  const dispatch = useAppDispatch();
  const [withTax, setWithTax] = useState<number>(0);
  const [taxableIncome, setTaxableIncome] = useState<number>(0);
  const [incomeTax, setIncomeTax] = useState<number>(0);

  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);

  const calculateTax = (
    taxableIncome: number,
    monthlyIncome: number,
    taxOption: number
  ) => {
    console.log(taxOption);
    let tax;
    switch (taxOption) {
      case 0:
        tax = 0.2 * (taxableIncome - 654);
        return tax;
      case 1:
        let exemption = 654 - 0.72667 * (monthlyIncome - 1200);
        tax = 0.2 * (taxableIncome - exemption);
        return tax;
      case 2:
        tax = 0.2 * taxableIncome;
        return tax;
      default:
        return 0;
    }
  };

  const onValuesChange = (c: any, v: any) => {
    let gross = parseInt(v.gross);
    let monthlyIncome = parseInt(v.monthlyIncome);

    if (monthlyIncome <= 1200) {
      form.setFieldsValue({ exemption: 0 });
    } else if (monthlyIncome > 1200 && monthlyIncome < 2100) {
      form.setFieldsValue({ exemption: 1 });
    } else {
      form.setFieldsValue({ exemption: 2 });
    }

    setMonthlyIncome(monthlyIncome);

    let taxable = gross - (v.pension === 1 ? gross * 0.02 : 0) - gross * 0.016;
    setTaxableIncome(taxable);

    let incomeTax = calculateTax(taxable, v.monthlyIncome, v.exemption);
    setIncomeTax(incomeTax);
    setWithTax(gross + incomeTax + gross * 0.33 + gross * 0.08);
  };

  const onClick = () => {
    dispatch(addMessage("test"));
  };

  return (
    <div style={{ width: 400 }}>
      <Form form={form} onValuesChange={onValuesChange}>
        <Form.Item label="Gross" name="gross">
          <Input></Input>
        </Form.Item>
        <Form.Item label="Monthly income" name="monthlyIncome">
          <Input></Input>
        </Form.Item>
        <Form.Item label="Basic exemption" name="exemption" initialValue={0}>
          <Radio.Group>
            <Radio value={0}>{"654 euros"}</Radio>
            <Radio value={1}>{"Based on income"}</Radio>
            <Radio value={2}>{"No exemption"}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Pension" name="pension" initialValue={0}>
          <Radio.Group>
            <Radio value={0}>{"0%"}</Radio>
            <Radio value={1}>{"2%"}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={onClick}>
            Issue an invoice
          </Button>
        </Form.Item>
        <Form.Item label="Taxable income">{taxableIncome}</Form.Item>
        <Form.Item label="Income tax">{incomeTax}</Form.Item>
        <Form.Item label="Social tax (33%)">{withTax * 0.33}</Form.Item>
        <Form.Item label="Total cost for employer">{withTax}</Form.Item>
      </Form>
    </div>
  );
};

export default Calculator;
