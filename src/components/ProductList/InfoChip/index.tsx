import * as React from 'react';
import { FaStar } from 'react-icons/fa';

const InfoChip: React.FC<InfoChip> = ({
  isRating = false,
  isNew = false,
  info,
}) => {
  return (
    <div className="attr-item">
      {isRating && <FaStar size={14} />}
      <p className={isNew ? 'new' : ''}>{info}</p>
    </div>
  );
};

export default InfoChip;
