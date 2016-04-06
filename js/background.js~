var current=0,end=0;
var userUpdate=[];
var user = [];
var flag = 0;
var j = 0;
chrome.alarms.onAlarm.addListener(function(alarm) {
	 go();
});

function go()
{  
	var url = "https://www.codechef.com/api/rankings/" + localStorage.getItem(198) + "?filterBy=Institution%3D" + encodeURIComponent(localStorage.getItem(212).trim()) + "&order=asc&sortBy=rank";
	$.ajax({
             type: "GET",
             url : url,
             datatype: 'jsonp',
             async : false,
             xhrFields: {
             withCredentials: true
            },
            crossDomain: true,
            success: function(res)
             { 
           	 var totalUsers = res.selectedItems;
   			 var totalPages = Math.ceil(totalUsers / 50.0);
  			 for (var pages = 1; pages<=totalPages; pages++) //Complete pages
  			  {
    			var pageurl = url + "&page=" + pages;		
    			 $.ajax({
				             type: "GET",
				             url : pageurl,
				             datatype: 'jsonp',
				             async : false,
				             xhrFields: {
				             withCredentials: true
			            },
	            		 crossDomain: true,
             success: function(reso)
             {
             	 for(var i=0;i<reso.list.length;i++)
					{  	 
				      if(localStorage.getItem("flag")==1) //That is, this is the second execution of this loop :)
			          { 
			        	 userUpdate = localStorage.getItem("User");
			        	 userUpdate = JSON.parse(userUpdate);
			        	 if(reso.list.length>userUpdate.length) // We would be comparing null indices of userUpdate otherwise 
			        	 	for(j=0; j<reso.list.length-userUpdate.length;j++)
			        	 	{
			        	 		obj = {};
			        	 		obj.username="";
			        	 		obj.score="";
			        	 		obj.rank="";
			        	 		userUpdate.push(obj); //Make both the Arrays equal.
			        	 	}
			        	 for(j=0; j<reso.list.length;j++)
			        	 {
			           		 if(userUpdate[j].username != reso.list[i].user_handle)
			           	  	  	continue;
			           		 else 
			           	 		break; //Username found at jth index
			        	 }
			           	 	if(j == reso.list.length)
			        	 	{ //Iterated through all the elements and still didn't find the username, so this is most probably a new username
				        	  	obj = {};
				        	  	obj.username = reso.list[i].user_handle;
				           	 	obj.score =  reso.list[i].score;
				        	    obj.rank = reso.list[i].rank;
				   			    user.push(obj);
		    			   		var notification = new Notification(reso.list[i].user_handle + " joined the leaderboard with a score of "+reso.list[i].score);
				           	 } 
				             else if(j<reso.list.length && userUpdate[j].score!=reso.list[i].score)
				        	   	var notification = new Notification(reso.list[i].user_handle + " moved to " + reso.list[i].score);
			          		}
			       	else
			        	 {
			         		obj = {};
			         		obj.username = reso.list[i].user_handle;
			           	 	obj.score =  reso.list[i].score;
			        	    obj.rank = reso.list[i].rank;
			  			    user.push(obj);
						    var notification = new Notification(reso.list[i].user_handle + " joined the leaderboard with a score of "+reso.list[i].score);
			            	//remove this later^, suppose the plugin is activated in between, then stack of notifications would pile up.	
			         }
			     }
    		}
 		    })
      } // all pages done.
	  //alert(JSON.stringify(user));
      localStorage.setItem("User", JSON.stringify(user));
      localStorage.setItem("flag",1);
     
     }
  })
}