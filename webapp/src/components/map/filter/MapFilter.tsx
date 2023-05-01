import { Checkbox } from "@mui/material";
import { Fragment, useState } from "react";
import { handleCheckBoxChangeHelper } from "../../../helper/MapFilterHelper";


export interface MapFilterInfo{
  selectedCategories:string[];
  setSelectedCategories:any;
  friendsURL:string[];
  friendsNames:string[];
}

function MapFilter(props:MapFilterInfo) {

  const [isChecked, setChecked] = useState({
    shop: false,
    bar: false,
    restaurant: false,
    supermarket: false,
    hotel: false,
    cinema: false,
    academicInstitution: false,
    publicInstitution: false,
    sportsClub: false,
    museum: false,
    park: false,
    landscape: false,
    monument: false,
    hospital: false,
    policeStation: false,
    transportCenter: false,
    entertainment: false
  });
  
  const handleCheckboxChange = (name: string) => (e: { target: { checked: any; }; }) => {
    handleCheckBoxChangeHelper(name,e,setChecked,isChecked,props.setSelectedCategories,props.selectedCategories);
  };
  
  return (
    <div style={{overflowX:'auto', display: 'inline-flex', color: 'black', marginLeft: '3em', alignItems: 'center', marginRight: '2.5em' }}>
      <h3 style={{ marginLeft: '0.5em', marginRight: '1em', fontSize: '1.1em', marginTop: '0.3em' }}><strong>CATEGORÍAS:</strong></h3>
      {Object.entries(isChecked).map(([key, value]) => {
        return (
          <Fragment key={key}>
            <Checkbox id={key} checked={value} onChange={handleCheckboxChange(key)} color="default" />
            <label htmlFor={key}><img style={{maxWidth:'2em'}} src={"/"+key+".png"} alt={`Icono de la categoría de ${key}`} /></label>
          </Fragment>
        );
      })}
    </div>
  );
  }
export default MapFilter;