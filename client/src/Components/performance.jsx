import React from 'react';

const Performance = (props) => {
  return (
    <div className='flex flex-col items-center gap-1 my-4'>
      <img src={props.img} alt="" className='w-12 mb-4'/>
      <p className='text-title'>{props.title}</p>
      <p className='text-text'>{props.text}</p>
    </div>
  );
}

export default Performance;
