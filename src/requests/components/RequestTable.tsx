import styled from 'styled-components';

export const RequestTable = styled.table`
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
    @media (max-width: ${props => props.theme.maxWidths.mobile}) {
        display: block;
    }
`;
