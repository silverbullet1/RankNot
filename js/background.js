var flag = 0,j=0

chrome.alarms.onAlarm.addListener(function(alarm) {
	user =[];
	j=0;
	 go();
});

$.ajaxSetup({
    timeout: 3000, 
    retryAfter:7000
});

function go()
{  
	var url = "https://www.codechef.com/api/rankings/" + localStorage.getItem(0).trim() + "?filterBy=Institution%3D" + encodeURIComponent(localStorage.getItem(1).trim()) + "&order=asc&sortBy=rank";
	var notification;
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
            if(res.contest_info.time.start==false && res.contest_info.time.end==false)
            {
            	alert('Please enter a valid Contest Code');
                chrome.alarms.clear("myAlarm");
                localStorage.clear();
            }
            else if(res.contest_info.time.current>res.contest_info.time.end)
            {
            	alert('Contest has ended!');
                chrome.alarms.clear("myAlarm");
                localStorage.clear();
            }
           	 else
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
				      if(localStorage.getItem("User")!=null) //That is, this is the second execution of this loop smile emoticon
			          { 
			        	 user = localStorage.getItem("User"); //Load the previous Array
			        	 user = JSON.parse(user); //Parse it
			           	 for(j=0; j<user.length; j++)
			        	 {
			           		 if(user[j].username == reso.list[i].user_handle)
			             	 		break; //Username found at jth index
			        	 }	
			           	 	if(j == user.length)
			        	 	{ //Iterated through all the elements and still didn't find the username, so this is most probably a new username
				        	  	obj = {};
				        	  	obj.username = reso.list[i].user_handle;
				           	 	obj.score =  reso.list[i].score;
				        	    obj.rank = reso.list[i].rank;
				   			    user.push(obj);
		    			   		notification = new Notification(reso.list[i].user_handle + " joined the leaderboard with a score of "+reso.list[i].score+ "\n" + "Current Rank is " + reso.list[i].rank, { icon : "R.png" });
				           	 } 
				             else if(j<user.length && user[j].score!=reso.list[i].score)
				        	   {
				        	   	user[j].score = reso.list[i].score;
				        	   	user[j].rank = reso.list[i].rank;
				        	   	notification = new Notification(reso.list[i].user_handle + " moved to " + reso.list[i].score + "\n" + "Current Rank is " + reso.list[i].rank , { icon : "R.png" });
			          			}
			          		}
			       	else
			        	 {
				         		obj = {};
				         		obj.username = reso.list[i].user_handle;
				           	 	obj.score =  reso.list[i].score;
				        	    obj.rank = reso.list[i].rank;
				  			    user.push(obj);
							    notification = new Notification(reso.list[i].user_handle + " is at "+reso.list[i].score + "\n" + "Current Rank is " + reso.list[i].rank , { icon : "R.png" });
			               	    //remove this later^, suppose the plugin is activated in between, then stack of notifications would pile up.	
			         }
			     }
    		}
 		    }).error(function() {
            setTimeout ( function(){ func( param ) }, $.ajaxSetup().retryAfter );
        });
      } // all pages done.
      localStorage.setItem("User", JSON.stringify(user));
     }
     }
  }).error(function() {
            setTimeout ( function(){ func( param ) }, $.ajaxSetup().retryAfter );
        });
}