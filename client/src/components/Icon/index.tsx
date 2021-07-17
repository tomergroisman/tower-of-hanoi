import React from 'react';

interface Props {
  asset: string;
  spacing?: number;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export const Icon = ({asset, spacing = 0, size = 'medium', onClick}: Props) => {
  const widths = {
    small: 24,
    medium: 32,
    large: 64,
  };

  return (
    <img
      src={asset}
      alt={asset}
      style={{width: widths[size], margin: !!spacing ? `0 ${spacing * 4}px` : 0}}
      onClick={onClick}
    />
  );
};
