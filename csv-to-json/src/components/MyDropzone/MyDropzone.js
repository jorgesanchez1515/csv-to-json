import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import './MyDropzone.css'

const MyDropzone = (props) => {

	const createJson = props.createJson

	const onDrop = useCallback(acceptedFiles => acceptedFiles[0] ? createJson(acceptedFiles[0]) : console.log("Error"), [])
	  
	const {
		getRootProps, 
		getInputProps, 
		isDragActive, 
		isDragAccept, 
		isDragReject
	} 
	= useDropzone({
		onDrop,
		accept: 'text/csv, application/vnd.ms-excel'
	})

	return (
		<div className="dropzone" {...getRootProps()}>
		  	<input {...getInputProps()}/>
			{isDragAccept  &&  <p>All files will be accepted </p>}
			{isDragReject  &&  <p>Some files will be rejected</p>}
			{!isDragActive &&  <p>Drop csv file here...      </p>}
		</div>
	)
}

export default MyDropzone