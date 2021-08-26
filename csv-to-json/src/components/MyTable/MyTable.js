import { useState } from 'react';
import './MyTable.css';
import { Button, Table } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


toast.configure()

const HOST = process.env.HOST || "http://localhost:8080"

const MyTable = (props) => {

	const json    = props.json
	const setJson = props.setJson
	
	const createUser = async (user) => {
		try {
			const response = await fetch(HOST + "/createUser", {
				headers: {
					'Content-Type': 'application/json',
					'Accept':       'application/json',
				},
				method: "POST",
				body: JSON.stringify(user)
			})
		
			
			if(response.status === 404) 
				throw {message: "Bad request"}
				
				
			if(response.status !== 200) 
				throw new Error()


			const users = json.data
			const index = users.indexOf(user)
			users.splice(index, 1)
	
			setJson( { keys: json.keys, data: users } )
	
			toast.info("User uploaded")
		}
		catch(e) {
			toast.info("ERROR: " + (e.message || "something went wrong..."))
		}
	}


	return (
		<div className="table">
			{json &&
				<Table celled>
					<Table.Header>
						<Table.Row>
							{json.keys.map(key => <Table.HeaderCell>{key}</Table.HeaderCell>)}
							<Table.HeaderCell/>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{json.data.map(elem => 
							<Table.Row>
								{json.keys.map(key => <Table.Cell>{elem[key]}</Table.Cell>)}
								<Table.Cell><Button inverted color="red" onClick={() => createUser(elem)}>Upload</Button></Table.Cell>
							</Table.Row>
						)}
					</Table.Body>
				</Table>
			}
		</div>
	)
}

export default MyTable