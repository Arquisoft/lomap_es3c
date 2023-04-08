import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";


export interface MapFilterInfo{
  selectedCategories:string[];
  setSelectedCategories:any;
}

function MapFilter(props:MapFilterInfo) {

  const [isChecked, setChecked] = useState({
    Tienda: false,
    Bar: false,
    Restaurante: false,
    Paisaje: false,
    Monumento: false
  });
  
  const handleCheckboxChange = (name: string) => (e: { target: { checked: any; }; }) => {
    setChecked({
      ...isChecked,
      [name]: e.target.checked
    });

    if (e.target.checked) {
      props.setSelectedCategories([...props.selectedCategories, name]);
    } else {
      props.setSelectedCategories(props.selectedCategories.filter(category => category !== name));
    }
  };
  
  return (
    <div style={{ display: 'inline-flex' }}>
      <h3 style={{ marginLeft: '0.7em', marginRight: '0.5em' }}>Filtrar por categorías:</h3>
      <FormControlLabel
        control={<Checkbox checked={isChecked.Tienda} onChange={handleCheckboxChange('Tienda')} color="default" />}
        label="Tienda"
      />
      <FormControlLabel
        control={<Checkbox checked={isChecked.Bar} onChange={handleCheckboxChange('Bar')} color="default" />}
        label="Bar"
      />
      <FormControlLabel
        control={<Checkbox checked={isChecked.Restaurante} onChange={handleCheckboxChange('Restaurante')} color="default" />}
        label="Restaurante"
      />
      <FormControlLabel
        control={<Checkbox checked={isChecked.Paisaje} onChange={handleCheckboxChange('Paisaje')} color="default" />}
        label="Paisaje"
      />
      <FormControlLabel
        control={<Checkbox checked={isChecked.Monumento} onChange={handleCheckboxChange('Monumento')} color="default" />}
        label="Monumento"
      />
    </div>
  );
  }
export default MapFilter;