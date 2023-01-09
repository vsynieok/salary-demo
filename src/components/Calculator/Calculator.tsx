import { Button, Divider, Form, Input, Radio, Statistic } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { issueInvoice, resetCounter } from "../Global/GlobalSlice";
import { addMessage } from "../Logger/LoggerSlice";

const Calculator: React.FC = () => {
  const [form] = useForm();

  const dispatch = useAppDispatch();

  const globalState = useAppSelector((state) => state.global);

  const [withTax, setWithTax] = useState<number>(0);
  const [taxableIncome, setTaxableIncome] = useState<number>(0);
  const [incomeTax, setIncomeTax] = useState<number>(0);
  const [totalTaxes, setTotalTaxes] = useState<number>(0);

  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);

  const calculateTax = (
    taxableIncome: number,
    monthlyIncome: number,
    taxOption: number
  ) => {
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
    let exemption = v.exemption;

    // executed only if monthly income was changed
    if (c.monthlyIncome && v.monthlyIncome) {
      let monthlyIncome = parseInt(v.monthlyIncome);

      if (monthlyIncome <= 1200) {
        exemption = 0;
      } else if (monthlyIncome > 1200 && monthlyIncome < 2100) {
        exemption = 1;
      } else {
        exemption = 2;
      }
      form.setFieldsValue({ exemption: exemption });
    }

    let gross = parseInt(v.gross);
    let taxable = gross - (v.pension === 1 ? gross * 0.02 : 0) - gross * 0.016;
    let incomeTax = calculateTax(taxable, v.monthlyIncome, exemption);
    let totalTaxes =
      incomeTax + (v.pension === 1 ? gross * 0.02 : 0) + gross * 0.016;

    setMonthlyIncome(monthlyIncome);
    setTaxableIncome(taxable);
    setIncomeTax(incomeTax);
    setWithTax(gross + incomeTax + gross * 0.33 + gross * 0.08);
    setTotalTaxes(totalTaxes);
  };

  const onClick = () => {
    let gross = parseInt(form.getFieldValue("gross"));
    let invoiceSum = gross - totalTaxes;
    form.setFieldsValue({
      monthlyIncome: globalState.invoiceSumsTotal + invoiceSum,
    });

    dispatch(issueInvoice(invoiceSum));
    dispatch(
      addMessage(
        `Raised invoice (#${globalState.invoicesCount + 1}) for: ${gross}`
      )
    );
    dispatch(
      addMessage(`Total sum: ${globalState.invoiceSumsTotal + invoiceSum}`)
    );
  };

  const onReset = () => {
    dispatch(resetCounter());
    dispatch(addMessage(`The month has been reset, going back to 0.`));
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
          <Button
            style={{ marginRight: 10 }}
            type="primary"
            htmlType="submit"
            onClick={onClick}
          >
            Issue an invoice
          </Button>
          <Button onClick={onReset}>Reset month</Button>
        </Form.Item>
        <Divider />
        <Statistic title="Taxable income" value={taxableIncome} />
        <Statistic title="Income tax" value={incomeTax} />
        <Statistic title="Total taxes" value={totalTaxes} />
        <Statistic title="Total cost for employer" value={withTax} />
        <Statistic
          title="Net income"
          value={parseInt(form.getFieldValue("gross")) - totalTaxes}
        />
      </Form>
    </div>
  );
};

export default Calculator;
