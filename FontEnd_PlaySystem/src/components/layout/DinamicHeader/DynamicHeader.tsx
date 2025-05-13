import "./dinamicHeader.scss";

interface DynamicHeaderProps {
  title: string;
}

const DynamicHeadera: React.FC<DynamicHeaderProps> = ({ title }) => {
  return (
    <>
      <header className="containerHeaderDinamic">
        <h2>{title}</h2>
      </header>
    </>
  );
};

export default DynamicHeadera;
