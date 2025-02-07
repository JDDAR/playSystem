import "./dinamicHeader.scss";

interface DynamicHeaderProps {
  title: string;
  searchPlaceholder?: string;
  primaryButtonText?: string;
  onSearch: (query: string) => void;
  onPrimaryButtonClick: () => void;
}

const DynamicHeader: React.FC<DynamicHeaderProps> = ({
  title,
  searchPlaceholder = "Buscar ...",
  primaryButtonText = "Nuevo Cliente",
  onSearch,
  onPrimaryButtonClick,
}) => {
  return (
    <>
      <header className="containerHeaderDinamic">
        <h2>{title}</h2>
        <div className="containerHeaderDinamic_contentButtons">
          <input
            type="text"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch(e.target.value)}
          />
          <button onClick={onPrimaryButtonClick}>{primaryButtonText}</button>
          <div>
            <span>:</span>
          </div>
        </div>
      </header>
    </>
  );
};

export default DynamicHeader;
