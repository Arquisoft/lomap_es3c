import { useParams } from 'react-router-dom';
import { NavFragment } from '../Fragments/NavFragment';
import './mapasAmigo.css';


function MapasAmigo() {
    const { id } = useParams();
  
    return (
        <div>
            <NavFragment />
            <div className="mapas-container">
            <h1 className="mapas-title">Mapas de {id}</h1>
            {false ? (
                <p className="mapas-message positive">Este usuario tiene mapas compartidos contigo.</p>
            ) : (
                <p className="mapas-message negative">Este usuario no dispone de mapas compartidos contigo.</p>
            )}
            </div>
        </div>
      );
}

export default MapasAmigo