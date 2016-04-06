alert("Hello"); //Check 1 2 3

chrome.alarms.onAlarm.addListener(function( alarm ) {
  console.log("Got an alarm!", alarm);
});

var current=0,end=0;
var userUpdate=[{}];
var flag = 0;

function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
}

var url = "/api/rankings/APRIL16?filterBy=Institution%3DIndian%20Institute%20of%20Information%20Technology%2C%20Allahabad&order=asc&sortBy=rank";
var user = [{}];
var x =0;
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
             current = res.current;
             end = res.end;
        	 var totalUsers = res.selectedItems;
   			 var totalPages = Math.ceil(totalUsers / 50.0);
  			  for (var pages = 1; pages<=totalPages; pages++) //Complete pages
  			  {
    			 url = '/api/rankings/APRIL16?filterBy=Institution%3DIndian%20Institute%20of%20Information%20Technology%2C%20Allahabad&order=asc&sortBy=rank&page=' + pages;
     			 $.ajax({
		             type: "GET",
		             url : url,
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
			        	 obj = []
			        	 if(flag==1) //That is, this is the second execution of this loop :)
			        	 {
			        	 if(userUpdate[i].username!= reso.list[i].user_handle)
			        	  {
			        	  	obj.username = reso.list[i].user_handle;
			           	 	obj.score =  reso.list[i].score;
			        	    obj.rank = reso.list[i].rank;
						    user.push(obj);
	    			   	    console.log("User "+ reso.list[i].user_handle + " joined the leaderboard with a score of "+reso.list[i].score);
			           	 }
			        	 else if(userUpdate[i].username == reso.list[i].user_handle && userUpdate[i].score!=reso[i].list.score)
			        	 {
			        	 	    console.log("User "+ reso.list[i].user_handle + " moved to "+reso.list[i].score + ":)");
			        	 }
			         }
			         else
			         {
			         		obj.username = reso.list[i].user_handle;
			           	 	obj.score =  reso.list[i].score;
			        	    obj.rank = reso.list[i].rank;
						    user.push(obj);
						    console.log("User "+ reso.list[i].user_handle + " joined the leaderboard with a score of "+reso.list[i].score);
			           		//remove this later^, suppose the plugin is activated in between, then stack of notifications would pile up.	
			         }
			     }
    		}
 		    })
      } // all pages done.
      sleep(120000); //Delay for 2 minutes
      userUpdate = jQuery.extend(true, {}, user); //Deep copying
      flag=1;
  }

             })