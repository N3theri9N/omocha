type props = {
  innerText?: string;
  href: string;
};

const HyperText = ({ innerText, href }: props): JSX.Element => {
  const text: string = innerText || href;
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={href}
      style={{
        color: "darkblue",
        textDecoration: "underline",
      }}
    >
      {text}
    </a>
  );
};

export default HyperText;
