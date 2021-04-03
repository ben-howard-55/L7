import { Form } from 'react-bootstrap';
import { UseFormMethods } from 'react-hook-form';

interface TextAreaProps {
  name: string;
  methods: UseFormMethods<any>;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({ name, methods, label, disabled, required }) => {
  const { register, errors } = methods;

  return (
    <Form.Group>
      <Form.Label>
        {label}
        {required && <span className={'text-danger'}>*</span>}
      </Form.Label>
      <Form.Control
        as={'textarea'}
        name={name}
        disabled={disabled}
        isInvalid={Boolean(errors[name])}
        ref={register}
      />
      <Form.Text className={'text-danger'}>{errors[name]?.message}</Form.Text>
    </Form.Group>
  );
};

export default TextArea;
