import { Checkbox, FormControlLabel } from "@mui/material";
import { Fragment, useState } from "react";


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
    <div style={{overflowX:'auto', display: 'inline-flex', color: 'black', marginLeft: '2.5em', alignItems: 'center' }}>
      <h3 style={{ marginLeft: '0.5em', marginRight: '1em', fontSize: '1.1em', marginTop: '0.3em' }}><strong>CATEGORÍAS:</strong></h3>
      {Object.entries(isChecked).map(([key, value]) => {
        return (
          <Fragment key={key}>
            <Checkbox id={key} checked={value} onChange={handleCheckboxChange(key)} color="default" />
            <label htmlFor={key}><img style={{maxWidth:'2em'}} src={"/"+key+".png"} /></label>
          </Fragment>
        );
      })}
    </div>
  );
  }
export default MapFilter;