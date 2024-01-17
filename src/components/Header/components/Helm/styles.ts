import styled from 'styled-components';
import { ReactComponent as MyIcon } from '../../../../resources/images/helm.svg';

//Note: Create React App uses SVGR under the hood to make it possible to transform and import an SVG as a React component.

export const StyledIcon = styled(MyIcon)`
  width: 70px;  
  height: 70px;  
`;

