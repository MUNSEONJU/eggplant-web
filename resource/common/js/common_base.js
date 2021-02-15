
__base_dir = '/';
__baseAction = '/commonAction.do';
RD_WEBROOT = location.protocol + "//" + location.host;  //프로젝트시에는 주석해제
//document.domain = location.host;
//RD_WEBROOT = "http://1.234.41.25:8109";           //프로젝트시에는 주석처리
//RD_DB_PARAM = "/rdebugmode 1 /ruseurlmoniker 0 /rcontype [RDAGENT] /rf ["+location.protocol + "//" + location.host+"/RDServer/rdagent.jsp] /rsn [EHR]";
var winOpen ;
var hmAjaxMsg;  //다국어 cache 역할을 하게 될 해쉬맵

var _isPopup = false;
try
{
  if(window.frameElement != null && window.frameElement.getAttributeNode("popsection") != null)
  {
    _isPopup = true;
  }
  else
  {
    _isPopup = false;
  }
}
catch(e)
{
  _isPopup = false;
}

$(document).ready(function()
{
  if(typeof HCG !="undefined")
  {
    setTimeout(function(){ HCG.pageLoading(true); },1);
  }
});

/**
 * 정규 표현에 일치하는 부분의 치환을 실행합니다.
 * @method replaceAll
 * @member String
 * @param {String} regex 정규표현식
 * @param {String} replacement 치환문자
 */
String.prototype.replaceAll = function() { 
    var a = arguments, length = a.length;
    if ( length == 0 ) 
    {
        return this;
    }
    var regExp = new RegExp( a[0], "g");
    if ( length == 1 ) 
    {  
      return this.replace(regExp, "");
    } 
    else 
    {
        return this.replace(regExp, a[1]);
    }
    return this;
};

//jquery의 unique 함수가 sort되어 있지 않은 배열에 대해 중복제거를 하지 못하여 unique2로 재정의(kyn)
/**
 * @class jQuery
 */
jQuery.extend({
  /**
   * 배열의 중복을 제거하여 리턴
   * @member jQuery
   * @method unique2
   * @param {Array} arr
   * @return {Array}
   */
  unique2 : function (arr)
  {
    var i;
    var len = arr.length;
    var rtnArr = [];
    var tmp = {};
    for ( i=0;i<len;i++) 
    {
      tmp[arr[i]] = 0;  
    }
    for(i in tmp){
      rtnArr.push(i);
    }
    return rtnArr;
  },
  /**
   * str에 포함된 %s를 arguments로 대체하여 리턴한다.
   * @member jQuery
   * @method sprintf
   * @param {String} str 문자열
   * @param {String} arguments %s를 대체할 문자열들
   * @return {String} 대체된 문자열
   */
  sprintf : function (str) {
    var args = arguments,
        flag = true,
        i = 1;

    str = str.replace(/%s/g, function () {
        var arg = args[i++];

        if (typeof arg === 'undefined') {
            flag = false;
            return '';
        }
        return arg;
    });
    return flag ? str : '';
  }
});

/**
 * userAgent에서 정보를 추출하여 브라우저 정보와 버전 정보를 JSON형태로 리턴
 * @member jQuery
 * @method uaMatch
 * @param {String} ua navigator.userAgent
 * @return {Json} browser,version
 */
jQuery.uaMatch = function( ua ) {
  ua = ua.toLowerCase();

  var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
    /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
    /(msie) ([\w.]+)/.exec( ua ) ||
    ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
    [];

  return {
    browser: match[ 1 ] || "",
    version: match[ 2 ] || "0"
  };
};

if ( !jQuery.browser ) {
  matched = jQuery.uaMatch( navigator.userAgent );
  var browser = {};

  if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
  }

  // Chrome is Webkit, but Webkit is also Safari.
  if ( browser.chrome ) {
    browser.webkit = true;
  } else if ( browser.webkit ) {
    browser.safari = true;
  }

  jQuery.browser = browser;
}

/**
 * 객체 내부까지 복사하는 펑션
 * @member Object
 * @method extend2
 * @param {Object} destination 입력객체
 * @param {Object} source 복사객체
 * @returns {Object} destination 복사된 객체
 */
Object.extend2 = function(destination, source) {

  for (var property in source) {
    if ( source[property] == null || source[property].constructor != Object )
    {
      destination[property] = source[property];
    }
    else
    {
      Object.extend2(destination[property], source[property]);
    }

  }
  return destination;
}

/**
 * 반올림 펑션
 * @member Math
 * @method round2
 * @param {Number} number
 * @param {Number} pointCount
 * @returns {Number}
 */
Math.round2 = function(number, pointCount)
{
  pointCount = pointCount == null ? 0 : pointCount;
  return Math.round(number * Math.pow(10, pointCount)) / Math.pow(10, pointCount);
}

/**
 * 버림 펑션
 * @member Math
 * @method floor2
 * @param {Number} number
 * @param {Number} pointCount
 * @returns {Number}
 */
Math.floor2 = function(number, pointCount)
{
  pointCount = pointCount == null ? 0 : pointCount;
  return Math.floor(number * Math.pow(10, pointCount)) / Math.pow(10, pointCount);
}

/**
 * 올림 펑션
 * @member Math
 * @method ceil2
 * @param {number} number
 * @param {pointCount} pointCount
 * @returns {Number}
 */
Math.ceil2 = function(number, pointCount)
{
  pointCount = pointCount == null ? 0 : pointCount;
  return Math.ceil(number * Math.pow(10, pointCount)) / Math.pow(10, pointCount);
}

/**
 * 나눗셈 펑션
 * @member Math
 * @method divide
 * @param {Number} num1 피제수
 * @param {Number} num2 제수
 * @returns {Number} 몫
 */
Math.divide = function(num1, num2)
{
  return num2 == 0 ? 0 : num1/num2;
}

jQuery.ajaxSettings.traditional = true;

/**
 * @class jQuery
 */
jQuery.fn.extend({
  /**
   * jquery attr의 결과가 undefined이면 "" 아니면 결과를 리턴
   * @member jQuery
   * @method attr2
   * @param {String} name element의 속성키
   * @return {String} element 속성 값
   */
  attr2: function( name ) {
    var $tmp;
    if(name!=undefined && name!=null )
    {
      $tmp = $(this).attr(name);
    }
    return ($tmp == undefined)? "" : $tmp;
  },

  /**
   * 
   * @member jQuery
   * @method val2
   * @param 
   * @return 
   */
  val2: function( value ) {
    var hooks, ret, isFunction,
      elem = this[0];
    var rreturn = /\r/g;

    if ( !arguments.length ) {
      if ( elem ) {
        hooks = jQuery.valHooks[ elem.nodeName.toLowerCase() ] || jQuery.valHooks[ elem.type ];

        if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined && (ret = hooks.get( elem, "value" )) !== "undefined" ) {
          return ret;
        }

        ret = elem.value;

        return typeof ret === "string" ?
          // handle most common string cases
          ret == "undefined" ? "" : ret.replace(rreturn, "") :
          // handle cases where value is null/undef or number
          ret == null ? "" : ret;
      }

      return "";
    }


    isFunction = jQuery.isFunction( value );

    return this.each(function( i ) {
      var self = jQuery(this), val;

      if ( this.nodeType !== 1 ) {
        return "";
      }

      if ( isFunction ) {
        val = value.call( this, i, self.val() );
      } else {
        val = value;
      }

      // Treat null/undefined as ""; convert numbers to string
      if ( val == null ) {
        val = "";
      } else if ( typeof val === "number" ) {
        val += "";
      } else if ( jQuery.isArray( val ) ) {
        val = jQuery.map(val, function ( value ) {
          return value == null ? "" : value + "";
        });
      }

      

      hooks = jQuery.valHooks[ this.nodeName.toLowerCase() ] || jQuery.valHooks[ this.type ];

      // If set returns undefined, fall back to normal setting
      if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
        this.value = val;
      }
    });
  },
  
  /**
   * serializeObject 시 disbled된 input의 값은 넘길수 없으므로 넘길수 있게 수정
   * @member jQuery
   * @method serializeObject
   * @return {Json} 
   */
  serializeObject : function() 
  { 
    //disabled elements는 serialize() 에서 제외되므로 아래 처리를 해준다.
    var disabledElements = $("[disabled]").each(function(i,e){
      return this.disabled;
    });// disabled elements 모으고    
    disabledElements.each(function(i, e) { e.disabled = false; });// enable 해주고
    
    var o = {}; 
    var a = this.serializeArray(); 
    $.each(a, function() { 
        if (o[this.name] !== undefined) { 
            if (!o[this.name].push) { 
                o[this.name] = [o[this.name]]; 
            } 
            o[this.name].push(this.value || ''); 
        } else { 
            o[this.name] = this.value || ''; 
        } 
    }); 
    
    disabledElements.each(function(i, e) { e.disabled = true; });// 다시 disable
    
    return o; 
  },
  /**
   * qurey string 을 Json object 로 변환
   * @member jQuery
   * @method toQueryParams
   * @param {String} separator key,value 한쌍을 구분하는 구분자
   * @return {Json}
   */
  toQueryParams : function(separator)
  {
    var str = {};
    if(typeof HCG != "undefined")
    {
      separator = HCG.nvl(separator,"&");
    }
    else
    {
      separator = nvl(separator,"&");
    }

    var o = {};
    
    if(!this.selector) return o;
    
    str = this.selector.split(separator);

    $(str).each(function (i, v) {
      v = v.split("=");
      var key = v[0];
      var value = {};
      value = decodeURIComponent(v[1]||"");
      
      if (o[key] !== undefined)  {
        if (!o[key].push) o[key] = [o[key]]; 
        o[key].push(value); 
      }
      else o[key] = value; 
    });

    return o;
  },
  /**
   * this에 탭효과를 반영하여 jQuery 객체로 반환
   * @member jQuery
   * @method tab
   * @param {String} iframe iframe name 
   * @param {Json} opt 옵션
   * @return {jQuery}
   */
  tab:function(iframe, opt )
  {
    var oTab = $(this);
    var oUl = oTab.children("ul");
    var nIndex = 0;
    oUl.children("li").each(function()
    {
      var oLi = $(this);
      oLi.attr("tab_index",nIndex);
      nIndex++;
      oLi.bind("click",function(e)
      {
        var iframe;
        if(typeof HCG != "undefined")
        {
          iframe = HCG.nvl(oTab.attr("iframe"),"iframe01");
        }
        else
        {
          iframe = nvl(oTab.attr("iframe"),"iframe01");
        }
        
        var childFrame = frames[iframe];
        var childDoc = childFrame.document;
        var objA = oLi.children("span").children("a");
        if(objA.length<=0) objA = oLi.children("a");
        var gridUpdate = false;
        
        var arrSheet = [];
        $(childDoc.getElementsByTagName("TABLE")).each(function()
        {
          if($(this).hasClass("GMMainTable")) arrSheet.push($(this));
        });
        
        /* 2017.01.17 ibsheet 버전이 .62로 바뀌면서 sheet 그려주는 부분이 변경됨 */
        $(arrSheet).each(function()
        {
          var sGridId = childFrame.$(this).prop("id");
          if(sGridId.indexOf("-") > 0)
          {
            sGridId = sGridId.replaceAll("-table","");
          }
          if( eval("childFrame."+sGridId+".IsDataModified()") )
          {
            gridUpdate = true;
          }
        });
        
        if($(childDoc.body).attr("ISUPDATED")=="true" || gridUpdate==true)
        {
          var msg  = "";
          if(typeof HCG =="undefined")
          {
            msg = ajaxMsg("MSG_CONFIRM_TABMOVE", Page.LANG);
          }
          else
          {
            msg = HCG.ajaxMsg("MSG_CONFIRM_TABMOVE", Page.LANG);
          }
          if(!confirm(msg)) return; //저장되지 않은 정보가 있습니다.\n그래도 진행하시겠습니까
        }
        //MSG_CONFIRM_TABMOVE
          
        oUl.find("li.on").removeClass("on");
        oUl.find("a.on").removeClass("on");
        var $a =  oLi.children("span").children("a");
        if($a.length<=0) $a = oLi.children("a");
        oTab.attr("selectedIndex", oLi.attr("tab_index"));
        oTab.attr("selectedName", $a.html());
        oTab.attr("selectedTab",  $a.attr("selTab"));
        oLi.addClass("on");
        $a.addClass("on");
          
        if(objA.attr("tabFunc") != undefined)
        {
          eval(objA.attr("tabFunc"));
        }
        else if(objA.attr("href").replace("javascript:","") != "")
        {
          eval(objA.attr("href"));
        }
      });
    });

    if(typeof HCG != "undefined")
    {
      iframe = HCG.nvl(iframe,"iframe01");
    }
    else
    {
      iframe = nvl(iframe,"iframe01");
    }
    window.open("about:blank",iframe);
    oTab.attr("iframe", iframe);

    if(opt==null || opt.selectFirst != false )
    {
      setTimeout(function(){$(oUl.children("li")[0]).trigger("click");},0);
    }
    else if(opt.selectFirst == false)
    {
      var $a = oUl.find("li > span > a");
      if($a.length<=0) $a = oUl.find("li > a");
      oTab.attr("selectedIndex", 0);
      oTab.attr("selectedName", $a.html());
      oTab.attr("selectedTab",  $a.attr("selTab"));
      oUl.children().first().addClass("on");
    };

    oTab.reSelect = function()
    {
      var oUl = oTab.children("ul");
      var selectedIndex = oTab.attr("selectedIndex");
      $(oUl.children("li")[selectedIndex]).trigger("click");
    };

    oTab.tabScroll = function(dir)
    {
      var oDiv = $(this);
      var scrollLeft = oDiv.scrollLeft();

      try
      {
        var addWidth = 0;
        oDiv.find("li").each(function(i,v)
        {
          addWidth +=  $(v)[0].clientWidth;
          if(dir == "L" && scrollLeft <= addWidth)
          {
            oDiv.scrollLeft( addWidth - $(v)[0].clientWidth);
            throw 'break;';
          }
          else if(dir == "R" && scrollLeft < addWidth)
          {
            oDiv.scrollLeft( addWidth); 
            throw 'break;';            
          }
        });
      }catch(e){}
    };
    
    return oTab;
  },
  /**
   * throw $break 사용하기 위하여 추가
   * @member jQuery
   * @method _each
   * @param {Function} callback 사용자 정의 function
   * @param {Object} args callback function 에 적용할 parameter
   * @return {Object} this
   */
  _each: function(  callback, args ) {
    var object = this, 
        name,
        i = 0,
        length = object.length,
        isObj = length === undefined || jQuery.isFunction( object );

    try {
      if ( args ) {
        if ( isObj ) {
          for ( name in object ) {
            if ( callback.apply( object[ name ], args ) === false ) {
              break;
            }
          }
        } else {
          for ( ; i < length; ) {
            if ( callback.apply( object[ i++ ], args ) === false ) {
              break;
            }
          }
        }

      // A special, fast, case for the most common use of each
      } else {
        if ( isObj ) {
          for ( name in object ) {
            if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
              break;
            }
          }
        } else {
          for ( ; i < length; ) {
            if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
              break;
            }
          }
        }
      }
    } catch (e) {
      if (e != $break) { throw e; }
    }
    return object;
  },
  size: function() {
      return this.length
  }
  ,purgeFrame : function()
  {
    var deferred;
    if ($.browser.msie && parseFloat($.browser.version, 10) < 9) {
      var $frame = this;
      var sem = $frame.length
        , deferred = $.Deferred();
      $frame.load(function() {
          var frame = this;
          frame.contentWindow.document.innerHTML = '';
          sem -= 1;
          if (sem <= 0) {
              $frame.remove();
              deferred.resolve();
          }
      });
      $frame.attr('src', 'about:blank');
      if ($frame.length === 0) {
          deferred.resolve();
      }
      deferred = deferred.promise();
    } else {
        deferred = $.Deferred();
        deferred.resolve();
        this.remove();
    }
    return deferred;
  }
  ,cellPos : function( rescan )
  {
    var $cell = this.first(),
        pos = $cell.data( "cellPos" );
    if( !pos || rescan ) {
        var $table = $cell.closest( "table, thead, tbody, tfoot" );
        /* scan table
         * scan individual table and set "cellPos" data in the form { left: x-coord, top: y-coord }
         */
        var m = [];
        $table.children( "tr" ).each( function( y, row ) {
            $( row ).children( "td, th" ).each( function( x, cell ) {
                var $cell = $( cell ),
                    cspan = $cell.attr( "colspan" ) | 0,
                    rspan = $cell.attr( "rowspan" ) | 0,
                    tx, ty;
                cspan = cspan ? cspan : 1;
                rspan = rspan ? rspan : 1;
                for( ; m[y] && m[y][x]; ++x );  //skip already occupied cells in current row
                for( tx = x; tx < x + cspan; ++tx ) {  //mark matrix elements occupied by current cell with true
                    for( ty = y; ty < y + rspan; ++ty ) {
                        if( !m[ty] ) {  //fill missing rows
                            m[ty] = [];
                        }
                        m[ty][tx] = true;
                    }
                }
                var pos = { top: y, left: x };
                $cell.data( "cellPos", pos );
            } );
        } );
    }
    pos = $cell.data( "cellPos" );
    return pos;
  }
});




var DevTool = {
    captureImage : null
   ,init : function() 
    {
      if(HUNEL_DEV_TOOL_USE_YN=="Y")
      {
        if(DevTool.getUrl()!="/main/jsp/hunel.jsp")
        {
          setTimeout(function(){
            DevTool.createTool();
            DevTool.bindEvent();
          },10);
        }
      }
    }
   ,createTool : function()
    {
       var oToolDiv = $("#divHunelDevTool");
       if(oToolDiv.length>0) return; //이미만들어진 상태면 만들지 않음
       
       oToolDiv = $(document.createElement("div"));
       oToolDiv.prop("id","divHunelDevTool");
       
       var oDivInfo = $(document.createElement("ul"));
       oDivInfo.addClass("divDevInfo");
       
       var oLi1 = $(document.createElement("li"));
       oLi1.addClass("url");
       
       var oInput = $(document.createElement("input"));
       oInput.prop("type", "text");
       oInput.val(DevTool.getUrl());
       oLi1.append(oInput);
       
       var oLi2 = $(document.createElement("li"));
       oLi2.addClass("btnDev");
       
       var btnCapture = $(document.createElement("a"));
       btnCapture.addClass("btnCapture");
       btnCapture.attr("title","캡쳐");
       btnCapture.prop("href","javascript:;");
       var oSpan1 = $(document.createElement("span"));
       oSpan1.addClass("hidden");
       oSpan1.html("캡쳐");
       btnCapture.append(oSpan1);
       btnCapture.bind("click",function(){ DevTool.toImage(); });
       
       var btnBoard = $(document.createElement("a"));
       btnBoard.addClass("btnBoard");
       btnBoard.attr("title","의견");
       btnBoard.prop("href","javascript:;");
       var oSpan2 = $(document.createElement("span"));
       oSpan2.addClass("hidden");
       oSpan2.html("의견");
       btnBoard.append(oSpan2);
       btnBoard.bind("click",function(){ DevTool.popBoard();});
       
       var btnClose = $(document.createElement("a"));
       btnClose.addClass("btnToolClose");
       btnClose.attr("title","닫기");
       btnClose.prop("href","javascript:;");
       var oSpan3 = $(document.createElement("span"));
       oSpan3.addClass("hidden");
       oSpan3.html("닫기");
       btnClose.append(oSpan3);
       btnClose.bind("click",function(){ DevTool.hide(); });
       
       oLi2.append(btnCapture);
       oLi2.append(btnBoard);
       oLi2.append(btnClose);
       
       oDivInfo.append(oLi1);
       oDivInfo.append(oLi2);
       
       oToolDiv.append(oDivInfo);
       oToolDiv.addClass("divDevTool");
       oToolDiv.attr("toggle","N");
       oToolDiv.css("display","none");
       
       $(document.body).prepend(oToolDiv);
       
       /*
        *  <div id="divHunelDevTool" class="divDevTool">
    <ul class="divDevInfo">
      <li class="url">
        <input type="text" name="" value="" />
      </li>
      <li class="btnDev">
        <a href="javascript:;" class="btnCapture" title="캡쳐"><span class="hidden">캡쳐</span></a>
        <a href="javascript:;" class="btnBoard" title="의견"><span class="hidden">의견</span></a>
        <a href="javascript:;" class="btnToolClose" title="닫기"><span class="hidden">닫기</span></a>
      </li>
    </ul>
  </div>
        */
    }
   ,bindEvent : function()
    {
      //일반적인 페이지는 타이틀을 더블클릭했을 때 보이도록 조정
      var hTitle = $("h2,h3");
      if(hTitle.length > 0 && $(hTitle[0]).css("display")!="none" && $(hTitle[0]).html()!="")
      {
        $(hTitle[0]).bind("dblclick", function(){
          DevTool.toggle();
        });
      }
      else
      {
        
        //타이틀이 없는 경우는 
        $(document.body).bind("dblclick", function(e){
          if( !$.contains($("#divHunelDevTool")[0], e.target) )
          {
            DevTool.toggle();
          }
        });
      }
    }
   ,getUrl : function()
    {
      if(window.Page != undefined)
      {
        return window.Page.POP_URL;
      }
    }
   ,toImage : function()
    {
     if(!HCG.isCanvasSupported())
     {
       alert("사용하고 있는 브라우저가 구형이라 해당기능을 사용할 수 없습니다.");
       return;
     }
     if(!confirm("화면을 캡쳐하여 이미지로 다운 받습니다.")) return;
      //$("#divHunelDevTool").hide();
      DevTool.hideAll();
      DevTool.captureImage = null;
      setTimeout(function()
      {
        var wbox = $("#wbox");
        html2canvas(document.body).then(function(canvas) 
        {
          Progress.start();
          var aTitle = $(".titA");
          var sTitle = "";
          if(aTitle.length>0)
          {
            sTitle = $(aTitle[0]).html();
          }
          //IE
          if(canvas.msToBlob)
          {
            window.navigator.msSaveBlob(canvas.msToBlob(), $.trim(sTitle) + "_" + $.trim($.now())+".png");
          }
          else
          {
            var imageData = canvas.toDataURL("image/png");
            var a = $("<a>").attr("href", imageData).attr("download", $.trim(sTitle) +"_" + $.trim($.now())+".png").appendTo("body");
            a[0].click();
            a.remove();
          }
          
          //DevTool.showAll();
          Progress.stop();
        });
      }, 500);
    }
   ,popBoard : function()
    {
      HCG.ModalUtil.open({title:"프로그램정보", url: "/sys/sy_project/sy_project_210_p01.jsp", param: {C_PROFILE_ID: Page.PROFILE_ID, C_MODULE_ID: Page.MODULE_ID, C_MENU_ID: Page.MENU_ID, 
        C_PGM_ID: Page.PGM_ID, C_URL: Page.PGM_URL, C_SQL_ID: Page.SQL_ID, C_PRS_ID: Page.PRS_ID, S_POPUP_YN:"Y", X_PGM_ID: "sy_project_210_p01", S_ERR_YN: "Y", S_MEMO_YN: "Y"}});
      
    }
   ,toggle : function()
    {
      var $oToolDiv =  $("#divHunelDevTool");
      if($oToolDiv.attr("toggle") == undefined) $oToolDiv.attr("toggle", "N");
      if($oToolDiv.attr("toggle") == "N" )
      {
        $oToolDiv.show();
        $oToolDiv.attr("toggle","Y");
      }
      else
      {
        $oToolDiv.hide();
        $oToolDiv.attr("toggle","N");
      }
    }
   ,hideAll : function()
    {
       DevTool.hideTool( $(document.body), false);
    }
   ,showAll : function()
   {
     DevTool.hideTool( $(document.body), true);
   }
   ,hideTool : function( $node , bShow )
    {
      var $tool =  $node.find("#divHunelDevTool");
      if(bShow)
      {
        $tool.show();
      }
      else
      {
        $tool.hide();
      }
     
       var $iframe  = $node.find("iframe");
       if( $iframe.length > 0)
       {
         $iframe.each(function(idx,item)
         {
           DevTool.showDevTool(item, bShow);
           
           DevTool.hideTool($(item), bShow);
           
         });
       }
       
    }
   ,showDevTool : function ( iframe, bShow )
    {
      var $tool =  $(iframe).contents().find("#divHunelDevTool");
      if(bShow)
      {
        $tool.show();
      }
      else
      {
        $tool.hide();
      }
    }
   ,show : function()
    {
      $("#divHunelDevTool").show();
    }
   ,hide : function()
    {
      $("#divHunelDevTool").hide();
    }
  };


var $break = { };

/**
 * HashMap을 사용할 수 있도록 구현
 */
var HashMap = function()
{
  this.map = new Array();
  this.length = 0;
};

HashMap.prototype = {
    put : function(key, value){
      this.map[key] = value;
      this.length++;
    },
    get : function(key){
      return this.map[key];
    },
    clear:function(){
      this.map = new Array();
      this.length = 0;
    },
    getKeys : function(){
      var keys = new Array();
      for(i in this.map)
      {
        keys.push(i);
      }
      return keys;
    },
    size : function(){
      return this.length;
    },
    isEmpty : function(){
      return this.length == 0;
    }
};

if(typeof HCG == "undefined")
{
  window.ehrTopFrame = findFrameByName("ehrTopFrame")||top;
}
else
{
  window.ehrTopFrame = HCG.findFrameByName("ehrTopFrame")||top;
}

if( window.ehrTopFrame.ModalDialog == undefined)
{
  window.ehrTopFrame.ModalDialog = {};
}
if( window.ehrTopFrame.ModalDialog.isCreated == undefined )
{
  if(typeof HCG == "undefined")
  {
    ModalUtil.init();
  }
  else
  {
    HCG.ModalUtil.init();
  }
}


/* jquery datepicker */

/**
 * dataPicker 달력의 오늘 날짜에 focus표시
 * @member global
 * @method dayTripper
 */
function dayTripper()
{
  $('.ui-datepicker-trigger').click(function () {
    var $dp_trigger = $(this);
    var dp_input = ($dp_trigger.prev())[0];
    setTimeout(function () {
      var today = $('.ui-datepicker-today a')[0];

      if (!today) {
        today = $('.ui-state-active')[0] ||
                $('.ui-state-default')[0];
      }

      // Hide the entire page (except the date picker)
      // from screen readers to prevent document navigation
      // (by headings, etc.) while the popup is open
      $($(".wbox")[0]).attr('id','dp-container');
      $("#dp-container").attr('aria-hidden','true');
      $("#skipnav").attr('aria-hidden','true');

      // Hide the "today" button because it doesn't do what 
      // you think it supposed to do
      $(".ui-datepicker-current").hide();

      today.focus();
      datePickHandler(dp_input);

    }, 0);
  });
}


/**
 * datePicker의 각종 focus작업 및 Today버튼 숨기기
 * @member global
 * @method datePickHandler
 * @param {Element} input input Element
 */
function datePickHandler(input) {
  var activeDate;
  var container = document.getElementById('ui-datepicker-div');
  
  if (!container || !input) {
    return;
  }

  $(container).find('table').first().attr('role', 'grid');

  container.setAttribute('role', 'application');
  container.setAttribute('aria-label', 'Calendar view date-picker');

    // the top controls:
  var prev = $('.ui-datepicker-prev', container)[0],
      next = $('.ui-datepicker-next', container)[0];
// This is the line that needs to be fixed for use on pages with base URL set in head
  next.href = 'javascript:void(0)';
  prev.href = 'javascript:void(0)';

  next.setAttribute('role', 'button');
  next.removeAttribute('title');
  prev.setAttribute('role', 'button');
  prev.removeAttribute('title');

  appendOffscreenMonthText(next);
  appendOffscreenMonthText(prev);

  // delegation won't work here for whatever reason, so we are
  // forced to attach individual click listeners to the prev /
  // next month buttons each time they are added to the DOM
  $(next).on('click', handleNextClicks);
  $(prev).on('click', handlePrevClicks);

  monthDayYearText();
  
  $(container).focus();
  $(container).on('keydown', function calendarKeyboardListener(keyVent) {
    var which = keyVent.which;
    var target = keyVent.target;
    var dateCurrent = getCurrentDate(container);

    if (!dateCurrent) {
      dateCurrent = $('a.ui-state-default')[0];
      setHighlightState(dateCurrent, container);
    }

    if (27 === which) {
      keyVent.stopPropagation();
      return closeCalendar();
    } else if (which === 9 && keyVent.shiftKey) { // SHIFT + TAB
      keyVent.preventDefault();
      if ($(target).hasClass('ui-datepicker-close')) { // close button
        $('.ui-datepicker-prev')[0].focus();
      } else if ($(target).hasClass('ui-state-default')) { // a date link
        $('.ui-datepicker-close')[0].focus();
      } else if ($(target).hasClass('ui-datepicker-prev')) { // the prev link
        $('.ui-datepicker-next')[0].focus();
      } else if ($(target).hasClass('ui-datepicker-next')) { // the next link
        activeDate = $('.ui-state-highlight') ||
                    $('.ui-state-active')[0];
        if (activeDate) {
          activeDate.focus();
        }
      }
    } else if (which === 9) { // TAB
      keyVent.preventDefault();
      if ($(target).hasClass('ui-datepicker-close')) { // close button
        activeDate = $('.ui-state-highlight') ||
                    $('.ui-state-active')[0];
        if (activeDate) {
          activeDate.focus();
        }
      } else if ($(target).hasClass('ui-state-default')) {
        $('.ui-datepicker-next')[0].focus();
      } else if ($(target).hasClass('ui-datepicker-next')) {
        $('.ui-datepicker-prev')[0].focus();
      } else if ($(target).hasClass('ui-datepicker-prev')) {
        $('.ui-datepicker-close')[0].focus();
      } 
    } else if (which === 37) { // LEFT arrow key
      // if we're on a date link...
      if (!$(target).hasClass('ui-datepicker-close') && $(target).hasClass('ui-state-default')) {
        keyVent.preventDefault(); //keydown외의 별도의 브라우저 행동을 막음 
        previousDay(target);
      }
    } else if (which === 39) { // RIGHT arrow key
      // if we're on a date link...
      if (!$(target).hasClass('ui-datepicker-close') && $(target).hasClass('ui-state-default')) {
        keyVent.preventDefault();
        nextDay(target);
      }
    } else if (which === 38) { // UP arrow key
      if (!$(target).hasClass('ui-datepicker-close') && $(target).hasClass('ui-state-default')) {
        keyVent.preventDefault();
        upHandler(target, container, prev);
      }
    } else if (which === 40) { // DOWN arrow key
      if (!$(target).hasClass('ui-datepicker-close') && $(target).hasClass('ui-state-default')) {
        keyVent.preventDefault();
        downHandler(target, container, next);
      }
    } else if (which === 13) { // ENTER
      if ($(target).hasClass('ui-state-default')) {
        setTimeout(function () {
          closeCalendar();
        }, 100);
      } else if ($(target).hasClass('ui-datepicker-prev')) {
        handlePrevClicks();
      } else if ($(target).hasClass('ui-datepicker-next')) {
        handleNextClicks();
      }
    } else if (32 === which) {
      if ($(target).hasClass('ui-datepicker-prev') || $(target).hasClass('ui-datepicker-next')) {
        target.click();
      }
    } else if (33 === which) { // PAGE UP
      moveOneMonth(target, 'prev');
    } else if (34 === which) { // PAGE DOWN
      moveOneMonth(target, 'next');
    } else if (36 === which) { // HOME
      var firstOfMonth = $(target).closest('tbody').find('.ui-state-default')[0];
      if (firstOfMonth) {
        firstOfMonth.focus();
        setHighlightState(firstOfMonth, $('#ui-datepicker-div')[0]);
      }
    } else if (35 === which) { // END
      var $daysOfMonth = $(target).closest('tbody').find('.ui-state-default');
      var lastDay = $daysOfMonth[$daysOfMonth.length - 1];
      if (lastDay) {
        lastDay.focus();
        setHighlightState(lastDay, $('#ui-datepicker-div')[0]);
      }
    }
    $(".ui-datepicker-current").hide();
  });

}

/**
 * datapicker close
 * @member global
 * @method closeCalendar
 */
function closeCalendar() {
  var container = $('#ui-datepicker-div');
  $(container).off('keydown');
  var input = $('#datepicker')[0];
  $(input).datepicker('hide');
  
  input.focus();
}

/**
 * make the rest of the page accessible again
 * @member global
 * @method removeAria
 */
function removeAria() {
  // make the rest of the page accessible again:
  $("#dp-container").removeAttr('aria-hidden');
  $("#skipnav").removeAttr('aria-hidden');
}

/**
 * num을 2로 나눈 값을 리턴
 * @member global
 * @method isOdd
 * @param {Number} num
 * @returns {Number}
 */
function isOdd(num) {
  return num % 2;
}

/**
 * prev, next 기능 펑션
 * @member global
 * @method moveOneMonth
 * @param {Element} currentDate
 * @param {String} dir
 */
function moveOneMonth(currentDate, dir) {
  var button = (dir === 'next')
              ? $('.ui-datepicker-next')[0]
              : $('.ui-datepicker-prev')[0];

  if (!button) {
    return;
  }

  var ENABLED_SELECTOR = '#ui-datepicker-div tbody td:not(.ui-state-disabled)';
  var $currentCells = $(ENABLED_SELECTOR);
  var currentIdx = $.inArray(currentDate.parentNode, $currentCells);

  button.click();
  setTimeout(function () {
    updateHeaderElements();

    var $newCells = $(ENABLED_SELECTOR);
    var newTd = $newCells[currentIdx];
    var newAnchor = newTd && $(newTd).find('a')[0];

    while (!newAnchor) {
      currentIdx--;
      newTd = $newCells[currentIdx];
      newAnchor = newTd && $(newTd).find('a')[0];
    }

    setHighlightState(newAnchor, $('#ui-datepicker-div')[0]);
    newAnchor.focus();

  }, 0);
}

/**
 * datepicker의 next버튼 focus 효과
 * @member global
 * @method handleNextClicks
 */
function handleNextClicks() {
  setTimeout(function () {
    updateHeaderElements();
    prepHighlightState();
    $('.ui-datepicker-next').focus();
    $(".ui-datepicker-current").hide();
  }, 0);
}

/**
 * datepicker의 prev버튼 focus 효과
 * @member global
 * @method handlePrevClicks
 */
function handlePrevClicks() {
  setTimeout(function () {
    updateHeaderElements();
    prepHighlightState();
    $('.ui-datepicker-prev').focus();
    $(".ui-datepicker-current").hide();
  }, 0);
}

/**
 * datepicker에서 현재 선택되어 있는 전날짜를 focus
 * @member global
 * @method previousDay
 * @param {Element} dateLink
 */
function previousDay(dateLink) {
  var container = document.getElementById('ui-datepicker-div');
  if (!dateLink) {
    return;
  }
  var td = $(dateLink).closest('td');
  if (!td) {
    return;
  }

  var prevTd = $(td).prev(),
      prevDateLink = $('a.ui-state-default', prevTd)[0];

  if (prevTd && prevDateLink) {
    setHighlightState(prevDateLink, container);
    prevDateLink.focus();
  } else {
    handlePrevious(dateLink);
  }
}

/**
 * datepicker에서 현재 선택되어 있는 전 week의 날짜를 focus
 * @member global
 * @method handlePrevious
 * @param {Element} target
 */
function handlePrevious(target) {
  var container = document.getElementById('ui-datepicker-div');
  if (!target) {
    return;
  }
  var currentRow = $(target).closest('tr');
  if (!currentRow) {
    return;
  }
  var previousRow = $(currentRow).prev();

  if (!previousRow || previousRow.length === 0) {
    // there is not previous row, so we go to previous month...
    previousMonth();
  } else {
    var prevRowDates = $('td a.ui-state-default', previousRow);
    var prevRowDate = prevRowDates[prevRowDates.length - 1];

    if (prevRowDate) {
      setTimeout(function () {
        setHighlightState(prevRowDate, container);
        prevRowDate.focus();
      }, 0);
    }
  }
}

/**
 * datepicker에서 현재 선택되어 있는 전 month의 날짜를 focus
 * @member global
 * @method previousMonth
 */
function previousMonth() {
  var prevLink = $('.ui-datepicker-prev')[0];
  var container = document.getElementById('ui-datepicker-div');
  prevLink.click();
  // focus last day of new month
  setTimeout(function () {
    var trs = $('tr', container),
        lastRowTdLinks = $('td a.ui-state-default', trs[trs.length - 1]),
        lastDate = lastRowTdLinks[lastRowTdLinks.length - 1];

    // updating the cached header elements
    updateHeaderElements();

    setHighlightState(lastDate, container);
    lastDate.focus();

  }, 0);
}

///////////////// NEXT /////////////////
/**
 * Handles right arrow key navigation
 * @member global
 * @method nextDay
 * @param  {HTMLElement} dateLink The target of the keyboard event
 */
function nextDay(dateLink) {
  var container = document.getElementById('ui-datepicker-div');
  if (!dateLink) {
    return;
  }
  var td = $(dateLink).closest('td');
  if (!td) {
    return;
  }
  var nextTd = $(td).next(),
      nextDateLink = $('a.ui-state-default', nextTd)[0];

  if (nextTd && nextDateLink) {
    setHighlightState(nextDateLink, container);
    nextDateLink.focus(); // the next day (same row)
  } else {
    handleNext(dateLink);
  }
}

/**
 * datepicker에서 현재 선택되어 있는 다음 week의 날짜를 focus
 * @member global
 * @method handleNext
 * @param {Element} target
 */
function handleNext(target) {
  var container = document.getElementById('ui-datepicker-div');
  if (!target) {
    return;
  }
  var currentRow = $(target).closest('tr'),
      nextRow = $(currentRow).next();

  if (!nextRow || nextRow.length === 0) {
    nextMonth();
  } else {
    var nextRowFirstDate = $('a.ui-state-default', nextRow)[0];
    if (nextRowFirstDate) {
      setHighlightState(nextRowFirstDate, container);
      nextRowFirstDate.focus();
    }
  }
}

/**
 * datepicker에서 현재 선택되어 있는 다음 month의 날짜를 focus
 * @member global
 * @method nextMonth
 */
function nextMonth() {
  nextMon = $('.ui-datepicker-next')[0];
  var container = document.getElementById('ui-datepicker-div');
  nextMon.click();
  // focus the first day of the new month
  setTimeout(function () {
    // updating the cached header elements
    updateHeaderElements();

    var firstDate = $('a.ui-state-default', container)[0];
    setHighlightState(firstDate, container);
    firstDate.focus();
  }, 0);
}

/////////// UP ///////////
/**
 * Handle the up arrow navigation through dates
 * @member global
 * @method upHandler
 * @param  {HTMLElement} target   The target of the keyboard event (day)
 * @param  {HTMLElement} cont     The calendar container
 * @param  {HTMLElement} prevLink Link to navigate to previous month
 */
function upHandler(target, cont, prevLink) {
  prevLink = $('.ui-datepicker-prev')[0];
  var rowContext = $(target).closest('tr');
  if (!rowContext) {
    return;
  }
  var rowTds = $('td', rowContext),
      rowLinks = $('a.ui-state-default', rowContext),
      targetIndex = $.inArray(target, rowLinks),
      prevRow = $(rowContext).prev(),
      prevRowTds = $('td', prevRow),
      parallel = prevRowTds[targetIndex],
      linkCheck = $('a.ui-state-default', parallel)[0];

  if (prevRow && parallel && linkCheck) {
    // there is a previous row, a td at the same index
    // of the target AND theres a link in that td
    setHighlightState(linkCheck, cont);
    linkCheck.focus();
  } else {
    // we're either on the first row of a month, or we're on the
    // second and there is not a date link directly above the target
    prevLink.click();
    setTimeout(function () {
      // updating the cached header elements
      updateHeaderElements();
      var newRows = $('tr', cont),
          lastRow = newRows[newRows.length - 1],
          lastRowTds = $('td', lastRow),
          tdParallelIndex = $.inArray(target.parentNode, rowTds),
          newParallel = lastRowTds[tdParallelIndex],
          newCheck = $('a.ui-state-default', newParallel)[0];

      if (lastRow && newParallel && newCheck) {
        setHighlightState(newCheck, cont);
        newCheck.focus();
      } else {
        // theres no date link on the last week (row) of the new month
        // meaning its an empty cell, so we'll try the 2nd to last week
        var secondLastRow = newRows[newRows.length - 2],
            secondTds = $('td', secondLastRow),
            targetTd = secondTds[tdParallelIndex],
            linkCheck = $('a.ui-state-default', targetTd)[0];

        if (linkCheck) {
          setHighlightState(linkCheck, cont);
          linkCheck.focus();
        }

      }
    }, 0);
  }
}

//////////////// DOWN ////////////////
/**
 * Handles down arrow navigation through dates in calendar
 * @member global
 * @method downHandler
 * @param  {HTMLElement} target   The target of the keyboard event (day)
 * @param  {HTMLElement} cont     The calendar container
 * @param  {HTMLElement} nextLink Link to navigate to next month
 */
function downHandler(target, cont, nextLink) {
  nextLink = $('.ui-datepicker-next')[0];
  var targetRow = $(target).closest('tr');
  if (!targetRow) {
    return;
  }
  var targetCells = $('td', targetRow),
      cellIndex = $.inArray(target.parentNode, targetCells), // the td (parent of target) index
      nextRow = $(targetRow).next(),
      nextRowCells = $('td', nextRow),
      nextWeekTd = nextRowCells[cellIndex],
      nextWeekCheck = $('a.ui-state-default', nextWeekTd)[0];

  if (nextRow && nextWeekTd && nextWeekCheck) {
    // theres a next row, a TD at the same index of `target`,
    // and theres an anchor within that td
    setHighlightState(nextWeekCheck, cont);
    nextWeekCheck.focus();
  } else {
    nextLink.click();

    setTimeout(function () {
      // updating the cached header elements
      updateHeaderElements();

      var nextMonthTrs = $('tbody tr', cont),
          firstTds = $('td', nextMonthTrs[0]),
          firstParallel = firstTds[cellIndex],
          firstCheck = $('a.ui-state-default', firstParallel)[0];

      if (firstParallel && firstCheck) {
        setHighlightState(firstCheck, cont);
        firstCheck.focus();
      } else {
        // lets try the second row b/c we didnt find a
        // date link in the first row at the target's index
        var secondRow = nextMonthTrs[1],
            secondTds = $('td', secondRow),
            secondRowTd = secondTds[cellIndex],
            secondCheck = $('a.ui-state-default', secondRowTd)[0];

        if (secondRow && secondCheck) {
          setHighlightState(secondCheck, cont);
          secondCheck.focus();
        }
      }
    }, 0);
  }
}

/**
 * datepicker달력 감춤
 * @member global
 * @method onCalendarHide
 */
function onCalendarHide() {
  closeCalendar();
}

/**
 * add an aria-label to the date link indicating the currently focused date
 * (formatted identically to the required format: mm/dd/yyyy)
 * @member global
 * @method monthDayYearText
 */
function monthDayYearText() {
  var cleanUps = $('.amaze-date');

  $(cleanUps).each(function (clean) {
  // each(cleanUps, function (clean) {
    clean.parentNode.removeChild(clean);
  });

  var datePickDiv = document.getElementById('ui-datepicker-div');
  // in case we find no datepick div
  if (!datePickDiv) {
    return;
  }

  var dates = $('a.ui-state-default', datePickDiv);

  $(dates).each(function (index, date) {
    var currentRow = $(date).closest('tr'),
        currentTds = $('td', currentRow),
        currentIndex = $.inArray(date.parentNode, currentTds),
        headThs = $('thead tr th', datePickDiv),
        dayIndex = headThs[currentIndex],
        daySpan = $('span', dayIndex)[0],
        monthName = $('.ui-datepicker-month', datePickDiv)[0].innerHTML,
        year = $('.ui-datepicker-year', datePickDiv)[0].innerHTML,
        number = date.innerHTML;

    if (!daySpan || !monthName || !number || !year) {
      return;
    }

    // AT Reads: {month} {date} {year} {day}
    // "December 18 2014 Thursday"
    var dateText = monthName + ' ' + date.innerHTML + ' ' + year + ' ' + daySpan.title;
    // AT Reads: {date(number)} {name of day} {name of month} {year(number)}
    // var dateText = date.innerHTML + ' ' + daySpan.title + ' ' + monthName + ' ' + year;
    // add an aria-label to the date link reading out the currently focused date
    date.setAttribute('aria-label', dateText);
  });
}


/**
 * update the cached header elements because we're in a new month or year
 * @member global
 * @method updateHeaderElements
 */
function updateHeaderElements() {
  var context = document.getElementById('ui-datepicker-div');
  if (!context) {
    return;
  }

  $(context).find('table').first().attr('role', 'grid');

  prev = $('.ui-datepicker-prev', context)[0];
  next = $('.ui-datepicker-next', context)[0];

  //make them click/focus - able
  next.href = 'javascript:void(0)';
  prev.href = 'javascript:void(0)';

  next.setAttribute('role', 'button');
  prev.setAttribute('role', 'button');
  appendOffscreenMonthText(next);
  appendOffscreenMonthText(prev);

  $(next).on('click', handleNextClicks);
  $(prev).on('click', handlePrevClicks);

  // add month day year text
  monthDayYearText();
}

/**
 * prepHighlightState
 * @member global
 * @method prepHighlightState
 */
function prepHighlightState() {
  var highlight;
  var cage = document.getElementById('ui-datepicker-div');
  highlight = $('.ui-state-highlight', cage)[0] ||
              $('.ui-state-default', cage)[0];
  if (highlight && cage) {
    setHighlightState(highlight, cage);
  }
}

/**
 * Set the highlighted class to date elements, when focus is recieved
 * @member global
 * @method setHighlightState
 */
function setHighlightState(newHighlight, container) {
  var prevHighlight = getCurrentDate(container);
  // remove the highlight state from previously
  // highlighted date and add it to our newly active date
  $(prevHighlight).removeClass('ui-state-highlight');
  $(newHighlight).addClass('ui-state-highlight');
}


/**
 * grabs the current date based on the hightlight class
 * @member global
 * @method getCurrentDate
 */
function getCurrentDate(container) {
  var currentDate = $('.ui-state-highlight', container)[0];
  return currentDate;
}

/**
 * Appends logical next/prev month text to the buttons
 * - ex: Next Month, January 2015
 *       Previous Month, November 2014
 * @member global
 * @method appendOffscreenMonthText
 * @param {Element} button
 */
function appendOffscreenMonthText(button) {
  var buttonText;
  var isNext = $(button).hasClass('ui-datepicker-next');
  var months = [
    'january', 'february',
    'march', 'april',
    'may', 'june', 'july',
    'august', 'september',
    'october',
    'november', 'december'
  ];
  var currentMonth = $('.ui-datepicker-title .ui-datepicker-month').text().toLowerCase();
  var monthIndex = $.inArray(currentMonth.toLowerCase(), months);
  var currentYear = $('.ui-datepicker-title .ui-datepicker-year').text().toLowerCase();
  var adjacentIndex = (isNext) ? monthIndex + 1 : monthIndex - 1;

  if (isNext && currentMonth === 'december') {
    currentYear = parseInt(currentYear, 10) + 1;
    adjacentIndex = 0;
  } else if (!isNext && currentMonth === 'january') {
    currentYear = parseInt(currentYear, 10) - 1;
    adjacentIndex = months.length - 1;
  }
  /*
  buttonText = (isNext)
                ? 'Next Month, ' + firstToCap(months[adjacentIndex]) + ' ' + currentYear
                : 'Previous Month, ' + firstToCap(months[adjacentIndex]) + ' ' + currentYear;

  $(button).find('.ui-icon').html(buttonText);
  */
}

/**
 * Returns the string with the first letter capitalized
 * @member global
 * @method firstToCap
 * @param {String} s
 */ 
function firstToCap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}


/* jquery datepicker end */

/**
 * 프로세스의 조회조건을 세션으로 관리하기 위함.
 * 
 * !!필요조건!!
 * - 태그에 sessionCondition 속성 필요
 * - 태그에 korname 속성 필요
 * - selectbox, input[Text]
 */
var SessionConditionUtil = {
  init : function()
  {
    //레이어 hover event
    $("#OPTION_BUTTON").bind("mouseover",function(e){
      $("#OPTION_LIST").show();
    });
    //세션조건 리스트 조회
    var moduleId = Page.MODULE_ID;
    
    var ehrTopFrame = (window.ehrTopFrame||top);
    if( ehrTopFrame.SessionCondition == null || ehrTopFrame.SessionCondition == undefined )
    {
      //console.log("SessionCondition is null");
      return;
    }
    
    var objSessionCondition = ehrTopFrame.SessionCondition;
    
    //console.log(objSessionCondition);
    //if()
    var objModule = objSessionCondition[moduleId];
    //console.log(objModule);
    for(key in objModule){
      if(typeof(objModule[key]) === "object")
      {
        //console.log("key type:"+typeof(objModule[key]));
        var S_ID = objModule[key].S_ID;
        var S_KOR_NAME = objModule[key].S_KOR_NAME;
        var S_MODULE_ID = objModule[key].S_MODULE_ID;
        var S_TAG_TYPE = objModule[key].S_TAG_TYPE;
        var S_TEXT = objModule[key].S_TEXT;
        var S_VALUE = "";
        if(typeof(objModule[key].S_VALUE) === "object")
        {
          var array = objModule[key].S_VALUE;
          for(var i=0; i<array.length; i++)
          {
            if(i != 0)
            {
              S_VALUE += ",";
            }
            S_VALUE += array[i];
          }
        }
        else
        {
          S_VALUE = objModule[key].S_VALUE;
        }
        
        if(S_TAG_TYPE == "SELECT")
        {
          $(document).find("#OPTION_LIST ul").append("<li colName="+S_ID+" colValue="+S_VALUE+" colText="+S_TEXT+"><span class='floatL session_text'>"+S_KOR_NAME+" : "+S_TEXT+" : "+S_VALUE+"</span><span class='btnR_close' onClick=\"SessionConditionUtil.close(this,'"+S_ID+"','"+S_MODULE_ID+"');\"><img src='/resource/images/main/sche_write_close.gif' /></span></li>");
        }
        else
        {
          var liText = "";
          if(S_TEXT != "")
          {
            liText = S_KOR_NAME+" : "+S_VALUE+" : "+S_TEXT;
          }
          else
          {
            liText = S_KOR_NAME+" : "+S_VALUE;
          }
          
          $(document).find("#OPTION_LIST ul").append("<li colName="+S_ID+" colValue="+S_VALUE+" colText="+S_TEXT+"><span class='floatL session_text'>"+liText+"</span><span class='btnR_close' onClick=\"SessionConditionUtil.close(this,'"+S_ID+"','"+S_MODULE_ID+"');\"><img src='/resource/images/main/sche_write_close.gif' /></span></li>");
        }
      }
    }
  }
  ,hideLayer : function() {
    $("#OPTION_LIST").css("display", "none");
  }
  ,add : function(tagId, moduleId)
  {
    var tagId = tagId;
    var tagKorName = $("#"+tagId).attr("korname");
    var tagText = "";
    var tagValue = "";
    var tagType = $("#"+tagId)[0].tagName;
    if(tagType == "SELECT")
    {
      tagText = $("#"+tagId+" option:selected").text();
      if($("#"+tagId).attr("multiple") == "multiple")
      {
        tagValue = $("#"+tagId).val();
      }
      else
      {
        tagValue = $("#"+tagId+" option:selected").val();
      }
      
      //동일한 조회조건이 이미존재하면 수정, 아니면 추가
      /*
      if(tagValue == "")
      {
        return;
      }
      */
      if($(parent.document).find("#OPTION_LIST ul li").is("[colName="+tagId+"]"))
      {
        $(parent.document).find("#OPTION_LIST ul li[colName="+tagId+"]").attr("colValue",tagValue).attr("colText",tagText).html("<span class='floatL session_text'>"+tagKorName+" : "+tagText+" : "+tagValue+"</span><span class='btnR_close' onClick=\"SessionConditionUtil.close(this,'"+tagId+"','"+moduleId+"');\"><img src='/resource/images/main/sche_write_close.gif' /></span>");
      }
      else
      {
        $(parent.document).find("#OPTION_LIST ul").append("<li colName="+tagId+" colValue="+tagValue+" colText="+tagText+"><span class='floatL session_text'>"+tagKorName+" : "+tagText+" : "+tagValue+"</span><span class='btnR_close' onClick=\"SessionConditionUtil.close(this,'"+tagId+"','"+moduleId+"');\"><img src='/resource/images/main/sche_write_close.gif' /></span></li>");
      }
    }
    else if(tagType == "INPUT")
    {
      if($("#"+tagId).attr("type") == "text")
      {
        tagValue = $("#"+tagId).val();
      
        if(tagValue == "")
        {
          return;
        }
      
        var liText = "";
        var n = tagId.indexOf("ORG_NM") + tagId.indexOf("EMP_ID");
        var tagId2 = "";
        if(n > 0)
        {
          if(tagId.indexOf("ORG_NM") > 0)
          {
            tagId2 = tagId.substr(0,n)+"_ORG_ID";
          }
          else if(tagId.indexOf("EMP_ID") > 0)
          {
            tagId2 = tagId.substr(0,n)+"_EMP_NM";
          }
        
          if($("#"+tagId2).length > 0)
          {
            tagText = $("#"+tagId2).val();
            if(tagText != "")
            {
              liText = tagKorName+" : "+tagValue+" : "+tagText;
            }
          }
        }
      
        if(liText == "")
        {
          liText = tagKorName+" : "+tagValue;
        }
      }
      else if($("#"+tagId).attr("type") == "checkbox")
      {
        tagValue = $("#"+tagId).is(":checked")?"Y":"N";
        liText = tagKorName+" : "+tagValue;
      }
      
      //동일한 조회조건이 이미존재하면 수정, 아니면 추가
      if($(parent.document).find("#OPTION_LIST ul li").is("[colName="+tagId+"]"))
      {
        $(parent.document).find("#OPTION_LIST ul li[colName="+tagId+"]").attr("colValue",tagValue).attr("colText",tagText).html("<span class='floatL session_text'>"+liText+"</span><span class='btnR_close' onClick=\"SessionConditionUtil.close(this,'"+tagId+"','"+moduleId+"');\"><img src='/resource/images/main/sche_write_close.gif' /></span>");
      }
      else
      {
        $(parent.document).find("#OPTION_LIST ul").append("<li colName="+tagId+" colValue="+tagValue+" colText="+tagText+"><span class='floatL session_text'>"+liText+"</span><span class='btnR_close' onClick=\"SessionConditionUtil.close(this,'"+tagId+"','"+moduleId+"');\"><img src='/resource/images/main/sche_write_close.gif' /></span></li>");
      }
    }
    
    $(parent.document).find("#OPTION_LIST").show();
    setTimeout(function(){$(parent.document).find("#OPTION_LIST").hide( "slow" );}, 1000);
    
    //window.ehrTopFrame.SessionCondition에 조건을 담아둠
    if( (window.ehrTopFrame||top).SessionCondition == null )
    {
      //console.log("SessionCondition 초기화");
      (window.ehrTopFrame||top).SessionCondition = {};
    }
    
    var obj = {S_ID:tagId, S_VALUE:tagValue, S_TEXT:tagText, S_MODULE_ID:moduleId, S_TAG_TYPE:tagType, S_KOR_NAME:tagKorName};
    
    var $objSessionCondition = $(window.ehrTopFrame.SessionCondition);
    
    if($objSessionCondition.attr(moduleId) == undefined)
    {
      $objSessionCondition.attr(moduleId,{});
    }
    
    var $objModule = $($objSessionCondition.attr(moduleId));
    $objModule.attr(tagId,obj);
    SessionConditionUtil.checkPayrollComponent(tagId, moduleId, "add");
  }
  ,close : function(obj,tagId,moduleId)
  {
    var $objSessionCondition = $(window.ehrTopFrame.SessionCondition);
    var objModule = $objSessionCondition.attr(moduleId);
    
    eval("delete objModule."+tagId+";");
    
    SessionConditionUtil.checkPayrollComponent(tagId, moduleId, "close", $(obj).parent().parent());
    $(obj).parent().remove();
  }
  /**
   * 급여일조회조건이 세션에 저장되면 년도, 급여영역도 같이 셋팅해주기 위함
   * 세션에서 급여년도 가 삭제되면 급여영역, 급여일도 삭제하기 위함
   */
  ,checkPayrollComponent : function(tagId, moduleId, eventName, $obj)
  {
    if(eventName == "add")
    {
      if(tagId.indexOf("_PAYROLL_NO") > -1)
      {
        var index = tagId.indexOf("_PAYROLL_NO");
        var prefix = tagId.substr(0,index);
        SessionConditionUtil.add(prefix+"_PAY_AREA_CD", moduleId);
      }
      else if(tagId.indexOf("_PAY_AREA_CD") > -1)
      {
        var index = tagId.indexOf("_PAY_AREA_CD");
        var prefix = tagId.substr(0,index);
        SessionConditionUtil.add(prefix+"_YY", moduleId);
      }
    }
    else if(eventName == "close")
    {
      if(tagId.indexOf("_YY") > -1)
      {
        var index = tagId.indexOf("_YY");
        var prefix = tagId.substr(0,index);
        var $closeObj = $obj.find("li[colName="+prefix+"_PAY_AREA_CD] .btnR_close");
        if($closeObj.length > 0)
        {
          SessionConditionUtil.close($closeObj, prefix+"_PAY_AREA_CD", moduleId);
        }
      }
      else if(tagId.indexOf("_PAY_AREA_CD") > -1)
      {
        var index = tagId.indexOf("_PAY_AREA_CD");
        var prefix = tagId.substr(0,index);
        var $closeObj = $obj.find("li[colName="+prefix+"_PAYROLL_NO] .btnR_close");
        if($closeObj.length > 0)
        {
          SessionConditionUtil.close($closeObj, prefix+"_PAYROLL_NO", moduleId);
        }
      }
    }
  }
}
