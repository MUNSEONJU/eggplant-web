var LayoutFlex = 
{
  orgSlider : null
  ,info :
  {
    version : "2.0.1"
  }
  ,solidslider : false
  ,bGhostShow : false
  ,color : null
  ,slidersize : "1"
  ,slidersize2 : "15" //옆에 이미지가 붙을때 사용
  ,funcResize : null
  ,init : function( opt )
  {
    if(opt!=null && opt.slidersize!=undefined) LayoutFlex.slidersize = opt.slidersize.toString(); //solid일땐 사이즈 조절 가능
    if(opt!=null && opt.solidslider!=undefined ) LayoutFlex.solidslider = opt.solidslider;
    if(LayoutFlex.solidslider==false && (opt==null || opt.slidersize==undefined)) LayoutFlex.slidersize = LayoutFlex.slidersize2;
    if(opt!=null && opt.color!=undefined) LayoutFlex.color = opt.color;
    if(opt!=null && opt.funcResize!=undefined) LayoutFlex.funcResize = opt.funcResize;
    
    if( typeof Page != "undefined")
    {
      // 팝업/탭일 경우 body에 스타일클래스 추가 
      var isMenuPgm   = (HCG.isVal(Page.PGM_URL)) && (HCG.isVal(Page.POP_URL)) && (Page.PGM_URL == Page.POP_URL); // 팝업, 탭이 아닌 메뉴프로그램 
      var isModal     = (window.name.indexOf("dialogframe_") != -1); // HCG.ModalUtil.open 여부
      var isModaless  = _isModaless == "Y"; // HCG.popModaless 여부
      if( !isMenuPgm )
      {
        // HCG.popModaless
        if( isModaless )
        {
          $(document.body).addClass("p-3");
        }
        // HCG.ModalUtil.open
        else if( isModal )
        {
          $(document.body).addClass("h-layout-pop");
        }
        // 나머지는 탭으로 간주함. 예외가 있을 경우 조건문 추가
        else
        {
          $(document.body).addClass("h-layout-tab");
        }
      }
    }
    
    /*
     Vue 객체 생성시 한번 init 한번 더 실행하는데 
     ghost Element가 두개가되어 슬라이더 사용시 에러 발생하여 기존 ghost를 삭제
    */
    $(".h-flex-slider-ghost").remove();
    
    LayoutFlex.makeGhost();
    LayoutFlex.makeSlider();
    LayoutFlex.resize();
    
    $("div.h-flex-slider>div").mouseover(function(e) 
    {
      LayoutFlex.showGhost(e);
    });
    $("div.h-flex-slider").mouseleave(function() 
    {
//      window.hideSliderTimeout = setTimeout(function(){LayoutFlex.hiddenGhost(false);},400); 
    });
    
    
    $("div.h-flex-slider-ghost").mouseover(function(e)
    {
      clearTimeout(window.hideSliderTimeout);
    });
    $("div.h-flex-slider-ghost").mouseleave(function(e)
    {
      window.hideSliderTimeout = setTimeout(function()
      {
        LayoutFlex.hiddenGhost(false);
      },400); 
    });
    
    
    $(".sliderghost").dblclick(function(e)
    {
      LayoutFlex.restoreSize(e);
    });
    
    $(".h-grid-round-box").on("dblclick",function(e)
    {
      if (e.target !== e.currentTarget) return;
      if( $(e.currentTarget).find("span.h-btn > .h-icon-full").length == 0 ) return; // fullscreen 버튼이 있을때만 더블클릭 활성화
      LayoutFlex.toggleGridFullScreen(this);
    });
    
    LayoutFlex.resize();
    
    window.onresize = function() 
    {
      setTimeout(function(){ LayoutFlex.resize();},0);
    };
  }
  ,resize : function() 
  {
    LayoutFlex.hiddenGhost();
    LayoutFlex.flexLayout = LayoutFlex.getfFlexLayout();
    //LayoutFlex.flexLayout.each(function() 
    //{
    //  Layout.getChildBoxHierachy($(this)[0]);
    //});
    LayoutFlex.hiddenGhost();
    
    $(".h-flex-box").each(function()
    {
      var oBox = $(this);
      LayoutFlex.setGridSize(oBox);
    });
    
    $(".h-flex-slider").each(function()
    {
      var oSlider = $(this);
      oSlider.css({"flex" : "0 0 "+(LayoutFlex.slidersize*1.5)+"px"});
    });
    
    if(typeof(directResize) == "function")
    {  
      directResize(); //사이즈를 직접 수정하고 싶을때 사용
    }
    
    if(LayoutFlex.funcResize!=null)
    {
      LayoutFlex.funcResize();
    }
    
    //seet resize
    LayoutFlex.settoggleGridResize();
  }
  ,showBox : function ( box , bResize){
    if(bResize==null||bResize==undefined) bResize = true;
    var oDiv = null;
    if($.type(box)== "string" )
    {
      oDiv= $("#"+box);
      var oriDisplay = oDiv.attr("ori-display")
      if(!oriDisplay || oriDisplay == "none")
      {
        if(oDiv.hasClass("h-flex-col") && oDiv.hasClass("h-flex-col") && oDiv.hasClass("h-flex-col") && oDiv.hasClass("h-flex-col") )
        {
          oriDisplay = "flex";
        }
        else
        {
          oriDisplay = "block";
        }
      }
      oDiv.css("display",oriDisplay);
    }
    /* jquery1.12 버전에서 호출하는 방식 변경 배열의 값을 받아서 보여주도록 한다. */
    else if($.type(box)=="array")
    {
      $(box).each(function(r,v)
      {
        oDiv = $("#"+v);
        var oriDisplay = oDiv.attr("ori-display")
        if(!oriDisplay || oriDisplay == "none")
        {
          if(oDiv.hasClass("h-flex-col") && oDiv.hasClass("h-flex-col") && oDiv.hasClass("h-flex-col") && oDiv.hasClass("h-flex-col") )
          {
            oriDisplay = "flex";
          }
          else
          {
            oriDisplay = "block";
          }
        }
        //oDiv = $("#"+$(this)[0]);
        oDiv.css("display",oriDisplay);
      });
    }
    LayoutFlex.hiddenGhost();
    if(bResize)LayoutFlex.resize();
  }
  ,hideBox : function (box , bResize){
    if(bResize==null||bResize==undefined) bResize = true;
    var oDiv = null;
    if($.type(box)== "string" ){
      oDiv= $("#"+box);
      var oriDisplay = oDiv.css("display");
      
      if(!oriDisplay || oriDisplay == "none")
      {
        if(oDiv.hasClass("h-flex-col") && oDiv.hasClass("h-flex-col") && oDiv.hasClass("h-flex-col") && oDiv.hasClass("h-flex-col") )
        {
          oriDisplay = "flex";
        }
        else
        {
          oriDisplay = "block";
        }
      }
      
      oDiv.attr("ori-display",oriDisplay);
      oDiv.css("display","none");
    }
    /* jquery1.12 버전에서 호출하는 방식 변경 배열의 값을 받아서 보여주도록 한다. */
    else if($.type(box)=="array"){
      $(box).each(function(r,v){
        oDiv = $("#"+v);
        var oriDisplay = oDiv.css("display");
        if(!oriDisplay || oriDisplay == "none")
        {
          if(oDiv.hasClass("h-flex-col") && oDiv.hasClass("h-flex-col") && oDiv.hasClass("h-flex-col") && oDiv.hasClass("h-flex-col") )
          {
            oriDisplay = "flex";
          }
          else
          {
            oriDisplay = "block";
          }
        }
        oDiv.attr("ori-display",oriDisplay);
        //oDiv = $("#"+$(this)[0]);
        oDiv.css("display","none");
      });
    }
    LayoutFlex.hiddenGhost();
    if(bResize)LayoutFlex.resize();
  }
  ,makeGhost : function() 
  {
    var oDiv = $("<div class='h-flex-slider-ghost' style='display:none'></div>");
    oDiv.css({
        position : "absolute"
        ,width : 10
        ,height : 10
        ,left : 0
        ,top : 0
        ,zindex : 999
    });
    if(LayoutFlex.solidslider==true && LayoutFlex.color!=null)
    { 
      oDiv.css("background", LayoutFlex.color);
    }
    $(document.body).append(oDiv);
  }
  ,makeSlider : function()
  { 
    //solid slider 이나 일반 slider을 만들어준다.
    $("div.h-flex-slider").each(function()
    {
      if(LayoutFlex.color!=null)
      {
        $(this).css("background", LayoutFlex.color);
      }
      if(!LayoutFlex.solidslider)
      {
        LayoutFlex.insertSliderImage($(this));
      }
    });
  }
  ,insertSliderImage : function (oSlider)
  {
    var sClass = "";
    if($(oSlider).parent().hasClass("h-flex-row")) sClass = "h-flex-drag-vslider";
    else sClass = "h-flex-drag-hslider";
    var div = "<div class='"+sClass+"'></div>";
    oSlider.html(div);
  }
  ,getfFlexLayout : function()
  {
    return $("div.h-flex-layout");
  }
  ,showGhost : function(e) 
  {
    if(LayoutFlex.bGhostShow) return;
    
    var oSlider = $(e.currentTarget).parent();
    var ghostType = "";
    var cursorType = "";
    var axisType = "";
    
    if ($(oSlider).parent().hasClass("h-flex-row")) 
    {
      cursorType = "e-resize";
      ghostType = "V";
      axisType = "x";
    } 
    else 
    {
      cursorType = "n-resize";
      ghostType = "H";
      axisType = "y";
    }
  
    if(!LayoutFlex.solidslider)
    {
      $(".h-flex-slider-ghost").html(oSlider.html());
    }
  
    var w = $(oSlider)[0].offsetWidth  - (ghostType=="V"?0:2);
    var h = $(oSlider)[0].offsetHeight - (ghostType=="H"?0:2);
    var l = $(oSlider).offset().left;
    var t = $(oSlider).offset().top;
    $(".h-flex-slider-ghost").css({
      position : "absolute"
      ,width : w
      ,height : h
      ,left : l
      ,top : t
      ,cursor : cursorType
      ,border : 0
      ,margin: 0
      ,padding:0
      ,display : "inline-block"
    }).attr("ghostType", ghostType);
    LayoutFlex.orgSlider = oSlider;
  
    $(".h-flex-slider-ghost").draggable({
      axis : axisType
      ,containment : 'parent'
      ,iframeFix: true
      ,cursor : cursorType
      ,start : function(event, ui) 
      {
        LayoutFlex.bGhostShow = true;
      }
      ,stop : function(event, ui) 
      {
        LayoutFlex.chgSize();
        LayoutFlex.bGhostShow = false;
        LayoutFlex.hiddenGhost();
      }
    });
  }
  ,hiddenGhost : function()
  {
    $(".h-flex-slider-ghost").css("display", "none");
  }
  ,chgSize : function() 
  { //ghost box에서 마우스를 띄었을때 사이즈 변경한다.
    var oSlider = $(".h-flex-slider-ghost");
    var w = $(oSlider)[0].offsetWidth;
    var h = $(oSlider)[0].offsetHeight;
    var l = $(oSlider).offset().left;
    var t = $(oSlider).offset().top;
    
    var befBox = LayoutFlex.orgSlider.prev()[0];
    var aftBox = LayoutFlex.orgSlider.next()[0];
    
    var befAutoYn = $(befBox).hasClass("h-flex-auto");
    var aftAutoYn = $(aftBox).hasClass("h-flex-auto");
    
    //flex 속성이 auto인 경우에는 사이즈 변경이 불가능함
    if(befAutoYn || aftAutoYn)
    {
      console.log("flex 속성이 auto인 경우에는 슬라이더 사용이 불가능합니다.");
      console.log("before Box Auto 여부 : " + befAutoYn);
      console.log("after Box Auto 여부 : " + aftAutoYn);
      alert("flex 속성이 auto인 경우에는 슬라이더 사용이 불가능합니다.\n" +
            "before Box Auto 여부 : "+ befAutoYn +"\n" +
            "after Box Auto 여부 : " + aftAutoYn
            );
      return false;
    }
    
    var nStdPosition = 0;
    var nOrgSize = 0;
    var nAftOrgSize = 0;
    var nDiffSize = 0;
    var sChildType = $(oSlider).attr("ghostType");

    if (sChildType == "V") 
    {
      nStdPosition = $(befBox).offset().left;
      nOrgSize     = befBox.offsetWidth;
      nAftOrgSize  = aftBox.offsetWidth;
      nDiffSize    = l - (nStdPosition + nOrgSize);
      
      var bf = $(befBox).css("Flex").split(" ")[0];
      var af = $(aftBox).css("Flex").split(" ")[0];
      
      var befFlex = "1 1 0%";
      var aftFlex = "1 1 0%";
      
      if(bf == "1" && af == "1")
      {
        befFlex =  "0 0 "+(nOrgSize + nDiffSize).toString()+"px";
      }
      else if (af == "1")
      {
        befFlex =  "0 0 "+(nOrgSize + nDiffSize).toString()+"px";
      }
      else if (bf == "1")
      {
        aftFlex =  "0 0 "+(nAftOrgSize - nDiffSize).toString()+"px";
      }
      else
      {
        befFlex =  "0 0 "+(nOrgSize + nDiffSize).toString()+"px";
        aftFlex =  "0 0 "+(nAftOrgSize - nDiffSize).toString()+"px";
      }
      
      $(befBox).css({"flex": befFlex , "max-width" : (befFlex == "1 1 0%") ? "none" : (nOrgSize + nDiffSize).toString()+"px"});
      $(aftBox).css({"flex": aftFlex , "max-width" : (aftFlex == "1 1 0%") ? "none" : (nAftOrgSize - nDiffSize).toString()+"px"});
    }
    else 
    {
      if(befBox!=null)
      {
        nStdPosition = $(befBox).offset().top;
        nOrgSize = befBox.offsetHeight;
        nAftOrgSize = aftBox.offsetHeight;
        nDiffSize = t - (nStdPosition + nOrgSize);
        
        var bf = $(befBox).css("Flex").split(" ")[0];
        var af = $(aftBox).css("Flex").split(" ")[0];
        
        var befFlex = "1 1 0%";
        var aftFlex = "1 1 0%";
        
        if(bf == "1" && af == "1")
        {
          befFlex =  "0 0 "+(nOrgSize + nDiffSize).toString()+"px";
        }
        else if (af == "1")
        {
          befFlex =  "0 0 "+(nOrgSize + nDiffSize).toString()+"px";
        }
        else if (bf == "1")
        {
          aftFlex =  "0 0 "+(nAftOrgSize - nDiffSize).toString()+"px";
        }
        else
        {
          befFlex =  "0 0 "+(nOrgSize + nDiffSize).toString()+"px";
          aftFlex =  "0 0 "+(nAftOrgSize - nDiffSize).toString()+"px";
        }
        
        $(befBox).css({"flex": befFlex , "max-height" : (befFlex == "1 1 0%") ? "none" : (nOrgSize + nDiffSize).toString()+"px"});
        $(aftBox).css({"flex": aftFlex , "max-height" : (aftFlex == "1 1 0%") ? "none" : (nAftOrgSize - nDiffSize).toString()+"px"});
      }
    }
    if(LayoutFlex.funcResize!=null)
    {
      LayoutFlex.funcResize();
    }
    
    setTimeout(function(){ LayoutFlex.resize();},0);
  }
  ,setGridSize : function( oBox)
  {
    return;
    var oGridDiv;
    var boxDisplay = false;
    
    var width = oBox.width();
    var height = oBox.height();

    if (oBox.children("[boxDisplay='true']").length>0)
    {
      oGridDiv =oBox.children("[boxDisplay='true']");
      boxDisplay = true;
    }
    else 
      oGridDiv = oBox.children("div.tableBox").children("div[id^='DIV_sheet']");

    var boxWplus =  oGridDiv.attr2("boxWplus") ? parseInt(oGridDiv.attr("boxWplus")):0;
    var boxHplus =  oGridDiv.attr2("boxHplus") ? parseInt(oGridDiv.attr("boxHplus")):0;

    if( oGridDiv.length > 0)
    {
      var oGridParIdv = boxDisplay ? oGridDiv.parent() : oGridDiv.parent().parent();
      oGridParIdv.css({padding:"0",margin:"0"});
      var fixHeight = height-((Layout.grid.border*2) + ( boxDisplay ? 0 : (Layout.grid.padding*2)))+(boxHplus);
      var fixWidth = width-((Layout.grid.border*2) +  (boxDisplay ? 0 : (Layout.grid.padding*2)))+(boxWplus);

      oGridDiv.width(fixWidth);
      oGridDiv.height(fixHeight);
      oGridParIdv.width(width);
      oGridParIdv.height(height);
      
    }
  }
  ,toggleGridFullScreen : function( oBtn )
  {
    var $btn = $(oBtn);
    var $oGridWrapBox = $($btn.closest(".h-grid-round-box"));
    
    if( $oGridWrapBox.length == 0 ) return;
    
    var wName = window.name;
    var top = window.ehrTopFrame;
    
    var currIframe;
    $(window.parent.document).find("iframe").each(function(i, frame){
      if( frame.name == wName )
      {
        currIframe = frame;
        return false;
      }
    });
    
    var modalFrame;
    if( typeof window.ehrTopFrame != "undefineud" )
    {
      if(wName.indexOf("dialogframe_") != -1)
      {
        modalFrame = window;
      }
      else
      {
        var fName = wName;
        var fParent = window.parent;
        while(fName != "ehrTopFrame")
        {
          if( fParent.name.indexOf("dialogframe_") != -1 )
          {
            modalFrame = fParent;
            break;
          }
          else
          {
            fName = fParent.name;
            fParent = fParent.parent;
          }
        }
      }
    }  
    
    if($oGridWrapBox.hasClass("h-full-page"))
    {
      $oGridWrapBox.css("max-width",$oGridWrapBox.attr("max-width") || '100%');
      $oGridWrapBox.css("max-height",$oGridWrapBox.attr("max-height") || '100%');
      $oGridWrapBox.removeClass("h-full-page");
      $btn.removeClass("on");
      $oGridWrapBox.find(".h-icon-full").removeClass("on");
      
      if( typeof currIframe != "undefined" )
      {
        // Modal창에서의 fullscreen 해제
        if(typeof modalFrame != "undefined")
        {
          if( typeof modalFrame._modalW == undefined || typeof modalFrame._modalH == undefined  ) return;
          modalFrame.HCG.sizeDialog(modalFrame._modalW, modalFrame._modalH);
          if( wName != HCG.nvl(modalFrame.name))
          {
            $(currIframe).removeClass("h-full-biz-frame");
            $(currIframe).css("z-index", "");
          }
        }
        // biz iframe fullpage 해제 
        else
        {
          var fName = window.name;
          var fParent = window.parent;
          if( typeof window.ehrTopFrame != "undefined")
          {
            while(fName != "ehrTopFrame")
            {
              $(fParent.document).find("iframe").each(function(i, frame){
                if( frame.name == fName )
                {
                  fName = fParent.name;
                  fParent = fParent.parent;
                  $(frame).removeClass("h-full-biz-frame");
                  $(frame).css("z-index", "");
                  return false;
                }
              });
            }
          }
          
          $(top.document).find("#divMainWidjet").css("z-index", "");
          $(top.document).find("#divModule").css("z-index", "");
          $(currIframe).removeClass("h-full-biz-frame");
          $(currIframe).css("z-index", "");
        }
      }
      
    }
    else
    {
      $oGridWrapBox.attr("max-width" ,$oGridWrapBox.css("max-width") || '100%');
      $oGridWrapBox.attr("max-height",$oGridWrapBox.css("max-height") || '100%');
      $oGridWrapBox.css("max-width","100%");
      $oGridWrapBox.css("max-height","100%");
      $oGridWrapBox.addClass("h-full-page");
      $btn.addClass("on");
      $oGridWrapBox.find(".h-icon-full").addClass("on");
      
      if( typeof currIframe != "undefined" )
      {
        // Modal창에서의 fullscreen 적용
        if(typeof modalFrame != "undefined")
        {
          modalFrame.HCG.sizeDialog(); // fullsize modal
          if( wName != modalFrame.name)
          {
            $(currIframe).addClass("h-full-biz-frame");
            $(currIframe).css("z-index", "101");
          }
        }
        // biz iframe fullpage 적용
        else
        {
          var fName = window.name;
          var fParent = window.parent;
          if( typeof window.ehrTopFrame != "undefined")
          {
            while(fName != "ehrTopFrame")
            {
              $(fParent.document).find("iframe").each(function(i, frame){
                if( frame.name == fName )
                {
                  fName = fParent.name;
                  fParent = fParent.parent;
                  $(frame).addClass("h-full-biz-frame");
                  $(frame).css("z-index", "101");
                  return false;
                }
              });
            }
          }
          $(top.document).find("#divMainWidjet").css("z-index", "100");
          $(top.document).find("#divModule").css("z-index", "1"); // IE Stacking order로 인한 z-index 보정
          $(currIframe).addClass("h-full-biz-frame");
          $(currIframe).css("z-index", "101");
        }
      }
    }
    
    //seet resize (toggle 버튼 클릭시 sheet resize 처리 
    LayoutFlex.settoggleGridResize();
  }
  ,settoggleGridResize : function( oBtn )
  {
    //resize 될때 시트의 width 값 재 설정
    // ibsheet hidden 을 제외한 전체 컬럼이 FrozenCol 로 잡혀 있을 경우 적용 안됨. 
    var sheetId;
    var objSheet;
    var sheetSize = 0;
    var obj;
    
    $('[id^="DIV_sheet"]').each(function(index)
    {
      sheetId = $(this).attr("id");
      sheetSize = $("#"+sheetId).width();
      objSheet = eval(sheetId.replace("DIV_",""));
      
      var orgSize = 0;
      var OriginalColSize;
      var rcnt = objSheet.HeaderRows();
      if(Page.POP_URL == objSheet.POP_URL)
      {
        
        if(sheetSize > 0 && Number(objSheet.OriginalWidh) >= 0 )
        {
          OriginalColSize = objSheet.OriginalColSize;
          
          if( Number(objSheet.OriginalWidh) > sheetSize )
          {
            var rcnt = objSheet.HeaderRows();
            for(var c=0;c<=objSheet.LastCol();c++)
            {
              if(!objSheet.GetCellProperty(rcnt-1, c, "Hidden"))
              {
                var svnm = objSheet.ColSaveName(c);
                objSheet.SetColWidth(svnm, OriginalColSize[svnm]);
              }
            }
//            objSheet.SetConfig({AutoFitColWidth:""});
          }
          else
          {
            objSheet.FitColWidth();
//            objSheet.SetConfig({AutoFitColWidth:"search|init"});
          }
        }
      }
      
    });
  }
};