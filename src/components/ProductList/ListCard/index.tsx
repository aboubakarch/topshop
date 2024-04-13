import * as React from 'react';
import InfoChip from '../InfoChip';
import PromoChip from '../PromoChip';

const ListCard: React.FC<ProductCard> = ({
  data: { name, imageUrl, isNew, rating, maxCookTime, minCookTime, promotion },
}) => {
  return (
    <div data-testid="prod-card" className="product-item">
      <img src={imageUrl} alt={name} />
      <div className="item-info">
        <h6>{name}</h6>
        <div className="product-attr">
          <InfoChip isRating info={Number(rating).toFixed(1)} />
          <InfoChip info={`${minCookTime}-${maxCookTime} min`} />
          {isNew && <InfoChip info="New" isNew />}
        </div>
      </div>
      {promotion && <PromoChip promotion={promotion} />}
    </div>
  );
};

export default ListCard;
