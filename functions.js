$(function(){ 
	var operation = "A"; //"A"=Adding; "E"=Editing 
	var selected_index = -1; //Index of the selected list item 
	var tbNewses = localStorage.getItem("tbNewses");//Retrieve the stored data 
	tbNewses = JSON.parse(tbNewses); //Converts string to object 
	if(tbNewses == null) //If there is no data, initialize an empty array 
	tbNewses = []; 
	
	
	$(document).ready( function() { 
		List();
		
		$(".btnEdit").bind("click", function(){ 
			operation = "E"; 
			selected_index = parseInt($(this).attr("alt").replace("Edit", "")); 
			var news = JSON.parse(tbNewses[selected_index]); 
			$("#txtDate").val(news.date); 
			$("#txtTitle").val(news.title); 
			$("#txtDescription").val(news.description); 			
			$("#txtTitle").focus(); 
		}); 

		$(".btnDelete").bind("click", function(){ 
			selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
			Delete(); 
			location.reload();
		});

	});
	
	$("#frmNews").bind("submit",function(){ 
		if(operation == "A") 
			return Add(); 
		else 
			return Edit();	
	}); 

	function Add(){ 
		var news = JSON.stringify({ 
			date : $("#txtDate").val(), 
			title : $("#txtTitle").val(), 
			description : $("#txtDescription").val()
		}); 
		
		tbNewses.push(news); 
		localStorage.setItem("tbNewses", JSON.stringify(tbNewses)); 
		alert("The news has been saved."); 		
		return true; 
	} 

	function Edit(){ 
		tbNewses[selected_index] = JSON.stringify({ 
			date : $("#txtDate").val(), 
			title : $("#txtTitle").val(), 
			description : $("#txtDescription").val()
		});//Alter the selected item on the table 
		
		localStorage.setItem("tbNewses", JSON.stringify(tbNewses)); 
		alert("The news has been edited."); 
		operation = "A"; //Return to default value 
		return true; 
	} 
	
	function Delete(){ 
		tbNewses.splice(selected_index, 1); 
		localStorage.setItem("tbNewses", JSON.stringify(tbNewses)); 
		alert("News deleted."); 
	} 

	function List(){	
		$("#tblList").html(""); 
		$("#tblList").html( "<thead>"
								+ "	<tr>"
									+ "	<th class='tg-yw4l'></th>"
									+ "	<th class='tg-yw4l'>Date</th>"
									+ "	<th class='tg-yw4l'>Title</th>"
									+ "	<th class='tg-yw4l'>Description</th>"
								+ "	</tr>"
							+ "</thead>"
							+ "<tbody>"+ "</tbody>" ); 
		for(var i in tbNewses){ 
			var news = JSON.parse(tbNewses[i]); 
			$("#tblList tbody").append("<tr>"
											+ "	<td><img src='edit.png'  alt='Edit"+i+"'  class='btnEdit'/><img src='delete.png' alt='Delete"+i+"' height='24' wdateth='24' class='btnDelete'/></td>" 
											+ "	<td>"+news.date+"</td>"
											+ "	<td>"+news.title+"</td>" 
											+ "	<td>"+news.description+"</td>" 
										+ "</tr>"); 
		} 
	}
});
