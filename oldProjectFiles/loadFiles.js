function loadFiles()
{
	let loadFilesHtml = '<div id="content">' +
		'<label for="checkingFile">Upload Checking CSV</Label>' + 
		'<input id="checkingFile" type="file" name="checking" accept=".csv"><br>' +
		'<label for="savingFile">Upload Saving CSV</Label>' +
		'<input id="savingFile" type="file" name="savings" accept=".csv"><br>' +
		'<label for="creditFile">Upload Credit CSV</Label>' +
		'<input id="creditFile" type="file" name="credit_card" accept=".csv"><br><br>' +
		'<button>Submit</button>' +
	'</div>';
	$('#content').html(loadFilesHtml);

	const btn = document.querySelector('button');

	let returnData = null;

	btn.addEventListener('click', () => {
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
	});
}

function checkFiles(files)
{
	let checkingFound = false;
	let savingFound = false;
	let creditFound = false;
	if (files[0] ==  undefined || files[1] ==  undefined || files[2] ==  undefined)
	{
		alert("You did not submit 3 files!");
		return false;
	}

	for (let i = 0; i < 3; i++)
	{
		file = files[i];
		console.log(file);

		// console.log("filename = " + file.name)
		let fileWords = file.name.split(' ');
		if (fileWords.length != 3)
		{
			console.log("fileWords.length issue!");
			alert(file.name + " is not a valid name!");
			return false;
		}

		switch(i)
		{
			case 0:
				if(fileWords[0] != "Checking")
				{
					alert(file.name + " is not the Checking file!");
					return false;
				}
				break;
			case 1:
				if(fileWords[0] != "Saving")
				{
					alert(file.name + " is not the Saving file!");
					return false;
				}
				break;
			case 2:
				if(fileWords[0] != "Credit")
				{
					alert(file.name + " is not the Credit file!");
					return false;
				}
				break;
		}

		if (fileWords[1] != "January" && fileWords[1] != "February" && fileWords[1] != "March" && fileWords[1] != "April" && fileWords[1] != "May" && fileWords[1] != "June" && fileWords[1] != "July" && fileWords[1] != "August" && fileWords[1] != "September" && fileWords[1] != "October" && fileWords[1] != "November" && fileWords[1] != "December")
		{
			alert(file.name + " is not a valid name!");
			return false;
		}

		if (!/^[0-9]{4}\.csv$/.test(fileWords[2]))
		{
			alert(file.name + " is not a valid name!");
			return false;
		}
	};

	console.log("checkFiles() returning true");
	return true;
}
