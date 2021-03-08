import React from 'react';
import Button from '@material-ui/core/Button';

const FilterButton = ({name, pressed, setFilter}) => (
    <Button
      key={name}
      name={name}
      pressed={pressed}
      onClick={() => setFilter(name)}
    >
        {name}
    </Button>
);
export default FilterButton;