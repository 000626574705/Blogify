

import React from 'react'
import { categories } from '../../constant/data';
import {Button,Table,TableBody,TableCell,TableHead,TableRow,styled} from '@mui/material';
import { Link , useSearchParams} from 'react-router-dom';

const StyledTable =styled(Table)`
  border: 1px solid rgba(244 ,244 ,244, 1);

`;
const StyleButton = styled(Button)`
     margin:20px;
     width:85%;
     background:#6495ED;
    color:#ffffff;

`;
const Styledlink =styled(Link)`
   text-decoration:none;
   color:inherit;

`;







const Categories = () => {
  const[SearchParams] = useSearchParams();
  const category = SearchParams.get('category');
  return (
    <> 
       <Styledlink to={`/create?category=${category || ''}`}>
      <StyleButton variant="contained">Create Blog</StyleButton>
      </Styledlink>
      <StyledTable>
        <TableHead>
            <TableRow>
                <TableCell>
                  <Styledlink to='/'>
                  All Categories
                  </Styledlink>
                    
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
               categories.map(category =>(
                <TableRow key={category.id}>
                <TableCell>
                  <Styledlink to={`/?category=${category.type}`}>
                  {category.type}
                  </Styledlink>
                </TableCell>
            </TableRow>
               )) 
            }
           
        </TableBody>
      </StyledTable>
    </>
  )
}

export default Categories;
