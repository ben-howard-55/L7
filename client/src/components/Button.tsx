interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => (
  <button onClick={() => onClick()}>Click me!</button>
);

export default Button;
