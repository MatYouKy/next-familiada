import classNames from 'classnames';
import React from 'react';
import { TeamData } from '../../types/game';
import { Missed } from '../Missed/Missed';
import classes from './Losses.module.scss';
import { IGameTeam } from '@/app/board/page';

interface LossesProps {
  fault: IGameTeam['fault'];
  extraChange: TeamData['extraChange'];
  column?: boolean;
  className?: string;
  missedSize?: number;
}

export const Losses = React.forwardRef<HTMLUListElement, LossesProps>(
  (
    {
      fault,
      extraChange,
      column = false,
      className,
      missedSize = 80,
    }: LossesProps,
    ref
  ) => {
    const losses = fault.map((_, index) => (
      <li key={index} className={classes['losses__item']}>
        <Missed readOnly size={missedSize} missedSize={extraChange} />
      </li>
    ));

    return (
      <ul
        ref={ref}
        className={classNames(classes.losses, className, {
          [classes['losses--column']]: column,
          [classes['losses--column--extra-change']]: column && extraChange,
        })}
      >
        {losses}
      </ul>
    );
  }
);

Losses.displayName = 'Losses';
