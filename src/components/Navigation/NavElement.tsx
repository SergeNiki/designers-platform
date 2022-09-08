import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltips from '../Tooltips/Tooltips';
import { useState } from 'react';
import { NavDatatype, NavElementDataType } from './Navigation';

type NavElementType = {
  element: NavElementDataType;
  callLoginWindow(event: React.MouseEvent<HTMLAnchorElement>): void
};

const NavElement: React.FC<NavElementType> = ({ element, callLoginWindow }) => {
  const [tooltipText, setTooltipText] = useState<string>('');

  const showTooltip = (event: React.MouseEvent<HTMLAnchorElement>) => {
    let text = String(event.currentTarget.getAttribute('datatype')) as NavDatatype;
    setTooltipText(text);
  };
  const hideTooltip = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setTooltipText('');
  };
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    callLoginWindow(event)
    setTooltipText('');
  }

  return (
    <NavLink
      key={element.datatype}
      to={element.path}
      datatype={element.datatype}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onClick={handleClick}>
      <FontAwesomeIcon icon={element.icon} />
      {tooltipText == element.datatype && (
        <Tooltips orientation='horizontal'>{tooltipText}</Tooltips>
      )}
    </NavLink>
  );
};

export default NavElement;
