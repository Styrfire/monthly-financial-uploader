import { useState } from "react"
import Head from 'next/head';

export default function HomePage() {
	function handleClick() {
		// Get and prepare files
		const files = [];
		
		document.querySelectorAll('input[type="file"]').forEach((input) => {
			files.push(input.files[0])
		});
		
		console.log("files: ");
		console.log(files);
		
		if(checkFiles(files) == true)
		{
			console.log("checkFiles() was true")
			const formData = new FormData();
			files.forEach((file) => {
				console.log(file.name)
				formData.append("files", file);
			})
		
			console.log(formData);
		
			// Upload
			fetch('http://localhost:8080/processFiles', {
				method: "POST",
				body: formData,
			})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				returnData = data;
				confirmTransactions(data);
				// console.log(window.location.pathname);
				// window.history.replaceState(data, "unused", "/C:/Users/g_n_r/Desktop/monthly-financial-uploader-ui/transactionConfirmation.html");
				// $('#inset_form').html('<form action="./transactionConfirmation.html" name="transactions" method="post"><input type="text" name="data" value="" /></form>');
				// document.forms['transactions'].submit();
			})
			.catch(err => console.log(err));
		}
	}

	return (
		<>
 			<Head>
 				<title>Monthly Financial Uploader</title>
			</Head>
			<div id="content">
				<label for="checkingFile">Upload Checking CSV</label>
				<input id="checkingFile" type="file" name="checking" accept=".csv" /><br />
				<label for="savingFile">Upload Saving CSV</label>
				<input id="savingFile" type="file" name="savings" accept=".csv" /><br />
				<label for="creditFile">Upload Credit CSV</label>
				<input id="creditFile" type="file" name="credit_card" accept=".csv" /><br /><br />
				<button onClick={handleClick}>Submit</button>
			</div>
		</>
	)
}
