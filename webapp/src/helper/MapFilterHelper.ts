export function handleCheckBoxChangeHelper(name:string,e: { target: { checked: any; }; },setChecked:any,isChecked:any,setSelectedCategories:any,selectedCategories:any){
    setChecked({
      ...isChecked,
      [name]: e.target.checked
    });

    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, name]);
    } else {
      setSelectedCategories(selectedCategories.filter((category: string) => category !== name));
    }
}