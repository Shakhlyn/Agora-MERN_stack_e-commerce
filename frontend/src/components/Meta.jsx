import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To Agora!",
  description: "We sell the best products",
  keywords:
    "electronics, buy electronics, clothes, clothing, fashion, footweare, winter",
};

export default Meta;
