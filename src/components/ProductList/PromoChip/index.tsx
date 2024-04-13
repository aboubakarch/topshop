import * as React from 'react';
import { FaGift } from 'react-icons/fa';
import { PROMOTION } from '../../../constants';

const PromoChip: React.FC<PromoChip> = ({ promotion }) => {
  return (
    <div className={`product-promo bg-${promotion}`}>
      {promotion === 'gift' ? (
        <FaGift color="#ffffff" size={20} />
      ) : (
        <p>{PROMOTION[promotion]}</p>
      )}
    </div>
  );
};

export default PromoChip;
