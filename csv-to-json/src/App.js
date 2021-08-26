import { useState } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { zipObject } from 'lodash';
import MyDropzone from './components/MyDropzone/MyDropzone';
import MyTable from './components/MyTable/MyTable';

const App = () => {

	const [json, setJson] = useState(null)


	const createJson = (file) => {
		// Recibe un archivo csv y lo convierte en string
		// El string lo pasa a la funcion stringToJson()

		const reader = new FileReader()
		
		reader.readAsText(file)

		reader.onload = () => stringToJson(reader.result)
	}

	const stringToJson = (text) => {
		
		// Array con cada fila del csv

		const lines = text.split("\r\n")
		

		// Array con cada elemento de la primera fila

		let keys = lines.shift().split(';')						// Separamos los elementos por ';'
		keys = keys.map(val => val.replaceAll(' ',  ''))		// Borramos los espacios en blanco.
		keys = keys.filter(val => val !== '')					// Eliminamos los elementos vacios.

		
		// Matriz de los datos

		let data = lines.map(elem => elem.split(';'))
		
		data = data.map(elem => 
			elem.map(val => val.replaceAll(' ',  ''))
		)

		data = data.filter(elem => 								// Eliminamos los elementos que
			elem.reduce((total, val) => total + val)			// tienen todos sus campos vacios.
		)


		// Recorremos la matriz por filas para convertir cada fila en un objeto.
		// Cada objeto tendra las keys de la primera fila.

		const objects = data.map(elem => zipObject(keys, elem))

		setJson({
			keys: keys, 
			data: objects
		})
	}


	return (
		<div className="App">
			<div className="dataOutput">
				<MyDropzone createJson={createJson}/>
			</div>
			<div className="dataInput">
				<MyTable json={json} setJson={setJson}/>
			</div>
		</div>
	)
}

export default App