import { Form } from 'react-bootstrap';
import { UseFormMethods } from 'react-hook-form';

interface TextFieldProps {
  name: string;
  methods: UseFormMethods<any>;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  name,
  methods,
  label,
  disabled,
  required,
  type = 'text',
}) => {
  const { register, errors } = methods;

  return (
    <Form.Group>
      <Form.Label>
        {label}
        {required && <span className={'text-danger'}>*</span>}
      </Form.Label>
      <Form.Control
        type={type}
        name={name}
        disabled={disabled}
        isInvalid={Boolean(errors[name])}
        ref={register}
      />
      <Form.Text className={'text-danger'}>{errors[name]?.message}</Form.Text>
    </Form.Group>
  );
};

export default TextField;
