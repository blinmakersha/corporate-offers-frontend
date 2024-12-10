import { useState } from 'react';

const ShowMoreButton = ({ loadMoreItems }) => {
    const [itemsCount, setItemsCount] = useState(10);

    const handleClick = () => {
        setItemsCount((prevCount) => prevCount + 10);
        loadMoreItems(itemsCount);
    };

    return (
        <button onClick={handleClick}>
            Показать еще
        </button>
    );
};

export default ShowMoreButton;