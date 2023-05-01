import Swal from "sweetalert2";
import { MarkerInfo } from "../components/map/Map";
import { getInterCategory } from "../components/map/formPlace/ComboBoxCategoria";

export function handleSubmitHelper(event: React.FormEvent<HTMLFormElement>,selectedCategory:string,filesArray:File[],action:any){
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    // Aquí se debe crear el objeto a partir de los datos del formulario
    const form = document.getElementById('formMarker') as HTMLFormElement;
    const formData = new FormData(form);
    let marker: MarkerInfo = {
      authorWebId:"",
      name: formData.get('name') as string,
      categoria: getInterCategory(selectedCategory),
      review:[],
      description: formData.get('description') as string,
      images: filesArray,
      coords: [0, 0]
      // Aquí se deben agregar las propiedades del objeto nuevo
    };
    action(marker); // Añade el objeto a la lista

    Swal.fire({
      icon: 'success',
      title: 'Marcador añadido correctamente',
      showConfirmButton: false,
      timer: 2000
    })
}

export function handleFileInputChangeHelper(inputRef:any,setFilesArray:any){
    // Obtener la lista de archivos seleccionados
    const fileList = inputRef.current?.files;
    // Convertir la lista de archivos en un arreglo de tipo File[]
    setFilesArray(Array.from(fileList as FileList) as File[]);
  }