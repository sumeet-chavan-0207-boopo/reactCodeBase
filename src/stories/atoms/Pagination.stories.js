import React from 'react';
import { storiesOf } from '@storybook/react';
import Pagination from '../../Components/Atoms/Pagination/Pagination';


export const posts = [
    {id:1,name:"One"},
    {id:2,name:"Two"},
    {id:3,name:"Three"},
    {id:4,name:'Four'}]

function paginate ()
{ 
	console.log("abc")
}     

storiesOf('Atoms', module)
  .add('Pagination', () =><Pagination 
  	items={posts} 
  	onChangePage={paginate} pageSize={2}/> );
  