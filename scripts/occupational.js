var isMobile = {
	Android: function () { return navigator.userAgent.match(/Android/i); },
	BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
	iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
	Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
	Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
	any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};
var requestedjsondata;
var globaljsondata="";
$(document).ready(function() {
  $(document).on("click", ".launch-btn", function() {
    $(this)
      .closest(".launch-wrapper")
      .hide();
    $("#hidefirst").show();
  });
  $.ajax({
    type: "GET",
    url: "data/occupationdata.json",
    dataType: "text",
    success: function(data) {
      //

      data = JSON.parse(data);
	  globaljsondata=data;
      requestedjsondata=data;
      var str = "";

      var launchpopuptext = data.launchpopup[0].text;
      var viewbtntxt = data.launchpopup[0].viewbtn;
      var launchbtntxt = data.launchpopup[0].launchbtn;
      var videourl=data.launchpopup[0].videourl;
      $(".imgtxt-popup-inner h3").html(data.demopopup.heading);
      // if(isMobile.any()!=null) {      
      //   text_popup_data(data.demopopup.mobiledata);  
      //   getselidelength(data.demopopup.mobiledata.length)	
      //  }
      //  else{
      //   text_popup_data(data.demopopup.desktopdata);
      //   getselidelength(data.demopopup.desktopdata.length)	
      //  }  
      $(".launch-wrapper")
        .find("p")
        .text(launchpopuptext);
      $(".launch-wrapper")
        .find(".view-demo")
        .text(viewbtntxt);
      $(".launch-wrapper")
        .find(".launch-btn")
        .text(launchbtntxt);
        
     
    
		$("#videoPlayer").find("source").attr("src", videourl)
		
      var topHeading = data.topheading;
      var toolheading = data.toolheader;
      var formtext = data.formHeading;
      var riskbutton = data.riskbutton;
      var viewbutton = "";
      var rightheader = data.rightheader;
      var formlabelText = data.controlText;
      var occupationalJsondata = data.occupationdata;
      
      $(".desktopHeader a").html(topHeading);
      $(".form-header")
        .find(".header_label")
        .text(toolheading.title);
      $(".form-header")
        .find("img")
        .attr("src", toolheading.imgurl);
      $(".accessRiskBtn").text(riskbutton);

      $(".search_heading")
        .find("h5")
        .text("")
        .text(data.searchText);

       
      $(".selectBox option").eq(0).text(data.controlText[1].title)	  
      $("#searchControl").attr("placeholder", data.searchplaceholder);	  
      $(".form-text").text(formtext);
      var formbodylabel = $(".form-body").find(".formLabel");
      $.each(formlabelText, function(key, val) {
        $(formbodylabel)[key].textContent = val.title;
      });
      $(".accessRiskBtn").text(riskbutton);
      //#endregion

      $(".viewbutton").text(data.demobtn.btntext);
      $(".viewbutton").attr("href", data.demobtn.url);

      var mobileViewImages = data.mobileViewImages;
      $.each(mobileViewImages, function(mkey, mval) {
        $(".forMobileView")
          .find("li img")
          [mkey].setAttribute("src", mval.imgurl);
      });

      $.each(rightheader, function(fkey, fval) {
        $(".header_container")
          .find("img")
          [fkey].setAttribute("src", fval.img);
        $(".header_container").find("span")[fkey].textContent = fval.title;
      });       
      if (occupationalJsondata.length != 0) {		    
			occupationalJsondata = occupationalJsondata.sort(function(a,b){
				var compare = 0
				if(a.listtext.toLowerCase() > b.listtext.toLowerCase()) {
					compare = 1
				} else {
					compare = -1;
				}
					return compare
				})
        $.each(occupationalJsondata, function(k, v) {
          str +=
            '<a href="javascript:void(0)" onclick="getdropdownValue(this,' +
            v.id +
            ')">' +
            '<li class="list-group-item" data-attept=' +
            v.attept +
            ">" +
            '<label class="text-muted">' +
            v.listtext +
            "</label>" +
            "</li>" +
            "</a>";
          // $.each(v.dutycode, function (k1, v1) {
          //     str += '<span data-check=' + v1.enable + ' style="display:none;">' +
          //         v1.text +
          //         '</span>';
          // })
        });
        $("#occupationList").append(str);
      }
    },
    statusCode: {
      404: function() {
        alert("There was a problem with the server.  Try again soon!");
      }
    }
  });

  // $(".searchControl").on("click", function () {
  //     $(".search_body").show();
  // })
  ///Open Search Popup

  ///Search functionality Start
  $(".searchControl").keyup(function(e) {
    var SearchText = $(this)
      .val()
      .trim()
      .toLocaleLowerCase();
    var $root = $(this)
      .closest("#search_box_container")
      .find(".list-group");
    var items = $root.find("li");
    for (x = 0; x < items.length; x++) {
      $itemAtX = $(items[x]).find("label.text-muted");
      if ($itemAtX.text().trim().toLocaleLowerCase().indexOf(SearchText) != -1
      ) {
        $itemAtX.parent().show();
      } else {
        $itemAtX.parent().hide();
      }
    }
  });
  ///Search functionality End

  ///Open Search Popup
  $("#selectOccupation, #searchBox_Container").click(function() {	  
    $(".searchBox_backdrop").show();	
    $("body").addClass("overFlowhidden");
    $(".searchContainer").find("#searchControl").val("").focus();
      $(".list-group-item").css("display","block");
  });

  ///Close Search Popup
  $(".closeButton").click(function() {
    $(".searchBox_backdrop").hide();
    $("body").removeClass("overFlowhidden");
  });

  // var heightSet = $(window).height() - $("#topHeaderHeight").outerHeight();
  // $(".form-container").css("min-height", heightSet + "px")
  
     // $(window).on("resize",function(){           
        // call_slider();
    // });

   ///image text popup dots create function
  
    // $(window).on("resize",function(){           
    //   call_crousel_data();
    // });

    

    //var mobile_data_append="";
    function text_popup_data(popupdata){  
      var data_append="";
      $.each(popupdata,function(img_text_key,img_text_val){        
        data_append+='<div class="img-txt-main">'+
                             '<div class="img-box">'+
                             '<img src="'+img_text_val.popupimg+'" alt="image">'+
                             '</div>'+
                             '<div class="img-txt-box">'+
                             '<div>'+img_text_val.text+'</div>'+
                             '</div>'+
                             '</div>';
              })              
      $("#appedData").empty().append(data_append)
   }
   var check_visible_slide_index;
   function getselidelength(slides_length) {
     
     check_visible_slide_index = 1;
     if (slides_length) {
       $('.btn-wrap-journey').find('span').remove();
       for (var i = 0; i < slides_length; i++) {
         $("<span class='slides_dots'></span>").insertAfter(
           ".btn-wrap-journey .show_prev_journey"
         );
       }
       $(".slides_dots").eq(0).addClass("active");
       $(".btn-wrap-journey .show_prev_journey").addClass("disabled");
	   $(".btn-wrap-journey .show_next_journey").removeClass("disabled");
     }
   }
   ///image text popup dots create function
   

   $(document).on("click", ".show_next_journey", function (event) {     
    let content_len = $("#appedData .img-txt-main").length;
    $(".btn-wrap-journey .show_prev_journey").removeClass("disabled").addClass("active");
    if (check_visible_slide_index < content_len) {
      $(".imgtxt-wrapper .img-txt-main").hide();
      $(".imgtxt-wrapper .img-txt-main").eq(check_visible_slide_index).show();
      $(".slides_dots").removeClass("active");
      $(".slides_dots").eq(check_visible_slide_index).addClass("active");
      check_visible_slide_index = check_visible_slide_index + 1;
      if (check_visible_slide_index == content_len) {
          $(this).addClass("disabled");
      }
    }
    return false;
  });
  $(document).on("click", ".show_prev_journey", function (event) {    
    let content_len = $("#appedData .img-txt-main").length;
    if (check_visible_slide_index > 1) {
      $(this).siblings("a").removeClass("btnNext disabled");
      check_visible_slide_index--;
      $(".imgtxt-wrapper .img-txt-main").hide();
      $(".imgtxt-wrapper .img-txt-main").eq(check_visible_slide_index - 1).show();
      $(".slides_dots").removeClass("active");
      $(".slides_dots").eq(check_visible_slide_index - 1).addClass("active");
      if(check_visible_slide_index == 1){
          $(".btn-wrap-journey .show_prev_journey").addClass("disabled");
      }
    }
    return false;
  });

    
  $(document).on("click",".close-popup", function(){    
       var gettarget=$(this).find("a").attr("data-target")
       $("#"+gettarget).hide();
  })



 
  $(document).on("click",".view-demo, .viewbutton", function(){    
    $("#img_txt_popup").css("display","flex");	    
    if(isMobile.any()!=null) {      
      text_popup_data(requestedjsondata.demopopup.mobiledata);  
      getselidelength(requestedjsondata.demopopup.mobiledata.length)	
     }
     else{
      text_popup_data(requestedjsondata.demopopup.desktopdata);
      getselidelength(requestedjsondata.demopopup.desktopdata.length)	
     }

     var param = $(this).attr("id");
        console.log("param : "+param);
        window.parent.vca.setToolActivity(param);
        return false;
  })

});
// $(window).load(function(){
//     var heightSet= $(window).height() - $("#topHeaderHeight").outerHeight();
//     $(".form-container").css("height",heightSet+"px")

// })

function call_slider() {
  var window_width = $(window).width();
  if (window_width < 767) {
    $("#formHide").hide();
    $("#printPage").show();
  }
}





function getdropdownValue(_this, id) {
  var $this = $(_this);
  
  $("#envCard").find(".errorCardList, #envaccedentCardList, #envhealthCardList").hide();
  $("#toolBasedCard").find("#toolhealthCardList, #toolaccedentCardList, .errorCardList").hide();
  var selectedOccupationText = $this.find(".list-group-item label").text();

  $(".selectBox").attr("disabled", false);

  var compairId = id;
  var optionappend = "";
  var chemicalList = "";
  var chemicalhealthlList = "";
  var toolList = "";
  var toolAccidentList = "";
  var toolHealthList = "";
  var envList = "";
  var envHealthList = "";
  var envaccidentList = "";
  var riskCardList = "";
  var first=false;

  $.ajax({
    type: "GET",
    url: "data/occupationdata.json",
    dataType: "text",
    success: function(data) {
      //
	  
      first=true;
      data = JSON.parse(data);
      var labeltext = data.controlText;
	  var lebelselectedtext = data.labelcontroltext;
	  
      if (data.occupationdata.length != 0) {
        $.each(data.occupationdata, function(postKey, postval) {
          if (postval.id == compairId && first==true) {
          
            
            var atteptet = $this.find(".list-group-item").attr("data-attept");
            $("body").removeClass("overFlowhidden");
            $(".formLabel").eq(0).addClass("active");			
			$(".formLabel").eq(1).addClass("active1");
			//$(".formLabel").eq(1).removeClass("disabled-label")
			$(".formLabel").removeClass("disabled-label")  
			
            $(".formLabel").eq(0).text("").text(lebelselectedtext[0].title);	
			
			 $(".form-body").find("#searchBox_Container").attr("id", " ");

            $("#selectOccupation").val(selectedOccupationText);
            var arr = [];
            /// append select option            
            var isdutycodenotvalid=false;
            $.each(postval.dutycode, function(dutyKey, dutyVal) {
              if (dutyVal.rating != 0) {
                arr.push(dutyVal.rating);
              }
               if(dutyVal.rating===5){
                isdutycodenotvalid=true;
               }
            });

            $.each(postval.dutycode, function(dkey, dval) {
              if (dval.rating != 0) {
                if (arr.length == 1) {
                  optionappend +='<option value="' + dval.rating + '" selected="selected">' + dval.text + "</option>";
                } else {
                  optionappend +='<option value="' + dval.rating +'">' + dval.text +"</option>";
                }
              } else {
                optionappend +='<option value="' + dval.rating + '" disabled="disabled">' + dval.text +"</option>";
              }
            });
            // $(".selectBox").empty().append(optionappend);
            if (arr.length == 1) {
              // $(".selectBox").append(optionappend);
			  // $(".selectBox").empty();
              $(".selectBox").empty().append("<option value='' disabled>"+labeltext[1].title+"</option>"+ optionappend)
                $(".accessRiskBtn").addClass("activeBtn");
					$(".formLabel").eq(1).addClass("active");	
	                $(".formLabel").eq(1).text("").text(lebelselectedtext[1].title);	
	               $(".selectBox").addClass("selectboxactive");
            } else {              
			  $(".selectBox").empty().append("<option value=''>"+labeltext[1].title+"</option>"+ optionappend)
              //$(".selectBox").append(optionappend);              
              $(".accessRiskBtn").removeClass("activeBtn");
            }

            var imageurl = "../images/dropDwn_inact.svg";

            $(".selectBox::after").css(
              "background-image",
              "url(/" + imageurl + ")"
            );

            

            /// append select option End
            console.log(arr.length);


            //customer profile card data append
            $("#customerboxHeader").text(postval.customerProfileBox.heading);
            $.each(postval.customerProfileBox.subtitle, function(
              custboxkey,
              custboxval
            ) {
              $("#customerBoxBody").find(".titleAppend")[
                custboxkey
              ].textContent = custboxval.title + ":";
            });
            //customer profile card data append

            // Risk card data append

            $("#riskcard").find(".title_heading").empty().text(postval.riskratingcard.heading);



            $("#msgratingdiv").hide()
            $("#ratingdiv").show();
             if(isdutycodenotvalid==false){
              $.each(postval.riskratingcard.sutitle, function(riskkey, riskval) {
                riskCardList += "<li>" + riskval.item + "</li>";
              });
              $("#msgratingdiv").hide()
              $(".risk_indicator").empty().append(riskCardList);
             }
             else{
               $("#ratingdiv").hide();
               $("#msgratingdiv").show().empty().append("<h6 class='risk_nodata_block'>"+data.nodata+"</h6>");            
             }
            
           
            // Risk card data append

                 


            //chemical card data append
            var chamicalCardheading = postval.chemicalsubstencbasedbox.heading;
            var chamicalBodyTitle =  postval.chemicalsubstencbasedbox.casualAgent.title;
            var chamicalAgentList =  postval.chemicalsubstencbasedbox.casualAgent.casualtAgentlist;
            var chamicalConditionTitle = postval.chemicalsubstencbasedbox.condition.title;            
            var chamicalHealthList = postval.chemicalsubstencbasedbox.condition.health;

            $("#chemicalCardHead").text("").text(chamicalCardheading);

            $("#casualText").text("").text(chamicalBodyTitle);
            $.each(chamicalAgentList, function(chemicalKey, chemicalVal) {              
              chemicalList += "<li>" + chemicalVal.listItem + "</li>";
            });
            $("#chemicalList").empty().append(chemicalList);          

            $("#conditionText").text("").text(chamicalConditionTitle);
            if (chamicalHealthList.length != 0) {
              $("#healthTitle").text("").text(postval.chemicalsubstencbasedbox.condition.healthTitle + ":");
              $.each(chamicalHealthList, function(healthKey, healthVal) {
                chemicalhealthlList += "<li>" + healthVal.listItem + "</li>";
              });
              $("#chemicalHealthList").empty().append(chemicalhealthlList);
			  
            } else {
              $("#chemicalHealthList").empty().append("<li>"+data.nocondition+"</li>");
            }
            //chemical card data end append






            //Tool card data append
            var toolCardheading = postval.toolbasedboxes.heading;
            var toolstitle = postval.toolbasedboxes.tools.title;

            var toolsitemList = postval.toolbasedboxes.tools.toolslist;
            var toolconditionTitle = postval.toolbasedboxes.condition.title;
            
            var toolHealthTitle = postval.toolbasedboxes.condition.healthTitle;
            var accidentHealthTitle = postval.toolbasedboxes.condition.accidenttitle;
            var toolshealthList = postval.toolbasedboxes.condition.healthlist;
            var toolsaccicentList = postval.toolbasedboxes.condition.accidentlist;

            $("#toolBasedCard").find("#block-heading").text("").text(toolstitle);
            $("#toolBasedCard").find(".card_heading").text("").text(toolCardheading);

            $.each(toolsitemList, function(tKey, tval) {
              toolList += "<li>" + tval.listItem + "</li>";
            });
            $("#toolBasedCard").find("#toolList").empty().append(toolList);

         
            $("#toolBasedCard").find("#conditionTitle").text("").text(toolconditionTitle);

              if (toolshealthList.length != 0) {
                $("#toolBasedCard").find("#toolhealthCardList").show();
                $("#toolBasedCard").find("#healthTitle").text("").text(toolHealthTitle + ":");
                $.each(toolshealthList, function(ToolKey, toolval) {
                  toolHealthList += "<li>" + toolval.listItem + "</li>";
                });
                $("#toolBasedCard").find("#healthlist").empty().append(toolHealthList);
            }
            else{
              $("#toolBasedCard").find("#toolhealthCardList").hide();
            }                       
            ///Chech only health data
            
              if (toolsaccicentList.length !=0) {
                $("#toolBasedCard").find("#toolaccedentCardList").show();
                $("#toolBasedCard").find("#accidentTitle").text("").text(accidentHealthTitle + ":");
                $.each(toolsaccicentList, function(ToolKey1, toolval1) {
                  toolAccidentList += "<li>" + toolval1.listItem + "</li>";
                });
                $("#toolBasedCard").find("#accidentlist").empty().append(toolAccidentList);
              }
              else{
                $("#toolBasedCard").find("#toolaccedentCardList").hide();
              }
              if(toolshealthList.length ==0 && toolsaccicentList.length ==0){
                $("#toolhealthCardList, #toolaccedentCardList").hide();
                $("#toolBasedCard").find(".errorCardList").show()
                $("#toolBasedCard").find("#errorList").empty().append("<li>"+data.nocondition+"</li>");
              }              
              else {
                //#endregion
                $("#toolBasedCard").find(".errorCardList").hide()
            }

            //Tool card data end append

            
            //Context enviroment card data end append
            var envCardheading = postval.contextEnviromentBasedboxes.heading;
            var envtitle =
              postval.contextEnviromentBasedboxes.casualtAgent.title;
            var envitemList =
              postval.contextEnviromentBasedboxes.casualtAgent.casualtAgentlist;
            $("#envCard").find(".card_heading").text("").text(envCardheading);
            $("#envCard").find("#titleHeading").text("")
              .text(envtitle);
            //#endregion

            $.each(envitemList, function(eKey, eval) {
              envList += "<li>" + eval.listItem + "</li>";
            });
            $("#envCard")
              .find("#envcasualList")
              .empty()
              .append(envList);

            var envconditionTitle =
              postval.contextEnviromentBasedboxes.condition.title;
            var envHealthTitle =
              postval.contextEnviromentBasedboxes.condition.healthTitle;
            var envaccidentTitle =
              postval.contextEnviromentBasedboxes.condition.accidenttitle;
            var envcardhealthList =
              postval.contextEnviromentBasedboxes.condition.healthlist;
            var envcardaccidentList =
              postval.contextEnviromentBasedboxes.condition.accidentlist;

            $("#envCard").find("#conditionTitle").text("").text(toolconditionTitle);
              if(envcardhealthList.length!=0) {
                $("#envCard").find("#envhealthCardList").show();
                $("#envCard").find("#healthTitle").text("").text(toolHealthTitle + ":");
                $.each(envcardhealthList, function(healKey, healval) {
                  envHealthList += "<li>" + healval.listItem + "</li>";
                });
                $("#envCard").find("#healthList").empty().append(envHealthList);
                  ///////Health List ///////////////////// 
              }
              else{
                $("#envCard").find("#envhealthCardList").hide();

              }  
                if (envcardaccidentList.length != 0) {
                  $("#envCard").find("#envaccedentCardList").show();
                $("#envCard").find("#accidentTitle").text("").text(accidentHealthTitle + ":");
                $.each(envcardaccidentList, function(healKey1, healval1) {
                  envaccidentList += "<li>" + healval1.listItem + "</li>";
                });
                $("#envCard").find("#accidentlist").empty().append(envaccidentList);
              }
              else{
                $("#envCard").find("#envaccedentCardList").hide();
              }
  
                if(envcardhealthList.length ==0 && envcardaccidentList.length == 0) {
                  $("#envCard").find("#envaccedentCardList, #envhealthCardList").hide();
                  $("#envCard").find(".errorCardList").show();
                      $("#envCard").find("#errorList").empty().append("<li>"+data.nocondition+" </li>");
                 }
                 else{
                  $("#envCard").find(".errorCardList").hide();
                 }

            //Tool card data end append

            //#endregion$

            $(".searchBox_backdrop").hide();            
            first=false;            
            return;
          }
        });
      }
    },
    statusCode: {
      404: function() {
        alert("There was a problem with the server.  Try again soon!");
      }
    }
  });

  
}

//show right side data
$(document).on("click", ".activeBtn", function() {
  var $this = $(this);
    $(".form-control.py-2")
    .closest("div.relative")
    .addClass("select-none");
    $(this).removeClass("activeBtn");
    var ocupationalvalue = $this
      .closest(".form-body")
      .find("#selectOccupation")
      .val();
    var rating = $this
      .closest(".form-body")
      .find(".selectBox option:selected")
      .val();
    var dutyCodeText = $this
      .closest(".form-body")
      .find(".selectBox option:selected")
      .text();

    $this
      .closest(".form-body")
      .find("#selectOccupation")
      .attr("disabled", true);
    $this
      .closest(".form-body")
      .find("#searchBox_Container")
      .attr("id", " ");
    $this
      .closest(".form-body")
      .find(".selectBox")
      .attr("disabled", true);

    $(".risk_indicator li").removeClass("Red amber green");
    $("#secondAppend").text(ocupationalvalue);
    $("#secondAppend1").text(dutyCodeText);
    $(".rightpanel").show();

    if (rating == 1) {
      $(".risk_indicator li")
        .eq(0)
        .addClass("green");
    } else if (rating == 2) {
      $(".risk_indicator li")
        .eq(1)
        .addClass("amber");
    } else if (rating == 3) {
      $(".risk_indicator li")
        .eq(2)
        .addClass("Red");
    } else if (rating == 4) {
      $(".risk_indicator li")
        .eq(3)
        .addClass("fourth");
    } else {
      $(".risk_indicator li").removeClass("Red amber green");
    }

    var window_Width_1 = $(window).width();
    if (window_Width_1 < 767) {
      call_slider();
    } else {
      $("#formHide").show();
    }
  
});

// Reset button functionality
$(".resetbutton").click(function() {
  $("#formHide").show();

  $(".form-control.py-2")
    .closest("div.relative")
    .removeClass("select-none");

  $(".rightpanel").hide();
  $("#selectOccupation").val("");
  $(".selectBox").empty();
  $(".selectBox").append("<option value='' selected disabled>"+globaljsondata.controlText[1].title+"</option>")

  $("#selectOccupation").attr("disabled", false);
  $(".selectBox").attr("disabled", true);
  $(".risk_indicator li").removeClass("Red amber green");
  //#endregion
  //Chamical Card;
  $("#chemicalCard")
    .find("#chemicalCardHead")
    .text("");
  $("#chemicalCard")
    .find("#casualText")
    .text("");
  $("#chemicalCard")
    .find("#chemicalList")
    .empty();
  $("#chemicalCard")
    .find("#conditionText")
    .text("");
  $("#chemicalCard")
    .find("#healthTitle")
    .text("");
  $("#chemicalCard")
    .find("#chemicalHealthList")
    .empty();
  //Chamical Card;

  //Tool  Card;
  $("#toolBasedCard")
    .find(".card_heading")
    .text("");
  $("#toolBasedCard")
    .find("#block-heading")
    .text("");
  $("#toolBasedCard")
    .find("#toolList")
    .empty();
  $("#toolBasedCard")
    .find("#conditionTitle")
    .text("");
  $("#toolBasedCard")
    .find("#healthTitle")
    .text("");
  $("#toolBasedCard")
    .find("#healthlist")
    .empty();
  $("#toolBasedCard")
    .find("#accidentTitle")
    .text("");
  $("#toolBasedCard")
    .find("#accidentlist")
    .empty();
  //Tool Card;

  //Enviroment  Card;
  $("#envCard")
    .find(".card_heading")
    .text("");
  $("#envCard")
    .find("#titleHeading")
    .text("");
  $("#envCard")
    .find("#envcasualList")
    .empty();
  $("#envCard")
    .find("#conditionTitle")
    .text("");
  $("#envCard")
    .find("#healthTitle")
    .text("");
  $("#envCard")
    .find("#healthList")
    .empty("");
  $("#envCard")
    .find("#accidentTitle")
    .text('');
  $("#envCard")
    .find("#accidentlist")
    .empty();
  //Enviroment Card;

  //Risk Card
  $("#riskcard")
    .find(".title_heading")
    .text("");
  $("#riskcard")
    .find(".risk_indicator")
    .empty();
  $(".formLabel").removeClass("active active1");

  $(".formLabel").eq(0).empty().text(globaljsondata.controlText[0].title);
  $(".formLabel").eq(1).empty().text(globaljsondata.controlText[1].title);
  $(".formLabel").eq(1).addClass("disabled-label")
  $(".selectBox").removeClass("selectboxactive");  
});
 
function getactivevalue(_this){ 
  var $this=$(_this)
  if($this.val()!=0){
     $(".accessRiskBtn").addClass("activeBtn");
  }
  else{
    $(".accessRiskBtn").removeClass("activeBtn");
  }
}


/*
$(document).on("click",".close-popup", function(){	
	var videoid= $(this).find("a").attr("data-target");	
	$("#"+videoid).hide();
	 var $video = $('#video-popup video');
	 var vid = document.getElementById("videoPlayer");
     vid.currentTime = 0;
	$video[0].pause();
}) */

$(".selectBox").on("click focus", function(){	
	$(".formLabel").eq(1).addClass("active");	
	$(".formLabel").eq(1).text("").text(globaljsondata.labelcontroltext[1].title);	
    //$(".selectBox option:first").text("")	    
	$(".selectBox").addClass("selectboxactive");
})
  