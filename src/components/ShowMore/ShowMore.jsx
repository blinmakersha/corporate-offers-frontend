import "./ShowMore.css";

const ShowMore = (props) => {
  const { setPage } = props;

  return (
    <a className="show-more" onClick={() => setPage((prev) => prev + 50)}>
      Показать еще...
    </a>
  );
};

export default ShowMore;
