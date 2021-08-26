import { useState } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { zipObject } from 'lodash';
import MyDropzone from './components/MyDropzone/MyDropzone';
import MyTable from './components/MyTable/MyTable';

const App = () => {

	const [json, setJson] = useState(null)

	const stringToJson = (text) => {
		
		// Array con cada fila del csv

		const lines = text.split("\r\n")
		

		// Array con cada elemento de la primera fila

		let keys = []
		keys = lines.shift().split(";")
		keys = keys.map(key => key.replaceAll(' ',  ''))
		keys = keys.filter(key => key !== '')

		// Matriz de los datos

		let data = []
		data = lines.map(elem => elem.split(";"))
		data = data.map(elem => elem = elem.map(val => val.replaceAll(' ',  '')))
		data = data.filter(elem => elem.reduce((total = false, val) => total || val !== ''))


		// Recorremos la matriz por filas usando un map() 
		// para convertir cada fila en un objeto
		// Cada objeto tendra las keys de la primera fila

		const objects = data.map(elem => zipObject(keys, elem))

		setJson({
			keys: keys, 
			data: objects
		})
	}

	const createJson = (file) => {
		const reader = new FileReader()
		
		reader.readAsText(file)

		reader.onload = () => stringToJson(reader.result)
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