import { useState } from 'react';

const ShowMoreButton = ({ loadMoreItems }) => {
    const [itemsCount, setItemsCount] = useState(10);
    const MAX_ITEMS = 50;
    const [message, setMessage] = useState('');

    const handleClick = () => {
        if (itemsCount >= MAX_ITEMS) {
            setMessage('Вы достигли максимального количества элементов для загрузки');
            return;
        }

        try {
            const newCount = itemsCount + 10;
            loadMoreItems(newCount);
            setItemsCount(newCount);
            setMessage(`Загружено ${newCount} элементов.`);
        }
        catch(error) {
            console.error('Ошибка при загрузке элементов:', error);
            setMessage('Произошла ошибка при загрузке элементов. Попробуйте снова позже.');
        }
    };

    return (
        <div>
            <button onClick={handleClick}>
                Показать еще
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ShowMoreButton;
