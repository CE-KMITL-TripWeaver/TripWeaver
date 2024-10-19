"use client";
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
    image: '/images/gary.png'
  },
  {
    id: 'cato',
    name: 'Little Cato',
    image: '/images/cato.png'
  },
  {
    id: 'kvn',
    name: 'KVN',
    image: '/images/kvn.png'
  },
  {
    id: 'mooncake',
    name: 'Mooncake',
    image: '/images/mooncake.png'
  },
  {
    id: 'quinn',
    name: 'Quinn Ergon',
    image: '/images/quinn.png'
  }
];

export default function Home() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items); // Update the state with the new order
  }

  return (
    <>
      <div>Drag list</div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='myCustomList'>
          {(provider) => (
            <ul {...provider.droppableProps} ref={provider.innerRef}>
              {characters.map(({ name, id, image }, index) => { // Use characters instead of finalSpaceCharacters
                return (
                  <Draggable key={id} draggableId={id.toString()} index={index}>
                    {(provider) => (
                      <li ref={provider.innerRef} {...provider.draggableProps} {...provider.dragHandleProps}>
                        <p className='name'>{name}</p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provider.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
