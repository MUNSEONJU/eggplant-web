$(document).ready(function () 
{
  console.log("ready");
  return;
  //chkAuthMenu 권한체크를 위해 추가함
  if(window.Page != null)
  {
    form = ($("#f1").length > 0)? $("#f1") : $("form").first();
    form.append('<input type="hidden" id="S_PAGE_PROFILE_ID" name="S_PAGE_PROFILE_ID" value="'+Page.PROFILE_ID+'">');
    form.append('<input type="hidden" id="S_PAGE_MODULE_ID" name="S_PAGE_MODULE_ID" value="'+Page.MODULE_ID+'">');
    form.append('<input type="hidden" id="S_PAGE_MENU_ID" name="S_PAGE_MENU_ID" value="'+Page.MENU_ID+'">');
    form.append('<input type="hidden" id="S_PAGE_PGM_URL" name="S_PAGE_PGM_URL" value="'+Page.PGM_URL+'">');
    form.append('<input type="hidden" id="S_PAGE_ENC_VAL" name="S_PAGE_ENC_VAL" value="'+Page.ENC_VAL+'">');
    form.append('<input type="hidden" id="S_PAGE_ENC_VAL2" name="S_PAGE_ENC_VAL2" value="'+Page.ENC_VAL2+'">');
    form.append('<input type="hidden" id="S_PAGE_PGM_ID" name="S_PAGE_PGM_ID" value="'+Page.PGM_ID+'">');
    form.append('<input type="hidden" id="__viewState" name="__viewState" value="">');
    if(typeof(Page) != "undefined" &&  ! Page.MENU_ID) HCG.displayElement($(".btMsg"), false);
    
    $("div.h-search-area").each(function(i, area)
    {
      var _id = $(area).attr("id");
      if( !HCG.isVal(_id) )
      {
        _id = HCG.SearchItems.getUniqueId();
        $(area).attr("id", _id);
      }
      HCG.SearchItems.init(_id, null, true); // auto initialize
    });
    
    HCG.applyElementFormat();
    HCG.applyElementSearchEmp();
    HCG.applyElementSearchOrg();
    HCG.setButtonAuth();
    HCG.setNotice();
    DevTool.init();
    if(typeof HcgMain != "undefined") HcgMain.layout.roundBody();
    
    /* if(!!$("body").attr2("layoutAuto")) {} 
    else 
    { 
      if(typeof Layout != "undefined") Layout.init();
      LayoutFlex.init();
    } 
    if(!!$("body").attr2("layoutAuto")) {} else { if(typeof Layout != "undefined") setTimeout(function(){Layout.resize();}, 500);} */
    if(typeof(LoadPage) == "function")
    {
      var lp = LoadPage();
      //LoadPage가 끝난 후에 applyElementSessionCon()를 실행하기 위함.
      $(lp).promise().done(function()
      {/* 
        // 사원찾기공통 after_func을 최초1회실행
        $(".h-component-sy181").each(function(i, e){
          var obj = $(e);
          if( HCG.isVal(obj.attr("V_MODEL_EMP_ID")) ) return; // vue는 App mounted후
          if( typeof eval("window."+obj.attr("AFTER_FUNC")) == "function" )
          {
            eval(obj.attr("AFTER_FUNC"))();
          }
        });
        // 조직공통 after_func 최초1회실행
        $(".h-component-sy182").each(function(i, e){
          var obj = $(e);
          if( HCG.isVal(obj.attr("V_MODEL_ORG_ID")) ) return; // vue는 App mounted후
          if( typeof eval("window."+obj.attr("AFTER_FUNC")) == "function" )
          {
            HCG.changeOrg20_sy182(obj.attr("PREFIX"))
          }
        });
        HCG.applyElementSessionCon();
        //페이지 로드 후 부모페이지에서 실행해야할 함수가 예약되어있으면 호출
        var parentWindow =  window.parent;
        try
        {
          if(parentWindow!=null && parentWindow.name=="ehrTopFrame" && parentWindow.name!=window.name)
          {
            //화면캡쳐
            setTimeout(function(){HCG.captureBodyImage()},1000);
            
            if( parentWindow.childLoadAfter != undefined && typeof(parentWindow.childLoadAfter) == "function")
            {
              parentWindow.childLoadAfter(Page.POP_URL, window);
            }
          }
        }
        catch(e)
        {
          parentWindow = null;
        } */
      });
    }
    else
    {
      /* setTimeout(function(){HCG.captureBodyImage()},1000); */
    }
    /* 
    if($.browser.mozilla){
      $.each(["mousedown", "mouseover", "mouseout", "mousemove", "mousedrag", "click", "dblclick"], function(i, eventName){
        window.addEventListener(eventName, function(e){
          window.event = e;
        });
      });
    } */
  }
  
  /*sub_menu*/
  /* $('.h-sub-menu > .h-select-text').on('click',function(){
    if( HCG.isAni() )
    {
      $(this).siblings('ul').stop().slideDown();
    }
    else
    {
      $(this).siblings('ul').show();
    }
  });
  $('.h-sub-menu ul').on('mouseleave',function(){
      slideBoxControll($(this),750);
  });
  $('.h-sub-menu ul li').on('click',function(){
    if( HCG.isAni() )
    {
      $(this).parent('ul').slideUp();
    }
    else
    {
      $(this).parent('ul').hide();
    }
  }); */
  
});

/* 슬라이드 박스 닫기 제어 */
function slideBoxControll(thisObject, time)
{
  $(thisObject).on('mouseover',function(e)
  {
        $(thisObject).addClass('stop');
        return false;
  });
  if ($(thisObject).hasClass('stop'))
  {
    $(thisObject).removeClass('stop');
  }
  else
  {
    var seleterControlTimer = setTimeout(function()
    {
      if( HCG.isAni() )
      {
        $(thisObject).stop().slideUp();
      }
      else
      {
        $(thisObject).hide();
      }
      clearTimeout(seleterControlTimer);
    }, time);
  }
}
/**
 * hunel 공통함수 네임스페이스
 * @class HCG
 */
var HCG =
{

  /**
   * HTML5 브라우저 여부
   * @member HCG
   * @method isHtml5
   * @param {String} htmlonly
   * @return {Boolean}
   */
  isHtml5 : function (htmlonly)
  {
    if(htmlonly == "Y")
    {
      return true;
    }
    else if(htmlonly == "N")
    {
      return false;
    }
    var browser = navigator.userAgent.toLowerCase();
    if(browser.indexOf("windows") > 0 ) //윈도우 운영체제   
    {     
      if(browser.indexOf("msie 6") > 0) // IE 6.x
      {
        return false;
      } 
      else if(browser.indexOf("msie 7") > 0) // IE 7.x
      {
          return false;
      } 
      else if(browser.indexOf("msie 8") > 0 || browser.indexOf("trident/4.0") > 0) // IE 8.x
      {
          return false;
      } 
      else if(browser.indexOf("msie 9") > 0 || browser.indexOf("trident/5.0") > 0) // IE 9.x
      {
          return false;
      }  
      else if(browser.indexOf("msie 10") > 0 || browser.indexOf("trident/6.0") > 0) // IE 10.x
      {
          return true;     // ie에서 activeX 로 볼 경우 수정 
      } 
      else if(browser.indexOf("trident/7.0") > 0) // IE 11.x
      {
          return true;   // ie에서 activeX 로 볼 경우 수정 
      } 
      else if(browser.indexOf("firefox") > 0) // Firefox
      {
          return true; 
      } 
      else if(browser.indexOf("opera") > 0) // Opera
      {
          return true;   
      } 
      else if(browser.indexOf("netscape") > 0) // Netscape
      {
          return false;  
      } 
      else if(browser.indexOf("chrome") > 0) // Chrome
      {
          return true;  
      } 
      else if(browser.indexOf("safari") > 0) // Safari
      {
          return false;  
      }else{
          return false; 
      }
    }
    else if(browser.indexOf("iphone") > 0 || browser.indexOf("ipod") > 0 || browser.indexOf("ipad") > 0
              || browser.indexOf("android") > 0 || browser.indexOf("blackberry") > 0 || browser.indexOf("windows ce") > 0
              || browser.indexOf("nokia") > 0 || browser.indexOf("webos") > 0 || browser.indexOf("opera mini") > 0
              || browser.indexOf("sonyericsson") > 0 || browser.indexOf("opera mobi") > 0 || browser.indexOf("iemobile") > 0
              || browser.indexOf("windows phone") > 0 || browser.indexOf("trident/7.0") > 0 
              ) //MOBILE
    {
      return true; 
    }
    else 
    {
      return false;
    }
    return false;
  }
  /**
   * MDI 화면캡쳐
   * @member HCG
   * @method captureBodyImage
   * @param {Object} ifrname 캡쳐할 iframe명
   */
  ,captureBodyImage : function(ifrname)
  { 
    if(HCG.isIE()) return; //IE는 화면 캡쳐시 메모리 반환이 잘 안되고 속도 저하가 심각하므로 기능을 제거
    var parentWindow =  null;
    var oBody =  null;
    var strFrameName = "";
    if(ifrname==undefined|| ifrname==null)
    {
      oBody = document.body;
      parentWindow = window.parent;
      strFrameName = Page.FRAME_NAME;
    }
    else
    {
      oBody = window.frames[ifrname].document.body;
      parentWindow = window;
      strFrameName = ifrname;
    }
    
    html2canvas(oBody).then(function(canvas)
    {
      var dataUrl = canvas.toDataURL('image/png');
      var arrHistory = parentWindow.vueMain.MDI_HISTORY;
      var idx = 0;
      for(var i=0;i<arrHistory.length;i++)
      {
        if(strFrameName == arrHistory[i]["IFRAME_NAME"])
        {
          idx = i;
          break;
        }
      }
      
      if(strFrameName!="")
      {
        parentWindow.Vue.set(parentWindow.vueMain.MDI_HISTORY[idx],"DATA_URL", dataUrl);
      }
    });
  }
  /**
   * 애니메이션을 보여줄지 여부
   * @member HCG
   * @method isAni
   * @return {Boolean}
   */
  ,isAni : function()
  {
    // 성능문제로 ie는 애니매이션 사용을 하지 않도록 함
    if( HCG.isIE() )
    {
      return false;
    }
    return HCG.getLocalStorage("S_ANI_USE_YN") == "Y";
  }
  /**
   * 유효성 체크함수
   * <br/>null / undefined / 빈문자열일 경우 false 반환
   * @member HCG
   * @method isVal
   * @param {Object} value 체크값
   * @return {Boolean} 
   */
  ,isVal : function( val )
  {
    var bRtn = false;
    if(val !=undefined && val != null && val !="" )
    {
      bRtn = true;
    }
    return bRtn;
  }
  /**
   * null 체크
   * <br/>null일 경우 true 반환
   * @member HCG
   * @method isNull
   * @param {Object} value 체크값
   * @return {Boolean} 
   */
  ,isNull : function( x )
  {
    return x == null || x == "";
  }
  /**
   * 배열안에 값이 있는지 여부를 반환
   * @member HCG
   * @method isinarr
   * @param {Object} object 체크값
   * @param {Array} array 배열
   * @return {Boolean}
   */
  ,isinarr : function(o, arr)
  {
    for ( var n = 0; n < arr.length; n++ )
    {
      if ( o == arr[n] )
      {
        return true;
      }
    }
    return false;
  }  
  /**
   * 배열 유효성 체크함수
   * <br/>value가 length가 1 이상인 배열일 경우 true 반환
   * @member HCG
   * @method isArray
   * @param {Array} value 체크값
   * @return {Boolean} 
   */
  ,isArray : function( val )
  {
    var bRtn = false;
    // 빈 배열도 false
    if(HCG.isVal(val) && val.length > 0 )
    {
      bRtn = true;
    }
    return bRtn;
  }
  /**
   * 객체 유효성 체크함수
   * <br/>객체일 경우 true 반환. 단, 빈 객체는 false 반환
   * @member HCG
   * @method isObject
   * @param {Object} object 체크값
   * @return {Boolean} 
   */
  ,isObject : function( val )
  {
    var bRtn = false;
    // 빈 객체 false
    if(HCG.isVal(val) && Object.keys(val).length > 0 )
    {
      bRtn = true;
    }
    return bRtn;
  }
  /**
   * 문자열 치환함수
   * <br/>문자열(str)의 변수 부분을 (map)에 담긴 값으로 치환하여 반환
   * @member HCG
   * @method replaceMap
   * @param {String} str 문자열
   * @param {Object} map 치환할 값들
   * @param {String} reg 변수부분을 검색할 정규표현식
   * @return {String} 치환된 문자열
   */
  ,replaceMap : function (str, map, reg) 
  {
    var result = str, exec;
    reg = HCG.nvl(reg, /\$\{([^}]+)\}/);
    while (exec = reg.exec(result))
    {
      result = result.replace("${"+exec[1]+"}", HCG.nvl(map[exec[1]]));
    }
    return result;
  }  
  /**
   * 배열을 문자열로 변환하는 함수
   * <br/>String배열(arr)의 각 요소(arr[n])를 시작첨자(s), 마지막첨자(e)를 붙인후 구분자(delim)로 연결하여 리턴.
   * @member HCG
   * @method joinStr
   * @param {Array} arr 문자열 배열
   * @param {String} delim 구분자 문자열
   * @param {String} s 시작첨자
   * @param {String} e 마지막첨자
   * @return {String} 변환된 문자열
   */
  ,joinStr : function(arr, delim, s, e)
  {
    delim = HCG.nvl(delim, ",");
    s = HCG.nvl(s);
    e = HCG.nvl(e);
    return $.protify(arr).inject([], function(array, item){
      array.push(s+item+e);
      return array;}).join(delim);
  }
  /**
   * 문자열(str)의 길이가 자리수(size) 크기만큼 되도록 왼쪽부터 문자열(padc)로 채워서 반환
   * @member HCG
   * @method lpad
   * @param {String} str 문자열
   * @param {Number} size 자리수
   * @param {String} padc 문자식
   * @return {String}
   */
  ,lpad : function(str, size, padc) 
  {
    return HCG.padLR(str, size, padc, "L");
  }
  /**
   * 문자열(str)의 길이가 자리수(size) 크기만큼 되도록 오른쪽부터 문자열(padc)로 채워서 반환
   * @member HCG
   * @method rpad
   * @param {String} str 문자열
   * @param {Number} size 자리수
   * @param {String} padc 문자식
   * @return {String}
   */
  ,rpad : function(str, size, padc) 
  {
    return HCG.padLR(str, size, padc, "R");
  } 
  /**
   * 숫자 lpad
   * <br/>문자열 또는 숫자(str)의 길이가 자리수(size) 크기만큼 되도록 왼쪽부터 숫자 0으로 채워서 반환
   * @member HCG
   * @method npad
   * @param {String|Number} str
   * @param {Number} size
   * @return {String}
   */  
  ,npad : function(str, size)
  {
    return HCG.lpad(String(str), size, "0");
  }
  /**
   * 이미지를 원래크기대로 보여주는 DIV를 생성
   * @member HCG
   * @method showOriginalImage
   * @param {String} imgSrc 이미지 경로
   * @param {Object} options 옵션
   * @param {Event} e 이벤트
   * @return
   */
  ,showOriginalImage : function (imgSrc, options, e)
  {
    e = e || window.event;

    var e2 = e;

    if ( HCG.showOriginalImage.currImageDiv ) document.body.removeChild(HCG.showOriginalImage.currImageDiv);
    if ( imgSrc )
    {
      options = options || {};
      if ( options.applyDrag == null ) options.applyDrag = true;
      var div_elem = HCG.$E('div', {
        title: 'double click to close',
        style: {position:'absolute', zIndex: 999,  display:'none'}
      });
      var img_elem = HCG.$E('img', {
        style: {border:'2px solid #cccccc'}
      });
      $(img_elem).bind("load", function(event)
      {
        var positionType = options.positionType || "eventPosition";

        if ( positionType == "eventPosition" )
        {
          $(div_elem).css("top", Math.max(e2.clientY - img_elem.height/2, 0))
            .css("left", Math.max(e2.clientX - img_elem.width/2, 0)).show();
        }
        else if ( positionType == "center" )
        {
          $(div_elem).show().css("top", Math.max((document.body.clientHeight - img_elem.height)/2, 0))
            .css("left", Math.max((document.body.clientWidth - img_elem.width)/2, 0)).show();
        }

        if ( options.backgroundColor )
        {
          div_elem.style.backgroundColor = options.backgroundColor;
        }
        var applyApperEffect = !! options["applyApperEffect"];
        if ( applyApperEffect )
        {
          try{ $(div_elem).fadeIn(700); }catch(e){}
        }
        if ( options.applyDrag ) $(div_elem).draggable();
      });
      $(div_elem).bind("dblclick", function(x)
      {
        $(div_elem).remove();
        HCG.showOriginalImage.currImageDiv = null;
      });
      $(img_elem).bind("error", function(x)
      {
        $(div_elem).remove();
        HCG.showOriginalImage.currImageDiv = null;
      });
      $(div_elem).append(img_elem);
      if ( options.withClose )
      {
        $(div_elem).append(
            HCG.$E("div", {
            innerHTML:"<span class='btn'><input type=button value=<com:label key='btn_close' def='닫기' /> class='close' ></span>",
            style: {textAlign: "right"}
          }));
      }
      $('body').append(div_elem);
      HCG.showOriginalImage.currImageDiv = div_elem;
      $(img_elem).attr("src", imgSrc);
      try { div_elem.focus(); } catch(e) {}
    }
  }

  /**
   * 문자열(str)이 문자열(p)로 시작하는지 여부를 반환
   * @member HCG
   * @method startsWith
   * @param {String} str
   * @param {String} p
   * @return {Boolean}
   */
  ,startsWith : function(str, p)  
  {
    return p == str.toString().substr(0, p.length);
  }
  /**
   * 문자열(str)이 문자열(pattern)로 끝나는지 여부를 반환
   * @member HCG
   * @method endsWith
   * @param {String} str
   * @param {String} pattern
   * @return {Boolean}
   */
  ,endsWith : function(str, pattern) 
  {
    var d = str.length - pattern.length;
    return d >= 0 && str.lastIndexOf(pattern) === d;
  }
  /**
   * 문자열(str)을 길이(size)만큼 문자열(padc)로 좌 또는 우(LR) 패딩
   * @member HCG
   * @method padLR
   * @param {String} str 문자열
   * @param {Number} size 길이
   * @param {String} padc 패딩문자열
   * @param {String} LR 좌우 구분
   * @return {String}
   */    
  ,padLR : function(str, size, padc, LR) 
  {
    if ( ! padc ) padc = " ";
    if ( size < str.length ) return str;
    var padcs = "";
    for ( var psize = size - str.length; psize > 0; psize-- )
      padcs += padc;
    return LR == "L" ? padcs + str : str + padcs;
  }
  /**
   * 문자열(str)에 quoto(')가 있다면, 에 역슬래시(\) 를 붙여서 반환
   * @member HCG
   * @method quoto
   * @param {String} str 문자열
   * @return {String}
   */
  ,quoto : function(str)
  {
    return str ? str.replace(/'/g, '\\\'').replace(/"/g, '\\\"') : str;
  }  
  /**
   * 문자열(str)을 횟수(cnt) 만큼 반복하여 붙여서 반환
   * @member HCG
   * @method repeatStr
   * @param {String} str
   * @param {Number} cnt
   * @return {String}
   */
  ,repeatStr : function(str, cnt) 
  {
    var rslt = "";
    for ( var n = 0; n < cnt; n++ )
    {
      rslt += str;
    }
    return rslt;
  }
  /**
   * 브라우저가 IE인지 여부를 리턴해주는 함수
   * @member HCG
   * @method isIE
   * @returns {Boolean}
   */
  ,isIE : function()
  {
    if( navigator.userAgent.indexOf("MSIE")>=0 || navigator.userAgent.indexOf("Trident")>=0)
      return true;
    else 
      return false;
  }
  /**
   * 브라우저가 Edge인지 여부를 리턴해주는 함수
   * @member HCG
   * @method isEdge
   * @returns {Boolean}
   */
  ,isEdge : function()
  {
      var isIE = /*@cc_on!@*/false || !!document.documentMode;
      var isEdge = !isIE && !!window.StyleMedia;
      
      return isEdge;
  }
  /**
   * 첫번째인자(s)가 null or "" or undefined 이면 두번째인자(d)로 대체
   * @member HCG
   * @method nvl
   * @param {Object} s
   * @param {Object} d
   * @return {Object}
   */
  ,nvl : function(s, d)
  {
    return (s == null || s == "" || s == undefined ) ? (d == null ? "" : d) : s;
  }
  /**
   * 값(val)이 (from)과 (to) 사이에 포함되는지 여부를 리턴
   * @member HCG
   * @method between
   * @param {String|Number} val 체크할 값
   * @param {String|Number} from 
   * @param {String|Number} to
   * @return {Boolean}
   */
  ,between : function(o, from, to)
  {
    return o >= from && o <= to;
  }
  /**
   * 오라클 decode 함수 구현
   * @member HCG
   * @method decode
   * @return {Object}
   */
  ,decode : function()
  {
    var x = arguments[0];
    for ( var n = 1, argsLen = arguments.length; n < argsLen; n+=2 )
    {
      if ( x == arguments[n] )
      {
        return arguments[n+1];
      }
      else
      {
        if ( argsLen <= n+2 ) return null;
        else if ( argsLen == n+3 ) return arguments[n+2];
      }
    }
  }
  /**
   * 문자열(str)의 바이트 수를 반환
   * @member HCG
   * @method getByteLength
   * @param {String} str 문자열
   * @return {Number} 바이트 수
   */
  ,getByteLength : function(str)
  {
    var rv = 0;
    for ( var n = 0, sz = str.length; n < sz; n++ )
    {
      //rv += str.charCodeAt(n) > 0x00ff ? 2 : 1;
      rv += str.charCodeAt(n) > 0x00ff ? 3 : 1;// utf-8 3바이트
    }
    return rv;
  }
  /**
   * 첫번째인자에 해당하는 값이 나머지인자들 중에 있는지 여부
   * <br/> ex) HCG.isin(x, a, b, c, d) => a, b, c, d 중 x가 있는지 여부
   * @member HCG
   * @method isin
   * @param {Object} o 
   * @param {Object} arguments
   * @return {Boolean}
   */
  ,isin : function (o)
  {
    for ( var n = 1; n < arguments.length; n++ )
    {
      if ( o == arguments[n] )
      {
        return true;
      }
    }
    return false;
  }
  /**
   * arguments 중에서 가장 큰 값을 return
   * @member HCG
   * @method greatest
   * @param {Array|Object} arguments
   * @return {Object}
   */
  ,greatest : function()
  {
    var max = null;
    $.map(arguments, function(v, i){
      if(i == 0) max = v;
      else if(max < v) max = v;
    });
    return max;  
  }
  /**
   * arguments 들중 가장 작은값을 반환
   * @member HCG
   * @method least
   * @param {String|Number} arguments
   * @return {Object}
   */
  ,least : function()
  {
    var min = null;
    $.map(arguments, function(v, i){
      if(i == 0) min = v;
      else if(min > v) min = v;
    });
    return min;
  }
  /**
   * 조회조건 세션저장기능 처리
   * <br/> 1. 조회조건을 세션에 저장하는 버튼을 그린다.
   * <br/> 2. 세션에 저장된 조건값을 세팅한다. 
   * <br/> 3. 세션저장기능을 사용할 조회조건은 어트리뷰트 sessionCondition=Y를 가져야 한다.
   * @member HCG
   * @method applyElementSessionCon
   */
  ,applyElementSessionCon : function ()
  {
    var $parentDocument = $(document);
    try
    {
      $parentDocument = $(parent.document);
    }
    catch(e)
    {
      $parentDocument = $(document);
    }
    if($parentDocument.find("iframe[processIframe=Y]").length <= 0)
    {
      return;
    }

    $("input, select").filter("[sessionCondition=Y]").each(function(index)
    {
      var id = $(this).attr("id");
      HCG.setSearchConditionValue($parentDocument, id);
      var moduleId = Page.MODULE_ID;
      var html = "<input class='btn_auto_cal' type='button' targetId='"+$(this).attr("id")+"' onclick=\"SessionConditionUtil.add('"+id+"','"+moduleId+"');\" ></input>";
      if($("#"+id).next().is("img") || $("#"+id).next().is("input[type=button]") || $("#"+id).attr("multiple") == "multiple")
      {
        $(html).insertAfter($(this).next());
      }
      else
      {
        $(html).insertAfter(this);
      }
    });
  }
  /**
   * 세션조회조건 layer에 있는 값을 찾아 화면의 조회조건에 넣어주는 함수
   * @member HCG
   * @method setSearchConditionValue
   * @param {Object} doc OPTION_LIST가 존재하는 document
   * @param {String} tagId 태그 id
   */
  ,setSearchConditionValue : function (doc, tagId)
  {
    var n = tagId.indexOf("ORG_NM") + tagId.indexOf("EMP_ID");
    var tagId2="";
    if(doc.find("#OPTION_LIST").find("ul li").is("[colName='"+tagId+"']"))
    {
      if($("#"+tagId).attr("multiple") == "multiple")
      {
        //console.log("setSearchConditionValue 시작");
        var count = 0;
        var interval = setInterval(function()
        {
          var objArray = doc.find("#OPTION_LIST").find("ul li[colName='"+tagId+"']").attr("colValue").split(",");
          $("#"+tagId).multipleSelect("setSelects", objArray);
          if(count==2)
          {
            clearInterval(interval);
          }
          count++;
        },300);
      }
      else
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
          HCG.inputSetValueAuto(tagId2, doc.find("#OPTION_LIST").find("ul li[colName='"+tagId+"']").attr("colText"));
        }
        HCG.inputSetValueAuto(tagId, doc.find("#OPTION_LIST").find("ul li[colName='"+tagId+"']").attr("colValue"));
      }
    }
  }
  /**
   * 최소/최대값 체크
   * @member HCG
   * @method checkMinMaxVal
   * @param {Number} num 체크할 값
   * @param {Number} min 최소값
   * @param {Number} max 최대값
   * @return {Boolean}
   */
  ,checkMinMaxVal : function (v, min, max)
  {
    var check = true;
    if ( min != null ) check = v >= min;
    if ( ! check ) return false;
    if ( max != null ) check = v <= max;
    return check;
  }

  /**
   * 문자열(str)의 최소, 최대 바이트 체크
   * @member HCG
   * @method checkMinMaxByteLen
   * @param {String} str 체크할 문자열
   * @param {Number} min 최소 byte
   * @param {Number} max 최대 byte
   * @return {Boolean}
   */
  ,checkMinMaxByteLen : function (str, min, max)
  {
    var v = HCG.getByteLength(str);
    return HCG.checkMinMaxVal(v, min, max);
  }
  /**
   * 문자열(str)에 포맷유형(data_format)에 해당하는 마스킹을 입혀서 반환
   * @member HCG
   * @method formatValue
   * @param {String} str 대상 문자열
   * @param {String} data_format 포맷 유형
   * @param {Number} point_count data_format이 dfFloat일 때 소수점 자리수
   * @return {String}
   */
  ,formatValue:function (str, data_format, point_count)
  {
    if(str==null) return "";
    if(typeof str == "number") str = str.toString();
    var rv = "";
    switch ( data_format )
    {
      case "dfDateYy":  rv = HCG.formatValueMask(str, "####"); break;
      case "dfDateMm":  rv = HCG.formatValueMask(str, "##"); break;
      case "dfDateYmd": rv = HCG.formatValueMask(str, "####.##.##"); break;
      case "dfDateYmd1": rv = HCG.formatValueMask(str, "####.##.##"); break;
      case "dfDateYm":  rv = HCG.formatValueMask(str, "####.##"); break;
      case "dfDateMd":  rv = HCG.formatValueMask(str, "##.##"); break;
      case "dfTimeHms": rv = HCG.formatValueMask(str, "##:##:##"); break;
      case "dfTimeHm":  rv = HCG.formatValueMask(str, "##:##"); break;
      case "dfTimeYmdhms":  rv = HCG.formatValueMask(str, "####.##.## ##:##:##"); break;
      case "dfIdNo":    rv = HCG.formatValueMask(str, "######-#######"); break;
      case "dfSaupNo":  rv = HCG.formatValueMask(str, "###-##-#####"); break;
      case "dfCardNo":  rv = HCG.formatValueMask(str, "####-####-####-####"); break;
      case "dfPostNo":  rv = HCG.formatValueMask(str, "###-###"); break;
      case "dfCorpNo":  rv = HCG.formatValueMask(str, "######-#######"); break;
      case "dfIssueNo": rv = HCG.formatValueMask(str, "####-######"); break;
      case "dfNo":      rv = str.replace(/\D/g, ""); break;
      case "dfInteger+":rv = HCG.formatComma(str.replace(/\D/g, "")); break;
      case "dfInteger1":rv = HCG.formatComma(str.replace(/\D/g, "")); break;
      case "dfInteger":
      {
        var sign = str.substr(0, 1) == "-" ? "-" : "";
        rv = sign + HCG.formatComma(str.replace(/\D/g, ""));
      }
      break;
      case "dfFloat+":
      {
        var pointidx = str.indexOf(".");
        var pointbelow = ( pointidx >= 0 ) ? "."+ str.substr(pointidx).replace(/\D/g, "") : "";
        var numvalue = HCG.formatComma(str.substr(0, pointidx >= 0 ? pointidx : str.length).replace(/\D/g, ""));
        if ( point_count != null)
        {
          numvalue = numvalue == "" ? "0" : numvalue;
          pointbelow = HCG.rpad(pointbelow || ".", point_count+1, "0");
        }
        rv = numvalue + pointbelow;
      }
      break;
      case "dfFloat":
      {
        var sign = str.substr(0, 1) == "-" ? "-" : "";
        var pointidx = str.indexOf(".");
        var pointbelow = ( pointidx >= 0 ) ? "."+str.substr(pointidx).replace(/\D/g, "") : "";
        var numvalue = HCG.formatComma(str.substr(0, pointidx >= 0 ? pointidx : str.length).replace(/\D/g, ""));
        if ( point_count != null)
        {
          numvalue = numvalue == "" ? "0" : numvalue;
          pointbelow = HCG.rpad(pointbelow || ".", point_count+1, "0");
        }
        rv = sign + (sign && pointbelow && ! numvalue ? "0" : numvalue) + pointbelow;
      }
      break;
      case "dfTel" :
      {
        if(str==undefined) str = "";
        str = str.replace(/\D/g, "");
        var len = str.length;
        if(len==11)
        {
          rv = str.substr(0,3)+"-"+str.substr(3,4)+"-"+str.substr(7,4);
        }
        else if(len==10)
        {
          if(str.substr(0,2)=="02")
          {
            rv = str.substr(0,2)+"-"+str.substr(2,4)+"-"+str.substr(6,4);
          }
          else
          {
            rv = str.substr(0,3)+"-"+str.substr(3,3)+"-"+str.substr(6,4);
          }
        }
        else if(len==8)
        {
          rv = str.substr(0,4)+"-"+str.substr(4,4);
        }
        else if(len==7)
        {
          rv = str.substr(0,3)+"-"+str.substr(3,4);
        }
        else
        {
          rv = str;
        }
      }
      break;
      //case "dfEmail":
      default: rv = str; break;
    }
    return rv;
  }
  /**
   * 문자열(str)에 마스킹(mask)을 입혀서 반환
   * @member HCG
   * @method formatValueMask
   * @param {String} str 대상 문자열
   * @param {String} mask 마스킹 형식
   * @return {String}
   */
  ,formatValueMask : function (str, format)
  {
    var rv = "";
    var numcount = HCG.countChr(format, '#');
    str = str.replace(/\D/g, "").substr(0, numcount);
    var chrAt;
    var validx = 0;
    for ( var n = 0; n < format.length; n++ )
    {
      chrAt = format.charAt(n);
      rv += ( chrAt == '#' ) ? str.charAt(validx++) : chrAt;
      if ( validx >= str.length ) break;
    }
    return rv;
  }
  /**
   * 숫자(numstr)에 ,(콤마)를 삽입
   * @member HCG
   * @method formatComma
   * @param {String} numstr 문자열 타입의 숫자
   * @return {String}
   */
  ,formatComma:function (numstr)
  {
    numstr = HCG.deletePrecedingZero(numstr.replace(/\D/g, ""));// 선행하는 zero 를 지운다.
    var rv = "";
    var idx = 0;
    for ( var n = numstr.length - 1; n >= 0; n-- )
    {
      if ( idx != 0 && idx % 3 == 0 ) rv = "," + rv;
      rv = numstr.charAt(n) + rv;
      idx++;
    }
    return rv;
  }
  /**
   * 포맷을 제거한 원 데이터
   * @member HCG
   * @method restoreValue
   * @param {String} str 포맷이 적용된 문자열
   * @param {String}d ata_format str에 적용된 포맷유형
   * @return {String} 포맷이 제거된 문자열
   */
  ,restoreValue : function(str, data_format)
  {
    var rv = "";
    switch ( data_format )
    {
      case "dfDateYy":
      case "dfDateMm":
      case "dfDateYmd":
      case "dfDateYmd1":
      case "dfDateYm":
      case "dfDateMd":
      case "dfTimeHms":
      case "dfTimeHm":
      case "dfTimeYmdhms":
      case "dfIdNo":
      case "dfSaupNo":
      case "dfCardNo":
      case "dfPostNo":  rv = str.replace(/\D/g, ""); break;
      case "dfCorpNo":
      //case "dfNo":
      case "dfInteger+":
      case "dfInteger1":
      case "dfInteger":
      case "dfFloat+":
      case "dfFloat":   rv = str.replace(/,/g, ""); break;
      //case "dfEmail":
      default:          rv = str; break;
    }
    return rv;
  }
  /**
   * 선행하는 0 제거
   * @member HCG
   * @method deletePrecedingZero
   * @param {String} numstr
   * @return {String}
   */
  ,deletePrecedingZero:function (numstr)
  {
    var replaced = numstr.replace(/^0+/, "");
    return numstr && ! replaced ? "0" : replaced;
  }
  /**
   * 공통 ajax함수의 리턴객체를 넘겨받아 특정 컬럼의 문자열의 escape 복원한다.
   * @member HCG
   * @method deEscapeResponse
   * @param {Object} response ajax 리턴객체
   * @param {String} cols 치환할 컬럼들 (구분자 ',')
   * @param {String }type 리턴객체 타입 (default 'json')
   * @return {Object}
   */
  ,deEscapeResponse : function(response, cols, type)
  {
    if(HCG.isVal(type))
    {
      var sType = type.toLowerCase(); 
      switch(sType)
      {
        case "json":
        {
          return HCG.deEscapeJson(response, cols);
        }
        break;
        case "xs": 
        case "xsheet": 
        case "xmlsheet": 
        {
          return HCG.deEscapeXs(response, cols);
        }
        break;
        default:
        {
          alert("[deEscapeResponse alert] invalid type");
          return response;
        }
      }
    }
    
    // default
    return HCG.deEscapeJson(response, cols);
  }
  /**
   * XmlSheet(xs)의 특정컬럼의 문자열의 escape 복원한다.
   * @member HCG
   * @method deEscapeXs
   * @param {Object} xs XmlSheet
   * @param {String} cols 치환할 컬럼들 (구분자 ',')
   * @returns {Object}
   */
  ,deEscapeXs : function(xs, cols)
  {
    var args = arguments;
    if (args.length == 0) return xs;
    if (!xs || !cols || typeof xs != "object" || typeof cols != "string") return xs;
  
    var retXs  = xs
       ,arrCol = []
       ,strVal = "";
    arrCol = cols.split(",");
    try
    {
      retXs.eachRow(function(r, x)
      {
        for (var i in arrCol)
        {
          strVal = x.GetCellValue(r, arrCol[i]);
          strVal = HCG.deEscapeStr(HCG.deEscapeStr(strVal));
          x.SetCellValue(r, arrCol[i], strVal);
        }
       });
       return retXs;
    }
    catch(e)
    {
      return xs;
    }
  }
  /**
   * deEscapeXs의 JSON 버전
   * json형태의 response를 넘겨받아 특정컬럼의 문자열의 escape 복원한다.
   * @member HCG
   * @method deEscapeJson
   * @param {Object} response 공통ajax 함수의 response json
   * @param {String} cols 치환할 컬럼들 (구분자 ',')
   * @returns {Object} response
   */
  ,deEscapeJson : function(response, cols)
  {
    var args = arguments;
    if (args.length == 0) return response;
    if (!response || !cols || typeof response != "object" || typeof cols != "string") return response;
  
    try
    {
      var arrCol = cols.split(",") || [];
  
      var target;
      if( response.Data != undefined )
      {
        // setResultSet으로 보낸 결과값은 기본적으로 response.Data에 담긴다.
        target = response.Data;
      }
      else
      {
        target = response;
      }
      
      if( !HCG.isArray(target) )
      {
        target = [target];
      }
      
      $.each(target, function(rIdx, data){
        if(typeof data != "object") return true; // continue;
        
        $.each(arrCol, function(cIdx, col){
          if( HCG.isVal(data[col]) )
          {
            data[col] = HCG.deEscapeStr(HCG.deEscapeStr(data[col]));
          }
        });
      });
      
     return response;
    }
    catch(e)
    {
      return response;
    }
  }
  /**
   * 특정문자열의 escape 복원
   * @member HCG
   * @method deEscapeStr
   * @param {String} 대상 문자열
   * @returns {String}
   */
  ,deEscapeStr : function(str)
  {
    var rStr = "";
    if(str==null || str==undefined) rStr = "";
    else
      rStr = str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#35;/g, '#');
    return rStr;
  }
  /**
   * 문자열(str)에서 특정문자열(chr) 포함 갯수를 반환
   * @member HCG
   * @method countChr
   * @param {String} str 대상 문자열
   * @param {String} chr 키워드
   * @return {Number}
   */
  ,countChr : function (str, chr)
  {
    var count = 0;
    var length = str.length;
    for ( var n = 0; n < length; n++ )
    {
      if ( chr == str.charAt(n) ) count++;
    }
    return count;
  }
  /**
   * 파일 업로드/다운로드 공통 유틸
   * @member HCG
   */
  ,FileUpDn :
  {
    /**
     * 업로드파일 팝업 열기
     * <br/> 브라우저의 HTML5 지원여부에 따라 제공되는 팝업이 다름
     * @member HCG.FileUpDn
     * @method popUploadFile
     * @param {Object} options 옵션객체
     * @param {Function} rvF 사용 X 
     * @param {Function} closeFunction 팝업을 닫을때 호출되는 콜백함수
     */
    popUploadFile: function(options, rvF, closeF)
    {
      url = "sys/sy_com/sy_com_140_p01.jsp";
      if(HCG.isHtml5())
      {
        url = "sys/sy_com/sy_com_140_p02.jsp";  //멀티파일업로드
      }
      
      options = options || {};
      HCG.ModalUtil.open({title:HCG.ajaxLabel("upload"), url: __base_dir+url, param: 
      {S_FILE_NO: options.S_FILE_NO||"",
        S_READONLY_YN: options.S_READONLY_YN||"Y",
        S_ONE_FILE_MGSIZE: options.S_ONE_FILE_MGSIZE||"10",
        S_FILE_LIMIT_CNT: options.S_FILE_LIMIT_CNT||"5",
        S_SAVE_DIR_KEY: options.S_SAVE_DIR_KEY||'',
        S_FILE_NO_FORCE_SAVE_YN: options.S_FILE_NO_FORCE_SAVE_YN||'N',
        X_HELP_PGM_ID:"sy_com_140_p01"
      }}, rvF, closeF);
    },
    // 사용하지 않는 함수
    setSpanFileCnt: function(options)
    {
      options = options || {};
      //$("#"+options.layerId).html('');
      if ( options.S_FILE_NO )
      {
        HCG.ajaxRequestXSProg(commonOtpVal.Sys_file_common, commonOtpVal.searchFileCnt, {S_FILE_NO: options.S_FILE_NO}, function(xs)
        {
          $("#"+options.layerId).html('<span style="font-weight:bold; color:blue; cursor:pointer; " >'+xs.GetEtcData('FILE_CNT')+'</span>');
        });
      }
    },
    setLayerFileCnt: function(options)
    {
      options = options || {};
      $("#"+options.layerId).html('');
      if ( options.S_FILE_NO )
      {
        HCG.ajaxRequestXSProg(commonOtpVal.Sys_file_common, commonOtpVal.searchFileCnt, {S_FILE_NO: options.S_FILE_NO}, function(xs)
        {
          $("#"+options.layerId).html('<span style="font-weight:bold; color:blue; cursor:pointer; " >FILE('+xs.GetEtcData('FILE_CNT')+')</span>');
        });
      }
    },
    // 파일다운로드 관련
    fileDownIframe: null,
    fileDownIframeName: "_fileDownloadFrame"+new Date().getTime(),
    fileNo: '',
    iframeId : '',
    /**
     * 다운로드용 컨텍스트 열기
     * @member HCG.FileUpDn
     * @method showDownFrame
     * @param {Object} options 옵션객체
     * @param {Object} e 이벤트객체 (default onclick) 
     */
    showDownFrame: function(options, e)
    {
      var w = 250;
      var h = 150;
      options = options||{};
      var iframe = this.fileDownIframe;
      var iframeName = this.fileDownIframeName;
      if ( ! iframe )
      {
        iframe = HCG.$E("iframe", {
          id: iframeName,
          name: iframeName,
          frameBorder: 0,
          //src: __base_dir+"common/jsp/fileDownList.jsp?X_PGM_ID="+Page.PGM_ID,
          style: {
            position: "absolute",
            display: "none",
            width: w + "px",
            height: h + "px",
            zIndex: "999999"
          }});

        document.body.appendChild(iframe);
        
        //$("#"+iframe.id).mouseout(function(){FileUpDn.hideDownFrame(); window.open("about:blank", iframe.id);});
        //$("#"+iframe.id).mouseout(function(){FileUpDn.hideDownFrame();});
      }
      else
      {
        $(iframe).attr('src', '');
      }

      var param = {
          S_PGM_OPEN_TIME: S_PGM_OPEN_TIME,
          S_ENC_OTP_KEY: S_ENC_OTP_KEY,
          S_CSRF_SALT: S_CSRF_SALT,
          S_PDF_SHOW : (options.S_PDF_SHOW==undefined?"N":options.S_PDF_SHOW),
          X_PGM_ID: Page.PGM_ID
        };
      HCG.popOpen({url: __base_dir+"common/jsp/fileDownList.jsp", name: iframeName, param: param});
    
      e = e || window.event;
      //var evEle = (typeof e.target != undefined) ? e.target : e.srcElement;

      if ( options.posLeft != null && options.posTop != null )
      {
        //iframe.style.left = (options.posLeft < w ? options.posLeft : (options.posLeft - w));
        //iframe.style.top = options.posTop;
        $(iframe).css("left", options.posLeft - w );
        $(iframe).css("top", options.posTop - h + 10);
      }
      /*
      else if ( evEle )
      {
        
        iframe.style.left = e.clientX - 30;
        iframe.style.top = e.clientY - 15;
        
         $("#"+iframe.id).offset({ top : e.clientY-30, left : e.clientX-30 });
      }
      */
      else
      {
        //$(iframe).css("top",e.clientY).css("left",e.clientX);
        var _layer = $(iframe);
        var body_w = $("body")[0].offsetWidth;
        var body_h = $("body")[0].offsetHeight;
        var layer_w = Number(_layer.css("width").replace("px","")) + 10; //ie box model 때문에 여유분으로 10 추가
        var layer_h = Number(_layer.css("height").replace("px","")) + 10;
        var event_l = e.clientX;
        var event_t = e.clientY;
        
        var gap_l = body_w - event_l - layer_w;
        var gap_t = body_h - event_t - layer_h;
        
        if(gap_l < 0) event_l = event_l - layer_w + 10;
        if(gap_t < 0) event_t = event_t - layer_h + 10;
        
        _layer.css("left", event_l);
        _layer.css("top", event_t);
      }

      this.fileNo = options.fileNo||'';
      this.iframeId = iframe.id;
      this.fileDownIframe = iframe;
      this.onShowDownFrame();
    },
    /**
     * 다운로드용 컨텍스트 닫기
     * @member HCG.FileUpDn
     * @method hideDownFrame
     */
    hideDownFrame: function()
    {
      $("#"+this.iframeId).remove();
      this.fileDownIframe = null; //filedownlist가 깜빡이는 현상때문
    },
    onShowDownFrame: function()
    {
      $("#"+this.iframeId).show();
    },
    buttonUploadFile: function(options)
    {
      options = options || {};
      var file_no_name = options.file_no_name || 'S_FILE_NO';
      var file_down_layer_id = options.file_down_layer_id || 'fileDownSpan';
      HCG.inputSetValueAuto(
        file_no_name,
        HCG.FileUpDn.popUploadFile({S_FILE_NO:$("#"+file_no_name).val(),S_READONLY_YN:'N'}));
      HCG.FileUpDn.setLayerFileCnt({S_FILE_NO:$("#"+file_no_name).val(),layerId:file_down_layer_id});
    },
    /**
     * 파일업로드 하면서 form submit
     * @member HCG.FileUpDn
     * @method uploadFile
     * @param {Object} options
     */
    uploadFile : function (options)
    {
      //Progress.start();
      if ( window.Page == undefined )
      {
        Page =
        {
          PROFILE_ID: "",
          PGM_ID: ""
        }
      }

      var f = HCG.nvl(options.form, document.forms[0]);
      // 임시저장
      var f_encoding = f.encoding;
      var f_method = f.method;
      var f_target = f.target;
      var f_action = f.action;
      // submit
      f.encoding = "multipart/form-data";
      f.method = "post";
      f.target = HCG.nvl(options.target, window.frames[0].name);

      if ( typeof options.OnResult == "function")
      {
        var OnResultFunctionName = "OnResult_"+new Date().getTime();
        window[OnResultFunctionName] = options.OnResult;
        options.OnResult = OnResultFunctionName;
      }
      
      var param = "";
      if(options.queryString == undefined)
      {
        param = $(options.queryString).toQueryParams();
      }
      else
      {
        param = HCG.toQueryParams(options.queryString);
      }
      param = $.extend(param, {__viewState:HCG.toJsonString(param)});
      options.queryString = $.param(param);
      
      f.action =
        __baseAction+"?S_FORWARD=iframeResultXML&S_DSCLASS="+encodeURIComponent(options.S_DSCLASS)+"&S_DSMETHOD="+encodeURIComponent(options.S_DSMETHOD)+
        "&S_ID="+HCG.nvl(options.ID, "")+"&S_FUNCTION="+HCG.nvl(options.OnResult, "OnResult")+
        "&S_PGM_OPEN_TIME="+S_PGM_OPEN_TIME+"&S_ENC_OTP_KEY="+encodeURIComponent(S_ENC_OTP_KEY)+"&S_CSRF_SALT="+encodeURIComponent(S_CSRF_SALT)+
        "&S_PAGE_PGM_ID="+Page.PGM_ID+"&S_PAGE_PROFILE_ID="+Page.PROFILE_ID+
        (options.getparam ? "&"+$.param(options.getparam) : "")+
        (options.queryString ? "&"+options.queryString : "");
      
      // submit 시 disabled 된 element 는 안나가므로...다음과 같은 처리가 필요
      //var disabledElements = $A(f1.elements).select(function(x) { return x.disabled; });// disabled elements 모으고
      var disabledElements = $("[disabled]").each(function(i,e){
         return this.disabled;
       });// disabled elements 모으고

      f.submit();
      disabledElements.each(function(i, e) { e.disabled = true; });// disable
      // 원복
      f.encoding = f_encoding;
      f.method = f_method;
      f.target = f_target;
      f.action = f_action;
    },
    /**
     * 파일 다운로드
     * @member HCG.FileUpDn
     * @method downloadFile
     * @param {String} target 사용 X
     * @param {String} S_FILE_PATH 파일 경로
     * @param {String} S_ORG_FILE_NM 파일명
     */
    downloadFile : function (target, S_FILE_PATH, S_ORG_FILE_NM, S_FILE_NO, S_C_CD, S_SEQ_NO, Page, S_ENC_YN)
    {
      //파일다운로드로그
      var param = {
         S_C_CD : S_C_CD
        ,S_FILE_NO: S_FILE_NO
        ,S_SEQ_NO: S_SEQ_NO
        ,S_PGM_URL : Page.PGM_URL
      };
      
      parameters = 
      {
        S_FILE_PATH: S_FILE_PATH
        , S_ORG_FILE_NM: S_ORG_FILE_NM
        , S_FILE_NO: S_FILE_NO
        , S_C_CD: S_C_CD
        , S_SEQ_NO: S_SEQ_NO  
      }
      parameters = $.extend(parameters, {__viewState:HCG.toJsonString(parameters)});
      
      if(S_ENC_YN !=undefined && S_ENC_YN == "Y")
      {
        //다운로드 사유를 묻는 부분 추가 ( 필요없는 경우 삭제하시오 )
        HCG.ModalUtil.open({title:"Excel Download 사유", url: "/sys/sy_com/sy_com_911_p01.jsp", param: {X_HELP_PGM_ID:'sy_com_911_p01'}}, function(rv)
        {
          if(rv != null)
          {
            var strRsn = rv;
            param = $.extend(param, {S_RSN_TXT :strRsn });
            HCG.ajaxRequestXSProg(commonOtpVal.Sys_file_common, commonOtpVal.saveFileLog, param, function(xs){});
            HCG.popOpen({url: __base_dir+"common/jsp/download.jsp", name: "downloadWindow", param: parameters});
          }
        });
      }
      else
      {
        HCG.ajaxRequestXSProg(commonOtpVal.Sys_file_common, commonOtpVal.saveFileLog, param, function(xs){});
        HCG.popOpen({url: __base_dir+"common/jsp/download.jsp", name: "downloadWindow", param: parameters});
      }
    }
  }
  // HCG.FileUpDn end
  /**
   * 다국어프로퍼티(js) 값 가져오기
   * <br/>다국어프로퍼티는 [시스템 - 다국어프로퍼티관리] 메뉴에서 관리됨
   * @member HCG
   * @method getMultiLang
   * @param {String} type 프로퍼티 타입(label, message)
   * @param {String} key 프로퍼티 키값
   * @param {String} defaultStr key가 유효하지 않을 경우 출력할 기본 문자열
   * @param {Array} arrReplace 프로퍼티값에 치환식 {n} 이 있다면 순차적으로 치환함.
   * @return {String}
   */
  ,getMultiLang : function(type, key, defaultStr, arrParam, lang)
  {
    var rtnStr = defaultStr;
    if( HCG.isVal(key) )
    {
      window.ehrTopFrame = HCG.findFrameByName('ehrTopFrame')||top;
      var ml;
      if(type=="message")
      {
        ml = ehrTopFrame.MultiMessage;
      }
      else
      {
        ml = ehrTopFrame.MultiLabel;
      }
      if(lang==undefined)
      {
        lang = ehrTopFrame.LANG_TYPE;
      }
      if(ml!=null && ml!=undefined)
      {
        try
        {
          if( HCG.isVal(ml[key]) )
          {
            rtnStr = ml[key];
          }
        }
        catch(e)
        {
          rtnStr = defaultStr;
        }
      }
    }
    
    if(arrParam!=undefined && arrParam!=null && arrParam.length>0)
    {
      for( var i=0; i<arrParam.length; i++ ) 
      {
        rtnStr = rtnStr.replace( new RegExp( "\\{" + i + "\\}", "gi" ), arrParam[ i ] );
      }
    }
    return rtnStr;
  }
  /**
   * 문자열(str)의 포맷이 유효한지 체크
   * @member HCG
   * @method checkFormatValue
   * @param {String} str 대상 문자열
   * @param {String} data_format 포맷유형
   * @param {String} bShowMsg 포맷이 유효하지 않을 때, alert 여부
   * @return {String} 
   */
  ,checkFormatValue : function(str, data_format, bShowMsg)
  {
    var numstr;
    var check = false;
    switch ( data_format )
    {
      case "dfDateYy":  check = /^\d{4}$/.test(str); break;
      case "dfDateMm":
      {
        check = /^\d{2}$/.test(str);
        if ( ! check ) break;
        var mm = Number(str.substr(0, 2));//-1 안함
        check = HCG.between(mm, 1, 12);
      }
      break;
      case "dfDateYmd":
      {
        check = /^\d{4}\.\d{2}\.\d{2}$/.test(str);
        if ( ! check ) break;
        numstr = str.replace(/\D/g, "");
        var yy = Number(numstr.substr(0, 4));
        var mm = Number(numstr.substr(4, 2))-1;
        var dd = Number(numstr.substr(6, 2));
        var dt = new Date(yy, mm, dd);
        check = yy == dt.getFullYear() && mm == dt.getMonth() && dd == dt.getDate();
      }
      break;
      case "dfDateYmd1":
      {
        check = /^\d{4}\.\d{2}\.\d{2}$/.test(str);
        if ( ! check ) break;
        numstr = str.replace(/\D/g, "");
        var yy = Number(numstr.substr(0, 4));
        var mm = Number(numstr.substr(4, 2))-1;
        var dd = Number(numstr.substr(6, 2));
        var dt = new Date(yy, mm, dd);
        check = yy == dt.getFullYear() && mm == dt.getMonth() && dd == dt.getDate();
      }
      break;
      case "dfDateYm":
      {
        check = /^\d{4}\.\d{2}$/.test(str);
        if ( ! check ) break;
        numstr = str.replace(/\D/g, "");
        var mm = Number(numstr.substr(4, 2));//-1 안함
        check = HCG.between(mm, 1, 12);
      }
      break;
      case "dfDateMd":
      {
        check = /^\d{2}\.\d{2}$/.test(str);
        if ( ! check ) break;
        numstr = str.replace(/\D/g, "");
        var mm = Number(numstr.substr(0, 2));//-1 안함
        var dd = Number(numstr.substr(2, 2));
        check = HCG.between(mm, 1, 12);
        if ( ! check ) break;
        return mm == 1 ? HCG.between(dd, 1, 31) :
               mm == 2 ? HCG.between(dd, 1, 29) ://<--
               mm == 3 ? HCG.between(dd, 1, 31) :
               mm == 4 ? HCG.between(dd, 1, 30) :
               mm == 5 ? HCG.between(dd, 1, 31) :
               mm == 6 ? HCG.between(dd, 1, 30) :
               mm == 7 ? HCG.between(dd, 1, 31) :
               mm == 8 ? HCG.between(dd, 1, 31) :
               mm == 9 ? HCG.between(dd, 1, 30) :
               mm ==10 ? HCG.between(dd, 1, 31) :
               mm ==11 ? HCG.between(dd, 1, 30) :
               mm ==12 ? HCG.between(dd, 1, 31) : false;
      }
      //break;
      case "dfTimeHms":
      {
        check = /^\d{2}:\d{2}:\d{2}$/.test(str);
        if ( ! check ) break;
        numstr = str.replace(/\D/g, "");
        var hh = Number(numstr.substr(0, 2));
        var mi = Number(numstr.substr(2, 2));
        var ss = Number(numstr.substr(4, 2));
        check = HCG.between(hh, 0, 23) && HCG.between(mi, 0, 59) && HCG.between(ss, 0, 59);
      }
      break;
      case "dfTimeHm":
      {
        check = /^\d{2}:\d{2}$/.test(str);
        if ( ! check ) break;
        numstr = str.replace(/\D/g, "");
        var hh = Number(numstr.substr(0, 2));
        var mi = Number(numstr.substr(2, 2));
        check = HCG.between(hh, 0, 23) && HCG.between(mi, 0, 59);
      }
      break;
      case "dfTimeYmdhms":
      {
        check = /^\d{4}\.\d{2}\.\d{2}[ ]\d{2}:\d{2}:\d{2}$/.test(str);
        if ( ! check ) break;
        numstr = str.replace(/\D/g, "");
        var yy = Number(numstr.substr(0, 4));
        var mm = Number(numstr.substr(4, 2))-1;
        var dd = Number(numstr.substr(6, 2));
        var dt = new Date(yy, mm, dd);
        check = yy == dt.getFullYear() && mm == dt.getMonth() && dd == dt.getDate();
        if ( ! check ) break;
        var hh = Number(numstr.substr(8, 2));
        var mi = Number(numstr.substr(10, 2));
        var ss = Number(numstr.substr(12, 2));
        check = HCG.between(hh, 0, 23) && HCG.between(mi, 0, 59) && HCG.between(ss, 0, 59);
      }
      break;
      case "dfIdNo":
      {
        check = /^\d{6}-\d{7}$/.test(str);
        if ( ! check ) break;
        check = HCG.checkJuminNo(HCG.restoreValue(str, data_format));
        if ( ! check )
        {
          //if ( confirm("주민번호 형식이 맞지 않습니다. 계속 진행하시겠습니까?") ) check = true;
          if ( confirm(HCG.ajaxMsg("MSG_CONFIRM_INVALID_PER_NO")) ) check = true;
          else break;
        }
      }
      break;
      case "dfSaupNo":
      {
        check = /^\d{3}-\d{2}-\d{5}$/.test(str);
        if ( ! check ) break;
        check = HCG.checkSaupNo(HCG.restoreValue(str, data_format));
        if ( ! check )
        {
          //if ( confirm("사업자번호 형식이 맞지 않습니다. 계속 진행하시겠습니까?") ) check = true;
          if ( confirm(HCG.ajaxMsg("MSG_CONFIRM_INVALID_SAUP")) ) check = true;
          else break;
        }
      }
      break;
      case "dfCorpNo":  check = /^\d{6}-\d{7}$/.test(str); break;
      case "dfCardNo":  check = /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(str); break;
      case "dfPostNo":  check = (/^\d{3}-\d{3}$/.test(str))||(/^\d{3}-\d{2}$/.test(str)); break;
      case "dfNo":      check = /^\d+$/.test(str); break;
      case "dfInteger+":check = /^0|([1-9]\d*)$/.test(HCG.restoreValue(str, data_format)); break;
      case "dfInteger1":check = /^0|([1-9]\d*)$/.test(HCG.restoreValue(str, data_format)); break;
      case "dfInteger": check = /^-?(0|([1-9]\d*))$/.test(HCG.restoreValue(str, data_format)); break;
      case "dfFloat+":  check = /^(0|([1-9]\d*))(\.\d*)?$/.test(HCG.restoreValue(str, data_format)); break;
      case "dfFloat":   check = /^-?(0|([1-9]\d*))(\.\d*)?$/.test(HCG.restoreValue(str, data_format)); break;
      case "dfEmail":   check = /^[^@]+@[^@]+$/.test(str);
      default:          check = true; break;
    }
    if ( ! check && bShowMsg )
    {
      alert(HCG.getFormatErrMsg(data_format));
    }
    return check;
  }
  /**
   * 포맷유형 별 에러메시지
   * @member HCG
   * @method getFormatErrMsg
   * @param {String} data_format 포맷유형
   * @return {String} 에러메시지
   */
  ,getFormatErrMsg : function(data_format)
  {
    var rv = "";
    switch ( data_format )
    {
      case "dfDateYy":  rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_YY"); break;
      case "dfDateMm":  rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_MM"); break;
      case "dfDateYmd": rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_YMD"); break;
      case "dfDateYmd1": rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_YMD"); break;
      case "dfDateYm":  rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_YM"); break;
      case "dfDateMd":  rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_MD"); break;
      case "dfTimeHms": rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_HMS"); break;
      case "dfTimeHm":  rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_HM"); break;
      case "dfTimeYmdhms": rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_YMDHMS"); break;
      case "dfIdNo":    rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_IDNO"); break;
      case "dfSaupNo":  rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_SAUP"); break;
      case "dfCardNo":  rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_CARD"); break;
      case "dfPostNo":  rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_POST"); break;
      case "dfCorpNo":  rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_CORP"); break;
      case "dfNo":      rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_NO"); break;
      case "dfInteger+":rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_INT"); break;
      case "dfInteger1":rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_INT"); break;
      case "dfInteger": rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_INT_1"); break;
      case "dfFloat+":  rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_FLO"); break;
      case "dfFloat":   rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_FLO_1"); break;
      case "dfEmail":   rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_EMAIL"); break;
      default:          rv = HCG.ajaxMsg("MSG_ALERT_INVALID_FORMAT_DEFALUT"); break;
    }
    return rv;
  }
  /**
   * 사업자등록번호 유효성 체크
   * @member HCG
   * @method checkSaupNo
   * @param {String} numstr 사업자등록번호. 숫자 문자열
   * @return {Boolean}
   */
  ,checkSaupNo : function(numstr)
  {
    if ( ! /^\d{10}$/.test(numstr) ) return false;
    var sCode = "137137135";
    var sum = 0;
    for ( var n = 0; n < 9; n++)
    {
      sum += Number(numstr.charAt(n)) * Number(sCode.charAt(n));
    }
    sum += parseInt(Number(numstr.charAt(8)) * 5 / 10,10);
    var sidliy = sum % 10;
    var sidchk = ( sidliy != 0 ) ? 10 - sidliy : 0;
    return sidchk == Number(numstr.charAt(9));
  }
  /**
   * 주민번호 유효성 체크
   * @member HCG
   * @method checkJuminNo
   * @param {String} numstr 주민등록번호. 숫자 문자열
   * @return {Boolean}
   */
  ,checkJuminNo : function(numstr)
  {
    if ( ! /^\d{13}$/.test(numstr) ) return false;  
    return HCG.checkKoreanJuminNo(numstr) || HCG.checkForeignJuminNo(numstr);
  }// checkJuminNo end
  /**
   * 내국인 주민번호 유효성 체크
   * @member HCG
   * @method checkKoreanJuminNo
   * @param {String} numstr 주민등록번호. 숫자 문자열
   * @return {Boolean}
   */
  ,checkKoreanJuminNo : function(numstr)
  {
    var cBit = 0;
    var sCode="234567892345";
    for ( var n = 0; n < 12; n++)
    {
      cBit += Number(numstr.charAt(n)) * Number(sCode.charAt(n));
    }
    cBit = 11 - ( cBit % 11);
    cBit = cBit % 10;
    return Number(numstr.charAt(12)) == cBit;
  } // checkKoreanJuminNo end
  /**
   * 외국인 주민번호 유효성 체크
   * @member HCG
   * @method checkKoreanJuminNo
   * @param {String} numstr 주민등록번호. 숫자 문자열
   * @return {Boolean}
   */
  ,checkForeignJuminNo : function(numstr)
  {
    var sum=0;
    var odd=0;
    buf = new Array(13);
    for(i=0; i<13; i++) { buf[i] = Number(numstr.charAt(i)); }
    odd = buf[7]*10 + buf[8];
    if(odd%2 != 0) { return false; }
    if( (buf[11]!=6) && (buf[11]!=7) && (buf[11]!=8) && (buf[11]!=9) ) {
      return false;
    }
    var multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
    for(i=0, sum=0; i<12; i++) { sum += (buf[i] *= multipliers[i]); }
    sum = 11 - (sum%11);
    if(sum >= 10) { sum -= 10; }
    sum += 2;
    if(sum >= 10) { sum -= 10; }
    if(sum != buf[12]) { return false; }
    return true;
  }
  /**
   * 이름으로 프레임 찾기
   * @member HCG
   * @method findFrameByName
   * @param {String} frameName 찾을 프레임명
   * @param {String} direction 시작 프레임에서 찾는 방향 UP: 상위, default: 하위
   * @param {Frame} firstFrame 찾기 시작 프레임
   * @return {Frame}
   */
  ,findFrameByName : function(frameName, direction, firstFrame)
  {
    firstFrame = firstFrame || window;
    direction = direction || 'UP';
    var frame = firstFrame;
    var bfFrame = frame; 
    var i =0;
    
    //document.domain="somedomain"; //크로스 도메인 문제가 있는 경우 domain세팅을 해야함
    
    if ( direction == 'UP' )
    {
      while (true)
      {
        if(i>10) break;
        if ( frame.name == frameName ) 
        {
         break;
        }
        if ( frame == top )
        {
          break;
        }
        if(frame.parent)
        {
          frame = frame.parent;
        }
        else
        {
          break;
        }
        try
        {
          if(frame.$==undefined)
          {
            frame = bfFrame;
            break;
          }
        }
        catch(e)
        {
          frame = bfFrame;
        }
        if(frame == bfFrame) break;
        i++;
      }
      return frame;
    }
    else
    {
      var frame = firstFrame;
      if ( frame.name == frameName )
        return frame;
      for ( var n = 0, nlen = frame.frames.length; n < nlen; n++ )
      {
        var frame = HCG.findFrameByName(frameName, direction, frame.frames[n]);
        if ( frame )
          return frame;
      }
    }
    return null;
  }
  /**
   * form element 를 map 데이터로 구성
   * @member HCG
   * @method form_getData
   * @param {Element} form
   * @return {Array} formdata 배열
   */
  ,form_getData : function(form)
  {

    form = HCG.returnjQueryObj(form);
    var element;
    var elearray;
    var formdata = {};

    form.find("input, select, a, button, textarea").each(function (i,v){
    
      element = $(v);
      elearray = formdata[element.attr("name")] == null ? formdata[element.attr2("name")] = new Array : formdata[element.attr2("name")];

      if(element.attr2("name"))
      {
        
        switch ( element.prop("tagName") )
        {
          case "SELECT":
          {
            if ( element.attr2("multiple") )
            {
              element.children().each(function (i,v){
                  if($(v).attr("selected") )
                  {
                    elearray[elearray.length] = $(v).val();
                  }
                }
              );
            }
            else
            {
              elearray[elearray.length] = element.val();
            }
          }
          break;
          case "INPUT":
          {
            switch ( element.attr("type") )
            {
              case "checkbox":
              case "radio":
              {
                if ( element.prop("checked") )
                {
                  elearray[elearray.length] = element.val();
                }
              }
              break;
              default:
              {
                elearray[elearray.length] = element.val();
              }
              break;
            }
            break;
          }
          break;
          default:
          {
            elearray[elearray.length] = element.val();
          }
          break;            
        }
      }
    });

    return formdata;
  }    
  /**
   * 년월(ym) 에 증가수(inc) 만큼 월을 증가 또는 감소시켜서 반환
   * @member HCG
   * @method addYm
   * @param {String} ym 년월
   * @param {Number} inc 증가수
   * @return {String}
   */  
  ,addYm : function (ym, inc) 
  {
    return (HCG.addYmd(ym.substr(0, 6)+"01", "M", inc)).substr(0, 6);
  }
  /**
   * 년월일(ymd) 에 년, 월, 주, 일(gbn) 단위로 증가수(inc) 만큼 증가 또는 감소시켜서 반환
   * @member HCG
   * @method addYmd
   * @param {String} ymd 년월일
   * @param {String} gbn Y:년, M:월, W:주, D:일, LOM:
   * @param {Number} inc 증가수
   * @return {String}
   */  
  ,addYmd : function ( ymd, gbn, inc) 
  {
    var dt = new Date(Number(ymd.substr(0, 4)), Number(ymd.substr(4, 2))-1, Number(ymd.substr(6, 2)));
    switch ( gbn )
    {
      case "Y": dt.setFullYear(dt.getFullYear() + inc); break;
      case "M": dt.setMonth(dt.getMonth() + inc); break;
      case "W": dt.setDate(dt.getDate() + inc*7); break;
      case "D": dt.setDate(dt.getDate() + inc); break;
      // last day of month
      case "LOM":
      {
        dt.setDate(1);
        dt.setMonth(dt.getMonth() + 1);
        dt.setDate(dt.getDate() - 1);
      }
      break;
    }
    var result_ymd = HCG.npad(String(dt.getFullYear()), 4) + HCG.npad(String(dt.getMonth() + 1), 2) + HCG.npad(dt.getDate(), 2);
    if ( $.protify(['Y', 'M']).include(gbn) )
    {
      var dd = ymd.substr(6, 2);
      var result_dd = result_ymd.substr(6, 2);
      if ( result_dd != dd )
      {
        result_ymd = HCG.addYmd(HCG.addYmd(result_ymd, 'M', -1), 'LOM');
      }
    }
    return result_ymd;      
  }
  /**
   * date 를 format_string 포맷으로 변환
   * @member HCG
   * @method date2format
   * @param {Date|String} date
   * @param {String} format_string 날짜 포맷 (default : yyyymmdd). 년(yyyy) 월(mm) 일(dd) 시(hh) 분(mi) 초(ss) 밀리세컨드(ms)
   * @return {String}
   */
  ,date2format : function (date, format_string)
  {
    date = (typeof date == "string") ? new Date(Number(date.substr(0, 4)), Number(date.substr(4, 2))-1, Number(date.substr(6, 2))) : date || new Date();
    format_string = format_string || 'yyyymmdd';

    var yyyy = date.getFullYear();
    var mm = date.getMonth() + 1; /* getMonth 는 0~11 을 반환하기 때문에 실제 월보다 1이 작아 보상한다 */

    var dd = date.getDate();
    var hh = date.getHours();
    var mi = date.getMinutes();
    var ss = date.getSeconds();
    var ms = date.getMilliseconds();
    var val = format_string;
    var val = val.replace(/yyyy/g, HCG.npad(yyyy, 4));
    var val = val.replace(/mm/g, HCG.npad(mm, 2));
    var val = val.replace(/dd/g, HCG.npad(dd, 2));
    var val = val.replace(/hh/g, HCG.npad(hh, 2));
    var val = val.replace(/mi/g, HCG.npad(mi, 2));
    var val = val.replace(/ss/g, HCG.npad(ss, 2));
    var val = val.replace(/ms/g, HCG.npad(ms, 3));// 순서
    return val;
  }
   /**
   * 년월일 문자열(ymd)을 Date타입으로 변경
   * @member HCG
   * @method ymd2date
   * @param {String} ymd 년월일, yyyymmdd 형태
   * @return {Date}
   */
  ,ymd2date : function (ymd)
  {
    return new Date(
      Number(ymd.substr(0, 4)),
      Number(ymd.substr(4, 2))-1,
      Number(ymd.substr(6, 2)));
  }
  
  /**
   * ymdFr, ymdTo 사이의 일수
   * @member HCG
   * @method getTermDayCnt
   * @param {String} ymdFr 시작년월일(From), yyyymmdd 형태
   * @param {String} ymdTo 종료년월일(To), yyyymmdd 형태
   * @return {Number} 일수
   */
  ,getTermDayCnt : function (ymdFr, ymdTo) 
  {
    var dtFr = new Date(Number(ymdFr.substr(0, 4)), Number(ymdFr.substr(4, 2))-1, Number(ymdFr.substr(6, 2)));
    var dtTo = new Date(Number(ymdTo.substr(0, 4)), Number(ymdTo.substr(4, 2))-1, Number(ymdTo.substr(6, 2)));
    return (dtTo.getTime() - dtFr.getTime()) / (1000 * 60 * 60 * 24);
  }
  /**
   * 요일문자 구하기
   * @member HCG
   * @method getDayOfWeekText
   * @param {Number} dow_num 요일값
   * @return {String}
   */
  ,getDayOfWeekText : function (dow_num, type)
  {
    var text = '';
    switch(dow_num)
    {
      case 0:text = HCG.ajaxLabel("MSG_sun");break;
      case 1:text = HCG.ajaxLabel("MSG_mon");break;
      case 2:text = HCG.ajaxLabel("MSG_tue");break;
      case 3:text = HCG.ajaxLabel("MSG_wed");break;
      case 4:text = HCG.ajaxLabel("MSG_thu");break;
      case 5:text = HCG.ajaxLabel("MSG_fri");break;
      case 6:text = HCG.ajaxLabel("MSG_sat");break;
    }
    return text;
  }
  /**
   * ymdFr, hmFr, ymdTo, hmTo 사이의 시간수
   * @member HCG
   * @method getTermTimeCnt
   * @param {String} ymdFr 시작년월일(From), yyyymmdd 형태
   * @param {String} hmFr 시작시간(From), hhmi 형태
   * @param {String} ymdTo 종료년월일(To), yyyymmdd 형태
   * @param {String} hmTo 종료시간(To), hhmi 형태
   * @return {Number} 시간수
   */
  ,getTermTimeCnt : function (ymdFr, hmFr, ymdTo, hmTo) 
  {
    var dtFr = new Date(Number(ymdFr.substr(0, 4)), Number(ymdFr.substr(4, 2))-1, Number(ymdFr.substr(6, 2)), Number(hmFr.substr(0, 2)), Number(hmFr.substr(2, 4)));
    var dtTo = new Date(Number(ymdTo.substr(0, 4)), Number(ymdTo.substr(4, 2))-1, Number(ymdTo.substr(6, 2)), Number(hmTo.substr(0, 2)), Number(hmTo.substr(2, 4)));
    return (dtTo.getTime() - dtFr.getTime()) / (1000 * 60 * 60);
  }
  /**
   * 엔터 입력 여부를 반환
   * @member HCG
   * @method enterKeyDown
   * @param {Event} e
   * @return {boolean}
   */
  ,enterKeyDown: function (e)
  {
    var ele = $(e.target);
    var eCode = (window.netscape) ? e.which : event.keyCode; 
    /* 2017.10.30 익스플로이고, input 박스에 text이면서 포맷이 적용되어있다면 해당 포맷을 설정하고, 조회할수 있도록 한다. */
    if (eCode == 13)
    {
      if(HCG.isIE() && (ele.prop("tagName") == "INPUT") && (ele.attr("TYPE") == "text") && (ele.attr("data_format") != "") )
      {
        HCG.formatInput(e.target);
      }
      return true;
    } 
    else return false; 
  }
  /**
   * form element, image, button element 를 활성화 또는 비활성화
   * @member HCG
   * @method enableInput
   * @param {String|Element} elem 대상 엘리먼트
   * @param {Boolean} b 활성화 여부
   * @param {Boolean} convertCombo 콤보를 박스형식으로 변경 여부
   * @param {Number} size SELECT 일경우 TEXT로 CONVERT시 TEXT FIELD 사이즈
   */
  ,enableInput : function (elem, b, convertCombo, size)
  {
    b = !!b;
    if ( elem == null ) alert("enableInput: elem is null !!!");
      
    elem = HCG.returnjQueryObj(elem);
    switch (elem.prop("tagName"))
    {
      case "INPUT":
      {       
        switch ( elem.attr("TYPE"))
        {
          //case "hidden":
          case "text":
          case "password":
          {
            elem.attr("readOnly", !(b));
            //elem.removeClass('intxt_bg');
            //b?elem.removeClass('intxt_bg'):elem.addClass('intxt_bg');
            //b?elem.css("background", "white"):elem.css("background", "#eee");
            //날짜 형식은 jquery-ui를 사용하기 때문에 따로 처리
            //if(elem.is(".format") && elem.attr("data_format") == "dfDateYmd") elem.datepicker(b? "enable":"disable");
            //input tag가 readOnly일 경우는 applyElementFormat()에서 달력버튼을 안만들어줌. 
            //readOnly가 해제 되었을경우도 달력버튼을 안만들어준상태에서 enable만 시키기 때문에 달력버튼이 나타나지 않음. 아래에 달력버튼 생성로직 추가(20150720)
            if(elem.attr("data_format") == "dfDateYmd")
            {
              elem.attr("autocomplete", "off");
              // 기간일 경우 FROM 달력출력 X
              var $periodWrap = elem.closest(".h-calendar2, [search_item='period']");
              var isPeriod = $periodWrap.length > 0;
              var paramShowOn = "both";
              if( isPeriod && $periodWrap.find("input")[0] == elem[0] )
              {
                paramShowOn = "focus";
              }
              
              if(elem.attr("readOnly"))
              {
                elem.datepicker("option", "buttonImage", "/resource/images/icon/icon_calender.png");
                elem.datepicker("option", "disabled", true);
              }
              else if(elem.attr("readOnly") == undefined || elem.attr("readOnly") == false)
              {
                //img태그가 없을경우에만 새로 생성
                if(!elem.parent().find('img').is('img'))
                {
                  elem.datepicker({
                    showOn: paramShowOn,
                    buttonImage: "/resource/images/icon/icon_calender.png",
                    buttonImageOnly: true,
                    buttonText : "",
//                    dateFormat : "yy.mm.dd",
                    changeYear:true,
                    changeMonth:true,
                    closeText:"Close",
                    yearRange:"1900:2100",
                    showOtherMonths:true,
                    selectOtherMonths:true,
                    showButtonPanel: true,
                    onSelect : function(dateTEXT, inst)
                    {
                      try
                      {
                        if($(elem).attr("onblurchange")!=undefined)
                        {
                          $(elem).trigger("blur"); 
                        }
                        if($(elem).attr("change")!=undefined)
                        {
                          $(elem).trigger("change");
                        }
                      }catch(e){}
                    }
                  });
                  var $elemImg = elem.parent().find('img');
                  $elemImg.css("vertical-align","middle").css("width","20px"); //px를 강제로 줘서 크롬에서 offset() 을 가져올때 캐쉬에 있는 것을 참고하지 않토록함.
                }
                else
                {
                  elem.datepicker("option", "showOn", paramShowOn);;
                  elem.datepicker("option", "buttonImage", "/resource/images/icon/icon_calender.png");
                  elem.datepicker("option", "disabled", false);
                }
                elem.datepicker("enable");
              }
            }
          }
          break;
          case "image":
          case "button":
          {
            elem.prop("disabled", (!b));
            elem.css("cursor", (b ? "pointer":"default"));
            elem.parent().css("cursor", (b ? "pointer":"default")); //버튼의 우측끝처리 때문에 span의 커서모양도 변경
            //elem.removeClass('disabled');
            b?elem.removeClass('disabled'):elem.addClass('disabled');
          }
          break;
          case "checkbox":
          case "radio":
          case "file":
          case "reset":
          case "submit":
          {
            elem.prop("disabled", (!b));
          }
          break;
        }
      }
      break;
      case "SELECT":
      {
        elem.prop("disabled", (!b));
        if ( convertCombo == true) HCG.convertCombo2Text(elem, !!b, size);
        //b?elem.css("background", "white"):elem.css("background", "#eee");
      }
      break;
      case "TEXTAREA":
      {
        elem.prop("readOnly", (!b));
        //elem.removeClass('disabled');
        //b?elem.removeClass('disabled'):elem.addClass('disabled');
        b?elem.removeClass('disabled'):elem.addClass('disabled');
      }
      break;
      case "IMG":
      {
        elem.prop("disabled", (!b));
        elem.css("cursor", (b ? "hand":""));
        elem.removeClass('disabled');
        b?elem.removeClass('disabled'):elem.addClass('disabled');
      }
      break;
    }
  }
  /**
   * 콤보를 텍스트 박스 형식으로 변경
   * @member HCG
   * @method convertCombo2Text
   * @param {String|Element} combo selectBox Id or selectBox
   * @param {Boolean} enable textbox를 감출지 여부
   * @param {Number} size textbox size
   */
  ,convertCombo2Text : function (combo, enable, size)
  {
    combo = HCG.returnjQueryObj(combo);    
    size = HCG.nvl(size, "15");
    if ( enable )
    {
      combo.show();
      if ( combo.next() && combo.next().attr("combotextyn") == "Y" )
      {
        combo.next().hide();
      }
    }
    else
    {
      combo.hide();
      if ( combo.next() && combo.next().attr("combotextyn") == "Y" )
      {
        combo.next().val(HCG.getSelectedText(combo));        
        combo.next().show();
      }
      else
      {
        var inTxt = $("<input type='text' value='"+HCG.getSelectedText(combo)+"' readonly size='"+size+"' combotextyn='Y' />");
        combo.after(inTxt);
      }        
    }
  }
  /**
   * select 태그의 선택되어있는 label값 구하기 
   * @member HCG
   * @method getSelectedText
   * @param {String|Element} select 태그 id 또는 element
   * @param {String} defaultText select의 option이 없을 경우 나올 default text
   * @return {String}
   */
  ,getSelectedText : function (sel, defaultText)
  { 
    if(typeof sel == "string") sel = $("#"+sel)[0];
    else sel = $(sel)[0];
    defaultText = defaultText || '';
    return sel.selectedIndex > -1 ? sel.options[sel.selectedIndex].text : defaultText;
    //return $("#"+sel+ " option:selected").length > 0 ?$("#"+sel+ " option:selected").text() : defaultText;
  }
  /**
   * 콤보박스에 특정 option을 제외하고 삭제하기
   * @member HCG
   * @method setOptionValuesOnly
   * @param {String} sel 콤보박스 id
   * @param {Array} values 제외할 option의 value들
   */
  ,setOptionValuesOnly : function (sel, values)
  {
    var val = "" ;
    $(values).each(function (i, v){  $("#"+sel).children("[value="+v+"]").addClass("selectRemove")} );
    $("#"+sel).children(":not(.selectRemove)").remove().removeClass("selectRemove");
  }
  /**
   * element의 값에 포맷을 제거한 데이터
   * @member HCG
   * @method getNormalValue
   * @param {String|Element} input element 또는 element id
   * @param {String} data_format 포맷형식
   * @return {String}
   */
  ,getNormalValue : function (input, data_format)
  {
    // display 용 값이 아닌 DB에 넣을 값을 가져온다.
    input = HCG.returnjQueryObj(input); 
    return HCG.restoreValue(input.val2(), data_format || input.attr2("data_format"));
  }
  /**
   * element의 value에 포맷 을 적용
   * @member HCG
   * @method formatInput
   * @param {String|Element} element 또는 element id
   * @param {String} data_format 포맷형식
   */
  ,formatInput : function (input, data_format)
  {
    input = HCG.returnjQueryObj(input);
    input.val( HCG.formatValue(input.val(), HCG.nvl(data_format, input.attr2("data_format"))) );
  }
  /**
   * 메세지 다국어 처리 함수
   * <br/>다국어프로퍼티 "message"타입을 활용.
   * <br/>다국어프로퍼티는 [시스템 - 다국어프로퍼티관리] 메뉴에서 관리됨
   * @member HCG
   * @method ajaxMsg
   * @param {String} key 다국어 메세지 키값
   * @param {String} lang 언어코드
   * @return {String} 다국어 메세지
   */
  ,ajaxMsg : function ( key, lang )
  {
    /*
    var dsClass = "hcg.hunel.core.resource.hunelJsMsgControl";
    var dsMethod = "getReturnMsg";
    var otherParams = {bname: "message", key: key, lang: lang, S_NO_LOGIN_CHECK: "Y"};
    var result = ""; 
    ajaxSyncRequestXS(dsClass, dsMethod, otherParams, function(xs){
      result = xs.GetEtcData("returnMsg");    
    });
    */
    var defaultStr = "";
    var result =   HCG.getMultiLang("message", key, defaultStr, null, lang);
    if(result==null || result==undefined) result = "";
    if ( arguments.length <= 2 ) 
    {
      return result.replace(/\\n/g,"\n");
    }
    for( var i=0; i<(arguments.length-2); i++ ) 
    {
        result = result.replace( new RegExp( "\\{" + i + "\\}", "gi" ), arguments[ i+2 ] );
    }
    return result.replace(/\\n/g,"\n");
  }
  /**
   * form안의 element들의 유효성 체크
   * @member HCG
   * @method checkForm
   * @param {Form} form form의 id 또는 element. 미지정시 첫번째 form 엘리먼트
   * @param {Boolean} bJustCheck 체크만 할건지 여부. false일 경우 alert
   * @return {Boolean}
   */
  ,checkForm : function (f, bJustCheck)
  {
    //f = typeof f == "string" ? document.forms[f] : f;
    f = (typeof f == "string")? $("#" + f)[0] : ((f)? $(f):$("form")[0]);
    var input;
    for ( var n = 0, sz = f.elements.length; n < sz; n++ )
    {
      input = f.elements[n];
      if ( ! input.name && ! input.id ) continue;
      switch ( input.type )
      { 
        case "button":
        case "image":
        case "submit":
        case "reset": continue;
      }
      if ( ! HCG.checkInput(input, bJustCheck) ) return false;
    }
    return true;
  }
  /**
   * form element 유효성 체크
   * @member HCG
   * @method checkInput
   * @param {String|Element} input element 또는 element id
   * @param {Boolean} bJustCheck 체크만 할건지 여부. false일 경우 alert
   * @return {Boolean}
   */
  ,checkInput : function (input, bJustCheck)
  {
    // 1. required 필수여부
    // 2. minv, maxv
    // 4. minbl, maxbl
    // 5. email
      
    input = HCG.returnjQueryObj(input);
    var str = input.val2();  
    var msg_prefix2 = this.getJosa(input.attr2("korname"), "을")+" "; // (input.attr2("korname")) ? input.attr2("korname") +" 을(를) " : "";  
    if ( $.protify(["Y", "true"]).include( input.attr2("required") || input.attr2("key_field") ) && !str )
    {
      if ( ! bJustCheck )
      {
        //alert(msg_prefix2 + "입력해주세요.");
        alert(HCG.ajaxMsg("MSG_ALERT_INPUT_001", Page.LANG, msg_prefix2)); // + ajaxMsg("MSG_ALERT_COND_OVER6"));
        HCG.input_selectfocus(input);
      }
      return false;
    }
    
    if ( str )
    {
      
      if ( $(input).attr2("data_format") && ! HCG.checkFormatInput(input, true) ) return false;
      // 숫자에서만 사용
      if ( input.attr2("minv") && ! HCG.checkMinMaxVal(Number(HCG.getNormalValue(input)), Number(input.attr2("minv")), null) )
      {
        if ( ! bJustCheck )
        {
          //alert(msg_prefix2 + input.minv +" 이상으로 입력해주세요.");
          alert(msg_prefix2 + input.attr2("minv") + " " + HCG.ajaxMsg("MSG_ALERT_COND_OVER7"));
          HCG.input_selectfocus(input);
        }
        return false;
      }
      if ( input.attr2("maxv") && ! HCG.checkMinMaxVal(Number(HCG.getNormalValue(input)), null, Number(input.attr2("maxv"))) )
      {
        if ( ! bJustCheck )
        {
          //alert(msg_prefix2 + input.attr2("maxv") +" 이하로 입력해주세요.");
          alert(msg_prefix2 + input.attr2("maxv") + " " + HCG.ajaxMsg("MSG_ALERT_COND_OVER8"));
          HCG.input_selectfocus(input);
        }
        return false;
      }
      // 문자에서만 사용    
      if ( input.attr2("minbl") && ! HCG.checkMinMaxByteLen(str, Number(input.attr2("minbl")), null) )
      {
        if ( ! bJustCheck )
        {
          //alert(msg_prefix2 + input.attr2("minbl") +" byte(s) 이상으로 입력해주세요.(현재 "+getByteLength(str)+" byte(s))");
          alert(msg_prefix2 + input.attr2("minbl") + " " + HCG.ajaxMsg("MSG_ALERT_COND_OVER9") + "("+HCG.ajaxMsg("MSG_prefix3") + HCG.getByteLength(str)+" byte(s))");
          HCG.input_selectfocus(input);
        }
        return false;
      }
      if ( input.attr2("maxbl") && ! HCG.checkMinMaxByteLen(str, null, Number(input.attr2("maxbl"))) )
      {
        if ( ! bJustCheck )
        {
          //alert(msg_prefix2 + input.attr2("maxbl") +" byte(s) 이하로 입력해주세요.(현재 "+getByteLength(str)+" byte(s))");
          alert(msg_prefix2 + input.attr2("maxbl") + " " + HCG.ajaxMsg("MSG_ALERT_COND_OVER10") + "("+HCG.ajaxMsg("MSG_prefix3") +HCG.getByteLength(str)+" byte(s))");
          HCG.input_selectfocus(input);
        }
        return false;
      }
    }
    return true;
  }
  /**
   * element 의 not null 여부 체크
   * @member HCG
   * @method checkInputNN
   * @param {String|Element} input element 또는 element id
   * @param {Boolean} bJustCheck 체크만 할건지 여부. false일 경우 alert
   * @return {Boolean} Null일 경우 false
   */
  ,checkInputNN : function (input, bJustCheck)
  {
    input = HCG.returnjQueryObj(input);
    var str = input.val2();
    var msg_prefix2 = input.attr2("korname") ? input.attr2("korname") : " ";
    if ( ! str )
    {
      if ( ! bJustCheck )
      {
        //alert(msg_prefix2 + "입력해주세요.");
        alert(HCG.ajaxMsg("MSG_ALERT_COND_OVER6").replace(new RegExp( "\\{0\\}", "gi" ), HCG.getJosa(msg_prefix2, "을")+" "));
        HCG.input_selectfocus(input);
      }
      return false;
    }
    return HCG.checkInput(input, bJustCheck);
  }
  /**
   * element의 포맷 유효성 체크
   * <br/>'data_format' 속성값에 해당하는 포맷유형이 기준이 됨
   * @member HCG
   * @method checkFormatInput
   * @param {String|Element} input element 또는 element id
   * @param {Boolean} bShowMsg 메시지 처리 여부
   * @return {Boolean}
   */
  ,
  checkFormatInput : function (input, bShowMsg)
  {  
    input = HCG.returnjQueryObj(input);  
    var check = HCG.checkFormatValue(input.val2(), input.attr2("data_format"));
    if ( ! check && bShowMsg )
    {
      alert( (input.attr2("korname") ? input.attr2("korname") + " " : "") + HCG.getFormatErrMsg(input.attr2("data_format")));
      HCG.input_selectfocus(input);
    }
    return check;
  }
  /**
   * ibsheet의 size 자동조정
   * @member HCG
   * @method sheetAutoReSize
   * @param {Object} sheet ibsheet 시트객체
   * @param {Boolean} AutoFitColWidth 너비 자동조정여부
   * @return {Boolean}
   */
  ,sheetAutoReSize : function (sheet, bAutoFitColWidth)
  {
    var orgSize =sheet.GetSheetWidth();
    orgSize = orgSize == 0 ? $("#DIV_"+sheet.id).width() : orgSize;
    var rcnt = sheet.HeaderRows();
    var size = 0;
    var colSize = {};
    for(var c=0;c<=sheet.LastCol();c++)
    {
      if(!sheet.GetCellProperty(rcnt-1, c, "Hidden"))
      {
        size += sheet.GetColWidth(c);
      }
      colSize[sheet.ColSaveName(c)] = sheet.GetColWidth(c);
    }
    
    //sheet 초기 size 저장
    sheet.OriginalWidh = size; 
    sheet.OriginalColSize = colSize;
    sheet.POP_URL = Page.POP_URL;
    if( ((size < orgSize && bAutoFitColWidth == undefined) || (size < orgSize && bAutoFitColWidth == 1)) && size > 0)
    {
      sheet.OriginalWidh = size;
      sheet.OriginalColSize = colSize;
      sheet.FitColWidth();
//      sheet.SetConfig({AutoFitColWidth:"search|init"});
    }
    else 
    {
//      sheet.SetConfig({AutoFitColWidth:""});
    }
  }
  /**
   * ibsheet SaveName들을 구분자(delim)로 연결한 문자열로 반환
   * @member HCG
   * @method concatSaveName
   * @param {Object} sheet ibsheet 객체
   * @param {String} delim 구분자
   * @param {String} exceptSaveNames 제외컬럼(,로 분리된 문자열) 현재 사용X
   * @return {String}
   */
  ,concatSaveName : function (sheet, delim, exceptSaveNames)
  {
    var except_save_name_array = exceptSaveNames ? exceptSaveNames.split(",") : [];
    if ( delim == null ) delim = "|";
    var tempSavename = "";
    var array = new Array();
    var rcnt = sheet.HeaderRows(); // 멀티라인을 고려하여 헤더 로우갯수 확인
    for(var c=0;c<=sheet.LastCol();c++)
    {
      for(var r=0;r< rcnt; r++)
      { 
        tempSavename = sheet.ColSaveName(r,c);
        array.push(tempSavename);
      }
    }
    return array.join(delim);
  }
  /**
   * 한글 단어의 받침 여부에 따라 적절한 조사를 선택해준다.
   * @member HCG
   * @method getJosa
   * @param {String} txt 단어 
   * @param {String} josa 조사 종류 (ex: 을/를, 이/가..)
   * @return {String}
   */
  ,getJosa : function (txt, josa)
  {
    var code = txt.charCodeAt(txt.length-1) - 44032;

    // 원본 문구가 없을때는 빈 문자열 반환
    if (txt.length == 0) return '';

    // 한글이 아닐때
    if (code < 0 || code > 11171) return txt;
    
    if (code % 28 == 0) return txt + HCG.get(josa, false);
    else return txt + HCG.get(josa, true); 
  }
  ,get : function (josa, jong) 
  {
    // jong : true면 받침있음, false면 받침없음
    if (josa == '을' || josa == '를') return (jong?'을':'를');
    if (josa == '이' || josa == '가') return (jong?'이':'가');
    if (josa == '은' || josa == '는') return (jong?'은':'는');
    if (josa == '으로' || josa == '로') return (jong?'으로':'로');
    // 알 수 없는 조사
    return '**';
  }
  /**
   * 시작값(inputFrom)이 종료값(inputTo)보다 작은지 여부를 반환
   * @member HCG
   * @method checkFromTo
   * @param {String|Element} inputFrom 시작값을 갖고있는 element 또는 element id
   * @param {String|Element} inputTo 종료값을 갖고있는 element 또는 element id
   * @return {Boolean}
   */
  ,checkFromTo : function (inputFrom, inputTo)
  {
    inputFrom = HCG.returnjQueryObj(inputFrom);
    inputTo = HCG.returnjQueryObj(inputTo);
    if ( inputFrom.val2() && inputTo.val2() )
    {
      if ( inputFrom.val2() > inputTo.val2() )
      {
        alert(HCG.ajaxMsg("MSG_ALERT_COND_OVER12")+"("+inputFrom.attr("korname")+" < "+inputTo.attr("korname")+")");
        HCG.input_selectfocus(inputTo);
        return false;
      }
    }
    return true;
  }
  ,/**
   * element에 select 포커스를 준다
   * @member HCG
   * @method input_selectfocus
   * @param {String|Element} input element 또는 element id
   */
  input_selectfocus : function (input)
  {
    input = HCG.returnjQueryObj(input);    
    try { if(input.attr("type") != "file") input.focus(); } catch(e) {alert(e);}
  }
  /**
   * 로딩 페이지 출력
   * @member HCG
   * @method pageLoading
   * @param {Boolean} bShow 출력여부
   */
  ,pageLoading : function( bShow )
  {
    if(bShow)
    {
      if (!HCG.isIE())
      {
        var $div = $(document.createElement("div"));
        $div.css({position:"absolute",left:"0",top:"0px",width:"100%",height:"100%",background:"#f8f8f8"});
        $div.prop("id","divPageLoad")
        $(document.body).append($div);
      }
      
      setTimeout(function()
      {
        HCG.pageLoading(false);
      },450);
    }
    else
    {
      
      var $div = $("#divPageLoad");
      var $body = $(document.body);
      if($div.css("display")!="none")
      {
        if (!HCG.isIE())
        {
          $div.addClass("fadeOut");
          $div.addClass("animated");
          setTimeout(function(){$div.hide()},400);
        }
        else
        {
          $div.hide()
        }
      }
      
      if($body.css("opacity")<1)
      {
        if (!HCG.isIE())
        {
          $body.addClass("fadeIn");
          $body.addClass("animated");
        }
        else
        {
          //$body.addClass("fadeIn");
          //$body.addClass("animated");
          //$body.fadeTo("fast",1);
          $body.css({"opacity":1});
        }
        
        setTimeout(function(){
          var $body = $(document.body);
          if($body.css("opacity")<1)
          {
            $body.css({"opacity":1});
          }
        },1);
      }
    }
  }
  /**
   * 화면에 ibsheet 그리기
   * <br/>ibsheet함수 createIBSheet를 호출함
   * @member HCG
   * @method writeIBSheet
   * @param {String} skinPath 사용 X
   * @param {String} ibsheet id(default : sheet1)
   * @param {String} width(default : 100%)
   * @param {String} height(default : 100%)
   */
  ,writeIBSheet : function (skin_path, id, width, height) 
  {
    id = HCG.nvl(id, "sheet1");

    width  = HCG.nvl(width, "100%");
    height = HCG.nvl(height, "100%");
    lang   = Page.LANG;
    /*
     * lsg수정
     * 메시지파일의 확장자가 .ko가 없을 경우 사용
     * 현재 en, cn, jp만 관리 하고 있음.
     * 추후 새로운 언어가 생성되면 common -> Sheet -> ibmsg를 만들어 준다. ex) ibmsg.xx
    */
    if(lang == 'ko')
    {
      createIBSheet(id, width, height);
    }
    else
    {
      createIBSheet(id, width, height, lang);
    }
  }
  /**
   * 시트 정의
   * @member HCG
   * @method initSheetColumn
   * @param {Object} sheet
   * @param {Array} cols 컬럼 정의 배열
   * @param {Object} info info 파라미터
   * @param {Number} headerCnt 헤더 Row 수
   * @param {Boolean} 마스킹 자동적용여부
   */
  ,initSheetColumn : function (sheet, cols, info, headerCnt, bAutoFormat)
  {
    var autoFormatCols = {
        "PER_NO" : "IdNo" // "컬럼명" : "ibSheet Format설정값"
        //,"STA_YM" : "Ym"
        //,"STA_HM" : "##.##"
    }
    
    for(idx in cols)
    {
      var col = cols[idx];
      if(col.Type == "CheckBox" || col.Type == "Radio" || col.Type == "DummyCheck")
      {
        col.TrueValue = "Y";
        col.FalseValue = "N";
      }

      bAutoFormat = (typeof bAutoFormat == "undefined") ? true : bAutoFormat;
      if( bAutoFormat )
      {
        if( typeof col["Format"] == "undefined" && typeof autoFormatCols[col["SaveName"]] != "undefined" )
        {
          col.Format = autoFormatCols[col.SaveName];
        }
      }
    }
    
    sheet.InitHeaders(HCG.setHeaders(cols, headerCnt),info);
    sheet.InitColumns(cols);
    sheet.SetCountPosition(4);
    sheet.SetClipCopyMode(0);
    sheet.SetClipPasteMode(2);
    
    if(info.AutoFitColWidth == 1 || info.AutoFitColWidth == undefined)
    {
      //HCG.sheetAutoReSize(sheet, info.AutoFitColWidth);
    }
  }
  /**
   * 컬럼정의 배열과 헤더의 로우 수를 받아 헤더객체를 리턴한다.
   * @member HCG
   * @method setHeaders
   * @param {Array} colObject 컬럼 정의 배열
   * @param {Number} headerCnt 헤더 로우 수
   * @param {String} Align 헤더 정렬방법
   * @return {Array}
   */
  ,setHeaders: function (colObject, headerCnt, Align) 
  {
    var headers = new Array();
    var setHeader = new Array();
    var header_nms = new Array();

    Align = HCG.nvl(Align,"Center");
    headerCnt = (headerCnt)? headerCnt : 1;
    
    if(!headerCnt) headerCnt = 1;
    $.each(colObject, function(index, col) 
    {
      header_nms = col.Header.split("|");
      for ( var i = 0; i < headerCnt; i++) 
      {
        setHeader[i] += (header_nms.length == 1 ? header_nms[0]: header_nms[i]) + "|";
      }
    });
    for ( var i = 0; i < headerCnt; i++) 
    {
      headers[i] = {};
      headers[i].Text = setHeader[i].replace("undefined","");
      headers[i].Align = Align;
    }
    return headers;
  }
  /**
   * XmlSheet 객체로 콤보 박스 구성
   * @member HCG
   * @method makeSelectXS
   * @param {String} sel select태그 Id
   * @param {Object} xsheet xmlSheet
   * @param {String} data_key
   */
  ,makeSelectXS : function (sel, xsheet, data_key)
  {
    sel = $("#"+sel)[0];
    if ( xsheet == null ) return;
    for ( var row = 0, rcnt = xsheet.RowCount(data_key); row < rcnt; row++ )
    {
      sel.options.add(new Option(xsheet.GetCellValue(row, 0, data_key), xsheet.GetCellValue(row, 1, data_key)));
    }
  }
  /**
   * select태그 또는 ibsheet Combo타입 컬럼에 콤보 세팅하기
   * @member HCG
   * @method setCombo
   * @param {String|Object} combo_array 콤보데이터
   * @param {String|Object} comboObj Select: element id / ibsheet : 헤더정보 배열(arrC)
   * @param {String} saveName Select : 해당없음 / ibsheet : 대상컬럼 SaveName
   * @param {String} option combo옵션(S:-선택-, A:-전체, N:빈값)
   * @param {Array} first_append_combo_array combo의 처음에 덧붙여질 배열
   * @param {Number} sheetRow combo를 반영할 row index. 입력하지 않으면 컬럼 전체에 적용됨
   */
  ,setCombo :function (combo_array, comboObj, saveName, option, first_append_combo_array, sheetRow)
  {
      var elemId = (typeof comboObj == "string") ? comboObj : "";
      var comboObj2 = comboObj;
      var value_array = new Array();

      if ( comboObj == null ) alert("Error: setCombo comboObj("+comboObj+") is null");
      
    //if("S_OBJ_TREE_TYPE" == comboObj2) alert([typeof comboObj,comboObj2, typeof comboObj == "string" ? $("#" + comboObj)[0] : comboObj]);
    comboObj = typeof comboObj == "string" ? $("#" + comboObj)[0] : comboObj;
    if(comboObj == undefined || comboObj == null) return;
    
    combo_array = (typeof combo_array == 'object' && !!combo_array.RowCount) ? HCG.makeComboTextXS(combo_array) : combo_array;
   
    if ( typeof combo_array == 'string' )
    {
      var bPrime = comboObj.tagName == "SELECT" && $(comboObj).is("[prime_field='Y']");
      var mapPrime = new HashMap();
      
      combo_array = combo_array.split("■");
      combo_array = $.protify(combo_array).inject([], function(array, elem, idx)
      {
        var keyVal = elem.split('□');
        
        if( bPrime )
        {
          var strKey = HCG.PrimeSearch.bCaseSensitive ? keyVal[0] : keyVal[0].toLowerCase();
          mapPrime.put(strKey, keyVal[1]);
        }
        
        array.push(keyVal);
        return array;
      });
      
      if( !mapPrime.isEmpty() )
      {
        var bPush = true;
        $.each(HCG.PrimeSearch.comboMaps, function(i, e)
        {
          if(e == mapPrime)
          {
            bPush = false;
            return false;
          }
        });
        if(bPush)
        {
          HCG.PrimeSearch.comboMaps[elemId] = mapPrime;
        }
      }
    }
    
    if ( comboObj.tagName == "SELECT" )
    {
      if($(comboObj).attr("multiple") == "multiple")
      {
      /*
          if(option == "A")
        {
          $(comboObj).change().multipleSelect({selectAll: true});
        }
        */
      }
      else
      {
        switch ( option )
        {
          case "A":{combo_array = [[HCG.ajaxMsg("MSG_all_1"),'']].concat(combo_array);}break; //-전체-
          //콤보리스트에 조회된 데이터들의 value들을 전체의 value로 넣음 w.y.c 2014-02-27
          case "AA":
          {
              //combo_array의 value들만 모음
            for(var i = 0; i < combo_array.length; i++)
            {
              value_array.push(String(combo_array[i]).split(',')[1]);
            }
            combo_array = [[HCG.ajaxMsg("MSG_all"),value_array]].concat(combo_array);
          }
          break; //-전체-
          case "A%":{combo_array = [[HCG.ajaxMsg("MSG_all"),'%']].concat(combo_array);}break; //전체
          case "S" :{combo_array = [[HCG.ajaxMsg("MSG_select_1"),'']].concat(combo_array);}break; //-선택-
          case "N" :{combo_array = [['','']].concat(combo_array);}break;
          case "U" :{combo_array = first_append_combo_array.concat(combo_array);}break;
        }
      }
      $.protify(combo_array).each(function(elem)
      {
        comboObj.options.add(new Option(elem[0], elem[1]));
      });
      // ie8에서 multiple 재선언 하지 않으면 나오지 않음.
      //+ 기본적으로 값을 세팅 해줄때에서 재선언 해야하므로 
      if($(comboObj).attr("multiple") == "multiple" )
      {
        if(option == "A")
        {
          $(comboObj).multipleSelect({selectAll: true});
        }
        else
        {
          $(comboObj).multipleSelect({selectAll: false});
        }
      }
    }
    else if ( comboObj && sheetRow)  //comboObj로 sheet ID를 받고 sheetRow가 null이 아니면 해당 셀의 콤보리스트만 변경
    {
       switch ( option )
      {
        case "A":{combo_array = [[HCG.ajaxMsg("MSG_all"),'%']].concat(combo_array);}break;
        //콤보리스트에 조회된 데이터들의 value들을 전체의 value로 넣음 w.y.c 2014-02-27
        case "AA":
        {
          //combo_array의 value들만 모음
        for(var i = 0; i < combo_array.length; i++)
        {
          value_array.push(String(combo_array[i]).split(',')[1]);
        }
          combo_array = [[HCG.ajaxMsg("MSG_all"),value_array]].concat(combo_array);
        }
        break; //-전체-
        case "S":{combo_array = [[HCG.ajaxMsg("MSG_select"),'']].concat(combo_array);}break;
        case "N":{combo_array = [['','']].concat(combo_array);}break;
        case "U":{combo_array = first_append_combo_array.concat(combo_array);}break;
      }
       
       
      var combo_text_array = [], combo_value_array = [];
      $.protify(combo_array).each(function(elem)
      {
        combo_text_array.push(elem[0]=='' ? ' ':elem[0]);// sheet 콤보에서 텍스트의는 빈문자를 무시한다
        combo_value_array.push(elem[1]);
      });
      
      var combo_text_string  = combo_text_array.join('|');
      var combo_value_string = combo_value_array.join('|');
     
      var info = {ComboCode:combo_value_string, ComboText:combo_text_string};
      //comboObj.CellComboItem(sheetRow, saveName, combo_text_string, combo_value_string);
      comboObj.CellComboItem(sheetRow, saveName, info);
    }
    else if ( !!comboObj.Version ) //sheet는 Version확인 function이 있으므로 sheet객체면 true (sheet의 해당 컬럼 combo값을 변경할때)
    {
      switch ( option ){
        case "A":{combo_array = [[HCG.ajaxMsg("MSG_all"),'%']].concat(combo_array);}break;
        //콤보리스트에 조회된 데이터들의 value들을 전체의 value로 넣음 w.y.c 2014-02-27
        case "AA":
        {
          //combo_array의 value들만 모음
        for(var i = 0; i < combo_array.length; i++)
        {
          value_array.push(String(combo_array[i]).split(',')[1]);
        }
          combo_array = [[HCG.ajaxMsg("MSG_all"),value_array]].concat(combo_array);
        }
        break; //-전체-
        case "S":{combo_array = [[HCG.ajaxMsg("MSG_select"),'']].concat(combo_array);}break;
        case "N":{combo_array = [['','']].concat(combo_array);}break;
        case "U":{combo_array = first_append_combo_array.concat(combo_array);}break;
      }
      
      var combo_text_array = [], combo_value_array = [];
      $.protify(combo_array).each(function(elem)
      {
        combo_text_array.push(elem[0]=='' ? ' ':elem[0]);// sheet 콤보에서 텍스트의는 빈문자를 무시한다
        combo_value_array.push(elem[1]);
      });
      
      var combo_text_string  = combo_text_array.join('|');
      var combo_value_string = combo_value_array.join('|');
      var info = {ComboCode:combo_value_string, ComboText:combo_text_string};
      comboObj.SetColProperty(0, saveName, info);
    }
    else if ( comboObj[0]!=undefined && comboObj[0].Type )    //comboObj로 cols를 받을때
    {
      //console.log("comboObj[0].Type=="+comboObj[0].Type);
       switch ( option )
      {
        case "A":{combo_array = [[HCG.ajaxMsg("MSG_all"),'%']].concat(combo_array);}break;
        //콤보리스트에 조회된 데이터들의 value들을 전체의 value로 넣음 w.y.c 2014-02-27
        case "AA":
        {
          //combo_array의 value들만 모음
        for(var i = 0; i < combo_array.length; i++)
        {
          value_array.push(String(combo_array[i]).split(',')[1]);
        }
          combo_array = [[HCG.ajaxMsg("MSG_all"),value_array]].concat(combo_array);
        }
        break; //-전체-
        case "S":{combo_array = [[HCG.ajaxMsg("MSG_select"),'']].concat(combo_array);}break;
        case "N":{combo_array = [['','']].concat(combo_array);}break;
        case "U":{combo_array = first_append_combo_array.concat(combo_array);}break;
      }
      var combo_text_array = [], combo_value_array = [];
      $.protify(combo_array).each(function(elem, val)
      {
        combo_text_array.push(elem[0]=='' ? ' ':elem[0]);// sheet 콤보에서 텍스트의는 빈문자를 무시한다
        combo_value_array.push(elem[1]);
      });
      
      
      //alert([combo_array,combo_text_array,saveName]);
      var combo_text_string = combo_text_array.join('|');
      
      var combo_value_string = combo_value_array.join('|');
      
      if ( sheetRow == null )
      {
        // combo_text_string, combo_value_string
         for(var i=0;i<comboObj.length;i++){
           if(comboObj[i].SaveName == saveName)
           {
             comboObj[i].ComboText = combo_text_string;
             comboObj[i].ComboCode = combo_value_string;
           }
         }
      }
    }
    else
    {
      //alert("Wrong...");
    }
  }
  
  /**
   * 권한 체크하여 콤보 값 세팅
   * @member HCG
   * @method makeAuthCombo
   * @param {String|Element} select element 또는 element id
   * @param {String} OP_CD 옵션코드
   * @param {String} CD_TXT 찾으려는 text
   * @param {String} exCode 예외코드
   */
  , makeAuthCombo : function(combo, OP_CD, CD_TXT, exCode)
  {
    if(typeof combo == "string") combo = $("#"+combo)[0];
    switch ( OP_CD )
    {
      case "ALL":
      {
        //skip
      }
      break;
      case "NOT IN":
      {
        $.protify($.makeArray($(combo).find('option'))).reverse().each(function(item)
        {
          // text, value, index
          if (!item.value){
            combo.options.remove(item.index);
          }else if ( CD_TXT.indexOf("'"+item.value+"'") >= 0 ){
            if ( exCode && exCode == item.value ){
            }else{
              combo.options.remove(item.index);
            }
          }
        });
      }
      break;
      case "IN":
      default:
      {
        $.protify($.makeArray($(combo).find('option'))).reverse().each(function(item)
        {
          // text, value, index
           if (!item.value){
             combo.options.remove(item.index);
          }else if ( CD_TXT.indexOf("'"+item.value+"'") < 0 ){
            if ( exCode && exCode == item.value ){
            }else{
              combo.options.remove(item.index);
            }
          }
        });
      }
      break;
  }
    if ( combo.length == 0 )
    {
      combo.options.add(new Option("----", "----"));
    }
  }
  ,/**
   * id/name이 'F_'로 시작하는 format element를 찾아서 'F_'대신 'S_'로 시작하는 포맷해제 element를 생성해준다.
   * <br/>ex) F_STA_YMD (2020.01.01) => S_STA_YMD (20200101)
   * @member HCG
   * @method inputAutoUnformat
   * @param {Object} form
   * @param {String} f id/name 첨자(포맷)
   * @param {String} s id/name 첨자(포맷X)
   */
  inputAutoUnformat : function (form, f, s)
  {
    form = ($(form).length > 0)? $(form) : $("form").first();
    f = f == null ? "F" : f;
    s = s == null ? "S" : s;
    var f_ = f + "_";
    var s_ = s + "_";
    var s_name;
    
    $("#"+form.prop("id")+" input[id^='" + f_ + "']").each(function(index)
    {
      s_name = s_ + $(this).attr("id").substr(f_.length);  
      if($("#" + s_name).length == 0)
      {
        var tmpHidden = $("<input type='hidden' id='" + s_name + "' name='" + s_name + "' />"); 
        form.append(tmpHidden);    
      }
      $("#" + s_name).val(HCG.getNormalValue($(this)));      
    });  
    
    //multi-combobox F_ 의 value 가 아닌 val() 를 hidden에 2016.10.13
    $("#"+form.prop("id")+" select[id^='" + f_ + "']").each(function(index)
    {
      s_name = s_ + $(this).attr("id").substr(f_.length);  
      if($("#" + s_name).length == 0)
      {
        var tmpHidden = $("<input type='hidden' id='" + s_name + "' name='" + s_name + "' />"); 
        form.append(tmpHidden);    
      }
      $("#" + s_name).val($(this).val());      
    });
  }
  /**
   * radio 버튼의 checked 된 값을 리턴
   * @member HCG
   * @method getCheckedValue
   * @param {String|Element} radio input element 또는 element id
   * @return {String} 체크된 radio value
   */
  ,getCheckedValue : function (radio)
  {
    if ( typeof radio == 'string' ) radio = document.getElementsByName(radio);
    var size = radio.length;
    if ( ! size )
    {
      return radio.checked ? radio.value : null;
    }
    for ( var n = 0; n < size; n++ ) 
    {
      if ( radio[n].checked ) 
      {
        return radio[n].value;
      }
    }
    return null;
  }
  /**
   * XmlSheet로 콤보문자열을 만든다
   * @member HCG
   * @method makeComboTextXS
   * @param {Object} xs XmlSheet객체
   * @param {String} data_key
   * @param {String} delCol 컬럼구분(default : □)
   * @param {String} delRow 로우구분(default : ■)
   * @return {String}
   */
  ,makeComboTextXS : function (xs, data_key, delCol, delRow)
  {
    delCol = delCol || "□";
    delRow = delRow || "■";
    var tmpArr = [];
    var rowCnt = xs.RowCount(data_key);
    for ( var r = 0, RowCount = rowCnt; r < RowCount; r++ )
    {
      tmpArr.push([xs.GetCellValue(r, 0, data_key), xs.GetCellValue(r, 1, data_key)]);
    }
    var comboText = $.protify(tmpArr).inject([], function(result, v)
    {
      result.push(v.join(delCol));
      return result;
    }).join(delRow);
    return comboText;
  }
  /**
   * json으로 콤보문자열을 만든다
   * @method makeComboTextJson
   * @param {Array} json 콤보json 배열
   * @param {String} colCd 콤보코드 컬럼명 (기본값 "CD")
   * @param {String} colCdNm 콤보코드 컬럼명 (기본값 "CD_NM")
   * @param {String} delCol 컬럼구분(default : □)
   * @param {String} delRow 로우구분(default : ■)
   * @return {String}
   */
  ,makeComboTextJson : function (jsonArr, colCd, colCdNm, delCol, delRow)
  {
    delCol = delCol || "□";
    delRow = delRow || "■";
    colCd = colCd || "CD";
    colCdNm = colCdNm || "CD_NM";
    
    var tmpArr = [];
    
    $.each(jsonArr, function(i, json){
      if(typeof json[colCd] == "undefined" || typeof json[colCdNm] == "undefined") return true;
      tmpArr.push([json[colCdNm], json[colCd]]);
    });
    var comboText = $.protify(tmpArr).inject([], function(result, v){
      result.push(v.join(delCol));
      return result;
    }).join(delRow);
    return comboText;
  }
  /**
   * hunel에서 Vue.js를 사용할 때 필요한 공통 파라미터를 반환
   * @member HCG
   * @method baseVueParam
   * @return {Object} Vue.js 파라미터 Object 
   */
  ,baseVueParam : function()
  {
    return {
      el:""
      ,openerApp :{}
      ,openerFunc : {}
      ,updated : function()
      {
        $("body").fadeTo(1000,1);
      }
      ,mounted : function()
      {
        var $app = $(this.$el);
        
        $app.find("div.h-search-area").each(function(i, area)
        {
          var _id = $(area).attr("id");
          if( !HCG.isVal(_id) )
          {
            _id = HCG.SearchItems.getUniqueId();
            $(area).attr("id", _id);
          }
          HCG.SearchItems.init(_id, null, true);
        });
        //LayoutFlex.init();
        
        HCG.applyElementSearchEmp(this);
        HCG.applyElementSearchOrg(this);
        
        this.$nextTick(function(){
          // 사원찾기공통 after_func을 최초1회실행
          $(".h-component-sy181").each(function(i, e){
            var obj = $(e);
            if( !HCG.isVal(obj.attr("V_MODEL_EMP_ID")) ) return;
            if( typeof eval("window."+obj.attr("AFTER_FUNC")) == "function" )
            {
              eval(obj.attr("AFTER_FUNC"))();
            }
          });
          // 조직공통 after_func 최초1회실행
          $(".h-component-sy182").each(function(i, e){
            var obj = $(e);
            if( !HCG.isVal(obj.attr("V_MODEL_ORG_ID")) ) return;
            if( typeof eval("window."+obj.attr("AFTER_FUNC")) == "function" )
            {
              HCG.changeOrg20_sy182(obj.attr("PREFIX"))
            }
          });
        });
      }
      ,updated : function()
      {
        HCG.applyElementSearchEmp(this);
        HCG.applyElementSearchOrg(this);
      }
      ,data :
      {
        dsClass     : ""
        ,dsMethod   : ""
        ,formValue  : {}
        ,condition  : {}
        ,resultSet  : {}
        ,visible    : {}
        ,combo      : {}
        ,freeform   : {}
        ,rules : 
        {
          required : function(value)
          {
            return (!!value || HCG.getMultiLang("message", "MSG_ALERT_PEM_0074", "필수 입력 항목입니다."));
          }
          ,email : function(value)
          {
            var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return (pattern.test(value) ? !!value : HCG.getMultiLang("message", "MSG_ALERT_INVALID_FORMAT_EMAIL", "올바른 이메일 형식이 아닙니다.")) ;
          }
          ,ymd : function(value)
          {
            return( HCG.checkFormatValue(value, "dfDateYmd") ? !!value : HCG.getMultiLang("message", "MSG_ALERT_0218", "잘못된 날짜 입력입니다.") );
          }
        }
      }
      ,computed :
      {
        /**
         * 프리폼 관련 네임스페이스
         *  ex) vmMaster.cFreeform.함수명();
         */
        cFreeform : function()
        {
          var vueInstance = this;
          var rv = {
              // 함수
              v_setData : new Function()        // 조회결과를 data.freeform 노드에 Set
              ,v_edit : new Function()          // 편집/편집취소 전환
              ,v_add : new Function()           // List Row 추가
              ,v_remove : new Function()        // List Row 삭제
              ,v_makeParam : new Function()     // 프리폼 저장용 파라미터 생성
              ,v_checkData : new Function()     // 프리폼 데이터 유효성 체크
              ,v_checkInput : new Function()    // 프리폼 데이터 유효성 체크(jquery)
              ,v_editStyle : new Function()     // 상태별 클래스
              ,v_editLabel : new Function()     // 편집버튼 문구
              ,v_editClass : new Function()     // 편집버튼 스타일
              // 프리폼데이터 (freeform.??.data)는 cFreeform.?? 형태로 찾을수 있도록 참조값 생성
          }
          if( typeof vueInstance == "undefined" ) return rv;

          // 프리폼데이터(freeform.??.data)는 cFreeform.?? 형태로 찾을수 있도록 참조값 생성
          if( typeof (vueInstance.freeform) != "undefined" )
          {
            $.each(vueInstance.freeform, function(key, ff){
              rv[key] = ff.data;
            });
          }
          
          /**
           * 조회결과를 화면에 Set, 읽기모드로 초기화
           * @param freeformName 프리폼명.
           * @param data (List : Array, SingleRow : Object)
           */
          rv.v_setData = function(freeformName, data)
          {
            if( typeof (vueInstance.freeform[freeformName]) == "undefined" ) return;
            
            var ff = vueInstance.freeform[freeformName];
            var ffType = HCG.nvl(ff.type);
            if( ffType == "single" )
            {
              if( HCG.isArray(data) )
              {
                Vue.set(ff, "data", data[0] || {});
              }
              else if( HCG.isObject(data) )
              {
                Vue.set(ff, "data", data || {});
              }
              else
              {
                Vue.set(ff, "data", {}); 
              }
              Vue.set(ff, "tempData", {});
              Vue.set(ff.data, "_status", "read");
              Vue.set(ff.data, "_freeform", ff);
            }
            else if( ffType == "list" )
            {
              var _data = HCG.isArray(data) ? data : [];
              Vue.set(ff, "data", _data);
              Vue.set(ff, "tempData", {});
              $.each(ff.data, function(index, row){
                Vue.set(row, "_status", "read");
                Vue.set(row, "_freeform", ff);
              });
            }
            else 
            {
              alert("invalid freeform type (" +  freeformName + ")")
            }
          }
          
          /*
           * Row 편집 / 편집취소
           */
          rv.v_edit = function(data)
          {
            if( typeof data._freeform == "undefined" ) return;
            var ff = data._freeform
            var ffType = HCG.nvl(ff.type);
            
            // 편집
            if( data._status == "read" )
            {
              if( ffType == "list" )
              {
                var date = new Date();
                Vue.set(data, "_uid", String(date.getHours()) + String(date.getMinutes()) + String(date.getSeconds()) + String(date.getMilliseconds()) );
                
                Vue.set(ff.tempData, data._uid, $.extend(false, {}, data));  
              }
              else if( ffType == "single" )
              {
                Vue.set(ff, "tempData", $.extend(false, {}, data)); // 기존데이터 임시보관
              }
              
              Vue.set(data, "_status", "edit" );
              
              var $btn = $(event.target);
              if( $btn.hasClass("h-form-btn") )
              {
                $btn.removeClass("h-edit").addClass("h-delete");
                $btn.val("취소");
              }
            }
            // 편집취소
            else if( data._status == "edit" )
            {
              if( ffType == "list" )
              {
                if( !HCG.isVal(data._uid) )
                {
                  alert("no uid!!");
                  return;
                }
                if( HCG.isObject(ff.tempData) && typeof ff.tempData[data._uid] != "undefined" )
                {
                  Vue.set(ff.data, ff.data.indexOf(data), ff.tempData[data._uid]);
                  Vue.delete(ff.tempData, data._uid);
                }
                else
                {
                  Vue.set(ff.data, index, []);
                }
              }
              else if( ffType == "single" )
              {
                Vue.set(ff, "data", ff.tempData);
                Vue.set(ff, "tempData", []);
              }
              
              Vue.set(data, "_status", "read");
              
              var $btn = $(event.target);
              if( $btn.hasClass("h-form-btn") )
              {
                $btn.removeClass("h-delete").addClass("h-edit");
                $btn.val("편집");
              }
            }
          }
          
          // List Row 추가
          rv.v_add = function(freeformName)
          {
            if( typeof vueInstance.freeform[freeformName] == "undefined" ) return;
            
            var ff = vueInstance.freeform[freeformName];
            if( ff.data == undefined )
            {
              Vue.set( ff, "data", [] ); 
            }
            
            var newRow = {
                _status : "add"
                ,_freeform : ff
            }
            ff.data.push(newRow);
          }
          
          /**
           * Row 삭제
           */
          rv.v_remove = function(data)
          {
            if( typeof data._freeform == "undefined" ) return;
            var ff = data._freeform;
            var rm = ff.data.splice(ff.data.indexOf(data), 1);
            return HCG.isArray(rm) ? true : false;
          }
          
          /**
           * 프리폼 저장용 파라미터 생성
           */
          rv.v_makeParam = function(data)
          {
            if( typeof data._freeform == "undefined" ) return;
            var ff = data._freeform;
            
            var param = $.extend(false, {}, data);
            delete param._freeform; // $.extend 무한루프방지
            return $.extend(true, param, (ff.keyData || {}));
          }
          
          // 프리폼데이터 유효성체크 : HCG.checkInput을 활용하기 위해 input의 상태값을 jquery로 체크
          rv.v_checkData = function($data)
          {
            var $data = $(event.target).closest(".h-form-content");
            if( HCG.isArray($data) )
            {
              return this.v_checkInput( $data );
            }
            else
            {
              return true;
            }
          }
          
          rv.v_checkInput = function($data)
          {
            var bValid = true;
            $data.find("input, select, textarea").each(function(i, input){
              if ( !HCG.checkInput(input) )
              {
                bValid = false;
                return false;
              }
            });
            return bValid;
          }
          
          rv.v_editStyle = function(data)
          {
            var status = HCG.nvl(data._status);
            if( status == "edit" || status == "add")
            {
              return {"h-form-edit" : true};
            }
            else
            {
              return {};
            }
          }
          
          rv.v_editLabel = function(data)
          {
            if( HCG.nvl(data._status) == "edit" )
            {
              return HCG.getMultiLang("label", "cancel", "취소");
            }
            else
            {
              return HCG.getMultiLang("label", "main_500_004", "편집");
            }
          }
          
          rv.v_editClass = function(data)
          {
            if( HCG.nvl(data._status) == "edit" )
            {
              return "h-delete";
            }
            else
            {
              return "h-edit";
            }
          }
          
          rv.v_data = function(freeformName)
          {
            if( typeof (vueInstance.freeform[freeformName]) == "undefined" ) return null;
            
            var ff = vueInstance.freeform[freeformName];
            var ffType = HCG.nvl(ff.type);
            if( ffType == "single" )
            {
              return HCG.isObject(ff.data) ? ff.data : {};
            }
            else if( ffType == "list" )
            {
              return HCG.isArray(ff.data) ? ff.data : [];
            }
            else
            {
              alert("Cannot get data(" + freeformName + ")")
            }
          }
          return rv;
        }
      }
      ,methods :
      {
        v_isArray : function(val)
        {
          return HCG.isArray(val);
        }
        ,v_isVal : function(val)
        {
          return HCG.isVal(val);
        }
        ,v_isObject : function(val)
        {
          return HCG.isObject(val);
        }
        ,v_nvl : function(s,d)
        {
          return HCG.nvl(s,d);
        }
        ,v_getPhotoUrl : function(c_cd, emp_id, bOrigin, refreshStr)
        {
          var sPhotoUrl = "";
          var thumb = "";
          
          // 원본사진보기가 아닐 경우엔 썸네일 사진을 바라보도록 함
          if( !bOrigin )
          {
            thumb = "thumb/";
          }
          
          if(c_cd!=null && emp_id!=null && c_cd!=undefined && emp_id!=undefined)
          {
            sPhotoUrl = "/resource/images/emp/"+c_cd+"/"+thumb+emp_id+".jpg";
            if(refreshStr)
            {
              sPhotoUrl += "?refresh=" + refreshStr;
            }
          }
          return sPhotoUrl;
        }
        ,v_getNoPhoto : function(e)
        {
          e.target.src="/resource/images/emp/no_photo.gif";
        }
        ,v_getLabel : function(key, def, arrParam)
        {
          return this.v_getMultiLang("label", key, def, arrParam);
        }
        ,v_getMessage : function(key, def, arrParam)
        {
          return this.v_getMultiLang("message", key, def, arrParam);
        }
        ,v_getMultiLang : function (type, key, def, arrParam)
        {
          return HCG.getMultiLang(type, key, def, arrParam);
        }
        ,v_formatValue : function(str, data_format, point_count)
        {
          if(str==undefined) return "";
          return HCG.formatValue(str, data_format, point_count);
        }
        ,v_getCodeNm : function( array, cd, cd_field, nm_field)
        {
          if( !HCG.isArray(array) || cd==undefined ) return "";
          
          if(cd_field==undefined) cd_field = "CD";
          if(nm_field==undefined) nm_field = "CD_NM";
          
          var l = array.length;
          var rtnStr = "";
          for(var i=0;i<l;i++)
          {
            
            if(array[i][cd_field] == cd )
            {
              rtnStr = array[i][nm_field];
            }
          }
          return rtnStr;
        }
        ,v_getComboText : function(ref)
        {
          if(HCG.isVal(this.$refs[ref]))
          {
            return this.$refs[ref].text;
          }
          
          return "";
        }
        ,v_getHref : function(type,url)
        {
          return type+":"+url;
        }
      } // methods end
      ,components :
      {
        /**
         * 파일 리스트
         *  - viewer-ref 프로퍼티로 파일뷰어 컴포넌트(h-file-viewer)를 지정하면, 다운로드 대신 뷰어 사용합니다.
         *    (프로젝트에 맞게 조건 수정하여 사용)
         */
        hFileList :
        {
          template : "<div v-if='files.length>0' class='col-sm-12 p-0 h-file-area'>"
                   + "  <div class='h-file' @click='v_toggleList'>"
                   + "    <p><i class='icon-file mr5'></i> <span class='bold-txt'>{{files.length}}</span>개의 첨부된 파일이 있습니다.</p>"
                   + "  </div>"
                   + "  <ul v-if='bShowList' class='h-detail-info h-file-list-line mt10 mb10'>"
                   + "    <li v-for='(file, index) in files'>"
                   + "      <div class='h-upload-list'>"
                   + "        <div class='media'>"
                   + "          <div @click='v_download(file)' class='wp100'>"
                   + "            <span class='detail-list'>{{file.FILE_NM}}</span>"
                   + "          </div>"
                   + "          <div class='media-body'>"
                   + "            <div class='text-right' v-if='editable==true'>"
                   + "              <i class='icon-delete' @click='v_delete(file)'></i>"
                   + "            </div>"
                   + "          </div>"
                   + "        </div>"
                   + "      </div>"
                   + "    </li>"
                   + "  </ul>"
                   + "</div>"
          ,props :
          {
            // 필수 prop
            value       : { type : Array,   required : true }
            // 옵션 prop
            ,editable     : { type : Boolean, required : false, "default" : false }        // editable : 삭제가능여부
            ,showList     : { type : Boolean, required : false, "default" : true }         // show-list : 리스트 출력 초기값
          }
          ,data : function()
          {
            return {
              files : this.value
              ,bShowList : this.showList
            }
          }
          ,methods :
          {
            v_download : function(item)
            {
              var param = item;
              var uriPattern = "/FD"
              HCG.submit2({action:uriPattern,target:"/"}, param);
            }
            ,v_delete : function(item)
            {
              if(!confirm(HCG.ajaxMsg('MSG_CONFIRM_MAIN_0002'))) return;
              var param = item;
              var fileListComp = this;
              HCG.ajaxRequestJsonProg(commonOtpVal.Sys_file_common, commonOtpVal.deleteFile, param, function(response)
              {
                if(!HCG.chkResponse(response)) return;
                alert("삭제되었습니다.");
                if(HCG.isArray(response.Data))
                {
                  Vue.set(fileListComp, "files", response.Data);
                }
                else
                {
                  Vue.set(fileListComp, "files", []);
                }
              });
            }
            ,v_toggleList : function()
            {
              Vue.set(this, "bShowList", !this.bShowList);
            }
          }
        }
        /**
         * 업로드 리스트
         *  - <h-upload-list uploader-ref=''></h-upload-list>
         *  - file-upload 컴포넌트의 업로드 대기중인 파일 리스트
         *  - uploader-ref 프로퍼티로 file-upload 컴포넌트를 반드시 지정해야 합니다.
         */
        ,hUploadList :
        {
          template :  "<div v-if='value.length>0' class='col-sm-12 p-0 h-file-area'>"
                    + "  <div class='h-file' @click='v_toggleList'>"
                    + "    <p><i class='icon-file mr5'></i> <span class='bold-txt'>{{value.length}}</span>개의 업로드 할 파일이 있습니다.</p>"
                    + "  </div>"
                    + "  <ul v-if='bShowList' class='h-detail-info h-file-list-line mt10 mb10'>"
                    + "    <li v-for='(file, index) in value' :key='file.id'>"
                    + "      <div class='h-upload-list'>"
                    + "        <div class='media'>"
                    + "         <div class='wp100'>"
                    + "           <span class='detail-list'>{{file.name}} ({{file.size}})</span>"
                    + "           <div class='progress' v-if='file.active || file.progress !== \"0.00\"'>"
                    + "             <div :class='{\"progress-bar\": true, \"progress-bar-striped\": true, \"bg-danger\": file.error, \"progress-bar-animated\": file.active}' role='progressbar' :style='{width: file.progress + \"%\"}'>{{file.progress}}%</div>"
                    + "           </div>"
                    + "           <div class='bold-txt'>"
                    + "             <p v-if='file.error' class='mt5'>Error! (type : {{file.error}})</p>"
                    + "             <p v-else-if='file.success' class='mt5'>업로드성공</p>"
                    + "             <p v-else-if='file.active' class='mt5'>업로드중</p>"
                    + "             <p v-else  class='mt5'>대기중</p>"
                    + "           </div>"
                    + "         </div>"
                    + "         <div class='media-body'>"
                    + "           <div class='text-right'>"
                    + "             <input type='button' @click.prevent='v_cancel(file)'>"
                    + "           </div>"
                    + "         </div>"
                    + "        </div>"
                    + "      </div>"
                    + "    </li>"
                    + "  </ul>"
                    + "</div>"
          ,props :
          {
            // 필수 prop
            value         : { type : Array,   required : true }
            ,uploaderRef  : { type : String,  required : true,  "default" : "" }    // uploader-ref : 파일업로드 컴포넌트 ref
            // 옵션 prop
            ,showList     : { type : Boolean, required : false, "default" : true }  // show-list : 리스트 출력 초기값
          }
          ,data : function()
          {
            return {
              bShowList : this.showList
            }
          }
          ,methods :
          {
            v_cancel : function(item)
            {
              //업로드 취소
              if(item.error == "")
              {
                if(!confirm(HCG.ajaxMsg('MSG_CONFIRM_MAIN_0002'))) return;
              }
              
              if( !this.$root.$refs[this.uploaderRef] )
              {
                alert("invalid uploader ref")
              }
              else
              {
                this.$root.$refs[this.uploaderRef].remove(item);
              }
            }
            ,v_toggleList : function()
            {
              Vue.set(this, "bShowList", !this.bShowList);
            }
          }
        }
        //h-var-chart
        ,hVarChart :
        {
          template : "<div>{{fNum}}/{{fTotal}}"
                    +"  <div v-if='labelPosition==\"top\"'>"
                    +"    <span v-if='!customLabel'><span>{{fNum}}</span> / <span>{{fTotal}}</span></span>"
                    +"    <span v-else='!customLabel'>{{customLabel}}</span>"
                    +"  </div>"
                    +"  <div>"
                    +"    <div :style='totalWidth'>"
                    +"      <div :style='fillWidth'></div>"
                    +"    </div>"
                    +"  </div>"
                    +"  <div v-if='labelPosition==\"bottom\"'>"
                    +"    <span v-if='!customLabel'><span>{{fNum}}</span> / <span>{{fTotal}}</span></span>"
                    +"    <span v-else='!customLabel'>{{customLabel}}</span>"
                    +"  </div>"
                    +"</div>"
          ,props :
          {
            // 필수속성
            num             : { type : [Number, String],  required : true}
            ,total          : { type : [Number, String],  required : true}
            // 옵션속성
            ,height         : { type : String,            required : false,   "default" : "11px" }    // height : 차트높이
            ,borderRadius   : { type : String,            required : false,   "default" : "11px" }    // border-radius : 차트 둥근모서리
            ,bgColorNum     : { type : String,            required : false,   "default" : "#009afa" } // bg-color-num : 차트 데이터 색깔
            ,bgColorTotal   : { type : String,            required : false,   "default" : "#e1e8f0" } // bg-color-total : 차트 배경 색깔
            ,labelPosition  : { type : String,            required : false,   "default" : ""}         // label-position : 레이블 포지션 (top, bottom)
            ,customLabel    : { type : String,            required : false,   "default" : ""}
          }
          ,computed :
          {
            fillWidth : function()
            {
              var height = this.height.toString();
              var borderRadius = this.borderRadius.toString();
              var width = (this.fNum / this.fTotal * 100 > 100 ? 100 : this.fNum / this.fTotal * 100).toString() + "%";
              return "background:" + this.bgColorNum + ";height:" + this.strHeight + ";border-radius:" + this.strBorderRadius + ";width:" + width + ";";
            }
            ,totalWidth : function()
            {
              var width = "100%";
              return "background:" + this.bgColorTotal + ";height:" + this.strHeight + ";border-radius:" + this.strBorderRadius + ";width:" + width + ";";
              
            }
            ,strHeight : function()
            {
              return this.height.toString();
            }
            ,strBorderRadius : function()
            {
              return this.borderRadius.toString();
            }
            ,fNum : function()
            {
              if( typeof this.num == "number"  )
              {
                if( isNaN(this.num) || this.num === Infinity )
                {
                  return 0;
                }
              }
              return parseFloat(this.num);
            }
            ,fTotal : function() 
            {
              if( this.fNum == 0 )
              {
                return 1;
              }
              else if( typeof this.total == "number"  )
              {
                if( isNaN(this.total) || this.total === Infinity )
                {
                  return 0;
                }
              }
              return parseFloat(this.total);
            }
            ,
          }
        }
        /**
         * 스타일이 적용된 콤보박스
         *  - <h-combo id='xx' name='xx' v-model='xx' :combo='[]' ></h-combo>
         *  - id, name, combo는 필수속성입니다
         */
        ,hCombo : 
        {
          template : "<div class='h-select-style type01 mb_15' >"
                   + "  <p class='h-select-text' @click='v_open' ref='label'>{{text}}</p>"
                   + "  <ul style='display: none;' ref='comboList' @mouseover='v_over()' @mouseout='v_out()'>"
                   + "    <li v-for='item in cCombo' @click='v_select(item)' >"
                   + "      {{v_getItemCdNm(item)}}"
                   + "    </li>"
                   + "  </ul>"
                   + "  <input type='hidden' :id='id' :name='name' :key_field='cKeyField' :value='value'>"
                   + "</div>"
          ,props : 
          {
             value          : { type : String,  required : false,   "default" :"" }        // value프로퍼티는 예외적으로 v-model로 지정한다.ex) <h-data-field v-model='xx' ..>
            ,name           : { type : String,  required : false }                         // 엘리먼트 name 
            ,id             : { type : String,  required : false }                         // 엘리먼트 id
            ,combo          : { type : Array,   required : false,  "default" : [] }       // 콤보 배열
            ,colCd          : { type : String,  required : false,  "default" : "CD"}      // col-cd : 콤보값 컬럼
            ,colCdNm        : { type : String,  required : false,  "default" : "CD_NM"}   // col-cd-nm : 콤보명 컬럼
            ,keyField       : { type : String,  required : false,  "default" : "N"}       // key-field : 필수여부
            ,key_field      : { type : String,  required : false,  "default" : "N"}       // key-field : 필수여부
            ,nullOption     : { type : String,  required : false,  "default" : ""}        // null-option : null값옵션 (A:전체, S:선택, N:빈값, 기본값: 널없음)
            ,nullLabel      : { type : String,  required : false,  "default" : ""}        // null-label : null값 문자열 커스텀
            ,closeInterval  : { type : [String, Number],  required : false,  "default" : 2000}      // close-interval : 자동닫기 interval 
          }
          ,data : function()  
          {
            return {
              text : "" // 현재 선택중인 콤보값 텍스트
              ,selectedItem : {} // 현재 선택중인 콤보객체
              ,nullLabelAll : HCG.ajaxMsg("MSG_all")
              ,nullLabelSelect : HCG.ajaxMsg("MSG_select_1")
              ,bInitVal : false
            }
          }
          ,mounted : function()
          {
            this.v_initVal();
          }
          ,methods :
          {
            v_initVal : function()
            {
              //  not null model
              if( HCG.isVal(this.value) )
              {
                var _item = null;
                var _vi = this;
                this.v_setValue(this.value, true);
              }
              else
              {
                this.v_setValue("", true);
              }
            }
            ,v_getItemCd : function(item)
            {
              if( HCG.isVal(item[this.colCd]) )
              {
                return item[this.colCd];
              }
              else
              {
                return "";
              }
            }
            ,v_getItemCdNm : function(item)
            {
              if( HCG.isVal(item[this.colCdNm]) )
              {
                return item[this.colCdNm];
              }
              else
              {
                return "";
              }
            }
            ,v_open : function()
            {
              if( HCG.isAni() )
              {
                $(this.$refs.comboList).stop().slideDown();
              }
              else
              {
                $(this.$refs.comboList).show();
              }
            }
            ,v_over : function()
            {
              clearTimeout(window["seleterControlTimer"+this.id]);
            }
            ,v_out : function()
            {
              clearTimeout(window["seleterControlTimer"+this.id]);
              var $elemUl = $(this.$refs.comboList);
              window["seleterControlTimer"+this.id] = setTimeout(function(){
                if( HCG.isAni() )
                {
                  $elemUl.stop().slideUp();
                }
                else
                {
                  $elemUl.hide();
                }
              }, 750);
            }
            ,v_setValue : function(val, bInitVal)
            {
              if( HCG.isVal(val) )
              {
                var _item = null;
                var _vi = this;
                var _combo = this.combo || [];
                
                $.each(_combo, function(i, item){
                  if( item[_vi.colCd] == val )
                  {
                    _item = item;
                    return false; // break;
                  }
                });
                if( _item != null )
                {
                  this.v_setItem(val, _item[this.colCdNm], bInitVal, _item);
                }
              }
              // null set
              else
              {
                switch(this.nullOption)
                {
                  case "A":
                  {
                    this.v_setItem("", ( HCG.isVal(this.nullLabel) ? this.nullLabel : this.nullLabelAll), bInitVal, {});
                  }
                  break;
                  case "S":
                  {
                    this.v_setItem("", ( HCG.isVal(this.nullLabel) ? this.nullLabel : this.nullLabelSelect), bInitVal, {} );
                  }
                  break;
                  case "N":
                  {
                    this.v_setItem("", "", bInitVal, {} );
                  }
                  break;
                  default :
                  {
                    if(HCG.isArray(this.combo))
                    {
                      this.v_setItem(this.combo[0][this.colCd], this.combo[0][this.colCdNm], bInitVal, this.combo[0]);
                    }
                  }
                }
              }
            }
            ,v_setItem : function(cd, cdnm, bInitVal, item)
            {
              item = item || {}
              this.selectedItem = item;
              
              this.text = cdnm;
              this.$emit('input', cd); // v-model 바인딩
              
              // bWithoutEvent : 값을 입력하지만 이벤트를 트리거 하지 않음
              if( bInitVal )
              {
                Vue.set(this, "bInitVal", true);
              }
            }
            ,v_select : function(item)
            {
              var cd = this.v_getItemCd(item);
              var cdnm = this.v_getItemCdNm(item);
              if( cd != "" && cdnm != "" )
              {
                this.v_setItem(cd, cdnm, false, item);
              }
              if( HCG.isAni() )
              {
                $(this.$refs.comboList).stop().slideUp();
              }
              else
              {
                $(this.$refs.comboList).hide();
              }
            }
            ,v_getText : function()
            {
              return this.text;
            }
          }
          ,computed :
          {
            cCombo : function()
            {
              var returnCombo = new Array();
              var paramCombo = this.combo || [];
              var objNull = {};
              
              switch(this.nullOption)
              {
                case "A":
                {
                  objNull[this.colCd] = "";
                  objNull[this.colCdNm] = HCG.isVal(this.nullLabel) ? this.nullLabel : this.nullLabelAll;
                  returnCombo.push(objNull);
                  returnCombo = returnCombo.concat(paramCombo);
                }
                break;
                case "S":
                {
                  objNull[this.colCd] = "";
                  objNull[this.colCdNm] = HCG.isVal(this.nullLabel) ? this.nullLabel : this.nullLabelSelect;
                  returnCombo.push(objNull);
                  returnCombo = returnCombo.concat(paramCombo);
                }
                break;
                case "N":
                {
                  objNull[this.colCd] = "";
                  objNull[this.colCdNm] = "";
                  returnCombo.push(objNull);
                  returnCombo = returnCombo.concat(paramCombo);
                }
                break;
                default:
                {
                  returnCombo = returnCombo.concat(paramCombo);
                }
              }
              return returnCombo;
            }
            ,cKeyField : function()
            {
              return (this.keyField == "Y" || this.key_field == "Y")
            }
          }
          ,watch :
          {
            combo : function(newCombo, oldCombo)
            {
              this.v_initVal();
            }
            ,value : function(newVal, oldVal) //v-model
            {
              this.v_setValue(this.value, false);
              if( this.bInitVal )
              {
                this.$emit('change', this.value);
              }
            }
          }
        }
        /**
         * 
         * <h-select></h-select>
         */
        ,hSelect :
        {
          template : "<select :id='id' :name='name' :key_field='cKeyField' ref='sel' @change='v_updateModel'>"
                   + "  <option v-if='v_bNullOption()' value=''>{{cNullLabel}}</option>"
                   + "  <option v-for='item in combo' :value='v_getItemCd(item)' :ref='\"opt\"+v_getItemCd(item)'>"
                   + "  {{v_getItemCdNm(item)}}"
                   + "  </option>"
                    +"</select>"
          ,props : 
          {
            value           : { type : String,  required : false,   "default" :"" }       // value프로퍼티는 예외적으로 v-model로 지정한다.ex) <h-data-field v-model='xx' ..>
            ,name           : { type : String,  required : false }                        // 엘리먼트 name 
            ,id             : { type : String,  required : false }                        // 엘리먼트 id
            ,combo          : { type : Array,   required : false,  "default" : [] }       // 콤보 배열
            ,colCd          : { type : String,  required : false,  "default" : "CD"}      // col-cd : 콤보값 컬럼
            ,colCdNm        : { type : String,  required : false,  "default" : "CD_NM"}   // col-cd-nm : 콤보명 컬럼
            ,keyField       : { type : String,  required : false,  "default" : "N"}       // key-field : 필수여부
            ,key_field      : { type : String,  required : false,  "default" : "N"}       // 
            ,nullOption     : { type : String,  required : false,  "default" : ""}        // null-option : null값옵션 (A:전체, S:선택, N:빈값, 기본값: 널없음)
            ,nullLabel      : { type : String,  required : false,  "default" : ""}        // null-label : null값 문자열 커스텀
          }
          ,data : function()  
          {
            return {
              selectedItem : {} // 현재 선택중인 콤보객체
              ,nullLabelAll : HCG.ajaxMsg("MSG_all")
              ,nullLabelSelect : HCG.ajaxMsg("MSG_select_1")
            }
          }
          ,mounted : function()
          {
            this.v_initVal();
          }
          ,updated : function()
          {
            this.$refs.sel.value = this.value;
          }
          ,methods :
          {
            v_bNullOption : function()
            {
              return this.nullOption != ""; 
            }
            ,v_updateModel : function(event)
            {
              this.$emit("input", event.target.value);
            }
            ,v_updateModel1 : function(val)
            {
              this.$emit("input", val);
            }
            ,v_initVal : function()
            {
              //  not null model
              if( HCG.isVal(this.value)  )
              {
                var _item = null;
                var _vi = this;
                this.v_setValue(this.value, true);
              }
              else
              {
                this.v_setValue("", true);
              }
            }
            ,v_getItemCd : function(item)
            {
              if( HCG.isVal(item[this.colCd]) )
              {
                return item[this.colCd];
              }
              else
              {
                return "";
              }
            }
            ,v_getItemCdNm : function(item)
            {
              if( HCG.isVal(item[this.colCdNm]) )
              {
                return item[this.colCdNm];
              }
              else
              {
                return "";
              }
            }
            ,v_setValue : function(val, bWithoutEvent)
            {
              if( HCG.isVal(val) )
              {
                var _item = null;
                var _vi = this;
                var _combo = this.combo || [];

                $.each(_combo, function(i, item){
                  if( item[_vi.colCd] == val )
                  {
                    _item = item;
                    return false; // break;
                  }
                });
                if( _item != null )
                {
                  this.v_setItem(val, bWithoutEvent, _item);
                }
                else
                {
                  this.v_setItem(val, bWithoutEvent, this.v_nullItem());
                }
              }
              else
              {
                this.v_setItem("", bWithoutEvent, this.v_nullItem());
              }
            }
            ,v_setItem : function(cd, bWithoutEvent, item)
            {
              item = item || {}
              this.selectedItem = item;
              this.$refs.sel.value = cd;
              this.$emit("input", cd);
              // bWithoutEvent : 값을 입력하지만 이벤트를 트리거 하지 않음
              if( !bWithoutEvent )
              {
                this.$emit('change', cd);
              }
            }
            ,v_nullItem : function()
            {
              var rv = {};
              rv[this.colCd] = "";
              rv[this.colCdNm] = "";
              return rv;
            }
          }// method end
          ,computed :
          {
            // 현재 선택중인 콤보값 텍스트
            text : function()
            {
              return this.selectedItem[this.colCdNm];
            }
            ,cNullLabel : function()
            {
              if( HCG.isVal(this.nullLabel) )
              {
                return this.nullLabel;
              }
              else
              {
                switch(this.nullOption)
                {
                  case "A": {return this.nullLabelAll;} break;
                  case "S": {return this.nullLabelSelect;} break;
                  default : {return "";}
                }
              }
            }
            ,cKeyField : function()
            {
              return (this.keyField == "Y" || this.key_field == "Y")
            }
          }
          ,watch :
          {
            combo : function(newCombo, oldCombo)
            {
              this.v_initVal();
            }
            ,value : function(newVal, oldVal)
            {
              this.v_setValue(newVal, false);
            }
          }
        }
        /**
         * hunel 포매팅이 적용된 input
         * <h-formatted-input>
         */
        ,hFormattedInput :
        {
          template : "  <input type='text' :class='cClass'"
                   + "    :value='cValue'"
                   + "    :key_field='cKeyField'"
                   + "    :readonly='cReadonly'"
                   + "    :disabled='cDisabled'"
                   + "    v-bind='$attrs'"
                   + "    @keyup='v_keyUp'"
                   + "    @change='v_change'"
                   + "    @blur='v_blur'"
                   + "    @focus='v_focus'"
                   + "  />"
          ,mounted : function()
          {
            this.v_applyDatepicker();
          }
          ,updated : function()
          {
            this.v_applyDatepicker();
          }
          ,beforeDestroy : function()
          {
            $(this.$el).datepicker('hide').datepicker('destroy');
          }
          ,props : 
          {
            value         : { type : [String, Number],  required : true,  "default" : function(v){return HCG.nvl(v,"")} }   // v-model 
            ,dataFormat   : { type : String,            required : true }                  // data-format : hunel 포매팅형식 ex) dfInteger
            ,align        : { type : String,            required : false, "default" : "" } // align : 정렬(left/center/right)
            ,readonly     : { type : [String, Boolean], required : false, "default" : "N"}
            ,disabled     : { type : [String, Boolean], required : false, "default" : "N"}
          }
          ,data : function()  
          {
            return {
              bReadonly : false
              ,isInteger : (this.dataFormat.indexOf("dfInteger") != -1)
              ,isFloat : (this.dataFormat.indexOf("dfFloat") != -1)
              ,isDate : (this.dataFormat.indexOf("dfDate") != -1)
              ,isTime : (this.dataFormat.indexOf("dfTime") != -1)
            }
          }
          ,methods :
          {
            v_keyUp : function(event)
            {
              var val = event.target.value;
              var unformatVal = HCG.restoreValue(HCG.formatValue(val, this.dataFormat), this.dataFormat);
              this.$emit("input", "");
              this.$emit("input", unformatVal);
            }
            ,v_change : function(event)
            {
              this.$emit("change", event);
            }
            ,v_blur : function(event)
            {
              this.$emit("blur", event);
            }
            ,v_focus : function(event)
            {
              this.$emit("focus", event);
            }
            ,v_applyDatepicker : function()
            {
              if( this.dataFormat == "dfDateYmd" )
              {
                var vc = this;
                var $el = $(vc.$el);

                // 기간일 경우 FROM 달력출력 X
                var $periodWrap = $(this.$el).closest(".h-calendar2, [search_item='period']");
                var isPeriod = $periodWrap.length > 0;
                var paramShowOn = "both";
                if( isPeriod && $periodWrap.find("input")[0] == this.$el )
                {
                  paramShowOn = "focus";
                }
                
                $el.datepicker({
                  showOn: paramShowOn,
                  buttonImage: "/resource/images/icon/icon_calender.png",
                  buttonImageOnly: true,
                  buttonText : "",
                  dateFormat : "yy.mm.dd",
                  changeYear:true,
                  changeMonth:true,
                  closeText:"Close",
                  yearRange:"1900:2100",
                  showOtherMonths:true,
                  selectOtherMonths:true,
                  showButtonPanel: true,
                  onSelect: function(d)
                  {
                    var oldVal = vc.value;
                    var newVal = HCG.restoreValue(d, vc.dataFormat);
                    vc.$emit("input", newVal);
                    if( oldVal != newVal )
                    {
                      vc.$emit("change");
                    }
                  },
                  onClose : HCG.removeAria
                });
                
                $el.datepicker("enable");
                var $elemImg = $el.siblings("img");
                $elemImg.addClass("h-datepicker-button");
                $elemImg.attr('aria-describedby', 'datepickerLabel');
                dayTripper();
                
                var disabled = vc["cDisabled"];
                var readonly = vc["cReadonly"];
                if( disabled || readonly )
                {
                  Vue.set(this, "bReadonly", true);
                }
                else
                {
                  Vue.set(this, "bReadonly", false);
                }
                
                if( this.bReadonly )
                {
                  $el.datepicker("option", "buttonImage", "/resource/images/icon/icon_calender.png");
                  $el.datepicker("option", "disabled", true);
                }
              }
            }
          }
          ,computed :
          {
            cValue : function()
            {
              if( !HCG.isVal(this.dataFormat) )
              {
                return "data-format undefined"; 
              }
              else
              {
                return this.$root.v_formatValue(this.value, this.dataFormat);
              }
            }
            ,cClass : function()
            {
              var objClass = {};
              
              if( this.dataFormat == "dfDateYmd" )
              {
                objClass["h-datepicker"] = true;
              }
              
              var align = "left";
              // 우측정렬 (숫자)
              if( HCG.isVal(this.align) )
              {
                align = this.align;
              }
              else if(this.isInteger || this.isFloat)
              {
                align = "right";
              }
              // 중앙정렬 (날짜, 시간, 주민등록번호)
              else if( this.isDate || this.isTime || (this.dataFormat == "dfIdNo") )
              {
                align = "center";
              }
              switch(align)
              {
                case "right":
                {
                  objClass["text-right"] = true;
                }
                break;
                case "center":
                {
                  objClass["text-center"] = true;
                }
                break;
              }
              
              return objClass;
            }
            ,cKeyField : function()
            {
              return (this.keyField == "Y" || this.key_field == "Y")
            }
            ,cReadonly : function()
            {
              return ( this.readonly == "Y" || this.readonly === true );
            }
            ,cDisabled : function()
            {
              return ( this.disabled == "Y" || this.disabled === true );
            }
          }
        }
        /**
         * 프리폼 CRUD 버튼
         * <h-freeform-button type='' data=''></h-freeform-button>
         * @event click 이벤트는 기본기능 수행 후 호출됨
         */
        ,hFreeformButton :
        {
          template : "<input type='button' class='h-btn-style01 small h-form-btn' "
                   + "  v-if='cShow'"
                   + "  :class='cClass'"
                   + "  :value='cBtnLabel'"
                   + "  @click='v_click'"
                   + "/>"
          ,props : 
          {
            type            : { type : String,  required : true }                         // 버튼유형
            ,data           : { type : Object,  required : true }                         // 제어할 데이터 Row. single형일 경우 freeform.data, list형일 경우 freeform.data[i]
            ,bShow          : { type : Boolean, required : false, "default" : undefined } // 버튼 출력조건 임의지정 (v-if 조건문 커스텀)
            ,bDefaultAction : { type : Boolean, required : false, "default" : true }      // 버튼클릭 기본동작 수행여부(클릭이벤트 커스텀을 할 경우 false로)
          }
          ,data : function()  
          {
            return {
            }
          }
          ,methods :
          {
            v_click : function()
            {
              if( this.bDefaultAction )
              {
                switch(this.type)
                {
                  // 편집버튼 기본동작 : 편집/취소 Toggle
                  case "edit":
                  {
                    this.$root.cFreeform.v_edit(this.data);
                  }
                  break;
                  // 저장버튼 기본동작 : 유효성체크, save confirm
                  case "save":
                  {
                    if ( !this.$root.cFreeform.v_checkData( this.data ) ) return;
                    if ( !confirm(HCG.ajaxMsg("MSG_CONFIRM_SAVE")) ) return;
                  }
                  break;
                  // 삭제버튼 기본동작 
                  //  : 추가데이터는 바로삭제
                  //  : 삭제상태로 변경, 유효성체크, delete confirm
                  case "delete":
                  {
                    if( HCG.nvl(this.data._status) == "add" )
                    {
                      // 추가모드일 때는 row만 삭제
                      this.$root.cFreeform.v_remove(this.data);
                      return;
                    }
                    if ( !this.$root.cFreeform.v_checkData( this.data ) ) return;
                    if ( !confirm(HCG.ajaxMsg("MSG_CONFIRM_DELETE")) ) return;
                    Vue.set(this.data, "_status", "delete");
                  }
                  break;
                }
              }
              
              // click trigger
              this.$emit("click");
            }
          }// method end
          ,computed :
          {
            cBtnLabel : function()
            {
              switch(this.type)
              {
                case "save":
                {
                  return HCG.getMultiLang("label", "save", "저장");
                }
                break;
                case "edit":
                {
                  if( HCG.nvl(this.data._status) == "edit" )
                  {
                    return HCG.getMultiLang("label", "cancel", "취소");
                  }
                  else
                  {
                    return HCG.getMultiLang("label", "main_500_004", "편집");
                  }
                }
                break;
                case "delete":
                {
                  return HCG.getMultiLang("label", "delete", "삭제");
                }
                break;
              }
            }
            ,cClass : function()
            {
              switch(this.type)
              {
                case "edit":
                {
                  if( HCG.nvl(this.data._status) == "edit" )
                  {
                    return "h-delete";
                  }
                  else
                  {
                    return "h-edit";
                  }
                }
                break;
                case "save":
                {
                  return "h-save";
                }
                break;
                case "delete":
                {
                  return "h-delete";
                }
                break;
              }
            }
            // 버튼유형별 출력조건
            ,cShow : function()
            {
              if( typeof this.bShow != "undefined" )
              {
                return this.bShow;
              }
              
              var status = HCG.nvl(this.data._status) 
              switch(this.type)
              {
                // 저장버튼
                case "save":
                {
                  if( status == "edit" || status == "add" )
                  {
                    return true;
                  }
                }
                break;
                // 편집버튼
                case "edit":
                {
                  if( status != "add" )
                  {
                    return true;
                  }
                }
                break;
                // 삭제버튼
                case "delete":
                {
                  if( status == "read" || status == "add" )
                  {
                    return true;
                  }
                }
                break;
                default: return false;
              }
              return false;
            }
          }
        }
      } // components end
      // Vue인스턴스 생성 전에 사용할 함수
      ,checkVueElement : function()
      {
        var bChk = false;
        
        if($(this.el).length>0)
        {
          bChk = true;
        }
        return bChk;
      }
    }
  }
  /**
   * hunel에서 Vue.js를 사용하기 위한 초기화 Wrapper함수 
   * <br/>HCG.baseVueParam과 (vueParam)을 merge하여 Vue앱을 생성한다.
   * @member HCG
   * @method initVue
   * @param {Object} vueParam Vue App 파라미터
   * @param {Object} applVueParam 추가로 Merge되는 파라미터
   */
  ,initVue : function(oVueParam, oApplVueParam)
  {
    var vueParam = Object.create(new HCG.baseVueParam() );

    if(oApplVueParam != undefined  && oApplVueParam.data !=undefined )
    {
      //추가적인 vueparam을 merge하는 경우
      $.extend( true, vueParam,  $.extend( true ,oApplVueParam, oVueParam) );
    }
    else
    {
      //일반적인 케이스는 개발자의 param과 baseparam만 merge
      $.extend( true, vueParam, oVueParam);
    }  

    if(!vueParam.checkVueElement())
    {
      alert("Vue인스턴스의 객체(el속성)를 찾지 못했습니다.");
      return null;
    }
    var vueInstance = new Vue(vueParam);
    return vueInstance;
  }
  /**
   * hunel 신청서의 Vue App 초기화하는 함수
   * @member HCG
   * @method initVue
   * @param {Object} vueParam Vue App 파라미터
   */
  ,initApplVue : function(oVueParam)
  {
    var vueParam = Object.create(new HCG.baseVueParam() );
    $.extend( true, vueParam,  $.extend( true ,baseApplVueParam, oVueParam) );
    
    if(!vueParam.checkVueElement())
    {
      alert("Vue인스턴스의 객체(el속성)를 찾지 못했습니다.");
      return null;
    }
    var vueInstance = new Vue(vueParam);
    return vueInstance;
  }
  /**
   * hunel 공통 ajax 함수 (response가 XmlSheet타입)
   * @member HCG
   * @method ajaxRequestXS
   * @param {String} dsClass 호출할 class
   * @param {String} dsMethod 호출할 method
   * @param {Object} params 전송할 파라미터
   * @param {Function} onSuccessXS 요청성공시 호출할 콜백함수. response는 첫번째파라미터로 핸들링
   * @param {Function} onComplete jQuery ajax complete
   * @param {Object} options 기타 jquery ajax 옵션파라미터
   */
  ,ajaxRequestXS : function(dsClass, dsMethod, otherParams, onSuccessXS, onComplete, options)
  {
    options = $.extend( options , { Progress : false });
    HCG.send(dsClass, dsMethod, otherParams, onSuccessXS, function(transport, param){onComplete && onComplete(transport, param); }, options);
  }
  /**
   * hunel 공통 ajax 함수 (response가 XmlSheet타입)
   * <br/>ajaxRequestXS에서 Progress옵션이 추가됨
   * @member HCG
   * @method ajaxRequestXSProg
   * @param {String} dsClass 호출할 class
   * @param {String} dsMethod 호출할 method
   * @param {Object} params 전송할 파라미터
   * @param {Function} onSuccessXS 요청성공시 호출할 콜백함수. response는 첫번째파라미터로 핸들링
   * @param {Function} onComplete jQuery ajax complete
   * @param {Object} options 기타 jquery ajax 옵션파라미터
   */
  ,ajaxRequestXSProg : function (dsClass, dsMethod, otherParams, onSuccessXS, onComplete, options)
  {
    options = $.extend( options , { Progress : true });
    HCG.send(dsClass, dsMethod, otherParams, onSuccessXS, function(transport, param){onComplete && onComplete(transport, param); }, options);
  }
  /**
   * hunel 공통 ajax 함수 (response가 XmlSheet타입)
   * <br/>ajaxRequestXS에서 async옵션이 해제되어 비동기 요청을 보낼 경우 사용(권장하지 않음)
   * @member HCG
   * @method ajaxSyncRequestXS
   * @param {String} dsClass 호출할 class
   * @param {String} dsMethod 호출할 method
   * @param {Object} params 전송할 파라미터
   * @param {Function} onSuccessXS 요청성공시 호출할 콜백함수. response는 첫번째파라미터로 핸들링
   * @param {Function} onComplete jQuery ajax complete
   * @param {Object} options 기타 jquery ajax 옵션파라미터
   */
  ,ajaxSyncRequestXS : function (dsClass, dsMethod, otherParams, onSuccessXS, onComplete, options)
  {
    options = $.extend( options , { async: false, Progress : true });
    HCG.send(dsClass, dsMethod, otherParams, onSuccessXS, function(transport, param){onComplete && onComplete(transport, param); }, options);
  }
  /**
   * hunel 공통 ajax 함수 (response가 json타입)
   * @member HCG
   * @method ajaxRequestJson
   * @param {String} dsClass 호출할 class
   * @param {String} dsMethod 호출할 method
   * @param {Object} params 전송할 파라미터
   * @param {Function} onSuccessXS 요청성공시 호출할 콜백함수. response는 첫번째파라미터로 핸들링
   * @param {Function} onComplete jQuery ajax complete
   * @param {Object} options 기타 jquery ajax 옵션파라미터
   */
  ,ajaxRequestJson : function(dsClass, dsMethod, otherParams, onSuccessXS, onComplete, options)
  {
    options = $.extend( options , { Progress : false, dataType:"JSON" });
    HCG.send(dsClass, dsMethod, otherParams, onSuccessXS, function(transport, param){onComplete && onComplete(transport, param); }, options);
  }
  /**
   * hunel 공통 ajax 함수 (response가 json타입)
   * <br/>ajaxRequestXS에서 Progress옵션이 추가됨
   * @member HCG
   * @method ajaxRequestJsonProg
   * @param {String} dsClass 호출할 class
   * @param {String} dsMethod 호출할 method
   * @param {Object} params 전송할 파라미터
   * @param {Function} onSuccessXS 요청성공시 호출할 콜백함수. response는 첫번째파라미터로 핸들링
   * @param {Function} onComplete jQuery ajax complete
   * @param {Object} options 기타 jquery ajax 옵션파라미터
   */
  ,ajaxRequestJsonProg : function (dsClass, dsMethod, otherParams, onSuccessXS, onComplete, options)
  {
    options = $.extend( options , { Progress : true, dataType:"JSON" });
    HCG.send(dsClass, dsMethod, otherParams, onSuccessXS, function(transport, param){onComplete && onComplete(transport, param); }, options);
  }
  /**
   * hunel 공통 ajax 함수 (response가 json타입)
   * <br/>ajaxRequestXS에서 async옵션이 해제되어 비동기 요청을 보낼 경우 사용(권장하지 않음)
   * @member HCG
   * @method ajaxSyncRequestJson
   * @param {String} dsClass 호출할 class
   * @param {String} dsMethod 호출할 method
   * @param {Object} params 전송할 파라미터
   * @param {Function} onSuccessXS 요청성공시 호출할 콜백함수. response는 첫번째파라미터로 핸들링
   * @param {Function} onComplete jQuery ajax complete
   * @param {Object} options 기타 jquery ajax 옵션파라미터
   */
  ,ajaxSyncRequestJson : function (dsClass, dsMethod, otherParams, onSuccessXS, onComplete, options)
  {
    options = $.extend( options , { async: false, Progress : true, dataType:"JSON" });
    HCG.send(dsClass, dsMethod, otherParams, onSuccessXS, function(transport, param){onComplete && onComplete(transport, param); }, options);
  }
  /**
   * hunel Vue app에서 조회전용으로 사용되는 ajax 함수
   * <br/>Vue 인스턴스(param)에는 클래스명(dsClass) / 메서드명(dsMethod) / 조회조건파라미터(condition)이 있어야 함
   * @member HCG
   * @method ajaxSearch
   * @param {Object} param 파라미터객체(Vue 인스턴스)
   * @param {Function} onSuccessXS 요청성공시 호출할 콜백함수. response는 첫번째파라미터로 핸들링
   * @param {Function} onComplete jQuery ajax complete
   * @param {Object} options 기타 jquery ajax 옵션파라미터
   */
  ,ajaxSearch : function( paramObj, onSuccessXS, onComplete, options)
  {
    if(paramObj != null && paramObj != undefined && HCG.isVal(paramObj.dsClass) && HCG.isVal(paramObj.dsMethod) )
    {
      var dsClass     = paramObj.dsClass;
      var dsMethod    = paramObj.dsMethod;
      var otherParams = paramObj.condition||{};
      var options     = options||{};
      
      // 기본적으로 JSON형식의 데이터 사용
      if( !HCG.isVal(options.dataType) )
      {
        options.dataType = "JSON";
      }
      HCG.send(dsClass, dsMethod, otherParams, onSuccessXS, onComplete, options);
    }
    else
    {
      alert("wrong invoke! check dsClass, dsMethod parameter.");
    }
  }
  /**
   * ajax호출
   * @method send
   * @param {String} dsClass 실행할 class 명
   * @param {String} dsMethod 실행할 method 명 
   * @param {Object} otherParams 파라미터
   * @param {Function} onSuccessXS ajax요청 성공시 실행함수
   * @param {Function} onComplete ajax요청 완료시 실행함수
   * @param {Object} options 옵션
   */
  ,send : function(dsClass, dsMethod, otherParams, onSuccessXS, onComplete, options)
  {
    $.extend(otherParams, {S_PGM_OPEN_TIME:S_PGM_OPEN_TIME, S_ENC_OTP_KEY: S_ENC_OTP_KEY, S_CSRF_SALT: S_CSRF_SALT});
    if(options.dataType=="JSON")
    {
      $.extend(otherParams, {S_FORWARD:"xsheetResultJson"});
    }
    options = options || {};
    if( typeof options.Progress != "undefined" && options.Progress == true )
    {
      Progress.start();
    }
    $.ajax({
        url : options.url || __baseAction
      , async : options.async==null?true:options.async
      , type : options.type || "POST"
      , beforeSend : function(xhr){ xhr.setRequestHeader( 'ajax' , 'true' ); }
      , data : options.parameters || HCG.makeParameters(dsClass, dsMethod, otherParams)
      , dataType : options.dataType || "text"      
      , success : options.onSuccess || function (transport) { HCG.onSuccess(transport, onSuccessXS, options);  }
      , complete : options.onComplete || onComplete 
      , error : function(xhr, textStatus, thrownError){
        options.error || HCG.onFailure(xhr, textStatus, thrownError);
      }
    })
    .always(function(){
      if(options.Progress == true)
      {
        Progress.stop();
      }
     });  
  }
  /**
   * ajax요청이 성공적으로 끝났을 경우 실행되는 함수
   * @member HCG
   * @method onSuccess
   * @param {Anything} transport 데이터
   * @param {Function} onSuccessXS 다국어 구분 코드
   * @param {Object} options 옵션
   */
  ,onSuccess : function(transport, onSuccessXS, options)
  {
    options = options || {};
    if(options.Progress == true)
    {
      if(Progress.count > 0) Progress.stop();
    }
    if(options.dataType=="JSON")
    {
      var msg = null;
      if( transport.Msg != undefined && transport.Msg != null && transport.Msg.length > 0)
      {
        if( transport.Msg[0].Error != undefined && transport.Msg[0].Error != null && transport.Msg[0].Error != "" )
        {
          msg = transport.Msg[0].Error;
        }
      }
      
      // makeXSheetWithXmlText의 메시지처리와 동일하게 수행
      if ( msg )
      {
        if ( HCG.doCheckMsg(msg) )
        {
          try{
            alert(HCG.ajaxMsg("MSG_ALERT_BATCH_FAIL")+"\n\n"+msg);
          }catch(e){
            alert(HCG.ajaxMsg("MSG_ALERT_BATCH_FAIL") + "\n\n"+msg);
          }
        }
        
        if(!HCG.startsWith(msg,"LOGIN_MAX_USER_FAIL"))
        {
        return null;  
        }
      }
      onSuccessXS(transport);
    }
    else
    {
      var xsheet = HCG.makeXSheetWithXmlText($.trim(transport));
      if ( xsheet == null ) return;
      onSuccessXS(xsheet);
    }
  }
  /**
   * ajax요청에서 error 발생시 실행되는 함수
   * @member HCG
   * @method onFailure
   * @param {jqXHR} xhr request
   * @param {String} textStatus 
   * @param {String} thrownError 에러메시지
   */
  ,onFailure : function( xhr, textStatus, thrownError)
  {
    alert(HCG.ajaxMsg("MSG_ALERT_RESPONSE_ERROR") + textStatus);
  }
  /**
   * 시트 조회, 저장 후 넘어오는 메시지를 체크
   * @member HCG
   * @method doCheckMsg
   * @param {String} msg
   * @return {Boolean}
   */
  ,doCheckMsg : function(msg)
  {
    //console.log(msg);
    msg = HCG.nvl(msg);
    if ( HCG.startsWith(msg,"LOGIN_CHECK_FAIL") )
    {
      if ( confirm(msg+"\n\n"+HCG.ajaxMsg("MSG_0013", Page.LANG)) )
      {
        HCG.checkLogout();
      }
      return false;
    }
    
    //OTP 메시지 재정의를 원할 경우 주석 해제, OTP_IS_WRONG 다국어프로퍼티를 원하는 메시지로 수정
    /*
    if(msg.indexOf("OTP is wrong") != -1)
    {
      if ( confirm(getMultiLang("message", "OTP_IS_WRONG", "Unauthorized request. OTP is wrong.~!~!", Page.LANG)+"\n\n"+ajaxMsg("MSG_0013", Page.LANG)) )
      {
        checkLogout();
      }
      return false;
    }
    */
    
    return true;
  }
  /**
   * 시트 컬럼 돌면서 함수 실행
   * @member HCG
   * @method sheetEachCol
   * @param {Object} sheet IBSheet 객체
   * @param {Function} f 실행할 함수
   * @param {Boolean} reverse 정순,역순 구분
   * @param {Number} startCol 시작컬럼 인덱스
   */
  ,sheetEachCol : function (sheet, f, reverse, startCol)
  {
    reverse = !!reverse;
    var returnObject = {};
    try
    {
      if ( reverse )
        for ( var c = HCG.nvl(startCol, sheet.LastCol()); c >= 0; c-- )
          f(c, sheet.GetCellProperty(0, c, "SaveName"), sheet, returnObject);
      else
        for ( var c = HCG.nvl(startCol, 0), lastC = sheet.LastCol(); c <= lastC; c++ )
          f(c, sheet.GetCellProperty(0, c, "SaveName"), sheet, returnObject);
    }
    catch(e)
    {
      if (e == $break) return returnObject.value;
      else throw e;
    }
  } 
  /**
   * 시트 로우를 돌면서 함수 실행
   * @member HCG
   * @method sheetEachRow
   * @param {Object} sheet IBSheet 객체
   * @param {Function} f 실행할 함수
   * @param {Boolean} reverse 정순,역순 구분
   * @param {Number} startRow 시작 row index
   * @param {Number} endRow 종료 row index
   */
  ,sheetEachRow : function (sheet, f, reverse, startRow, endRow) 
  {
    //sheet.Redraw = false;
    reverse = !!reverse;
    var returnObject = {};
    try
    {
      var firstRow = sheet.HeaderRows();
      var lastRow = sheet.HeaderRows() + sheet.RowCount() - 1;

      if ( reverse )
      {
        var loopStartRow = HCG.isNull(startRow) ? lastRow : Math.min(startRow, lastRow);
        var loopEndRow = HCG.isNull(endRow) ? firstRow : Math.max(endRow, firstRow);
        for ( var row = loopStartRow; row >= loopEndRow; row-- )
        {           
          f(row, sheet, returnObject);
        }
      }
      else
      {
        var loopStartRow = HCG.isNull(startRow) ? firstRow : Math.max(startRow, firstRow);
        var loopEndRow = HCG.isNull(endRow) ? lastRow : Math.min(endRow, lastRow);

        for ( var row = loopStartRow; row <= loopEndRow; row++)
        {   
          f(row, sheet, returnObject);
        }
      }
    }
    catch(e)
    {
      if (e == $break) return returnObject.value;
      throw e;
    }
    //sheet.Redraw = true;
  }
  /**
   * 함수(fFind) 실행 결과가 true 인 첫번째 Row를 찾는다
   * @member HCG
   * @method sheetFindRow
   * @param {Object} sheet IBSheet 객체
   * @param {Function} fFind 실행할 함수
   * @param {Boolean} reverse 정순,역순 구분
   * @param {Number} startRow 시작 row index
   * @return {Number} findRow
   */
  ,sheetFindRow : function (sheet, fFind, reverse, startRow)
  {
    var findRow = -1;
    HCG.sheetEachRow(sheet, function(row, sheet)
    {
      if ( fFind(sheet, row) )
      {
        findRow = row;
        return false;
      }
    }, reverse, startRow);
    return findRow;
  }    
  /**
   * 시트 파라미터 구성
   * @member HCG
   * @method sheetGetSaveString
   * @param {Object} sheet IBSheet 객체
   * @param {Object} options
   * @return {String}
   */
  ,sheetGetSaveString : function (sheet, options)
  {
    options = options || {};
    var saveString = sheet.GetSaveString(!!options.allSave, true).replace(/[+]/g, '%20');
    if ( options.prefix )
    {
      saveString = options.prefix+saveString.replace(/&/g, "&"+options.prefix);
    }
    return saveString;
  }
  /**
   * 메일보내기 팝업을 호출
   * @member HCG
   * @method popSendMail
   * @param {Object} options S_EMP_IDS:사번을 (,)로 연결한 문자열
   */
  ,popSendMail : function(options)
  {
    options = options || {};
    HCG.ModalUtil.open(args = {title:options.title, url: "/sys/sy_bas/sy_bas_210_f02.jsp", param: {S_EMP_IDS: options.S_EMP_IDS || ""}});
  }
  /**
   * 시트(sheet)에서 선택한 사원들을 대상으로 메일보내기 팝업을 호출
   * @member HCG
   * @method sheetPopAll
   * @param {Object} sheet IBSheet 객체
   * @param {Object} options emp_ids:사번을 (,)로 연결한 문자열, title:팝업 title, checkSaveName:sheet의 체크박스 savename, empIdSaveName:sheet의 empId savename
   */
  ,sheetPopMail : function(sheet, options)
  {
    options = options || {};
    title = options.title || HCG.ajaxLabel('send_mail');
    var checkSaveName = options.checkSaveName || "CCHK";
    var empIdSaveName = options.empIdSaveName || "EMP_ID";
    var emp_ids = options.emp_ids || [];
    
    if(emp_ids.length <=0){
      HCG.sheetEachRow(sheet, function(r, x)
      {
        if ( x.GetCellValue(r, checkSaveName) == "Y" )
        {
          emp_ids.push(x.GetCellValue(r, empIdSaveName));
        }
      });      
    }

    var S_EMP_IDS = emp_ids.join(",");
    HCG.popSendMail({S_EMP_IDS: S_EMP_IDS, title:title});
  }
  /**
   * 시트의 엑셀을 다운로드
   * <br/>컬럼갯수만큼 루프돌면서 hidden이 아닌 컬럼들만 구분자 '|'로 문자열 생성 후 DownCols 속성으로 넘겨줌
   * @member HCG
   * @method sheetSpeedDown2Excel
   * @param {Object} sheet IBSheet 객체
   * @param {Object} extParam 옵션
   */
  ,sheetSpeedDown2Excel : function (sheet, extParam)
  {
    extParam = extParam || {};
    //제외컬럼의 savename들을 구분자 ','로 받음
    var except_save_name_array = extParam.exceptSaveNames ? extParam.exceptSaveNames.split(",") : [];
    //Default 삭제와 상태는 내려받지않음(받고싶으면 downSaveNames에 정의)
    except_save_name_array.push("CDELETE");
    except_save_name_array.push("CSTATUS");
    //설정에 상관없이 무조건 down받을 컬럼들을 구분자 ','로 받음
    var down_save_name_array = extParam.downSaveNames ? extParam.downSaveNames.split(",") : [];
    var tempSavename = "";
    var array = new Array();
    for(var idx = 0; idx <= sheet.LastCol(); idx++)
    {
      tempSavename = sheet.GetCellProperty(0, idx, "SaveName");   
      if( $.protify(down_save_name_array).include(tempSavename))  //다운받을 컬럼이면 무조건 push
      {
        array.push(tempSavename);
      }
      else if( !$.protify(except_save_name_array).include(tempSavename))  //제외컬럼이 아니고
      {
        if(extParam.HiddenColumn == 0)
        { //Hidden컬럼을 보여주고 싶을때
          array.push(tempSavename);
        }
        else if(sheet.GetColHidden(idx) == 0)
        { //Hidden컬럼이 아닌것들
          array.push(tempSavename);
        }
      }
    }
    var downcols = array.join("|");
    var params = {Merge:1,  SheetDesign:1, DownCols:downcols, CheckBoxOnValue:"Y", CheckBoxOffValue:"N", AllTypeToText:1} ;
    $.extend(params, extParam);
    sheet.Down2Excel(params);
  }
  /**
   * 조회데이터를 엑셀로 바로 다운로드
   * @member HCG
   * @method sheetSpeedDown2Excel
   * @param {Object} sheet IBSheet 객체
   * @param {String} dsmethod 실행할 메소드 명
   * @param {String} fileName 저장할 excel파일 명
   * @param {String} dsclass 실행할 클래스 명
   * @param {String} checkFormYn 폼 필수입력 체크 여부
   * @param {Object} extParam 옵션
   */
  ,export2excel : function (sheet, dsmethod, fileName, dsclass, checkFormYn, extParam)
  {
    if(checkFormYn == undefined || checkFormYn == null || checkFormYn == 'Y' ) 
    {
      if ( ! HCG.checkForm("f1") ) return;
    }
    //if (! confirm(ajaxMsg("EXCEL_DIRECT_DOWN"))) return;
    
    if(dsclass) $("#S_DSCLASS").val(dsclass);
    var excelName = fileName || "Excel";
    $("#S_DSMETHOD").val(dsmethod);
    
    extParam = extParam || {};
    //제외컬럼의 savename들을 구분자 ','로 받음
    var except_save_name_array = extParam.exceptSaveNames ? extParam.exceptSaveNames.split(",") : [];
    //Default 삭제와 상태는 내려받지않음(받고싶으면 downSaveNames에 정의)
    except_save_name_array.push("CDELETE");
    except_save_name_array.push("CSTATUS");
    //설정에 상관없이 무조건 down받을 컬럼들을 구분자 ','로 받음
    var down_save_name_array = extParam.downSaveNames ? extParam.downSaveNames.split(",") : [];
    var tempSavename = "";
    var array = new Array();
    for(var idx = 0; idx <= sheet.LastCol(); idx++)
    {
      tempSavename = sheet.GetCellProperty(0, idx, "SaveName");   
      if( $.protify(down_save_name_array).include(tempSavename))  //다운받을 컬럼이면 무조건 push
      {
        array.push(tempSavename);
      }
      else if( !$.protify(except_save_name_array).include(tempSavename))  //제외컬럼이 아니고
      {
        if(extParam.HiddenColumn == 0)
        { //Hidden컬럼을 보여주고 싶을때
          array.push(tempSavename);
        }
        else if(sheet.GetColHidden(idx) == 0)
        { //Hidden컬럼이 아닌것들
          array.push(tempSavename);
        }
      }
    }
    var downcols = array.join("|");

    var param = 
    {
        URL:"/common/jsp/export.jsp" //비지니스 로직 페이지
      , ExtendParam:FormQueryString(document.f1)
      , ExtendParamMethod:"POST"
      , FileName:excelName+".xls"
      , DownCols:downcols
      , Merge:1 
      , SheetDesign:1
      , CheckBoxOnValue:"Y"
      , CheckBoxOffValue:"N"
      , AllTypeToText:0  //숫자타입을 제외한 나머지타입은 문자열로 다운로드함
    };
    sheet.DirectDown2Excel(param);
  }
  /**
   * Tree 타입의 ibsheet일경우 상위 level 객체 row return
   * @member HCG
   * @method findParentRow
   * @param {Object} mySheet IBSheet 객체
   * @param {Number} row 찾기 시작할 row
   * @return {Number} 상위트리 row
   */
  ,findParentRow : function (mySheet,row)
  {
    //찾은 행의 레벨을 얻음
    var lev = mySheet.GetRowLevel(row);
    //상위 row를 찾으면서 트리를 펼친다.
    for(var i=row;i>0;i--)
    {
      if(mySheet.GetRowLevel(i)<lev) return i;
    }
  }
  /**
   * rd 리포트 그리기
   * @member HCG
   * @method writeRdviewr
   * @param {Object} option
   */
  ,writeRdviewr : function(option)
  {
    var html = "";

    option = HCG.nvl(option, {});
    var _div = $("#" + HCG.nvl(option.tagid, "rdview"));

    if (HCG.isIE()) 
    {
      html += "<object id=chartdir ";
      html += "  classid='clsid:CDE2DAD1-7132-41A9-A998-844AD7BDAC58' ";
      html += "  codebase='/resource/file/chartdir50.cab#version=5,0,3,2' ";
      html += "  width=0% height=0% style=margin:0; >";
      html += "</object>";
      
      html += "<object id=rdpdf50 ";
      html += "  classid='clsid:0D0862D3-F678-48B5-876B-456457E668BC' ";
      html += "  codebase='/resource/file/rdpdf50.cab#version=2,2,0,99' ";
      html += "  width=0% height=0% style=margin:0; >";
      html += "</object>";
      
      html += "<OBJECT id='"+ HCG.nvl(option.id, "rdv1") +"' ";
      html += "  classid='clsid:04931AA4-5D13-442f-AEE8-0F1184002BDD'";
      html += "  codebase='/resource/file/cxviewer60u.cab#version=6,4,4,365'";
      html += "  name='rdv1' width='"+HCG.nvl(option.width, "100%")+"' height='"+HCG.nvl(option.height, "100%")+"' tabindex='3' >  ";
      html += "</OBJECT>";
      
      if(_div.length){
        _div.html(html);
      }else{
        $(document.body).append(html);  
      }      
    }
    else
    {
      navigator.plugins.refresh(false);
      if(navigator.mimeTypes["application/x-cxviewer60u"]) 
      {
        var _rdPlugin = navigator.mimeTypes["application/x-cxviewer60u"];
        var installedRdPluginVersion = _rdPlugin.description.substr(_rdPlugin.description.indexOf("version=")+8, 9);
        var rdPluginSetupVersion = "6,3,4,277";
        if(installedRdPluginVersion >= rdPluginSetupVersion) 
        {
          html = "<OBJECT id='"+ nvl(option.id, "rdv1") +"' type='application/x-cxviewer60u'  width='"+HCG.nvl(option.width, "100%")+"' height='"+HCG.nvl(option.height, "100%")+"' ></OBJECT>";
          if(_div.length){
            _div.html(html);
          }else{
            $(document.body).append(html);  
          } 
        } 
        else 
        {
          HCG.ModalUtil.open({url: "/common/jsp/rdplugin.jsp", name: "rdplugin"});
          }
        } 
      else 
      {
        HCG.ModalUtil.open({url: "/common/jsp/rdplugin.jsp", name: "rdplugin"});
      }
    }
    //라이선스 체크
    if ( $("#"+HCG.nvl(option.id, "rdv1"))[0].ZoomRatio != null )
    {
      $("#"+HCG.nvl(option.id, "rdv1"))[0].ApplyLicense(RD_WEBROOT + "/DataServer/rdagent.jsp");
    }
  }
  /**
   * 로그아웃 페이지를 호출하는 함수. 팝업일 경우 닫고 부모에서 로그아웃 페이지 호출.
   * @member HCG
   * @method checkLogout
   */
  ,checkLogout : function()
  {
    var logout_page = "/main/jsp/logout.jsp";
    var isPopup = false;
    var top_opener;
    if(top.opener)
    {
      top_opener = top.opener;
      if(top.name != "ehrTopFrame") isPopup = true;
      else top_opener = false;
    }else{
      top_opener = false;
    }
    
    if(isPopup){
      setTimeout(function(){top.close(); top_opener.HCG.checkLogout();}, 0);
    }else{
      window.open(logout_page, 'ehrTopFrame');
    }
  }
  /**
   * xml 문자열을 XmlSheet 객체로 변환해주는 함수
   * @member HCG
   * @param {String} xmlText xml문자열
   * @param {String} mode 사용 X
   * @return {Object} XmlSheet
   */
  ,makeXSheetWithXmlText : function(xmlText, mode)
  {
    xmlText = $.trim(xmlText);
    mode = HCG.nvl(mode, "xml");
    if ( mode == "xml")
    {
      var xdom = null;  
      //var xdom = $.parseXML(xmlText); //parseXML이 제대로 동작하지 않을때가 있어서 변경
      if(HCG.isIE()){
        try{
          xdom = new ActiveXObject("Microsoft.XMLDOM");
        }catch(e){
          try{
            xdom = new ActiveXObject("Msxml2.DOMDocument");
          }catch(e){}
        }
      }else{
        xdom = document.implementation.createDocument("", "", null)
      }
    
      try{
        if(HCG.isIE()){
          xdom.async = false;
            xdom.loadXML(xmlText);
        }else{
          xdom = (new DOMParser()).parseFromString(xmlText,"text/xml");
        }
      }
      catch(e){}
      
      if ( xdom == null )
      {
        //alert("XML Parser 생성에 실패하였습니다.");
        alert(HCG.ajaxMsg("MSG_ALERT_XML_PARSER_CREATE_ERROR"));
        return null;
      }
        
      if( HCG.isIE() )
      {
        if ( xdom.parseError.errorCode != 0 )
          {
            var parseErrMsg = "";
            parseErrMsg += "ErrorCode: "+xdom.parseError.errorCode+"\n";
            parseErrMsg += "Reason: "+xdom.parseError.reason+"\n";
            parseErrMsg += "Line: "+xdom.parseError.line+"\n";
            //alert("Xml Parsing 오류가 발생하였습니다.\n\n"+parseErrMsg);
            alert(HCG.ajaxMsg("MSG_ALERT_XML_PARSER_ERROR") + "\n\n"+parseErrMsg);
            return null;
          }
      }
        
      var xsheet = new HCG.XmlSheet(xdom);
      var msg = xsheet.getMessage();

      if ( msg )
      {
          if ( HCG.doCheckMsg(msg) )
          {
            try{
              alert(HCG.ajaxMsg("MSG_ALERT_BATCH_FAIL")+"\n\n"+msg);
            }catch(e){
              //alert("작업 중 오류가 발생하였습니다.\n\n"+msg);
              alert(HCG.ajaxMsg("MSG_ALERT_BATCH_FAIL") + "\n\n"+msg);
            }
          }
          
          if(!HCG.startsWith(msg,"LOGIN_MAX_USER_FAIL"))
          {
          return null;  
          }
    }
    xsheet.responseText = xmlText;
    return xsheet;
    }
    else if ( mode == "script" )
    {
      var so;
      try
      {
        eval("so = "+xmlText);
      }
      catch(e)
      {
        alert("script error: "+e);
        return null;
      }
      var x = new ScriptSheet(so);
      var msg = x.getMessage();
      if ( msg )
      {
        if ( HCG.doCheckMsg(msg) )
        {
          try{
            alert(HCG.ajaxMsg("MSG_ALERT_BATCH_FAIL")+"\n\n"+msg);
          }catch(e){
            //alert("작업 중 오류가 발생하였습니다.\n\n"+msg);
            alert(HCG.ajaxMsg("MSG_ALERT_BATCH_FAIL") + "\n\n"+msg);
          }
        }
        return null;
      }
      x.responseText = xmlText;
      return x;
    }
  }
  /**
   * 모달팝업(HCG.ModalUtil) 대신 윈도우팝업으로 팝업을 호출할 경우 사용하는 함수
   * @member HCG
   * @method popModaless
   * @param {Object} args 옵션
   */
  ,popModaless : function (args)
  {
    var defaultOpt;    
    defaultOpt = {width:args.width||"900", height:args.height||"700", toolbar:"no",directories:"no",status:"no",linemenubar:"no",scrollbars:args.scrollbars||"yes",resizable:args.resizable||"yes",dependent:"yes"};
    
    var dialogOptionStr = "";
    
    $.each(defaultOpt, function(key, value) {
      dialogOptionStr += (dialogOptionStr==""?"":",")+key+"="+value;
    });
      
    var args = args || {};
    var param = args.param || args.parameters || {};
    if ( window.Page )
    {
      param.X_PROFILE_ID = param.X_PROFILE_ID || Page.PROFILE_ID;
        param.X_MODULE_ID = param.X_MODULE_ID || Page.MODULE_ID;
        param.X_MENU_ID = param.X_MENU_ID || Page.MENU_ID;
        param.X_PGM_ID = param.X_PGM_ID || Page.PGM_ID;
        param.X_SQL_ID = param.X_SQL_ID || Page.SQL_ID;
        param.X_EMP_SCH_AUTH_CD = param.X_EMP_SCH_AUTH_CD || Page.EMP_SCH_AUTH_CD;
        param.X_MENU_NM = param.X_MENU_NM || "";
        param.X_PGM_URL = param.X_PGM_URL || Page.PGM_URL;
        param.X_ENC_VAL = param.X_ENC_VAL || Page.ENC_VAL;
        param.X_ENC_VAL2 = param.X_ENC_VAL2 || Page.ENC_VAL2;
        param.X_POP_URL = args.url;
        param.X_HELP_PGM_ID = param.X_HELP_PGM_ID || Page.HELP_PGM_ID;
        if ( ehrTopFrame._LOGIN_INFO ) param.X_LOGIN_INFO = ehrTopFrame._LOGIN_INFO;// for security
    }
    args.param = param;// 반드시 해야함...
    args.openerWindow = window;
    args.opener = window;
    
    try
    {
      if(args.name)
      {
        window.open("", args.name, dialogOptionStr);
            var param = args.param || args.parameters;
            if ( param.X_LOGIN_INFO ) top._LOGIN_INFO = param.X_LOGIN_INFO;
            HCG.submit2({target: args.name, action: __base_dir+"menuAction.do"}, $.extend(param, {url:args.url, modaless:"Y"}));
      }
      else
      {
        if(winOpen == undefined ||winOpen == '') {
          winOpen = window.open("", "pcmPopup", dialogOptionStr);
          var param = args.param || args.parameters;
          if ( param.X_LOGIN_INFO ) top._LOGIN_INFO = param.X_LOGIN_INFO;
          //submit3({target: "pcmPopup", action: __base_dir+"common/jsp/popModaless.jsp"}, $.extend(param, {url:args.url})); 
          HCG.submit2({target: "pcmPopup", action: __base_dir+"menuAction.do"}, $.extend(param, {url:args.url, modaless:"Y"}));
        }else{
          for ( var name in args.param )
          {
            if(name=='S_SCH_EMP_NM') value = winOpen.modalFrame.$("#S_EMP_NM").val(args.param[name]);
          if(name=='S_SCH_EMP_ID') value = winOpen.modalFrame.$("#S_EMP_ID").val(args.param[name]);
          }
          winOpen.modalFrame.doAction('search01');
        } 
        winOpen.focus(); 
        return winOpen;
      }
    }
    catch(poperror)
    {
      if(winOpen != undefined) {
        winOpen ='';
        HCG.popModaless(args);
      }else{
          alert(HCG.ajaxMsg("MSG_ALERT_INTERCEPT_POP"));
            //alert('팝업오류가 발생하였습니다. 팝업 차단을 해제해주세요.');
      }
    }
  }
  /**
   * 서버에 요청시 꼭 필요한 파라미터들을 만들어주는 함수
   * @member HCG
   * @method makeParameters
   * @param {String} dsClass 실행할 class 명
   * @param {String} dsMethod 실행할 method 명
   * @param {Object} otherParams 그외 옵션
   * @return {Object}
   */
  ,makeParameters : function(dsClass, dsMethod, otherParams)
  {
    otherParams = otherParams||{};
    //otherParams = $(otherParams.toString()).replace(null,"")||{};
    if ( typeof otherParams == 'string' )
    {
      otherParams = HCG.toQueryParams(otherParams);
    }
    var forceParams = {S_DSCLASS: dsClass, S_DSMETHOD: dsMethod, S_FORWARD: otherParams.S_FORWARD || "xsheetResultXML"};
    
    if(ehrTopFrame==undefined) ehrTopFrame = this;

    if ( ehrTopFrame._LOGIN_INFO ) forceParams.X_LOGIN_INFO = ehrTopFrame._LOGIN_INFO;
    
    //메뉴별 권한체크를위해 추가함 2014-02-24 w.y.c
    if(window.Page != null)
    {
      forceParams.S_PAGE_PROFILE_ID = Page.PROFILE_ID;
      forceParams.S_PAGE_MODULE_ID = Page.MODULE_ID;
      forceParams.S_PAGE_MENU_ID = Page.MENU_ID;
      forceParams.S_PAGE_PGM_URL = Page.PGM_URL;
      forceParams.S_PAGE_POP_URL = Page.POP_URL;
      forceParams.S_PAGE_PGM_ID = Page.PGM_ID;
      forceParams.S_PAGE_ENC_VAL = Page.ENC_VAL;
      forceParams.S_PAGE_ENC_VAL2 = Page.ENC_VAL2;
    }
    
    var parameters = $.extend(otherParams, forceParams);
    parameters = $.extend(parameters, {__viewState:HCG.toJsonString(parameters)});
    parameters = HCG.nullToUndefinedForJSON(parameters);
    
    return parameters;
  }
  /**
   * null 값을 undefined로 치환해서 리턴 해주는 함수(parameter가 null인경우 java에서 받을때 "null" 로 인식이 됨 undefined일 경우는 null로 인식됨)
   * @member HCG
   * @method nullToUndefinedForJSON
   * @param {Object} json json파라미터
   * @return {Object}
   */
  ,nullToUndefinedForJSON : function(json){
    $.each(json,function(k,v){
    if(json[k]==null){
      json[k] = undefined;
    }
    });
    return json;
  }
  ,toQueryParams : function(queryStr, separator)
  {
    var str = {};
    separator = HCG.nvl(separator,"&");

    str = queryStr.split(separator);
    var o = {};

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
  }
  ,toJsonString : function(obj)
  {
    var order = "";
    var hash = "";
    var hash2 = "";
    var retVal = "";
      for(var i in obj) 
      {
        if(i != "__viewState" && i != "undefined")
        {
          if(!HCG.toCheckString(i)) continue;
          order += i + ",";
          hash += (obj[i] == undefined ? "" : encodeURIComponent(String(obj[i]).replace(/ |,|\s/gi, "")).replace(/\W/gi,"").replace("　",""));
        }
      }
      retVal = "{\"order\":\"" + order + "\", \"hash\":\"" + HCG.calcHash(hash) + "\", \"test\":\"" + hash + "\"}";
      return retVal;
  }
  ,toCheckString : function( sCol )
  {
    var bRtn = false;
    var arrIn = ["EMP_ID", "ORG_ID","C_CD"];
    var re;
    
    for(var k=0;k<arrIn.length;k++)
    {
      re = new RegExp(arrIn[k]);
      var arrVal = re.exec(sCol);
      
      if(arrVal!=null && arrVal.index >= 0)
      {
        bRtn = true;
        break;
      }
    }
    return bRtn;
  }
  ,calcHash : function(hashInput) 
  {
    try 
    {
      var hashRounds = 3;
      var hashOutputType = "HEX";
      var hashObj = new jsSHA("SHA-256", "TEXT", {numRounds: parseInt(hashRounds, 10)});
      hashObj.update(hashInput);
      return hashObj.getHash(hashOutputType);
    } 
    catch(e) 
    {
      alert(e.message);
    }
  }
  /**
   * ajaxRequestJson의 response 유효성을 체크
   * @member HCG
   * @method chkResponse
   * @param {Object} response
   * @return {Boolean}
   */
  ,chkResponse : function(response)
  {
    var bRtn = true;
    
    if(response==null || response == undefined)
    {
      bRtn = false;
    }
    else if(response.Msg == undefined || response.Msg.length <= 0 )
    {
      bRtn = false;
    }
    else if(response.Msg[0].Error!="")
    {
      var sMsg = response.Msg[0].Error;
      
      if ( HCG.doCheckMsg(sMsg) )
      {
        try{
          alert(HCG.ajaxMsg("MSG_ALERT_BATCH_FAIL")+"\n\n"+sMsg);
        }catch(e){
          //alert("작업 중 오류가 발생하였습니다.\n\n"+sMsg);
          alert(HCG.ajaxMsg("MSG_ALERT_BATCH_FAIL") + "\n\n"+sMsg);
        }
      }
      
      if(! HCG.startsWith(sMsg,"LOGIN_MAX_USER_FAIL"))
      {
        bRtn = false;
      }
    }
    return bRtn;
  } // chkResponse end
  /**
   * localStorage에 값 세팅
   * @member HCG
   * @method setLocalStorage
   * @param {String} key 키값
   * @param {String} val 저장할 값
   */
  ,setLocalStorage : function(attr, val)
  {
    localStorage.setItem(attr, val);
  }
  /**
   * localStorage에서 값 가져오기
   * @member HCG
   * @method getLocalStorage
   * @param {String} key 키값
   * @return {String}
   */
  ,getLocalStorage : function(attr)
  {
    return localStorage.getItem(attr);
  }
  /**
   * XmlSheet 에서 특정컬럼(col)의 모든 값을 배열로 리턴
   * @member HCG
   * @method getCellValuesXS
   * @param {Object} xsheet XmlSheet
   * @param {String} col 컬럼명 
   * @param {String} data_key XmlSheet 데이터키
   * @return
   */
  ,getCellValuesXS : function (xsheet, col, data_key)
  {
    var arr = [];
    for ( var row = 0, rcnt = xsheet.RowCount(data_key); row < rcnt; row++ )
    {
      arr[arr.length] = xsheet.GetCellValue(row, col, data_key);
    }
    return arr;
  }
  /**
   * grid에서 cell data 추출
   * <br/>(grid : HCG.sheet_getData 로 만들어진 데이터 객체(Json형식))
   * @member HCG
   * @method grid_GetCellValue
   * @param {Object} grid 그리드 데이터 객체
   * @param {Number} row row index
   * @param {Number} col col index
   * @return {String} grid data
   */
  ,grid_GetCellValue :function (grid, row, col)
  {
    col = ( typeof col == "number" ) ? col : HCG.array_indexOf(grid.arrColName, col);
    return grid.arrData[row][col];
  }
  /**
   * grid 컬럼 명칭을 리턴
   * <br/>(grid : HCG.sheet_getData 로 만들어진 데이터 객체(Json형식))
   * @member HCG
   * @method grid_GetColName
   * @param {Object} grid 그리드 데이터 객체
   * @param {Number} col col index
   * @return {String} column name
   */
  ,grid_GetColName : function (grid, col)
  {
    return grid.arrColName[col];
  }
  /**
   * grid cell 에 값 세팅
   * <br/>(grid : HCG.sheet_getData 로 만들어진 데이터 객체(Json형식))
   * @member HCG
   * @method grid_SetCellValue
   * @param {Object} grid 그리드 데이터 객체
   * @param {Number} row row index
   * @param {Number} col col index
   * @param {String} val 입력할 값
   */
  ,grid_SetCellValue : function (grid, row, col, val)
  {
    col = ( typeof col == "number" ) ? col : HCG.array_indexOf(grid.arrColName, col);
    grid.arrData[row][col] = val;
  }
      
  /**
   * grid 로우를 돌면서 함수실행
   * <br/>(grid : HCG.sheet_getData 로 만들어진 데이터 객체(Json형식))
   * @member HCG
   * @method grid_eachRow
   * @param {Object} grid 그리드 데이터 객체
   * @param {Function} f 실행할 함수
   * @param {Boolean} reverse 정순,역순 구분
   * @param {Number} startRow 시작 row index
   * @param {Number} endRow 종료 row index
   */
  ,grid_eachRow : function (grid, f, reverse, startRow, endRow)
  {
    reverse = !!reverse;
    var returnObject = {};
    try
    {
      var firstRow = 0;
      var lastRow = grid.RowCount-1;
      if ( reverse )
      {
        var loopStartRow = HCG.isNull(startRow) ? lastRow : Math.min(startRow, lastRow);
        var loopEndRow = HCG.isNull(endRow) ? firstRow : Math.max(endRow, firstRow);
        for ( var row = loopStartRow; row >= loopEndRow; row-- )
        {
          f(row, grid, returnObject);
        }
      }
      else
      {
        var loopStartRow = HCG.isNull(startRow) ? firstRow : Math.max(startRow, firstRow);
        var loopEndRow = HCG.isNull(endRow) ? lastRow : Math.min(endRow, lastRow);
        for ( var row = loopStartRow; row <= loopEndRow; row++)
        {
          f(row, grid, returnObject);
        }
      }
    }
    catch(e)
    {
      if (e == $break) return returnObject.value;
      else throw e;
    }
  }
  /**
   * ibsheet용 트리 레벨 변경 이미지 그리기
   * @member HCG
   * @method printSheetTreeControl
   * @param {String} sheetId ibsheet id
   */
  ,printSheetTreeControl : function (sheetId)
  {
    document.write("<ul class='segmentBar d-inline-block'>");
    document.write("<li title='트리 전체열기'><img src="+Page.SKIN_PATH+"/images/icon/icon_plus.gif onclick='"+sheetId+".ShowTreeLevel(-1);' alt='트리 전체열기'></li>");
    document.write("<li title='트리 전체닫기'><img src="+Page.SKIN_PATH+"/images/icon/icon_minus.gif onclick='"+sheetId+".ShowTreeLevel(0, 1);' alt='트리 전체닫기'></li>");
    document.write("<li title='트리 1단계 확장'><img src="+Page.SKIN_PATH+"/images/icon/icon_01.gif onclick='"+sheetId+".ShowTreeLevel(1, 1);' alt='트리 1단계 확장'></li>");
    document.write("<li title='트리 2단계 확장'><img src="+Page.SKIN_PATH+"/images/icon/icon_02.gif onclick='"+sheetId+".ShowTreeLevel(2, 1);' alt='트리 2단계 확장'></li>");
    document.write("<li title='트리 3단계 확장'><img src="+Page.SKIN_PATH+"/images/icon/icon_03.gif onclick='"+sheetId+".ShowTreeLevel(3, 1);' alt='트리 3단계 확장'></li>");
    document.write("</ul>");
  }
  /**
   * merge 때문에 시트에 saveName 구분하여 안보이는 로우 추가
   * @member HCG
   * @method sheetAddHiddenDivRow
   * @param {Object} sheet ibsheet 객체
   * @param {Number|String} saveName
   */
  ,sheetAddHiddenDivRow : function (sheet, saveName)
  {
    var prevVal, currVal;
    HCG.sheetEachRow(sheet, function(r, x)
    {
      currVal = x.GetCellValue(r, saveName);
      // alert(r);
      if ( prevVal != null && prevVal != currVal )
      {
        x.SetRowHidden(x.DataInsert(r), 1);
      }
      prevVal = currVal;
    }, true);
  }
  /**
   * 시트 로우 추가
   * @member HCG
   * @method sheetDataInsert
   * @param {Object} sheet IBSheet 객체
   * @return {Number} row index
   */
  ,sheetDataInsert : function (sheet)
  {
    return sheet.DataInsert(-1);
  }
      
  /**
   * 강제 저장용 시트 더미 로우 추가
   * @member HCG
   * @method sheetInsertHiddenDummyRow
   * @param {Object} sheet IBSheet 객체
   * @return {Number} row index
   */
  ,sheetInsertHiddenDummyRow : function (sheet)
  {
    var NewRow = sheet.DataInsert(-1);
    var savename, keyfield;
    for ( var n = 0; n <= sheet.LastCol(); n++ )
    {
      savename = sheet.GetCellProperty(0, n, dpSaveName);
      keyfield = sheet.GetCellProperty(0, n, dpKeyField);
      if ( keyfield )
      {
        sheet.SetCellValue(NewRow, savename, "0");
      }
    }
    sheet.SetRowHidden(NewRow, 1);
    return NewRow;
  }
  /**
   * 시트데이터를 json으로 변환
   * @member HCG
   * @method sheet_getData
   * @param {Object} sheet 시트객체
   * @param {String} chkSvnm CheckBox타입컬럼 SaveName. 지정할 경우 체크된 Row만 데이터로 만든다
   * @return {Object}  
   */
  ,sheet_getData : function(sheet, chkSvnm)
  {
    var grid = {};
    // set column name
    var arrColName = [];
    var mapColName = {};
    var sheetLastCol = sheet.LastCol();
    for ( var col = 0, LastCol = sheetLastCol; col <= LastCol; col++ )
    {
      arrColName.push(sheet.ColSaveName(col));
      mapColName[sheet.ColSaveName(col)] = col;
    }
    grid.arrColName = arrColName;
    grid.mapColName = mapColName;
    // set data
    var row_array = [];
    HCG.sheetEachRow(sheet, function(row)
    {
      if ( chkSvnm == null || (typeof(chkSvnm) == "function" && chkSvnm(sheet, row)) || sheet.GetCellValue(row, chkSvnm) == "Y" )
      {
        //alert([chkSvnm,  sheet.GetCellValue(row, chkSvnm), row]);
        var col_array = [];
        for ( var col = 0, LastCol = sheetLastCol; col <= LastCol; col++ )
        {
          col_array.push(sheet.GetCellValue(row, col));
        }
        row_array.push(col_array);
      }
    });
    grid.arrData = row_array;
    // set interface
    grid.RowCount = row_array.length;
    grid.ColCount = grid.arrColName.length;
    return grid;
  }
  /**
   * 공통 윈도우 팝업, 공통 iframe 세팅
   * @member HCG
   * @method popOpen
   * @param {Object} option 옵션파라미터
   */
  ,popOpen : function (option)
  {
    var features = option.features || {};
    var w = Number(features.width) || 200, h = Number(features.height) || 150;
    var features = $.extend(features,{
      top: ((window.screen.height - h)/2),
      left: ((window.screen.width - w)/2),
      width: w,
      height: h,
      directories: "no",
      location: "no",
      menubar: "no",
      scrollbars: "yes",
      status: "no",
      titlebar: "no",
      toolbar: "no",
      resizable: "yes"
    });
    
    var sFeatures = "";
    $.each(features, function(key, val){
      sFeatures = sFeatures +(sFeatures?",":"")+key+"="+val;
    });
    
    // frames 에 option.name 에 해당하는 frame 이 존재하지 않으면 popup
    // alert(option.name);
    var popopen = !option.name || ! HCG.checkExistsFrameByName(option.name);
    // alert(popopen);
    var newWin = null;
    if ( popopen )
    {
      newWin = window.open(__base_dir+"common/jsp/popup_wait.html", option.name, sFeatures);
      try { newWin.focus(); } catch(e) {}
    }
    // 권한...세팅 start
    var param = option.param || option.parameters || {};
    if ( window.Page )
    {
      param.X_PROFILE_ID = param.X_PROFILE_ID || Page.PROFILE_ID;
      param.X_MODULE_ID = param.X_MODULE_ID || Page.MODULE_ID;
      param.X_MENU_ID = param.X_MENU_ID || Page.MENU_ID;
      param.X_PGM_ID = param.X_PGM_ID || Page.PGM_ID;
      param.X_SQL_ID = param.X_SQL_ID || Page.SQL_ID;
      param.X_EMP_SCH_AUTH_CD = param.X_EMP_SCH_AUTH_CD || Page.EMP_SCH_AUTH_CD;
      param.X_MENU_NM = param.X_MENU_NM || "";
      param.X_PGM_URL = param.X_PGM_URL || Page.PGM_URL;
      param.X_ENC_VAL = param.X_ENC_VAL || Page.ENC_VAL;
      param.X_ENC_VAL2 = param.X_ENC_VAL2 || Page.ENC_VAL2;
      param.X_POP_URL = option.url;
      param.X_HELP_PGM_ID = param.X_HELP_PGM_ID || Page.HELP_PGM_ID;
      param.X_FRAME_NAME = param.X_FRAME_NAME || Page.FRAME_NAME;
      if ( ehrTopFrame._LOGIN_INFO ) param.X_LOGIN_INFO = ehrTopFrame._LOGIN_INFO;// for security
    }
    else
    {
      param.X_POP_URL = option.url;
    }
    // 권한...세팅 end
    HCG.submit2({target: option.name, action: "/menuAction.do"}, param);
//    HCG.submit2({target: "_blank", action: "/menuAction.do"}, param);

    if ( popopen )
    {
      // 곧바로 호출하면 setting 안되므로 시간차 이용
      setTimeout(function()
      {
        try
        {
          newWin.window.ehrTopFrame._LOGIN_INFO = window.ehrTopFrame._LOGIN_INFO;
        }
        catch(e){}
      },100);
    }
    return frames[option.name] || newWin;
  }
  /**
   * select element(sel)를 값(v)으로 선택. 없으면 무시
   * @member HCG
   * @method setSelect
   * @param {String} sel select Id
   * @param {String} v 선택하려는 value
   */
  ,setSelect : function (sel, v)
  {
   $("#"+sel).val(v).attr2("selected", true);
  }
  /**
   * form의 input tag들을 Json 형식으로 변환
   * @member HCG
   * @method serializeForm
   * @param {String} formName form의 name
   * @return {Object} 
   */
  ,serializeForm : function (formName)
  {
    formName = HCG.nvl(formName, "f1");
    return $("form[name='"+formName+"']").serializeObject();
  }
  /**
   * json을 form으로 파싱하여 submit
   * @member HCG
   * @method submit2
   * @param {Object} property form property
   * @param {Object} parameters 전송할 파라미터
   * 
   */
  ,submit2 : function (property, parameters)
  {
    var form = $(document.createElement("form")).attr(property);
    $(form).attr("method", property.method || "post");// default method is post
    var input, value;
    //parameters = $.extend(parameters, {__viewState:toJsonString(parameters)});
    for ( var name in parameters )
    {
      value = parameters[name];
      
      if(typeof value == "boolean")
      {
        value = String(value);
      }
      if ( $.protify(["string", "number"]).include(typeof value) )
      {
        form.append($(document.createElement("input")).attr({name: name, type: "hidden", value: value}));
      }
      else if ( typeof value == "array" )
      {
        value.each(function(v)
        {
          form.append($(document.createElement("input")).attr({name: name, type: "hidden", value: v}));
        });
      }
      else
      {
        input = $(document.createElement("input")).attr({name: name, type: "hidden", value: value || ''});
        form.append(input);
      }
    }
    form.insertAfter(document.body);
    form.submit();
    form.remove();
    form = null;
  }
  /**
   * 팝업윈도우의 사이즈를 지정. 팝업페이지 jsp에는 반드시 이 함수가 포함되어야 함.
   * @member HCG
   * @method sizeDialog
   * @param {Number} w 너비
   * @param {Number} h 높이
   */
  ,sizeDialog : function (w, h, popTitle, pageTitle)
  { 
    popTitle  = HCG.nvl(popTitle,'popTitle');
    pageTitle = HCG.nvl(pageTitle,'pageTitle');
    HCG.displayElement(popTitle, true);
    HCG.displayElement(pageTitle, false);
    var _top = window.ehrTopFrame || top;
    HCG.ModalUtil.resize({width:w||$(_top).outerWidth()-20, height:h||$(_top).outerHeight()-20});
    if(HCG.isVal(w)) { window._modalW = w; }
    if(HCG.isVal(h)) { window._modalH = h; }
  }
  /**
   * 윈도우팝업 사이즈를 지정
   * @member HCG
   * @method sizeWindow
   * @param {Number} w 너비
   * @param {Number} h 높이
   */
  ,sizeWindow : function (w, h)
  {
    var _top = window.ehrTopFrame || top;
    var wtop = (window.screen.height - h)/2;
    var wleft = (window.screen.width - w)/2;
    _top.moveTo(wleft, wtop);
    _top.resizeTo(w, h);
  }
  /**
   * element의 display 여부 제어
   * <br/>숨길 경우 "display:none;" 스타일속성을 갖는 "h-hidden-zone" 클래스를 추가한다.
   * @member HCG
   * @method displayElement
   * @param {String|Element} input element 또는 element id
   * @param {Boolean} show 출력여부
   */
  ,displayElement : function (element, show)
  {
    element = HCG.returnjQueryObj(element);
    //show? element.show():element.hide();
    var display = show?"":"none";
    if(element.hasClass("h-hidden-zone")) element.removeClass("h-hidden-zone");
    element.css("display",display);
    element.parent(".btn").removeClass("h-hidden-zone").css("display", (show? "":"none")); //inline-block으로 했을 경우 원치않는 padding이 먹는 경우가 있어 default값으로 치환 kyn
  }
  /**
   * 특정윈도우(win) 아래에 존재하는 frame name 중복체크
   * @member HCG
   * @method checkExistsFrameByName
   * @param {String} frameName
   * @param {win} win (default : top)
   */
  ,checkExistsFrameByName :function (frameName, win)
  {
    // back 했을 경우 웹페이지가 만료되었습니다가 나올 수 있으므로 try catch 처리
    try
    {
      win = win || window.top;
      for ( var n = 0, nlen = win.frames.length; n < nlen; n++ )
      {
        if ( win.frames[n].name == frameName ) return true;
        if ( HCG.checkExistsFrameByName(frameName, win.frames[n]) ) return true;
      }
      return false;
    }
    catch(exception)
    {
      return false;
    }
  }
  /**
   * jQuery Object를 반환
   * @member HCG
   * @method returnJqueryObj
   * @param {String|Object} element element 객체 또는 element ID
   */
  ,returnjQueryObj : function (element)
  {
    return (typeof element == "string" && element != "") ?  $("#"+element) : $(element);
  }

  /**
   * 현재 사용중인 브라우저가 Canvas를 지원하는지 여부 리턴
   * @returns
   */
  ,isCanvasSupported : function()
  {
    var elem = document.createElement('canvas');
    return !!(document.createElement('canvas').getContext && document.createElement('canvas').getContext('2d'));
  }
  /**
   * 라벨 다국어 처리 함수
   * <br/>다국어프로퍼티 "label"타입을 활용.
   * <br/>다국어프로퍼티는 [시스템 - 다국어프로퍼티관리] 메뉴에서 관리됨
   * @member HCG
   * @method ajaxMsg
   * @param {String} key 다국어 메세지 키값
   * @param {String} lang 언어코드
   * @return {String} 라벨
   */
  ,ajaxLabel : function (key, lang)
  {
    var defaultStr = "";
    var result =   HCG.getMultiLang("label", key, defaultStr, null, lang);
    if(result==null || result==undefined) result = "";
    
    if ( arguments.length <= 2 ) return result;

    for( var i=0; i<(arguments.length-2); i++ ) 
    {
      result = result.replace( new RegExp( "\\{" + i + "\\}", "gi" ), arguments[ i+2 ] );
    }
    return result;
  }
  /**
   * pre 태그 레이어를 그려준다.
   * @member HCG
   * @method showLayer
   * @param {Object} options
   */
  ,showLayer : function(options)
  {
    var e = window.event;
    
    var _layer = $("#show_layer");
    
    if(!_layer.length){
      _layer = $("<pre id='show_layer' style='position:absolute; top:0px; left:0px; padding:5px; display:none; border:1px solid black; background:white;'></pre>");
      _layer.mouseout(function(){
        _layer.hide();
      });
      $("body").append(_layer);      
    }
    
    _layer.html(options.innerText);
    
    var body_w = $("body")[0].offsetWidth;
    var body_h = $("body")[0].offsetHeight;
    var layer_w = Number(_layer.width()) + 10; //ie box model 때문에 여유분으로 10 추가
    var layer_h = Number(_layer.height()) + 10;
    var event_l = e.clientX;
    var event_t = e.clientY;
    
    var gap_l = body_w - event_l - layer_w;
    var gap_t = body_h - event_t - layer_h;
    
    if(gap_l < 0) event_l = event_l - layer_w + 10;
    if(gap_t < 0) event_t = event_t - layer_h + 10;
    
    _layer.css("left", event_l);
    _layer.css("top", event_t);
    
    _layer.show();
  }
  /**
   * 모달팝업 공통 유틸
   * @member HCG
   */
  ,ModalUtil : 
  {
    _top : window.ehrTopFrame || top
    ,init : function()
    {
      (window.ehrTopFrame||top).ModalDialog.topFrame = null;              //최상위 Frame - Window Object
      (window.ehrTopFrame||top).ModalDialog.width = 300;                  //Default Width
      (window.ehrTopFrame||top).ModalDialog.height = 300;                 //Default Height
      (window.ehrTopFrame||top).ModalDialog.$layer = null;                //Modal Dialog Background Layer - jQuery Object
      (window.ehrTopFrame||top).ModalDialog.iframeError = false;          //Modal iframe에서 호출한 페이지가 에러가 나거나 resize 함수를 호출하지 않았을때 여부
    }
    /**
     * 모달팝업 열기
     * @member HCG.ModalUtil
     * @method open
     * @param {Object} options 모달옵션 파라미터(url, title, param 등)
     * @param {Function} returnFn 팝업페이지에서 HCG.ModalUtil.returnValue를 통해 값을 반환하며 닫을 경우 호출되는 함수
     * @param {Function} closeFn 팝업페이지를 닫을때 호출되는 함수
     */
    ,open : function(options, returnFn, closeFn, winObj, winOpener)
    {
      if( (window.ehrTopFrame||top).returnFunction == null ) (window.ehrTopFrame||top).returnFunction = [];
      if( (window.ehrTopFrame||top).closeFunction == null ) (window.ehrTopFrame||top).closeFunction = [];
      if( (window.ehrTopFrame||top).winOpener == null ) (window.ehrTopFrame||top).winOpener = [];
      if( (window.ehrTopFrame||top).lastPopIndex == null ) (window.ehrTopFrame||top).lastPopIndex = -1;
      if( (window.ehrTopFrame||top).bLastPop == null ) (window.ehrTopFrame||top).bLastPop =false;
      
      var $layer = (window.ehrTopFrame||top).$("#ModalLayer");
      // main에 ModalLayer 가 있는 경우 삭제한다.
      if($layer.length != 0) $layer.remove();
      
      var $modalLayer = $((window.ehrTopFrame||top).document.createElement("div"));
      $modalLayer.addClass("ModalLayer");
      $modalLayer.prop("id","ModalLayer");
      $modalLayer.attr("style","min-width:1145px;min-height:750px; left: 0px; top: 0px; width: 100%; height: 100%; display: none; position: absolute; z-index: 900; opacity: 0.3; background-color: rgb(0, 0, 0);");
      (window.ehrTopFrame||top).$("body").append($modalLayer);
      
      options = options || {};
      $collect = (window.ehrTopFrame||top).$(".ModalPop");
      $collect.each(function()
      {
        $(this).css("z-index",$(this).css("z-index") - 3); 
      });
      
      var tmpId = (new Date()).getTime() + $collect.length; //collect(팝업순서제어) 를 위해 필요한 id 값을 생성한다.
      var width, height, extYn; //외부페이지열때는 3개 값들이 있어야 함
      
      if(options.width && options.height)
      {
        width = options.width;
        height = options.height;
      }
      else
      {
        if((window.ehrTopFrame||top).ModalDialog!=undefined)
        {
          width = (window.ehrTopFrame||top).ModalDialog.width;
          height = (window.ehrTopFrame||top).ModalDialog.height;
        }

        setTimeout(function(){ HCG.ModalUtil.onError();}, 3000);
      }
      
      extYn = options.extYn || "N";   //외부페이지열때는 Y로 넘어와야함
      
      if(width==undefined) width = "300";
      if(height==undefined) height = "300";
      
      var nFirstTop   = ((window.ehrTopFrame||top).document.body.clientHeight / 2) - 150;
      var nFirstLeft  = ((window.ehrTopFrame||top).document.body.clientWidth / 2) - 150;
      
      var $body = (window.ehrTopFrame||top).$("body:first");
      var $div = $((window.ehrTopFrame||top).document.createElement("div"));
      $div.attr("style", "position:absolute;width:"+width+"px;height:"+height+"px;top:"+nFirstTop+"px;left:"+nFirstLeft+"px;z-index:901;padding:0px;display:none");
      $div.addClass("ModalPop");
      
      $div.html(  "<div class='h-flex-layout h-flex-col modalPop' style='background:#f7f7f7;width:100%;height:100%;margin:0px;border-radius:15px;'>"
                + "<div class='h-flex-auto h-div-title overflow-hidden'>"
                +   "<span class='float-left modalTitle' style='color:#4e5983;font-weight:bold;font-size:17px; line-height:17px;'>"+ ((options.title)? options.title:"") +"</span>"
                +   "<span class='float-right' style='display:inline-block;width:15px;height:15px; cursor:pointer;' onclick='HCG.ModalUtil.close()'>" 
                +   "<img src=\"/resource/images/icon/icon_cancel01.png\" alt=\"팝업닫기\"></span>"
                + "</div>"
                + "<div class='h-flex-box' style='padding:0 20px 30px 20px; background-color:#f7f7f7; '>"
                +   "<div style='background:#FFFFFF;width:100%;height:100%;display:none;filter:alpha(opacity=50); opacity:0.5;position:absolute;z-index:90;left:0;top:0;'></div>"
                +   "<iframe id='dialogframe_" + tmpId + "' extyn='" + extYn + "' popsection name='dialogframe_" + tmpId + "' frameborder='0' src='' width='100%' height='100%' ></iframe>"
                + "</div>"
                + "</div>");
      //layer resize and drag
      if(options.resizable == undefined || options.resizable == true)
      {
//        /*
        (window.ehrTopFrame||top).$($div).resizable({
          iframeFix:true,
            containment:"parent"
          , aspectRatio:false
          , minWidth:300
          , minHeight:300
          , disabled:false
          //, animate:true
          , handles:"n, e, s, w, se"
          //, alsoResize:".modalCon:last"
          , start:function(event,ui)
          {
            $(this).find("iframe").prev().css("display","");
          }
          , stop:function(event,ui)
          {
            $(this).find("iframe").prev().css("display","none");
          }
        });
//        */
      }
      (window.ehrTopFrame||top).$($div).draggable(
      {
        containment:"parent"
        , handle:".h-div-title"
        , opacity:"0.5"
        , delay:100
        , scrollSensitivity:1
        , scrollSpeed:100
        , iframeFix:true
        , revert:false
      });
      
      $body.append($div);
      
      $collect = (window.ehrTopFrame||top).$(".ModalPop");
      var nPop = $collect.length;
      
      if(returnFn)
      {
        (window.ehrTopFrame||top).returnFunction[nPop-1] = returnFn;
      }
      else
      {
        (window.ehrTopFrame||top).returnFunction[nPop-1] = null;
      }
      
      if(winOpener)
      {
        (window.ehrTopFrame||top).winOpener[nPop-1] = winOpener;
      }
      else
      {
        (window.ehrTopFrame||top).winOpener[nPop-1] = window;
      }
      
      var opener = HCG.ModalUtil.getOpener();
      if(opener.HCG.ModalUtil.onOpen!=undefined && typeof opener.HCG.ModalUtil.onOpen == "function")
      {
        opener.HCG.ModalUtil.onOpen();
      }
      
      if(closeFn)
      {
        (window.ehrTopFrame||top).closeFunction[nPop-1] = closeFn;
      }
      else
      {
        (window.ehrTopFrame||top).closeFunction[nPop-1] = null;
      }
      
      HCG.ModalUtil.showLayer();
      HCG.ModalUtil.popOpen({ name: "dialogframe_" + tmpId,url: options.url,param: options.param || options.parameters}, winObj );
      if(options.width && options.height)
      {
        HCG.ModalUtil.resize({width:width, height:height});
      }
      (window.ehrTopFrame||top).bLastPop =true;
      
    }
    ,tagCreate : function (tag, attr, css) 
    {
      var obj = (window.ehrTopFrame||top).document.createElement(tag);
      for(var key in attr) 
      {
        $(obj).attr(key,attr[key]);
      }; 
      for(var key in css) 
      {
        $(obj).css(key,css[key]);
      }; 
      return obj;
     }
    /**
     * Modal Dialog setCloseFn
     * @param rv - Return Value
     * layer 창을 닫는순간 callback 함수 호출시 rv값 불러옴(파일업로드시 사용함)
     */
    , setCloseFn : function(rv)
    {
      var $collect = (window.ehrTopFrame||top).$(".ModalPop");
      var $modal = $collect[$collect.length - 1];
      var $close = $($modal).find('.modalTitle').next()[0];
      if($($close).attr("onclick") != undefined)
      {
//        $($close).removeAttr("onclick");
        $($close).attr("onclick",'').unbind('click');
        $($close).off("click");
        $($close).on("click",function(e)
        {
          HCG.ModalUtil.close(rv);
        }); 
      }
    }
    ,getOpener : function()
    {
      $collect = (window.ehrTopFrame||top).$(".ModalPop");
      var rtn;
      if($collect.length>1)
      {
        rtn = (window.ehrTopFrame||top).winOpener[$collect.length-1];
      }
      else if($collect.length == 1)
      {
        rtn = (window.ehrTopFrame||top).winOpener[0];
      }
      else
      {
        rtn = null;
      }
      return rtn;
    }
    ,position : function(width, height)
    {
      var $body = (window.ehrTopFrame||top).document.body;

      var tHeight = $body.clientHeight;
      var tWidth = $body.clientWidth;
      
      var top = (tHeight/2) - (height/2);
      var left = (tWidth/2) - (width/2);

      if (top < 0) top = 0;
      return {top: top, left: left};
    }
    /**
     * 모달팝업 닫기
     * @member HCG.ModalUtil
     * @method close
     * @param {Object} rv 
     * @param {Function} returnFn 팝업페이지에서 HCG.ModalUtil.returnValue를 통해 값을 반환하며 닫을 경우 호출되는 함수
     * @param {Function} closeFn 팝업페이지를 닫을때 호출되는 함수
     */
    ,close : function(rv, retFun)
    {
      var opener = null;
      var bErr = false;
      try
      {
        opener = (HCG.ModalUtil.getOpener()==null)?window:HCG.ModalUtil.getOpener();
        if(opener.HCG.ModalUtil.onClose!=undefined && typeof opener.HCG.ModalUtil.onClose == "function")
        {
          opener.HCG.ModalUtil.onClose();
        }
      }
      catch(e)
      {
        bErr = true;
        HCG.ModalUtil.hideLayer();
      }
      
      var $collect = (window.ehrTopFrame||top).$(".ModalPop");
      var $modal = $collect[$collect.length - 1];
      var nPop = $collect.length;
      
      $($modal).addClass("zoomOut");
      $($modal).addClass("animated");
      
      var returnFunction = null;
      var closeFunction = null;
      
      
      if(retFun)
      {
        returnFunction = (window.ehrTopFrame||top).returnFunction[nPop-1];
        closeFunction  = (window.ehrTopFrame||top).closeFunction[nPop-1];
      }
      else
      {
        closeFunction = (window.ehrTopFrame||top).closeFunction[nPop-1];
      }
      
      if( (window.ehrTopFrame||top).lastPopIndex == (nPop-1) && !(window.ehrTopFrame||top).bLastPop )
      {
        setTimeout(function(){ HCG.ModalUtil.close(rv, retFun); } , 200);
        return;
      }
      
      if(returnFunction) { if(!bErr) returnFunction(rv);}
      if(closeFunction)  { if(!bErr) closeFunction(rv); }
      
      
      if((nPop-1) != 0)
      {
        (window.ehrTopFrame||top).lastPopIndex = (nPop-1);
      }
      else
      {
        (window.ehrTopFrame||top).lastPopIndex = -1;
      }
      (window.ehrTopFrame||top).bLastPop =false;
      
      setTimeout(function()
      {
        HCG.ModalUtil.hideLayer();
        var $targetFrame = $($modal).find("iframe");
        $targetFrame.purgeFrame();
        $modal.parentNode.removeChild($modal);
        (window.ehrTopFrame||top).lastPopIndex = -1;
      },200);
    }
    ,hideLayer : function(fn)
    {
      var $layer    = (window.ehrTopFrame||top).$("#ModalLayer");
      var $collect = (window.ehrTopFrame||top).$(".ModalPop");
      
      if($collect.length > 1)
      { //Modal
        $collect.each(function()
        {
          var $modal = $(this);
          $modal.css("z-index" , Number($modal.css("z-index")) + 3);
        });
        if(fn) fn();
      }
      else
      { //Alert, Confirm
         $layer.css("opacity", 0);
         $layer.css("filter", "alpha(opacity=0)");
         $layer.css("zIndex", -999);
         $layer.css("display", "none");
         if(fn) fn();  
      }
      
      //rd가 있다면 보이게하기
      var topRd = (window.ehrTopFrame||top).$("iframe[extyn!='Y']"); 
      if((topRd != null) && (topRd != undefined))
      {
        if((topRd.contents() != null) && (topRd.contents() != undefined))
        {
          topRd.contents().find("object").each(function()
          {
            if($(".ModalPop").length == 1 && $(this).css("visibility") == "hidden")
            {
              $(this).css("visibility", "visible");
            }
          });
        }
      }
    }
    ,showLayer : function(fn)
    {
      //화면에 RD가 있으면 안보이게 한 후 팝업띄움
      
      $("object").each(function()
      {
        if($(this).attr("data") == null || $(this).attr("data").indexOf("silverlight") <= 0)
        {
          $(this).css("visibility", "hidden");
        }
      }); 
      var $body = (window.ehrTopFrame||top).$("body");
      var $layer = (window.ehrTopFrame||top).$("#ModalLayer");
      $layer.css("display", "block");
      $layer.css("zIndex", 900);
      $layer.css("width", "100%");//$body.clientWidth;
      $layer.css("height", "100%");// $body.clientHeight;
      $layer.css("BackgroundColor", "#000000");
      $layer.css("opacity", "0.3");
      $layer.css("filter", "alpha(opacity=30)");
    }
    /**
     * 팝업을 띄운 부모페이지에 값을 돌려주며 모달팝업 닫기
     * @member HCG.ModalUtil
     * @method returnValue
     * @param {Object} rv
     */
    ,returnValue : function(rv)
    {
      HCG.ModalUtil.close(rv, true);
    }
    ,onError : function()
    {
      if((window.ehrTopFrame||top).ModalDialog.iframeError)
      {
        HCG.ModalUtil.resize();
      }
    }
    ,popOpen : function(option, winObj)
    {
      winObj = winObj || window;
      // 권한...세팅 start
      var param = option.param || {};
      var winPage = winObj.Page;
      if ( winPage )
      {
        param.X_PROFILE_ID = param.X_PROFILE_ID || winPage.PROFILE_ID;
        param.X_MODULE_ID = param.X_MODULE_ID || winPage.MODULE_ID;
        param.X_MENU_ID = param.X_MENU_ID || winPage.MENU_ID;
        param.X_PGM_ID = param.X_PGM_ID || winPage.PGM_ID;
        param.X_SQL_ID = param.X_SQL_ID || winPage.SQL_ID;
        param.X_EMP_SCH_AUTH_CD = param.X_EMP_SCH_AUTH_CD || winPage.EMP_SCH_AUTH_CD;
        param.X_MENU_NM = param.X_MENU_NM || "";
        param.X_PGM_URL = param.X_PGM_URL || winPage.PGM_URL;
        param.X_POP_URL = option.url;
        param.X_ENC_VAL = param.X_ENC_VAL || winPage.ENC_VAL;
        param.X_ENC_VAL2 = param.X_ENC_VAL2 || winPage.ENC_VAL2;
        param.X_HELP_PGM_ID = param.X_HELP_PGM_ID || winPage.HELP_PGM_ID;
        if ( ehrTopFrame._LOGIN_INFO ) param.X_LOGIN_INFO = ehrTopFrame._LOGIN_INFO;// for security
      }
      // 권한...세팅 end
      HCG.submit2({target: option.name, action: "/menuAction.do"}, param);
    }
    /**
     * 모달팝업창 크기변경
     * @member HCG.ModalUtil
     * @method resize
     * @param {Object} options 옵션파라미터 (width, height, top, left), 지정하지 않을 경우 전체창 크기로 변경
     *  
     */
    ,resize : function(options)
    {
      $collect = [];
      if(window.ehrTopFrame!=undefined)
      {
        $collect = window.ehrTopFrame.$(".ModalPop");
      }
      if($collect.length == 0) return;
      
      //20130425 options 값이 없으면 전체창 크기로 변경
      //options = options || {width: this.width, height: this.height};
      var $modal = $collect[$collect.length-1];

      var tWidth = $(window.ehrTopFrame||top).width();    //창너비
      var tHeight = $(window.ehrTopFrame||top).height();     //창높이
      
      options = options || {width: tWidth, height: tHeight};
      
      options.width = (options.width >= tWidth ? tWidth : options.width) || (window.ehrTopFrame||top).ModalDialog.width;
      options.height = (options.height >= tHeight ? tHeight : options.height) || (window.ehrTopFrame||top).ModalDialog.height;
      
      var pos = HCG.ModalUtil.position(options.width, options.height);

      $modal.style.width = options.width+"px";
      $modal.style.height = options.height+"px";
      $modal.style.top = pos.top+"px";
      $modal.style.left = pos.left+"px";
      
      (window.ehrTopFrame||top).ModalDialog.iframeError = false;
      
      var $div = (window.ehrTopFrame||top).$(".ModalPop");
      HCG.displayElement($div, true);
      //$div.removeClass("zoomIn").removeClass("animated");
      //$div.addClass("zoomIn").addClass("animated");
    }
  } // ModalUtil end
  ,PrimeSearch :
  {
    comboMaps : {} // PrimeSearch 대상 콤보들의 데이터를 보관, setCombo로 콤보가 그려질때 담음
    ,bCaseSensitive : true // false일 경우 대소문자 구분 하지 않기 위해 소문자로 치환함
    ,and : "+" // 검색키워드에서 사용할 수 있는 and 연산자
    /**
     * 쉬운검색 파라미터생성
     * @param areaId 조회조건영역 id
     * @param otherCname(String, Array) cname 추가지정
     */
    ,makeParam : function(areaId, otherCname)
    {
      var _prime = this;
      
      var $searchArea = $("#" + areaId);
      var $prime = $searchArea.find(".h-prime-search");
      var $input = $searchArea.find(".h-prime-search > input");   // 검색키워드
      
      var inputName = $input[0].name;
      var comboCdsName = inputName + "_COMBO_CDS";
      var $comboCds = $("#"+comboCdsName);                          // 검색어에 콤보항목이 있을 경우 사용하는 파라미터
      
      if( $prime.length == 0 || $input.length == 0 || $comboCds.length == 0)
      {
        alert("no Prime search (" + areaId + ")");
        return;
      }
      
      $form = ($("#f1").length > 0)? $("#f1") : $("form").first();
      
      // 1) 검색어정리
      var text = $input.val();
      
      // 검색어의 불필요한 공백제거
      text = text.replace(/ +/g, " ").replace(/(^ *)|( *$)/g, ""); // 연속된 공백 제거
      text = text.replace(" "+_prime.and, _prime.and).replace(_prime.and+" ", _prime.and); // and 연산자 좌우의 공백 제거
      $input.val(text);
      
      var comboNames = [];

      // 2)검색어에 콤보항목이 있는지 체크
      var arrUsedComboCd = [];
      $.each(text.split(" "), function(i, t)
      {
        var keywords = t.split(_prime.and);
        $.each(keywords, function(i, word)
        {
          if( word == "" ) return;
          $searchArea.find("select[prime_field='Y']").each(function(i, e)
          {
            var _id = $(e).attr("id") || "";
            
            var cdVal = _prime.comboMaps[_id].get(word);
            if( HCG.isVal(cdVal) )
            {
              var keyVal = word + "|" + cdVal
              if( arrUsedComboCd.indexOf(keyVal) == -1 )
              {
                arrUsedComboCd.push(keyVal);
              }
            }
          });
        });
      });
      $comboCds.val( arrUsedComboCd.join(",") );
    }
    ,setPlaceHolder : function(areaId)
    {
      var $sArea = $("div#" + areaId);
      if( $sArea.length == 0  ) return {};
      
      var _prime = this;
      
      var itemNames = [];
      
      // 영역 내에서 대상컬럼을 찾는다.
      $sArea.find("select[prime_field='Y'],input[prime_field='Y']").each(function(i, e)
      {
        var $e = $(e);
        
        // 다국어 명칭을 할당해야 함.
        var name = $e.attr("korname") || $e.attr("name");
        
        if( HCG.isVal(name) )
        {
          itemNames.push(name);
        }
      });
      if( HCG.isArray(itemNames) )
      {
        $sArea.find(".h-prime-search > input").attr("placeholder", HCG.getJosa(itemNames.join(", "), "로") + " 검색" );
      }
      
    }
  } // prime search end
  ,SearchItems : 
  {
    getItem : function(id)
    {
      var $item = $("#"+id).closest("[search_item]");
      return $item;
    }
    ,getData : function(areaId)
    {
      var $sArea = $("div#" + areaId);
      if( $sArea.length == 0 ) return null;
      return $sArea.data("area");
    }
    ,setData : function(areaId, data)
    {
      var $sArea = $("div#" + areaId);
      if( $sArea.length == 0 ) return null;
      $sArea.data("area", data);
    }
    ,addItem : function(areaId, $item)
    {
      var areaData = HCG.SearchItems.getData(areaId);
      if( !HCG.isVal(areaData) ) return null; 
      areaData.items.push( $item );
    }
    ,getItemType : function($item)
    {
      if( $item.length == 0 ) return "";
      return $item.attr("search_item");
    }
    ,getUniqueId : function()
    {
      var pre = "searchArea";
      var id = pre;
      var num = 1;
      var bDup = true;
      while(bDup)
      {
        if( $("#"+id).length > 0)
        {
          id = pre + (num++);
          continue;
        }
        else
        {
          bDup = false;
          break;
        }
      }
      return id;
    }
    ,checkAttr : function(id, item)
    {
      var bDev = HCG.nvl(HUNEL_DEV_TOOL_USE_YN) == "Y";
      // 필수옵션체크
      if( !HCG.isVal(item.type) )
      {
        if( bDev ) { alert("type속성을 확인해주세요.\n(조회조건 " + id + ")"); }
        return false;
      }
      if( !HCG.isVal(item.name) )
      {
        if( bDev ) { alert("name속성을 확인해주세요.\n(조회조건 " + id + ")"); }
        return false;
      }
      return true;
    }
     // 조건에 값이 있는지 체크
    ,checkItemNN : function($item)
    {
      var bNN = false; // Not Null 여부
      
      $item.find(".h-input-area").find("input, select").each(function(i, e){
        if( e.tagName == "INPUT" )
        {
          var eType = $(e).attr("type"); 
          switch( eType )
          {
            case "text":
            {
              bNN = HCG.isVal(e.value);
              if( bNN ) return false; 
            }
            break;
            case "radio":
            case "checkbox":
            {
              bNN = e.checked;
              if( bNN ) return false; 
            }
            break;
          }
        }
        else if( e.tagName == "SELECT" )
        {
          bNN = HCG.isVal(e.value);
          if( bNN ) return false; 
        }
      });
      
      //console.log("       " + type + " not null check : " + bNN, $item  );
      return bNN;
    }
    /**
     * 항목 정렬
     * bDraw : 정렬 후 화면에 그려줄지 여부 
     */
    ,doSort : function(areaId, bDraw)
    {
      var areaData = HCG.SearchItems.getData(areaId);
      
      if( !HCG.isVal(areaData) ) return;
      
      if( !areaData.autosort )
      {
        $.each(areaData.items, function(i, $item)
        {
          areaData.reqs.push($item);
        });
      }
      else
      {
        // 검색조건 정렬
        // 필수->입력된 일반조건(선입력 우선)->입력안된 일반조건
        var reqs = []; // required
        var optsVisible= []; // optional (현재 출력중인 항목중 보여질 항목)
        var optsShow = []; // optional (보여질 항목)
        var opts = []; // optional
        
        // 출력중인 항목들은 미리 추가
        $.each([areaData.optsVisible, areaData.optsShow], function(i, arr)
        {
          $.each(arr, function(i, $item){
            if( $item.attr("visible") == "Y" )
            {
              optsVisible.push($item);
            }
          });
        });
        
        // 초기 정렬상태 기준으로 재정렬
        $.each(areaData.items, function(i, $item)
        {
          // 필수항목은 재정렬하지 않음
          if( $item.attr("req") == "Y" )
          {
            reqs.push($item);
          }
          else if( optsVisible.indexOf($item) != -1 )
          {
            return true;
          }
          else if( $item.attr("visible") == "Y" )
          {
            optsShow.push($item);
          }
          else
          {
            opts.push($item);
          }
        });
        
        areaData.reqs = reqs;
        areaData.optsVisible = optsVisible;
        areaData.optsShow = optsShow;
        areaData.opts = opts;
      }
      
      bDraw = (typeof bDraw != "undefined") ? bDraw : false; 
      if( bDraw )
      {
        HCG.SearchItems.drawSortedItems(areaId); // 재정렬 반영
      }
    }
    ,drawSortedItems : function(areaId, bInit)
    {
      var areaData = HCG.SearchItems.getData(areaId);
      if( !HCG.isVal(areaData) ) return;
      
      var $items = $("div#" + areaId).find(".h-search-items");
      
      // 필수항목은 최초1회만 렌더링함
      if( bInit )
      {
        $.each(areaData.reqs, function(i, $item)
        {
          $items.append($item);
        });
      }
      
      // 이미 출력중인 항목은 다시 렌더링 하지 않음 (areaData.optsVisible)
      //$.each(areaData.optsVisible, function(i, $item) { });
      
      // 새로 보여질 항목
      $.each(areaData.optsShow, function(i, $item)
      {
        $items.append($item);
      });

      // 조회버튼
      $.each(areaData.searchButtons, function(i, $item)
      {
        $items.append($item);
      });
      
      // 조회버튼 후 개행
      if(areaData.$lineBreaker != null && areaData.foldLineBreak)
      {
        $items.append(areaData.$lineBreaker);
      }
      
      // 나머지
      $.each(areaData.opts, function(i, $item)
      {
        $items.append($item);
      });
    }
    // 특정 item의 출력여부를 판단하여 show / hide
    ,redrawItem : function($item)
    {
      var areaId = $item.closest(".h-search-area")[0].id;
      var areaData = HCG.SearchItems.getData(areaId);
      if( !HCG.isVal(areaData) || !HCG.isVal(areaData.autofold) || !areaData.autofold ) return;

      HCG.SearchItems.setFoldVisibility($item); // blur 발생시, 검색조건의 출력여부를 Set
      
      // 아이템을 숨김처리했다면, fold 처리 대상 제외
      if( $item.css("display") == "none" ) return;

      if( $item.attr("visible") == "Y" )
      {
        // bootstrap grid 원복 ex) col-md-1 -> col-md-4
        var classes = $item.data("grid-classes");
        $.each(classes, function(i, _class){
          var splits = _class.split("-");
          splits[splits.length-1] = "1";
          
          $item.removeClass( HCG.joinStr(splits, "-") );
          $item.addClass( _class );
        });
      }
      HCG.SearchItems.doSort(areaId, true);
    }
    // (autofold) 영역내 조건항목들을 출력
    ,unfold : function(areaId)
    {
      var areaData = HCG.SearchItems.getData(areaId);
      if( !HCG.isVal(areaData) || !HCG.isVal(areaData.autofold) || !areaData.autofold ) return;
      
      areaData.$e.find("[search_item]").removeClass("h-hidden-zone").removeClass("h-item-fade-out"); // show and delete transition
      
      $.each(areaData.items, function(i, $item){
        // 아이템을 숨김처리했다면, fold 처리 대상 제외
        if( $item.css("display") == "none" ) return true;
        
        if( $item.attr("visible") != "Y" )
        {
          if( HCG.isAni() )
          {
            setTimeout(function(){
              // bootstrap grid 원복 ex) col-md-1 -> col-md-4
              var classes = $item.data("grid-classes");
              $.each(classes, function(i, _class){
                var splits = _class.split("-");
                splits[splits.length-1] = "1";
                
                $item.removeClass( HCG.joinStr(splits, "-") );
                $item.addClass( _class );
              });
            }, 1);
          }
        }
      });

      areaData.bFold = false; // 폴드상태 : 펼처짐
    }
    // (autofold) 영역내 조건항목들을 숨김
    ,fold : function(areaId)
    {
      var areaData = HCG.SearchItems.getData(areaId);
      if( !HCG.isVal(areaData) || !HCG.isVal(areaData.autofold) || !areaData.autofold ) return;
      if( areaData.freezeFold ) return;

      /*var $focus = $(":focus");
      if( $focus.closest(".h-item").length > 0 )
      {
        $(":focus").blur(); // blur trigger
      }*/
      var $fold = areaData.$e.find(".h-item").not(".h-search-button").not("[visible='Y']"); // fold 대상 item
      
      areaData.$e.find(".h-item").removeClass("h-item-fade-out"); // delete transition
      HCG.SearchItems.doSort(areaId, true);// transition에 간섭을 피하기 위해, 애니메이션 처리 전에 재정렬

      if( HCG.isAni() )
      {
        areaData.idFoldTimeout_1 = setTimeout(function(){
          $fold.addClass("h-item-fade-out");
          $fold.each(function(index, item){
            var $item = $(item);
            var classes = $item.data("grid-classes");
            $.each(classes, function(i, _class){
              // bootstrap grid 최소사이즈로 할당 ex) col-md-4 -> col-md-1
              var splits = _class.split("-");
              splits[splits.length-1] = "1";
              $item.addClass( HCG.joinStr(splits, "-") );
              $item.removeClass( _class );
            });
          });
          $fold.on("transitionend webkitTransitionEnd oTransitionEnd", function(event){
            $(event.target).addClass("h-hidden-zone").removeClass("h-item-fade-out"); // hide and delete transition
          });
        });
        
        areaData.idFoldTimeout_2 = setTimeout(function(){
          areaData.bFold = true; // 폴드상태 : 접힘
          $fold.addClass("h-hidden-zone").removeClass("h-item-fade-out"); // hide and delete transition
          // 숨김처리 후에는 grid class 원복
          $fold.each(function(index, item){
            var $item = $(item);
            var classes = $item.data("grid-classes");
            $.each(classes, function(i, _class){
              // bootstrap grid 최소사이즈로 할당 ex) col-md-4 -> col-md-1
              var splits = _class.split("-");
              splits[splits.length-1] = "1";
              $item.removeClass( HCG.joinStr(splits, "-") );
              $item.addClass( _class );
            });
          });
        }, 300); // 아이템 애니메이션 transition delay
      }
      else
      {
        $fold.addClass("h-hidden-zone");
      }
    }
    ,isFoldItem : function($item)
    {
      // no fold (값이 있을경우, 필수값일경우, nofold 속성이 있을 경우)
      if( $item.attr("forcefold") == "Y" )
      {
        return true;
      }
      if( HCG.SearchItems.checkItemNN($item) || $item.attr("req") == "Y" || $item.attr("nofold") == "Y" )
      {
        return false
      }
      else
      {
        return true;
      }
    }
    // 출력해야하는 조건항목인지 설정한다
    ,setFoldVisibility : function($item)
    {
      if( HCG.SearchItems.isFoldItem($item) )
      {
        $item.attr("visible", "N");
      }
      else
      {
        $item.attr("visible", "Y");
        $item.removeClass("h-hidden-zone");
      }
    }
    /**
     * 검색조건 초기화
     * @param areaId      검색영역 ID
     * @param arrItem     검색조건 항목 배열
     * @param bAutoInit   자동초기화여부, 공통소스에서 자동초기화 하도록 호출할 경우 사용
     */
    ,init : function(areaId, arrItem, bAutoInit)
    {
      var $sArea = $("div#" + areaId);
      if( $sArea.length == 0 ) return;
      
      
      var areaData = {
        id : areaId
        ,$e : $sArea
        ,items : []
        ,searchButtons : []
        ,reqs : []
        ,optsShow : []
        ,opts : []
        ,optsVisible : []
        ,arrPeriod : []
        ,arrRadio : []
        ,$lineBreaker : null
        ,freezeFold : false
        ,bFold : false
        ,usePrimeSearch : false   // PrimeSearch(쉬운검색) 사용여부
        ,idFoldTimeout : null     // 자동접기 setTimeout
        ,idFoldTimeout_1 : null   // 
        ,idFoldTimeout_2 : null   // 
        ,foldingInterval : null   // 검색조건 자동접기 interval
        ,autofold : null          // 검색조건 자동접기
        ,autosort : null          // 자동정렬
        ,autocomplete : null      // 브라우저의 input 자동완성기능 사용
      };
      HCG.SearchItems.setData(areaId, areaData);
      
      $(document.body).click(function(event){
        if( $(event.target).closest(".h-search-area").length == 0  && !areaData.bFold ){
          $sArea.trigger("mouseleave");
        }
      });
      
      /* 검색영역 옵션 
       *  autoinit          : (Y/N)검색조건 자동초기화여부(기본값 Y)
       *  autofold          : (Y/N)자동접기여부(기본값 N)
       *  folding_interval  : (Number)자동접기interval (기본값 200ms)
       *  autocomplete      : (on/off)엘리먼트자동완성 어트리뷰트 제어 (기본값 off)
       */
      areaData.autoInit         = ( HCG.nvl($sArea.attr("autoinit"), "Y").toUpperCase() == "Y");
      areaData.autofold         = ( HCG.nvl($sArea.attr("autofold"), "N").toUpperCase() == "Y" && HCG.getLocalStorage("S_AUTO_FOLD_YN") == "Y"); 
      areaData.foldingInterval  = (typeof $sArea.attr("folding_interval") != "undefined") ? $sArea.attr("folding_interval") : 200;
      areaData.autocomplete     = (typeof $sArea.attr("autocomplete") != "undefined")     ? $sArea.attr("autocomplete") : "off"; 
      areaData.foldLineBreak    = ( HCG.nvl($sArea.attr("fold_linebreak"), "Y").toUpperCase() == "Y");

      // 자동초기화 제어
      if( bAutoInit && !areaData.autoInit ) return;
      
      // 검색영역 공통 스타일 적용
      $sArea.addClass("h-search-area");
      $sArea.addClass("scroll-lock");
      
      areaData.autosort = areaData.autofold ? true : false; // 자동접기를 사용한다면 자동정렬이 기본
      
      // 자동접기일 경우 unford/fold에서 정렬 수행함
      if( areaData.autofold )
      {
        areaData.$lineBreaker = $("<div class='w-100'></div>"); // 강제 개행 엘리먼트
        
        $sArea.attr("fold", "");
        
        $sArea.on("mouseenter", function(e)
        {
          clearTimeout(areaData.idFoldTimeout);
          clearTimeout(areaData.idFoldTimeout_1);
          clearTimeout(areaData.idFoldTimeout_2);
          HCG.SearchItems.unfold(areaId);
        });
        $sArea.on("mouseleave", function(e)
        {
          var activeE = document.activeElement;
          // ie 버그대응(select태그 선택창 열면 mouseleave이벤트 트리거되는 현상 방지) 
          //if( $(activeE).closest(".h-search-area")[0] == $sArea[0] && activeE.tagName == "SELECT" ) return;
          
          // 검색조건 onfocus => nofold
          if( $(activeE).closest(".h-search-area")[0] == $sArea[0]  ) return;
          
          areaData.idFoldTimeout = setTimeout(function()
          { 
            HCG.SearchItems.fold(areaId);
          }, areaData.foldingInterval);
        });
      }
      
      var $searchButtons = $sArea.find(".h-search-button");
      $searchButtons.each(function(i, btn)
      {
        areaData.searchButtons.push( $(btn) );
      });
      
      var $items = $sArea.find(".h-search-items");
      $items.addClass("row"); //bootstrap layout 적용
      $items.addClass("scroll-lock");
      
      // 조건추가 (HTML로 정의)
      $items.find("[search_item]").each(function(i, item)
      {
        var $item = $(item);
        var $border = $item.find(".h-item-border");
        var $label = $item.find(".h-item-label");
        var $inputArea = $item.find(".h-input-area");
        var _type = HCG.SearchItems.getItemType($item); 
        
        // 검색조건 공통 스타일 추가
        $item.addClass("h-item");
        $border.addClass("h-item-border");
        $border.addClass("media");
        $inputArea.addClass("h-input-area");
        $inputArea.addClass("media-body");
        $label.addClass( _type == "checkbox" ? "h-check-label" : "h-label" );

        if( areaData.autofold )
        {
          $item.addClass("h-hidden-zone");
        }
        
        // keyField item 여부
        if( $item.find("[key_field='Y']").length > 0 )
        {
          $item.addClass("h-req");
          $item.attr("req", "Y");
        }
        // PrimeSearch 사용여부
        if( $item.find("[prime_field='Y']").length > 0 )
        {
          areaData.usePrimeSearch = true;
        }

        /*
        var $searchBtn = $("<a href='#' class='h-input-area-button search'></a>");
        if( _type == "emp" || _type == "org" )
        {
          $inputArea.append($searchBtn);
          $searchBtn.on("click", function(){
            alert(_type+"개발중");
          });
        }*/
        
        HCG.SearchItems.addItem(areaId, $item); // add Item
        
        HCG.SearchItems.setFoldVisibility($item); // 출력여부를 Set
        
        $item.data("grid-classes", HCG.getBGridClasses(item)); // 부트스트랩 스타일클래스 set
      });
      
      // 조건추가 (스크립트로 정의)
      /*
      $.each(arrItem, function(i, item)
      {
        if( !HCG.SearchItems.checkAttr(areaId, item) ) return;// 조회조건 정의 배열 validation check
        
        var $item = HCG.SearchItems.newItem(areaId, item); // areaData.items에 조회항목 추가
        
        HCG.SearchItems.setFoldVisibility($item); // 출력여부를 Set

        $item.data("grid-classes", HCG.getBGridClasses($item[0])); // 부트스트랩 스타일클래스 set
      });*/

      // 조회버튼 스타일 적용
      $items.find(".h-search-button").each(function(i, item)
      {
        $(item).addClass("h-item");
      });
      
      // 세팅한 검색조건들을 화면에 렌더링
      HCG.SearchItems.doSort(areaId);
      HCG.SearchItems.drawSortedItems(areaId, true);
      
      // 조건 엘리먼트 공통
      $sArea.find(".h-input-area").find("input, select").each(function(i, input)
      {
        var $input = $(input);
        var $item = $(input).closest("[search_item]");
        
        if( typeof $input.attr("autocomplete") == "undefined" )
        {
          $input.attr("autocomplete", areaData.autocomplete);
        }
        
        // 폼엘리먼트 focus
        $input.on("focus", function()
        {
          $item.addClass("h-focus"); // border style 
        });
        
        // 폼엘리먼트 blur
        $input.on("blur", function(e)
        {
          $item.removeClass("h-focus"); // border style 
          HCG.SearchItems.setFoldVisibility($item); // blur 발생시, 검색조건의 출력여부를 Set
          HCG.SearchItems.doSort(areaId, !areaData.autofold && areaData.autosort); // (자동접기 X AND 자동정렬 O) => blur 발생할 때 재정렬 렌더링
        });
        
        // checkbox, radio는 blur대신 change
        var _type = HCG.SearchItems.getItemType($item);
        if( _type == "checkbox" || _type == "multiCheck" || _type == "radio" )
        {
          $input.on("change", function()
          {
            HCG.SearchItems.setFoldVisibility($item); // blur 발생시, 검색조건의 출력여부를 Set
            HCG.SearchItems.doSort(areaId, !areaData.autofold && areaData.autosort); // (자동접기 X AND 자동정렬 O) => blur 발생할 때 재정렬 렌더링
          });
        }
        
        if( _type == "combo" )
        {
          // ie mouseleave 버그처리로, change 발생시 blur 트리거함
          $input.on("change", function(){
            $input.blur();
          });
        }
      });
      
      if( areaData.usePrimeSearch )
      {
        var $prime, $primeInput;
        if( $items.find("div.h-prime-search").length == 0 )
        {
          $prime = $("<div class='h-prime-search'></div>");
          $primeInput = $("<input type='text'>");
          
          $primeInput.attr("name", "S_PRIME_SEARCH");
          $prime.addClass("col-md-6");
          $prime.addClass("col-lg-4");
          $prime.append($primeInput);
        }
        else
        {
          $primeInput = $( $items.find(".h-prime-search > input")[0] );
          $prime = $( $primeInput.closest("div") );
        }
        
        var inputName = $primeInput[0].name;
        
        if( !HCG.isVal(inputName) )
        {
          alert("PrimeSearch input name is not defined. (" + areaId + ")");
        }
        else if( $("[name=" + inputName + "]").length > 1 )
        {
          alert("PrimeSearch input name duplicated. (" + inputName + ")");
        }
        else
        {
          $prime.addClass("h-prime-search");
          
          // 쉬운검색에 필요한 hidden input append
          var colsName = inputName + "_COLS";
          var comboCdsName = inputName + "_COMBO_CDS";
          $primeCols = $("<input type='hidden' />");
          $primeCols.attr("id", colsName);
          $primeCols.attr("name", colsName);
          $primeComboCds = $("<input type='hidden' />");
          $primeComboCds.attr("id", comboCdsName);
          $primeComboCds.attr("name", comboCdsName);
          $prime.append($primeCols);
          $prime.append($primeComboCds);
          
          $items.prepend($prime);
          
          if( !HCG.isVal($primeInput.attr("placeholder")) )
          {
            HCG.PrimeSearch.setPlaceHolder(areaId);
          }
        }
      }
      
      $sArea.removeClass("h-hidden-zone");
      $sArea.css("display", "block");
    } // HCG.SearchItems.init end
    ,newItem : function(areaId, item)
    {
      var $sArea = $("div#" + areaId);
      if( $sArea.length == 0 ) return;
      
      var areaData = HCG.SearchItems.getData(areaId);
      
      /**** 검색조건 항목별 속성 ****/
      var _type       = item.type.toLowerCase();          // (필수)검색조건의 유형, HTML의 type 속성이 아님에 유의
      var _name       = item.name                         // (필수)엘리먼트의 id, name attribute
      var _label      = item.label || "";                 // 검색조건 명칭
      var _keyField   = item.keyField || false;           // 필수여부 (default false)
      var _prime      = item.primeSearch || false;        // PrimeSearch(쉬운검색) 사용여부 (default false)
      var _value      = item.value || "";                 // 초기값
      var _align      = (item.align || "").toLowerCase(); // 정렬
      var _attrs      = item.attrs || {};                 // 기타 폼 엘리먼트의 attribute 지정
      var _events     = item.events || {};                // 이벤트 지정 // 이벤트함수 속성은 문자열로 정의 (ex : "doAction('aaaa', 'bbb');" )
      /**** 검색조건 항목별 속성 ****/
      
      _keyField   = (typeof _keyField == 'string') ? (_keyField=="Y" ? true : false) : !!_keyField;
      switch(_align)
      {
        case "left"   : {_align = "h-align-left"} break;
        case "center" : {_align = "h-align-center"} break;
        case "right"  : {_align = "h-aligh-right"} break;
      }
      
      // 라디오 그룹은 연속으로 정의해야 함
      if( HCG.isArray(areaData.arrRadio) && _type != "radio" )
      {
        areaData.arrRadio = new Array();
      }
      
      // 조건항목 공통 엘리먼트
      var $item = $("<div search_item></div>");
      var $border = $("<div></div>");
      var $label = $("<div item_label></div>");
      var $inputArea = $("<div></div>");

      // 검색조건 공통 스타일 추가
      $item.addClass("h-item");
      $border.addClass("h-item-border");
      $border.addClass("media");
      $inputArea.addClass("h-input-area");
      $inputArea.addClass("media");
      $inputArea.addClass("media-body");
      $label.addClass( _type == "checkbox" ? "h-check-label" : "h-label" );
      if( areaData.autofold )
      {
        $item.addClass("h-hidden-zone");
      }
      
      $item.append($border);
      
      // 필수 조건 : 기간조건처럼 폼엘리먼트가 여러개 있을 때는, keyField가 하나라도 있다면 필수조건 적용함
      if(_keyField)
      {
        $item.addClass("h-req");
        $item.attr("req", "Y");
      };
      
      var $itemElem; // input, select 등 form 엘리먼트
      switch( _type )
      {
        case "org":
        case "text":
        {
          var _dataFormat  = item.dataFormat || "";
          var _buttonType  = item.buttonType || ""; // text타입에 버튼 append
          var _buttonClick = item.buttonClick || ""; // text타입에 append한 버튼 클릭이벤트, 문자열로 정의
          
          $label.append( HCG.isVal(_label) ? _label : _name );
          $item.addClass("col-md-3");
          $item.addClass("col-lg-2");
          $item.attr("search_item", "text");
          
          var $itemElem = $("<input type='text'/>");
          $itemElem.attr("name", _name);
          $itemElem.attr("id", _name);
          $itemElem.attr("korname", _label);
          $itemElem.attr("autocomplete", areaData.autocomplete);
          
          if(_value) { $itemElem.val(_value); }
          if(_keyField) { $itemElem.attr("key_field", "Y"); }
          if(_prime)
          {
            areaData.usePrimeSearch = true;
            $itemElem.attr("prime_field", "");
          }
          
          if(_dataFormat)
          {
            $itemElem.attr("data_format", _dataFormat);
          }
          else
          {
            $itemElem.addClass(_align || "h-align-left"); // 기본 왼쪽정렬
          }

          $inputArea.append($itemElem);
          
          // 년월일선택 포맷일 경우 버튼생성하지 않음
          if( _buttonType && _dataFormat != "dfDateYmd")
          {
            $inputArea.addClass("media"); // 버튼이 들어갈 경우 media 레이아웃 적용
            var $btn;
            switch(_buttonType)
            {
              case "calendar":
              {
                $btn = $("<a href='#calendar' class='h-button-calendar'></a>");
              }
              break;
            }
            if(_buttonClick)
            {
              $btn.attr("onclick", _buttonClick);
            }
            $inputArea.append($btn);
          }
          $border.append($label);
          $border.append($inputArea);
          
          // add Item
          HCG.SearchItems.addItem(areaId, $item);
        }
        break; 
        case "emp":
        {
          var _dataFormat  = item.dataFormat || "";
          var _buttonType  = item.buttonType || ""; // text타입에 버튼 append
          var _buttonClick = item.buttonClick || ""; // text타입에 append한 버튼 클릭이벤트, 문자열로 정의
          
          $label.append( HCG.isVal(_label) ? _label : _name );
//          $label.addClass("h-label");
          $item.addClass("col-md-3");
          $item.addClass("col-lg-2");
          $item.attr("search_item", "text");
          
          var $itemElem = $("<input type='text'/>");
          $itemElem.attr("name", _name);
          $itemElem.attr("id", _name);
          $itemElem.attr("korname", _label);
          $itemElem.attr("autocomplete", areaData.autocomplete);
          
          if(_value) { $itemElem.val(_value); }
          if(_keyField) { $itemElem.attr("key_field", "Y"); }
          if(_prime)
          {
            areaData.usePrimeSearch = true;
            $itemElem.attr("prime_field", "");
          }
          
          if(_dataFormat)
          {
            $itemElem.attr("data_format", _dataFormat);
          }
          else
          {
            $itemElem.addClass(_align || "h-align-left"); // 기본 왼쪽정렬
          }
          
          $inputArea.append($itemElem);
          
          /*
          var $searchBtn = $("<a href='#' class='h-input-area-button search'></a>");
          $inputArea.append($searchBtn);
          $searchBtn.on("click", function(){
            alert(_type+"개발중");
          });*/
          
          $border.append($label);
          $border.append($inputArea);
          
          // add Item
          HCG.SearchItems.addItem(areaId, $item);
        }
        break; 
        case "combo":
        {
          $label.append( HCG.isVal(_label) ? _label : _name );
//          $label.addClass("h-label");
          $item.addClass("col-md-3");
          $item.addClass("col-lg-2");
          $item.attr("search_item", "combo");
          
          var $itemElem = $("<select class='insert_select'></select>");
          $itemElem.attr("name", _name);
          $itemElem.attr("id", _name);
          $itemElem.attr("korname", _label);
          $itemElem.addClass(_align || "h-align-left"); // 기본 왼쪽정렬
          
          if(_keyField) { $itemElem.attr("key_field", "Y"); }
          if(_prime)
          {
            areaData.usePrimeSearch = true;
            $itemElem.attr("prime_field", "");
          }
          
          var _comboData = item.comboData || "";
          var _comboOption = item.comboOption || "";
          if( HCG.isVal(_comboData) )
          {
            setCombo(_comboData, $itemElem[0], null, _comboOption);
            if( _value )
            {
              $itemElem.val(_value);
            }
          }
          
          $inputArea.append($itemElem);
          $border.append($label);
          $border.append($inputArea);

          // add Item
          HCG.SearchItems.addItem(areaId, $item);
        }
        break;
        case "checkbox":
        {
          var _checked = item.checked || false;
          
          $label.append( HCG.isVal(_label) ? _label : _name );
//          $label.addClass("h-check-label");
          $item.addClass("col-md-3");
          $item.addClass("col-lg-2");
          $item.attr("search_item", "checkbox");
          
          var $itemElem = $("<input type='checkbox' />");
          $itemElem.attr("name", _name);
          $itemElem.attr("id", _name);
          $itemElem.attr("korname", _label);
          $itemElem.addClass("h-checkbox-style01");
          $itemElem.attr("value", (HCG.isVal(_value) ?  _value : "Y") );
          
          if(_checked)
          {
            $itemElem.prop("checked", _checked);
            $itemElem.attr("checked", "");
          }

          $inputArea.append($itemElem);
          $inputArea.append("<label for='" + _name + "'></label");
          $border.append($inputArea);
          $border.append($label);

          // add Item
          HCG.SearchItems.addItem(areaId, $item);
        }
        break;
        case "date":
        {
          $label.append( HCG.isVal(_label) ? _label : _name );
//          $label.addClass("h-label");
          $item.addClass("col-md-3");
          $item.addClass("col-lg-2");
          $item.attr("search_item", "date");
          
          var $itemElem = $("<input type='text'/>");
          $itemElem.attr("name", _name);
          $itemElem.attr("id", _name);
          $itemElem.attr("korname", _label);
          $itemElem.attr("autocomplete", areaData.autocomplete);
          $itemElem.attr("data_format", "dfDateYmd");
          
          if( _value )
          {
            $itemElem.val(_value);
          }
          
          if(_keyField) { $itemElem.attr("key_field", "Y"); }
          if(_prime)
          {
            areaData.usePrimeSearch = true;
            $itemElem.attr("prime_field", "");
          }
          
          $inputArea.append($itemElem);
          $border.append($label);
          $border.append($inputArea);
          
          // add Item
          HCG.SearchItems.addItem(areaId, $item);
        }
        break;
        case "period":
        {
          // From 정의
          if( !HCG.isArray(areaData.arrPeriod) )
          {
            // 기간의 label은 From의 label로
            $label.append( HCG.isVal(_label) ? _label : _name );
//            $label.addClass("h-label");
            $item.addClass("col-md-4");
            $item.attr("search_item", "period");
            
            var $itemElem = $("<input type='text' />");
            $itemElem.attr("name", _name);
            $itemElem.attr("id", _name);
            $itemElem.attr("korname", _label);
            $itemElem.attr("autocomplete", areaData.autocomplete);
            $itemElem.attr("data_format", "dfDateYmd");
            if( _value )
            {
              $itemElem.val(_value);
            }
            
            if(_keyField) { $itemElem.attr("key_field", "Y"); }
            if(_prime)
            {
              areaData.usePrimeSearch = true;
              $itemElem.attr("prime_field", "");
            }
            
            // from to 구분자
            var $separator = $("<div class='h-period-separator'>~</div>")
            
            $inputArea.append($itemElem);
            $border.append($label);
            $border.append($inputArea);
            $border.append($separator);

            // add Item
            HCG.SearchItems.addItem(areaId, $item);
            
            areaData.arrPeriod.push($item);
          }
          // to 정의
          else
          {
            // From정보가 들어있는 $item 참조
            $item     = areaData.arrPeriod[0];
            $border  = $item.find(".h-item-border")
            
            var $itemElem = $("<input type='text' />");
            
            $itemElem.attr("name", _name);
            $itemElem.attr("id", _name);
            $itemElem.attr("korname", _label);
            $itemElem.attr("autocomplete", areaData.autocomplete);
            $itemElem.attr("data_format", "dfDateYmd");
            if( _value )
            {
              $itemElem.val(_value);
            }
            
            if(_keyField) { $itemElem.attr("key_field", "Y"); }
            if(_prime)
            {
              areaData.usePrimeSearch = true;
              $itemElem.attr("prime_field", "");
            }

            $inputArea.append($itemElem);
            $border.append($inputArea);

            areaData.arrPeriod = new Array();
            
          }
        }
        break;
        case "radio":
        {
          var _checked = item.checked || false;
          
          var $itemElem   = $("<input type='radio'/>");
          var $labelElem = $("<label></label>");

          $item.attr("search_item", "radio");
          $labelElem.append( HCG.isVal(_label) ? _label : _name )
          
          // 라디오그룹 첫번째
          if( !HCG.isArray(areaData.arrRadio) )
          {
            var _id = _name + "_1";
            $itemElem.attr("id", _id);
            $itemElem.attr("name", _name);
            $itemElem.attr("korname", _label);
            $itemElem.val(_value);
            if( _checked )
            {
              $itemElem.prop("checked", _checked);
            }
            $labelElem.attr("for", _id);
            
            var _labelRadio = item.labelRadio || "radiogroup"; 
            $inputArea.addClass("align-center");
            
            // 첫번째에 append는 완료
            $label.append(_labelRadio);
//            $label.addClass("h-label");
            $inputArea.append($itemElem);
            $inputArea.append($labelElem);
            $border.append($label);
            $border.append($inputArea);

            // add Item
            HCG.SearchItems.addItem(areaId, $item);

            areaData.arrRadio.push($inputArea);
          }
          else
          {
            // 처음에 생성된 라디오의 $item 참조
            $item = areaData.arrRadio[0].closest("[search_item]");
            
            var _id = _name + "_" + areaData.arrRadio.length;
            $itemElem.attr("id", _id);
            $itemElem.attr("name", _name);
            $itemElem.attr("korname", _label);
            $itemElem.val(_value);
            if( _checked )
            {
              $itemElem.prop("checked", _checked);
            }
            $labelElem.attr("for", _id);
            
            // 라디오그룹 inputarea
            areaData.arrRadio[0].append($itemElem);
            areaData.arrRadio[0].append($labelElem);
            
            areaData.arrRadio.push($inputArea);
          }
          
          // 라디오 갯수에 따라 레이아웃 조정 필요함
          $item.addClass("col-md-2");
        }
        break;
      }
      
      // 폼엘리먼트에 attribute set
      $.each(_attrs, function(key, val)
      {
        if( !HCG.isVal(key) ) return
        $itemElem.attr(key, (val || ""));
      });
      
      // 폼엘리먼트에 event set
      $.each(_events, function(event, func)
      {
        if( !HCG.isVal(event) || !HCG.isVal(func) ) return;
        $itemElem.attr("on"+event, func);
      });
      return $item;
    } // HCG.SearchItems.newItem end
  }
  ,Buttons :
  {
    /**
     * 모바일 해상도에서 숨겨진 시트버튼 toggle
     */
    clickToggler : function(el)
    {
      var $toggler = $(el);
      if( $toggler.length == 0 ) return;
      
      // 펼쳐질 버튼리스트 대화창은 PC버전 버튼들 영역을 활용한다
      var $dialog = $toggler.closest(".h-btn-area").find(".h-btns");
      
      $(".h-btns").not($dialog).removeClass("h-unfold");
      
      if( $dialog.hasClass("h-unfold") )
      {
        $dialog.removeClass("h-unfold");
      }
      else
      {
        $dialog.addClass("h-unfold");
      }
    }
  } // Buttons Namespace End
  /**
   * 태그 class 속성 중 Bootstrap Grid관련 클래스를 골라냄 ex) col-md-3
   * @member HCG
   * @method getBGridClass
   * @param {Object} elem 태그엘리먼트
   * @return {Array}
   */
  ,getBGridClasses : function(elem)
  {
    var $e = $(elem);
    if( $e.length == 0 ) return;
    
    var rv = [];
    var classes = $e.attr("class").split(" ");
    
    $.each(classes, function(i, _class)
    {
      if( HCG.startsWith(_class, "col-") )
      {
        rv.push(_class);
        return true;
      }
    });
    
    return rv;
  }
  /**
   * 'data_format' 속성을 가진 text inpu과 textarea엘리먼트들을 찾아 일괄적으로 포맷 적용 
   * @member HCG
   * @method applyElementFormat
   */
  ,applyElementFormat : function()
  {
    $("input[type=text], textarea").each(function(index)
    {
      var element = $(this);
      if(element.prop("__formatapplied")) return;
      element.prop("__formatapplied", true);

      var elementAttr = element.attr("data_format");
      
      if( !HCG.isIE() && (elementAttr==""||elementAttr==undefined)) return; //Safari에서 텍스트 지워짐현상이 있어 IE에서만 동작하게 변경 kyn
                                                                        //ie에서는 INPUT에 포커스가 안들어가는 버그가 있어 필요없어도 아래를 실행
      switch ( elementAttr )
      {
        case "dfDateYy":  HCG.applyStyle(element, "center", "disabled", "####".length); break;
        case "dfDateMm":  HCG.applyStyle(element, "center", "disabled", "##".length); break;
        case "dfDateYmd":
        {
          HCG.applyStyle(element, "center", "disabled", "####.##.##".length);
          element.setValue = function(val)
          {
            element.value = HCG.formatValue(val, elementAttr);
          };
        }
        break;
        case "dfDateYmd1":
        {
          HCG.applyStyle(element, "center", "disabled", "####.##.##".length);
          element.setValue = function(val)
          {
            element.value = HCG.formatValue(val, elementAttr);
          };
        }
        break;
        case "dfDateYm":  HCG.applyStyle(element, "center", "disabled", "####.##".length); break;
        case "dfDateMd":  HCG.applyStyle(element, "center", "disabled", "##.##".length); break;
        case "dfTimeHms": HCG.applyStyle(element, "center", "disabled", "##:##:##".length); break;
        case "dfTimeHm":  HCG.applyStyle(element, "center", "disabled", "##:##".length); break;
        case "dfTimeYmdhms": HCG.applyStyle(element, "center", "disabled", "####.##.## ##:##:##".length); break;
        case "dfIdNo":    HCG.applyStyle(element, "center", "disabled", "######-#######".length); break;
        case "dfSaupNo":  HCG.applyStyle(element, "center", "disabled", "###-##-#####".length); break;
        case "dfCardNo":  HCG.applyStyle(element, "center", "disabled", "####-####-####-####".length); break;
        case "dfPostNo":  HCG.applyStyle(element, "center", "disabled", "###-###".length); break;
        case "dfCorpNo":  HCG.applyStyle(element, "center", "disabled", "######-#######".length); break;
        case "dfNo":      HCG.applyStyle(element, null, "disabled", null); break;
        case "dfInteger1":HCG.applyStyle(element, "right", "disabled", "###".length); break;
        case "dfIssueNo":  HCG.applyStyle(element, "center", "disabled", "####-######".length); break;
        case "dfInteger+":
        case "dfInteger":
        case "dfFloat+":
        case "dfFloat":   HCG.applyStyle(element, "right", "disabled", null); break;
        // case "dfEmail": break;
        default : HCG.applyStyle(element,"left", "normal", null);  break; //layer팝업이 닫힌후 일부 text에 포커스가 안가는 오류가 edge와 ie일부 버전에서 생겨추가
      }
      
      if ( element.attr("onkeyupchange") ) element.attr("onkeyupchange", new Function(element.attr("onkeyupchange")));
      if ( element.attr("onkeyupmaxlength") ) element.attr("onkeyupmaxlength", new Function(element.attr("onkeyupmaxlength")));
      if ( element.attr("onblurchange") ) element.attr("onblurchange", new Function(element.attr("onblurchange")));

      element.bind('focus', function()
      {
        //var element = this;
        element.attr("_fvalue", element.val());
        HCG.formatInput(element);
        element[0].select();
      });
      
      if(elementAttr==null || elementAttr=="") return;
      
      element.bind('keyup', function()
      {
        //if ( element.attr2("_pvalue") == "" ) element.attr("_pvalue", element.val());
        if (element.val() != element.attr("_pvalue") )
        {
          var agent = navigator.userAgent.toLowerCase();
          //ie가 아닐 경우
          if ( !((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1))) {
            //ie에서 keyup시 formatInput을 하게되면 onchange이벤트가 일어나지 않는 현상이 발생한다. 
            HCG.formatInput(element);
          }
          
          element.attr("_pvalue", element.val());
          if ( element.attr("onkeyupchange") ) eval(element.attr("onkeyupchange"));
          if ( element.val().length == element.attr("maxLength") ) if ( element.attr("onkeyupmaxlength") ) eval(element.attr("onkeyupmaxlength"));
        }
        //element.attr("_pvalue",element.val());
      });
      
      element.bind('blur', function()
      {
        //var element = this;
        HCG.formatInput(element);
        if ( element.val() != element.attr("_fvalue") ) if ( element.attr("onblurchange") ) eval(element.attr("onblurchange"));
      });

      if ( element.attr("data_format") == "dfDateYmd" && ! (element.attr2("readOnly") || element.attr2("disabled"))  )
      {
        element.attr("autocomplete", "off");
        
        // 기간일 경우 FROM 달력출력 X
        var $periodWrap = element.closest(".h-calendar2, [search_item='period']");
        var isPeriod = $periodWrap.length > 0;
        var paramShowOn = "both";
        if( isPeriod && $periodWrap.find("input")[0] == element[0] )
        {
          paramShowOn = "focus";
        }

        element.datepicker({
              showOn: paramShowOn,
              buttonImage: "/resource/images/icon/icon_calender.png",
              buttonImageOnly: true,
              buttonText : "",
              dateFormat : "yy.mm.dd",
              changeYear:true,
              changeMonth:true,
              closeText:"Close",
              yearRange:"1900:2100",
              showOtherMonths:true,
              selectOtherMonths:true,
              showButtonPanel: true,
              //여러가지 달력의 액션이 다를경우 본인의 아이디 값으로 호출하기 위해....lsg1lsg2
              onSelect : function(dateTEXT, inst)
              {
                try
                {
                  if($(element).attr("onblurchange")!=undefined)
                  { 
                    $(element).trigger("blur"); 
                  }
                  if($(element).attr("onchange")!=undefined)
                  {
                    $(element).trigger("change");
                  }
                  // 검색조건 fold trigger
                  setTimeout(function(){
                    element.parents().find("div.h-search-area").trigger("mouseleave");
                  }, 300);
                  
                }catch(e){
                  alert(e);
                }
              }, //change_date함수를 호출하고 있었으나 남아있지 않아 삭제
              onClose: HCG.removeAria
        });

        //$(".ui-datepicker-trigger").css("vertical-align","middle").css("width","12px"); //px를 강제로 줘서 크롬에서 offset() 을 가져올때 캐쉬에 있는 것을 참고하지 않토록함.
        $(".ui-datepicker-trigger").addClass("h-datepicker-button");
        $('.ui-datepicker-trigger').attr('aria-describedby', 'datepickerLabel');
        
        dayTripper();
      }
    });
    
    // datepicker에 마우스를 가져다대면 검색영역이 fold 되는 현상을 방지하기 위해 고정처리
    var freezeAreas = [];
    var freezeTimeout;
    $("#ui-datepicker-div").on("mouseenter", function()
    {
      clearTimeout(freezeTimeout);
      $("div.h-search-area").each(function(i, area){
        var areaData = HCG.SearchItems.getData(area.id);
        if( !areaData.bFold )
        {
          areaData.freezeFold = true; 
        }
        freezeAreas.push(areaData);
      });
    });
    // 고정해제
    $("#ui-datepicker-div").on("mouseleave", function()
    {
      freezeTimeout = setTimeout(function(){
        $.each(freezeAreas, function(i, areaData){
          areaData.freezeFold = false;
        });
        freezeAreas = [];
      }, 1000);
    });
  }
  /**
   * 공통조직검색조건 의 기능들을 일괄 정의
   * @member HCG
   * @method applyElementSearchOrg
   */
  ,applyElementSearchOrg : function(vueInstance)
  {
    $(".h-component-sy182").each(function(index, elem)
    {
      var $org = $(elem);
      
      if($org.attr("__searchorgapplied")=="Y") return;
      if( HCG.isVal($org.attr("V_MODEL_ORG_ID")) && typeof vueInstance == "undefined" ) return;
      
      if( typeof vueInstance != "undefined" )
      {
        $org.data("vue-instance", vueInstance);
      }
      
      // 컴포넌트 기본 기준일 대신 기준일을 따로 지정할 수 있음
      if( !HCG.isVal($org.attr("STD_YMD_ID")) )
      {
        $org.attr("STD_YMD_ID", $org.attr("PREFIX") + "_SY182_YMD");
      }
      
      HCG.setOrgId_sy182($org, "", true); // 조직ID초기화
      HCG.setOrgNm_sy182($org, "", true); // 조직명초기화
      
      $org.attr("__searchorgapplied","Y");
      $org.attr("progressCount",0);

      if ( $org.ondata!=undefined)
      {
        $org.ondata = new Function($org.ondata);
      }

      $org.attr("maxLength","15");
      $org.css({imeMode: 'active'});

      $.fn.extend({
        doAction_org : function(sAction, p1)
        {
          var $doOrg = $(this).parent().find(".search_org");
          
          var element = $(elem);
          var S_C_CD;
          
          // element 없어도 catch 로 안빠진다....
          // if문으로 순차적으로 비교
          // 2013.03.21 서영준 ( HCG )
          try {
            S_C_CD = $doOrg.attr("C_CD");
            if(!S_C_CD) { S_C_CD = $("#"+$doOrg.attr("CCD_INPUT_NAME")).val(); }
            if(!S_C_CD) { S_C_CD = Page.C_CD; }
          }
          catch(e){
            try {
              S_C_CD = $("#"+$doOrg.attr("CCD_INPUT_NAME")).val();
            }
            catch(e) {
              try{ S_C_CD = Page.C_CD }catch(e){}
            }
          }
          
          switch ( sAction )
          {
            case commonOtpVal.search_org01:
            {
              if ( $doOrg.attr("ajaxLoading")!=undefined )
              {
                alert("검색중입니다...");
                return;
              }
              if ( $.trim($doOrg.val()).length == 0 )
              {
                $doOrg.doAction_org("resetorg01");
                return;
              }
              // 조직명으로 검색
              $doOrg.doAction_org("ajaxLoading", true);
              HCG.ajaxRequestXS(commonOtpVal.Sy_com_182_c01, commonOtpVal.searchOrg01, {S_C_CD: S_C_CD, S_ORG_NM: $doOrg.val(), S_YMD : HCG.getYmd_sy182($doOrg)}, function(xs){
                
                var RowCount = xs.RowCount();
                if ( RowCount == 0 )
                {
                  alert(HCG.ajaxMsg("MSG_ALERT_SEARCH_ORG_NOTHING"));
                  $doOrg.select();
                  $doOrg.focus();
                  $doOrg.doAction_org("resetorg01");
                }
                else if ( RowCount > 1 )
                {
                  var pre = $doOrg.attr("PREFIX");
                  var dv = document.createElement("DIV");
                  document.body.appendChild(dv);
                  dv.id = pre + "_ORG_SCH_LAYER";
                  $(dv).css("width","170px");
                  $(dv).css("height","112px");
                  $(dv).css("border-radius","10px");
                  $(dv).css("border-top","1px solid #868daa");
                  $(dv).css("border-left","1px solid #868daa");
                  $(dv).css("border-right","1px solid #868daa");
                  $(dv).css("border-bottom","1px solid #868daa");
                  $(dv).css("overflow","hidden");
                  $(dv).css("position","absolute");
                  $(dv).css("zIndex","20000");
                  $(dv).css("background-color","white");
                  $(dv).css("margin-top",  $doOrg.offset().top + 5);
                  $(dv).css("margin-left",  $doOrg.offset().left );
                  $(dv).css("top",  18 );
                    
                  var timeout;
                  $(dv).mouseleave(function () {timeout = setTimeout(function () {dv.parentNode.removeChild(dv);}, 500);}).mouseenter(function () {clearTimeout(timeout);});
                  
                  var dv01 = document.createElement("SPAN");
                  dv01.id = pre + "_ORG_FOUND_LIST";
                  $(dv01).css("width","93%");
                  $(dv01).css("height","90%");
                  $(dv01).css("display","inline-block");
                  $(dv01).css("background-color","#fff");
                  $(dv01).css("margin-top","10px");
                  $(dv01).css("margin-left","10px");
                  $(dv01).css("margin-left","10px");
                  $(dv01).css("overflow","auto");
                  $(dv01).css("zIndex","20000");
                  dv.appendChild(dv01);
                  
                  var ol01 = document.createElement("OL");
                  ol01.style.listStyle = "none";
                  var shtml = "";
                  var attrs = "";
                  for (var i = 0; i < RowCount; i++)
                  {
                    attrs = " PRE='" + pre + "' C_CD='" + xs.GetCellValue(i, "C_CD") + "' ORG_ID='" + xs.GetCellValue(i, "OBJ_ID") + "' ORG_NM='" + xs.GetCellValue(i, "OBJ_NM") + "'";
                    shtml += "<LI style='font-size:13px; color:#868daa; padding:0 10px; background:url(/resource/images/icon/blt_layer.gif) no-repeat 0 6px;white-space:nowrap;' onclick='HCG.OrgSimpleListClick($(this))'" + attrs + "><a href='javascript:;'>" + xs.GetCellValue(i, "OBJ_NM") + "</a></LI>";
                  }
                  ol01.innerHTML = shtml;
                  dv01.appendChild(ol01);
                  // 두건이상이면 조직찾기 팝업
                  //element.doAction_org("poporg01");
                }
                else if ( RowCount == 1 )
                {
                  // 검색된 조직이 하나면
                  if($doOrg[0].data==undefined) $doOrg[0].data = {};
                  $doOrg[0].data.ORG_ID = xs.GetCellValue(0, "OBJ_ID");
                  $doOrg.val(xs.GetCellValue(0, "OBJ_NM"));
                  if($doOrg.attr("ondata")!=undefined) eval($doOrg.attr("ondata"));
                  try{$doOrg.css("imeMode", "active");}catch(e){};
                }
              }, function() { $doOrg.doAction_org("ajaxLoading", false); });
            }
            break;
            case commonOtpVal.poporg01:
            {
              var params = {
                  S_C_CD: S_C_CD,
                  X_EMP_SCH_AUTH_CD: $doOrg.attr("EMP_SCH_AUTH_CD"),
                  X_PROFILE_ID: $doOrg.attr("PROFILE_ID"),
                  S_SELMODE: "S",
                  S_ORG_NM: $doOrg.val(),
                  S_YMD: HCG.getYmd_sy182($doOrg),
                  S_HIDE_EMP_GRADE: $doOrg.attr("HIDE_EMP_GRADE"),
                  X_HELP_PGM_ID: "sy_com_160_p01"
              }
              HCG.ModalUtil.open({url:__base_dir+"sys/sy_com/sy_com_160_p01.jsp",title:HCG.ajaxLabel("search_org"), param: params}, function(rv){
                if(rv != null)
                {
                  var grid = rv;
                  var RowCount = grid.RowCount;
                  var ColCount = grid.ColCount;
                  
                  if($doOrg[0].data==undefined) $doOrg[0].data = {};
                  for ( var r = 0; r < RowCount; r++ )
                  {
                    for ( var col = 0; col < ColCount; col++ )
                    {
                      $doOrg[0].data[HCG.grid_GetColName(grid, col).replace("OBJ", "ORG")] = HCG.grid_GetCellValue(grid, r, col);
                    }
                    break;// get only one
                  } 
                  HCG.setOrgNm_sy182($doOrg, $doOrg.getOrg("ORG_NM"));
                  //$("#"+$doOrg.attr("PREFIX")+"_ORG_NM").val($doOrg.getOrg("ORG_NM"));
                  if($doOrg.attr("ondata")!=undefined) eval($doOrg.attr("ondata"));
                }
                else
                {
                  HCG.setOrgId_sy182($doOrg, "");
                  HCG.setOrgNm_sy182($doOrg, "");
                  //$("#"+$doOrg.attr("PREFIX")+"_ORG_NM").val("");
                  //$("#"+$doOrg.attr("PREFIX")+"_ORG_ID").val("");
                }
              });
            }
            break;
            case "resetorg01":
            {
              $doOrg[0].data = {};
              $doOrg.val("");
              if($doOrg.attr("ondata")!=undefined) eval($doOrg.attr("ondata"));
            }
            break;
            case "ajaxLoading":
            {
              if ( p1 )
              {
                $doOrg.progressCount++;
                if ( $doOrg.progressCount == 1 )
                {
                  $doOrg.style.background = "url("+__base_dir+"images/common/indicator.gif)";
                  $doOrg.style.backgroundRepeat = "no-repeat";
                  Progress.start();
                }
              }
              else
              {
                $doOrg.progressCount--;
                if ( $doOrg.progressCount == 0 )
                {
                  $doOrg.style.backgroundImage = "";
                  Progress.stop();
                }
              }
            }
            break;
          }
          
        } // doAction_org end
      });

      $.fn.extend({
        getOrg : function(key)
        {
          var $e = $(this).parent().find(".search_org");
          return HCG.nvl($e[0].data[key]);
        }
      });
        
      $org[0].data = {};// 저장장소
      $org.attr("title", HCG.ajaxMsg("MSG_ORG_001"));
      $org.attr("autocomplete", "off");
      var EMP_SCH_AUTH_CD = HCG.nvl($org.attr("EMP_SCH_AUTH_CD"), "10");//
    
      var PROFILE_ID      = HCG.nvl($org.attr("PROFILE_ID"));//
      var SKIN_PATH       = HCG.nvl($org.attr("SKIN_PATH"),__base_dir+"resource/kr/skin1");//
      var MODE_CHECK      = HCG.nvl($org.attr("MODE_CHECK"), "0010");//
      var HIDE_EMP_GRADE  = HCG.nvl($org.attr("HIDE_EMP_GRADE"), "N");//
      var PREFIX          = HCG.nvl($org.attr("PREFIX"), "S");
    
      if ( EMP_SCH_AUTH_CD == "30" )
      {
        var search_button = $("<a href='#' id='icsch_sy182_" + PREFIX + "' class='h-input-area-button search' />");
        $org.parent().append(search_button);      
        search_button.bind("click", function(e){
          $(this).doAction_org(commonOtpVal.poporg01);
        }).bind("focus", function(e){ //버튼이 focus되면 점선으로 된 테두리 없애기
          //$(this).blur();
        })
      }
    
      var EMP_SCH_AUTH_CD = HCG.nvl($org.attr("EMP_SCH_AUTH_CD"), "10");
      if(EMP_SCH_AUTH_CD != "20")
      {
        $org.bind("keydown", function(e)
        {
          if ( e.keyCode == 13 )
          {
              e.preventDefault();
              e.stopPropagation();
              $(this).blur();
          }
        });
        $org.bind("keyup", function(e)
        {
          e?e:e=event;
          if ( this.value.length == 0 )
          {
            $(this).doAction_org("resetorg01");
          }
        });
            
        $org.bind("change",function(e){
          if ( this.value.length > 0 && $(this).attr("progressCount") == 0)
          {
            $(this).doAction_org(commonOtpVal.search_org01);
          }
        });
      }
    });
  } // applyElementSearchOrg end
  /**
   * 공통사원검색조건의 기능을 일괄 정의
   * @member HCG
   * @method applyElementSearchEmp
   */
  ,applyElementSearchEmp : function(vueInstance)
  {
    $(".h-component-sy181").each(function(i, elem)
    {
      var $emp = $(elem);
      
      if( $emp.attr("__searchempapplied")=="Y" ) return;
      if( HCG.isVal($emp.attr("V_MODEL_EMP_ID")) && typeof vueInstance == "undefined" ) return;

      if( typeof vueInstance != "undefined" )
      {
        $emp.data("vue-instance", vueInstance);
      }
      HCG.setEmpId_sy181($emp, "", true); // 사번초기화
      HCG.setEmpNm_sy181($emp, "", true); // 성명초기화
      
      $emp.attr("__searchempapplied","Y");

      // 이하 공통사항은 20, 30만 적용
      var AUTH_TYPE = $emp.attr("AUTH_TYPE");
      if( !(AUTH_TYPE == "20" || AUTH_TYPE == "30") ) return; 
      
      $emp.attr("progressCount",0);
      
      if ( $emp.ondata!=undefined )
      {
        $emp.ondata = new Function($emp.ondata);
      }
        
      $emp.attr("maxLength","15");
      $emp.css({imeMode: 'active'});

      $.fn.extend({
        doAction_emp : function(sAction, p1)
        {
          var element = $(this);
          if(element[0].tagName=="A")
          {
            element = element.prev();
          }
          var S_C_CD;
          try
          { 
            S_C_CD = element.attr("C_CD"); 
            if(!S_C_CD)
            {
              S_C_CD = $("#"+element.attr("CCD_INPUT_NAME")).val();
            }
            if(!S_C_CD)
            {
              S_C_CD = Page.C_CD;
            }
          }
          catch(e)
          {
            try
            {
              S_C_CD = $("#"+element.attr("CCD_INPUT_NAME")).val();
            }
            catch(e)
            {
              try
              {
                S_C_CD = Page.C_CD;
              }
              catch(e)
              {}
            }
          }
          var S_SEARCH_TYPE;
          try
          {
            S_SEARCH_TYPE= $(element).attr("S_SEARCH_TYPE");
          }
          catch(e)
          {};
              
          // 권한체크여부 추가
          // 2013-02-18 서영준 ( HCG )
          var S_SEARCH_AUTH_YN;
          try
          {
            S_SEARCH_AUTH_YN= $(element).attr("S_SEARCH_AUTH_YN");
          }
          catch(e)
          {};
              
          switch ( sAction )
          {
            case commonOtpVal.search_emp01:
            {
              // 성명으로 검색
              element.doAction_emp("ajaxLoading", true);
              HCG.ajaxRequestXS(commonOtpVal.Sy_com_181_c01, commonOtpVal.searchEmp02, {S_C_CD: S_C_CD, S_EMP_NM: element.val(), S_SEARCH_TYPE: S_SEARCH_TYPE}, function(xs)
              {
                var RowCount = xs.RowCount();
                if ( RowCount == 0 )
                {
                  //alert("검색된 사원이 없습니다.");
                  alert(HCG.ajaxMsg("MSG_ALERT_SEARCH_SAWON_NOTHING"));
                  element.select();
                  element.focus();
                  element.doAction_emp("resetemp01");
                }
                else if ( RowCount > 1 )
                {
                  var layerWidth = 450;
                  var layerLeftLimit = document.body.clientWidth - 450
                  
                  var pre = element.attr("PREFIX");
                  var dv = document.createElement("DIV");
                  document.body.appendChild(dv);
                  dv.id = pre + "_EMP_SCH_LAYER";
                  $(dv).css("width",layerWidth + "px");
                  $(dv).css("height","340px");
                  $(dv).css("border","2px solid #b2b2b2");
                  $(dv).css("border-radius","10px");
                  $(dv).css("box-sizing","border-box");
                  $(dv).css("overflow","hidden");
                  $(dv).css("position","absolute");
                  $(dv).css("zIndex","20000");
                  $(dv).css("background-color","#fff");
                  $(dv).css("margin-top",  $(element).offset().top + 20);
                  $(dv).css("margin-left",  ($(element).offset().left > layerLeftLimit) ? layerLeftLimit : $(element).offset().left );
                  $(dv).css("top",  18 );
                            
                  var timeout;
                  $(dv).mouseleave(function () {timeout = setTimeout(function () {if(dv.parentNode!=null)dv.parentNode.removeChild(dv);element.select();}, 500);}).mouseenter(function () {clearTimeout(timeout);});

                  // Employees Found List
                  var dv01 = document.createElement("SPAN");
                  dv01.id = pre + "_EMP_FOUND_LIST";
                  $(dv01).addClass('emp-found-layer');
                  $(dv01).addClass('h-scroll-design');
                  $(dv01).css("width","260px");
                  $(dv01).css("height","97%");
                  $(dv01).css("padding","32px");
                  $(dv01).css("border-right","1px solid #e9e9e9");
                  $(dv01).css("box-sizing","border-box");
                  $(dv01).css("marginRight","5px");
                  $(dv01).css("display","inline-block");
                  $(dv01).css("background-color","#fff");
                  $(dv01).css("overflow","auto");
                  $(dv01).css("zIndex","20000");
                  dv.appendChild(dv01);
                            
                  var ol01 = document.createElement("OL");
                  var shtml = "";
                  var attrs = "";
                  for (var i = 0; i < RowCount; i++)
                  {
                    attrs = " PRE='" + pre + "' C_CD='" + xs.GetCellValue(i, "C_CD") + "' EMP_ID='" + xs.GetCellValue(i, "EMP_ID") + "' EMP_NM='" + xs.GetCellValue(i, "EMP_NM")  + "'";
                    attrs += " ORG_NM='" + xs.GetCellValue(i, "ORG_NM") + "' EMP_GRADE_NM='" + xs.GetCellValue(i, "EMP_GRADE_NM") + "' DUTY_NM='" + xs.GetCellValue(i, "DUTY_NM") + "' POST_NM='" + xs.GetCellValue(i, "POST_NM") + "'";
                    attrs += " ENTER_YMD='" + xs.GetCellValue(i, "ENTER_YMD") + "' RETIRE_YMD='" + xs.GetCellValue(i, "RETIRE_YMD") + "'";
                    shtml += "<LI onmouseover='HCG.EmpSimpleListMO($(this))' onclick='HCG.EmpSimpleListClick($(this))'" + attrs + "><a href='javascript:;'>" + xs.GetCellValue(i, "EMP_NM") + "(" + xs.GetCellValue(i, "EMP_ID") + ")</a></LI>";
                  }
                  ol01.innerHTML = shtml;
                  dv01.appendChild(ol01);
                  // Employee Simple Information
                  var dv02 = document.createElement("SPAN");
                            
                  dv02.id = pre + "_EMP_SIMPLE_INFO";
                  $(dv02).css("display","inline-block");
                  $(dv02).css("overflow","hidden");
                  $(dv02).css("width","180px");
                  $(dv02).css("height","100%");
                  $(dv02).css("background-color","#fff");
                  $(dv02).css("padding","30px");
                  $(dv02).css("box-sizing","border-box");
                  $(dv02).css("zIndex","1");
                  dv.appendChild(dv02);
                  
                  //si = Simple Information
                  shtml = "";
                  shtml += "<div class='dvInfoWrap'>";
                  shtml += "<img id='" + pre + "_si_emp_img' src='"+Page.SKIN_PATH+"/images/main/noPhoto.png' align='center' onerror='this.src = \""+Page.SKIN_PATH+"/images/main/noPhoto.png\";' /></div>" ;
                  shtml += "<p style='max-width:120px; font-size:17px; color:#4e5983; text-align:center; font-weight:700; margin-top:10px;'>" 
                         + "<span id='" + pre + "_si_emp_nm' style=' overflow:hidden; text-overflow:ellipsis; white-space:normal; word-wrap:break-word; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical;'></span></p>";
                  shtml += "<p style='max-width:120px; min-height:18px; font-size:12px; color:#868daa; text-align:center; margin-top:8px; overflow:hidden; text-overflow:ellipsis; white-space:normal; word-wrap:break-word; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical;' " 
                         + "id='" + pre + "_si_org_nm'></p>";
                  shtml += "<div class='dvSimpleInfo'><dl style='margin-top:10px;'>";
                  shtml += "<dd id='" + pre + "_si_emp_grade_nm'><span></span></dd>";
                  shtml += "<dd id='" + pre + "_si_duty_nm'></dd>";
                  shtml += "<dd id='" + pre + "_si_post_nm'></dd>";
                  shtml += "</dl></div>";
                  
                  $(dv02).html(shtml);

                }
                else if ( RowCount == 1 )
                {
                  // 검색된 사원이 한명이면
                  var C_CD = xs.GetCellValue(0, "C_CD");
                  var EMP_ID = xs.GetCellValue(0, "EMP_ID");
                  
                  element.doAction_emp(commonOtpVal.get_emp_info, C_CD, EMP_ID);
                  element.css("imeMode","active");
                }
              }, function() { $(element).doAction_emp("ajaxLoading", false); });
            }
            break;
            case commonOtpVal.get_emp_info:
            {
              element.doAction_emp("ajaxLoading", true);
              HCG.ajaxRequestXS(commonOtpVal.Sy_com_181_c01, commonOtpVal.getEmp01, {S_C_CD: arguments[1], S_EMP_ID: arguments[2]}, function(xs)
              {
                if ( xs.RowCount() == 0 )
                {
                  //alert("검색된 사원이 없습니다.");
                  alert(HCG.ajaxMsg("MSG_ALERT_SEARCH_SAWON_NOTHING"));
                }
                else
                {
                  var ColCount = xs.ColCount();
                  if(element[0].data==undefined) element[0].data = {};
                  for ( var col = 0; col < ColCount; col++ )
                  {
                    element[0].data[xs.ColName(col)] = HCG.nvl(xs.GetCellValue(0, col), "");
                  }
                  //element.val(element.getEmp("EMP_NM"));
                  HCG.setEmpNm_sy181(element, element.getEmp("EMP_NM"));
                  strETC_INFO = element.attr("ETC_INFO") || "";
                  strETC_INFO = strETC_INFO.replace(/ORG_NM/, $(element).getEmp("ORG_NM"));
                  strETC_INFO = strETC_INFO.replace(/EMP_GRADE_NM/, $(element).getEmp("EMP_GRADE_NM"));
                  strETC_INFO = strETC_INFO.replace(/DUTY_NM/, $(element).getEmp("DUTY_NM"));
                  strETC_INFO = strETC_INFO.replace(/POST_NM/, $(element).getEmp("POST_NM"));
                  strETC_INFO = strETC_INFO.replace(/EMP_TITLE_NM/, $(element).getEmp("EMP_TITLE_NM"));
                  $("#"+$(element).attr("PREFIX")+"_etcinfo").val(strETC_INFO);
                }                        
                if(element.attr("ondata")!=undefined) eval(element.attr("ondata"));
              }, function() { element.doAction_emp("ajaxLoading", false); });
            }
            break;
            case commonOtpVal.setLoginEmp01:
            {
              element.doAction_emp(commonOtpVal.get_emp_info, "");
            }
            break;
            case commonOtpVal.popemp01:
            {
              HCG.ModalUtil.open({url:__base_dir+"sys/sy_com/sy_com_150_p01.jsp",title:HCG.ajaxLabel("search_emp"),
                param: {
                       S_C_CD: S_C_CD,
                       X_EMP_SCH_AUTH_CD: element.attr("EMP_SCH_AUTH_CD"),
                       X_PROFILE_ID: element.attr("PROFILE_ID"),
                       S_SELMODE: "S",
                       S_EMP_NM: element.val(),
                       S_SEARCH_TYPE: element.attr("S_SEARCH_TYPE"),  
                       S_HIDE_EMP_GRADE: element.attr("HIDE_EMP_GRADE"),
                       S_SEARCH_AUTH_YN:element.attr("S_SEARCH_AUTH_YN"),
                       X_HELP_PGM_ID: "sy_com_150_p01"
                       }
                }, function(rv)
                {
                  if(rv != null)
                  {
                    var grid = rv;
                    var RowCount = grid.RowCount;
                    var ColCount = grid.ColCount;
                    for ( var r = 0; r < RowCount; r++ )
                    {
                      for ( var col = 0; col < ColCount; col++ )
                      {
                        element[0].data[HCG.grid_GetColName(grid, col)] = HCG.grid_GetCellValue(grid, r, col);
                      }
                      break;// get only one
                    }
                    //element[0].value = element.getEmp("EMP_NM");
                    HCG.setEmpNm_sy181(element, element.getEmp("EMP_NM"));
                    var strETC_INFO = element.attr("ETC_INFO") || "";
                    strETC_INFO = strETC_INFO.replace(/ORG_NM/, $(element).getEmp("ORG_NM"));
                    strETC_INFO = strETC_INFO.replace(/EMP_GRADE_NM/, $(element).getEmp("EMP_GRADE_NM"));
                    strETC_INFO = strETC_INFO.replace(/DUTY_NM/, $(element).getEmp("DUTY_NM"));
                    strETC_INFO = strETC_INFO.replace(/POST_NM/, $(element).getEmp("POST_NM"));
                    strETC_INFO = strETC_INFO.replace(/EMP_TITLE_NM/, $(element).getEmp("EMP_TITLE_NM"));
                    $("#"+element.attr("PREFIX")+"_etcinfo").val(strETC_INFO);
                    if(element.attr("ondata")!=undefined) eval(element.attr("ondata"));
                  }
              });
            }
            break;
            case "resetemp01":
            {
              element[0].data = {};
              element.val("");
              $("#"+element.attr("PREFIX")+"_etcinfo").val("");
              if(element.attr("ondata")!=undefined) eval(element.attr("ondata"));
            }
            break;
            case "ajaxLoading":
            {
              if ( p1 )
              {
                element.progressCount++;
                if ( element.progressCount == 1 )
                {
                  element.css("background", "url("+__base_dir+"images/common/indicator.gif)");
                  element.css("backgroundRepeat", "no-repeat");
                  Progress.start();
                }
              }
              else
              {
                element.progressCount--;
                if ( element.progressCount == 0 )
                {
                  element.css("backgroundImage", "");
                  Progress.stop();
                }
              }
            }
            break;
          }
        }// doAction_emp end
        ,getEmp : function(key)
        {
          return HCG.nvl($(this)[0].data[key], "");
        }
      });// $.fn.extend end
          
      $emp[0].data = {};// 저장장소
      //$(this).attr("title","성명 또는 사번을 입력하고 엔터키를 누르면 자동검색됩니다.");
      $emp.attr("title",HCG.ajaxMsg("MSG_ALERT_COND_OVER5"));
      $emp.attr("autocomplete","off");
      // element.runtimeStyle.imeMode = "active";
      var EMP_SCH_AUTH_CD = HCG.nvl($emp.attr("EMP_SCH_AUTH_CD"), "10");//
      var PROFILE_ID = HCG.nvl($emp.attr("PROFILE_ID"));//
      var SKIN_PATH = HCG.nvl($emp.attr("SKIN_PATH"),__base_dir+"resource/kr/skin1");//
      var MODE_CHECK = HCG.nvl($emp.attr("MODE_CHECK"), "0010");//
      var HIDE_EMP_GRADE = HCG.nvl($emp.attr("HIDE_EMP_GRADE"), "N");//
      var PREFIX = HCG.nvl($emp.attr("PREFIX"), "S");//
      var GEN_YN_YN = HCG.nvl($emp.attr("GEN_YN_YN"), "Y");//
      if ( EMP_SCH_AUTH_CD == "10" )
      {
        HCG.enableInput($emp);
        $emp.doAction_emp(commonOtpVal.setLoginEmp01);
      }
      else if( EMP_SCH_AUTH_CD == "20" && GEN_YN_YN == "Y")
      {
        var btnId = "icsch_sy181_" + PREFIX
        if( $("#"+btnId).length == 0 )
        {
          var $search_button = $("<a href='#' class='h-input-area-button search' />");
          $search_button.attr("id", btnId);
          $emp.parent().append($search_button);
          $search_button.bind("click", function(e){
            $emp.doAction_emp(commonOtpVal.popemp01);
          }).bind("focus", function(e){
            //$emp.blur();  //버튼이 focus되면 점선으로 된 테두리 없애기
          });
        }
        $(this).doAction_emp(commonOtpVal.setLoginEmp01);
      }
      else
      {
        var btnId = "icsch_sy181_" + PREFIX
        if( $("#"+btnId).length == 0 )
        {
          var $search_button = $("<a href='#' class='h-input-area-button search' />");
          $search_button.attr("id", btnId);
          $emp.parent().append($search_button);
          $search_button.bind("click", function(e){
            $emp.doAction_emp(commonOtpVal.popemp01);
          }).bind("focus", function(e){
            //$emp.blur(); //버튼이 focus되면 점선으로 된 테두리 없애기
          });
        }
      }
      
      $emp.bind("keydown", function(e){
        if ( e.which == 13 )
        {
          if(!HCG.isEdge())
          {
            e.preventDefault();
            e.stopPropagation();
            $emp.blur();
          }
          else
          {
            //edge브라우저에서 blur가 trigger되지 않아 focusout으로 대체
            e.stopPropagation();
            $emp.trigger("focusout");
          }
        }
      });
      $emp.bind("keyup", function(e){
        e?e:e=event;
        if ( this.value.length == 0 )
        {
          $(this).doAction_emp("resetemp01");
        }
      });
          
      $emp.bind("change",function(e){
        if ( this.value.length > 0 && $(this).attr("progressCount") == 0)
        {
          $(this).doAction_emp(commonOtpVal.search_emp01);
        }
      });
    });
  }
  /**
   * 기간선택버튼 공통 클릭이벤트
   * <br/>'시작일 ~ 종료일' 조회조건에서 사용할 수 있으며, 주, 월, 년단위의 조회범위를 선택할 수 있는 다이얼로그를 보여준다.
   * @member HCG
   * @method setYmdPeriod
   * @param {Object} elem 버튼 element
   */
  ,setYmdPeriod : function(obj,elem1, elem2, options)
  {
    var dv = document.createElement("DIV");
    document.body.appendChild(dv);

    dv.id ="EMP_SCH_LAYER";
    dv.style.width = "300px";
    dv.style.height = "240px";
    dv.style.border = "0";
    dv.style.overflow = "hidden";
    dv.style.zIndex = "1999999";
    dv.style.position = "absolute";
    $(dv).css("margin-top", obj.offset().top + 15);
    $(dv).css("margin-left", obj.offset().left + -5);
    $(dv).css("top", 0);
    var timeout;
    $(dv).mouseleave(function () {timeout = setTimeout(function () {dv.parentNode.removeChild(dv);}, 500);}).mouseenter(function () {clearTimeout(timeout);});

    var dv00 = document.createElement("DIV");
    dv00.id = "EMP_SCH_LAYER";
    dv00.style.padding = "5px";
    dv00.style.zIndex = "9999";
    dv00.style.position = "absolute";
    dv00.style.overflow = "hidden";
    dv00.style.top = 0;
    dv00.style.left = 0;
    dv.appendChild(dv00);
   
    var html = ' <div class="hide_list01">';
        html +=' <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;" frameborder="0" ></iframe>';
        html +=' <div class="titleLayout"><h3>'+HCG.ajaxLabel('period_sel')+'</h3></div>\ ';
        html +='<div class="hide_conWrap" >\ ';
        html +='<div class="hide_con" >\ ';
        html +='<span class="hide_conList"><input type=radio onclick=HCG.setPeriod("1W","'+$(obj).attr("id")+'"); ><span>1'+HCG.ajaxLabel('week')+'</span></span>\ ';
        html +='<span class="hide_conList"><input type=radio onclick=HCG.setPeriod("2W","'+$(obj).attr("id")+'"); ><span>2'+HCG.ajaxLabel('week')+'</span></span>\ ';
        html +='<span class="hide_conList"><input type=radio onclick=HCG.setPeriod("3W","'+$(obj).attr("id")+'"); ><span>3'+HCG.ajaxLabel('week')+'</span></span>\ ';
        html +='<div>\ ';
        html +='<div class="hide_con" >\ ';
        html +='<span class="hide_conList"><input type=radio onclick=HCG.setPeriod("1M","'+$(obj).attr("id")+'"); ><span>1'+HCG.ajaxLabel('month')+'</span></span>\ ';
        html +='<span class="hide_conList"><input type=radio onclick=HCG.setPeriod("2M","'+$(obj).attr("id")+'"); ><span>2'+HCG.ajaxLabel('month')+'</span></span>\ ';
        html +='<span class="hide_conList"><input type=radio onclick=HCG.setPeriod("3M","'+$(obj).attr("id")+'"); ><span>3'+HCG.ajaxLabel('month')+'</span></span>\ ';
        html +='<div>\ ';
        html +='<div class="hide_con last" >\ ';
        html +='<span class="hide_conList"><input type=radio onclick=HCG.setPeriod("1Y","'+$(obj).attr("id")+'"); ><span>1'+HCG.ajaxLabel('yr')+'</span></span>\ ';
        html +='<span class="hide_conList"><input type=radio onclick=HCG.setPeriod("2Y","'+$(obj).attr("id")+'"); ><span>2'+HCG.ajaxLabel('yr')+'</span></span>\ ';
        html +='<span class="hide_conList"><input type=radio onclick=HCG.setPeriod("3Y","'+$(obj).attr("id")+'"); ><span>3'+HCG.ajaxLabel('yr')+'</span></span>\ ';
        html +='</div> '; 
        html +='</div> '; 
        $(dv00).html(html);
  }
  /**
   * 기간선택버튼의 기간 세팅기능
   * <br/>HCG.setYmdPeriod로 제공되는 다이얼로그의 기간 선택시 동작
   * @member HCG
   * @method setPeriod
   * @param {String} periodType 기간유형(ex: 1W, 2W, 1M, 3Y)
   * @param {String} id 버튼 element id
   */
  ,setPeriod : function (period_type,id)
  {
    var elem1, elem2;
    $("#"+id).closest("[search_item]").find("input").each(function(i, e)
    {
      // YMD input만 해당됨
      var df= $(e).attr("data_format");
      if( ! (df == "dfDateYmd" || df == "dfDateYmd1") ) return true;
      
      if(i == 0)
      { 
        elem1 = $(e);
      }
      if(i == 1)
      {
        elem2 = $(e);
        return false;
      }
    });
    if( typeof elem1 == "undefined" || typeof elem2 == "undefined" )
    {
      alert("period undefined. (dfDateYmd)");
      return;
    }
    
    var val2 = HCG.getNormalValue(elem2) || HCG.date2format(new Date(), 'yyyymmdd');
    var period_gbn = period_type.split('')[1];
    var inc = Number(period_type.split('')[0]);
    var val1 = HCG.addYmd(val2, period_gbn, -1*inc);
     
    HCG.inputSetValueAuto($(elem1).attr("name"), val1);
    HCG.inputSetValueAuto($(elem2).attr("name"), val2);
    $("#EMP_SCH_LAYER").remove();

  }
  /**
   * 배열(array)내의 값(val)의 index 위치를 반환
   * @member HCG
   * @method array_indexOf
   * @param {Array} array
   * @param {Object} val
   * @return {Number}
   */
  ,array_indexOf : function(array, val)
  {
    for ( var n = 0; n < array.length; n++ )
    {
      if ( array[n] == val )
      {
        return n;
      }
    }
    return -1;
  }
  /**
   * input, select에 value 세팅
   * <br/>엘리먼트 유형이나 포맷에 알맞게 값을 세팅함
   * @member HCG
   * @method inputSetValueAuto
   * @param {String|Element} input element 또는 element id
   * @param {String|Number} val value 
   */
  ,inputSetValueAuto : function(input, str, data_format, default_value, deReplaceXssYn)
  {
    var orgInput = input;
    input = HCG.returnjQueryObj(input);
    if ( input.length == 0 ) alert("inputSetValueAuto: input("+input+","+orgInput+") is not defined...");
    if ( default_value != null && (str == null || str == "")) str = default_value;
    str = String(str);

    if(deReplaceXssYn=="Y")
    {
      str = HCG.deReplaceXss(str);
    }
    
    switch ( input.prop("tagName") )
    {
      case "SELECT": input.val(str).attr2("selected", true); break;
      case "INPUT":
      {
        if ( HCG.array_indexOf(["radio"], input.attr2("type")  ) >=0 ){
          input.prop("checked", input.val() == str);
        }else if ( HCG.array_indexOf(["checkbox"], input.attr2("type")  ) >=0 ){
          input.prop("checked", input.val() == str);
        }else if ( input.attr2("data_format") ){
          HCG.inputSetFormatValue(input, str, input.attr2("data_format"));
        }else{
          input.val(str);
        }
      }
      break;
      default: input.val(str); break;
    }
    
    var $item = input.closest("[search_item]");
    if( $item.length > 0 )
    {
      HCG.SearchItems.redrawItem($item);
    }
  }
  /**
   * XSS 필터링으로 치환된 특수문자를 원복(권장하지 않음)
   * <br/>원복이 필요한 특수문자는 추가정의 필요함
   * @member HCG
   * @method deReplaceXss
   * @param {String} value 원본문자열
   * @return {String} 
   */
  ,deReplaceXss : function (value)
  {
    var valueRst = value;
    valueRst = valueRst.replaceAll("&#35;", "#");
    return valueRst;
  }
  /**
   * 문자열(text)에서 특정문자열(str) 포함 갯수
   * @member HCG
   * @method countStr
   * @param {String} text 대상문자열
   * @param {String} str 키워드
   * @return {Number}
   */
  ,countStr : function (text, str)
  {
    var count = 0;
    var start_index = 0;
    var str_length = str.length;
    if ( str_length == 0 ) return null;
    while ( true )
    {
      var find_index = text.indexOf(str, start_index);
      if ( find_index < 0 ) break;
      count++;
      start_index = find_index + str_length;
    }
    return count;
  }
  ,inputSetFormatValue : function(input, str, data_format)
  {
    input = HCG.returnjQueryObj(input);
    input.val( HCG.formatValue(str, data_format || input.attr2("data_format")) );
  }
  /**
   * 텍스트정렬, 한영입력, 최대글자수제한 스타일 적용
   * @member HCG
   * @method applyStyle
   * @param {Object} e 대상 element
   * @param {String} textAlign css textAlign
   * @param {String} imeMode css imeMode
   * @param {String} maxLength maxLength 속성값
   */
  ,applyStyle : function(e, textAlign, imeMode, maxLength)
  {
    e = HCG.returnjQueryObj(e);
    if ( textAlign ) e.css({textAlign: textAlign});
    if ( imeMode ) e.css({imeMode: imeMode});
    if ( maxLength != null )
    {
      e.attr("maxLength", maxLength);
      e.attr("size", maxLength + 2);
    }
  }
  /**
   * make the rest of the page accessible again
   * @member HCG
   * @method removeAria
   */
  ,removeAria : function()
  {
    // make the rest of the page accessible again:
    $("#dp-container").removeAttr('aria-hidden');
    $("#skipnav").removeAttr('aria-hidden');
  }
  /**
   * 쿠키 생성
   * @member HCG
   * @method setCookie
   * @param {String} name 쿠키명
   * @param {String} value 쿠키값
   * @param {Number} addDays 쿠키 만료일 추가일수
   * @param {Number} addHours 쿠키 만료시간 추가시간
   * @param {Number} addMinutes 쿠키 만료분 추가분
   * @param {Number} addSeconds 쿠키 만료초 추가초
   */
  ,setCookie : function ( name, value, addDays, addHours, addMinutes, addSeconds)  
  {
    var todayDate = new Date();
    todayDate.setDate   ( todayDate.getDate()     + (addDays || 0));
    todayDate.setHours  ( todayDate.getHours()    + (addHours || 0));
    todayDate.setMinutes( todayDate.getMinutes()  + (addMinutes || 0));
    todayDate.setSeconds( todayDate.getSeconds()  + (addSeconds || 0));
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
  }
  /**
   * 쿠키값 가져오기
   * @member HCG
   * @method getCookie
   * @param {String} name 가져올 쿠키명
   * @return {String} 쿠키값
   */
  ,getCookie :function ( name )
  {
    var nameOfCookie = name + "=";
    var x = 0;
    while ( x <= document.cookie.length )
    {
      var y = (x+nameOfCookie.length);
      if ( document.cookie.substring( x, y ) == nameOfCookie )
      {
        if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
          endOfCookie = document.cookie.length;
        return unescape( document.cookie.substring( y, endOfCookie ) );
      }
      x = document.cookie.indexOf( " ", x ) + 1;
      if ( x == 0 )
        break;
    }
    return "";
  }
  /**
   * [시스템 -도움말관리] 프로그램에서 등록된 도움말이 있으면 화면의 도움말 버튼을 그려준다.
   * @member HCG
   * @method setNotice
   */
  ,setNotice : function()
  {
    //팝업에서는 도움말 안뜨게 하려면 아래 주석 해제
    //if(!_isPopup && window.name.indexOf("iframe_biz") == 0) {
    //팝업에서 도움말 뜨게 하려면 아래 주석 해제
    if(true)
    {
      if(typeof(Page) != "undefined" && (Page.PGM_ID || Page.HELP_PGM_ID)) {
        
        if($(".h-btns").length > 0)
        {
          
          if(Page.HELP_MSG != undefined && Page.HELP_MSG != null && Page.HELP_MSG != "")
          {
            $(".h-btns:first").append('<div id="helpBtn" rel="helpMag" class="btMsg ml-10" style="display:none;float:right"><span class="btMsg-icon"></span></div>');
            HCG.displayElement("helpBtn", true);
            
            setTimeout(function () 
            {
              var cente_html = "<div class='msg h-msg-box fr-view' id='helpMag'>" + Page.HELP_MSG + "</div>";
              $("#helpBtn").append(cente_html);

              var pageName = Page.C_CD + "^" + HCG.nvl(Page.HELP_PGM_ID, Page.PGM_ID);
              
              var arrCheck = HCG.getCookie(pageName).split("|");
              $(".btMsg").each(function(i){
                var $self = $(this);
                var $box = HCG.returnjQueryObj($self.attr("rel"));
                var $close = $("<span class='close'>닫기</span>").click(function(){
                               $box.fadeOut("fast");
                             });
                var $chk = $("<div class='h-msg-chk'><span class='h-msg-chk-txt'>다음부터 보지 않기</span></div>");
                var $chkBox = $("<span class='h-msg-chk-box'>체크박스</span>").click(function(){
                                var $self = $(this);
                                $self.toggleClass("checked");
                                var arrVal = [];
                                $(".h-msg-chk .h-msg-chk-box").each(function(){
                                  if($(this).hasClass("checked")){
                                    arrVal.push("Y");
                                  }else{
                                    arrVal.push("N");
                                  }
                                  HCG.setCookie(pageName, arrVal.join("|"), 9999);
                                });
                              });
                
                $box.append($chk.prepend($chkBox)).append($close);
                          
                $self.find(".btMsg-icon").click(function()
                {
                  $box.fadeIn("fast");
                  $('.h-msg-box').css({
                    "z-index" : "800"
                     ,"min-width": "350px"
                     ,"border-radius": "10px"
                     ,"right" : "0px"
                     ,"top" : "-3px"
                     ,"position": "absolute"
                 //}).show();   // 항상보여짐.
                  });
                });
                $('.h-msg-box').css({
                  "z-index" : "800"
                   ,"min-width": "350px"
                   ,"border-radius": "10px"
                   ,"right" : "0px"
                   ,"top" : "-3px"
                   ,"position": "absolute"
                });
                if(arrCheck[i] == "Y")
                {
                  $chkBox.addClass("checked");
                  $box.fadeOut(0);
                }
              });
            }, 500);
            
          }
          else 
          {
            HCG.displayElement("helpBtn", false);  // Help Button Display
          }
        }
      }
    }
  }
  /**
   * element를 생성해주는 함수
   * @member HCG
   * @param {String} tagName 생성할 태그
   * @param {Object} props 태그의 속성을 JSON 형식으로 입력받음
   * @param {Array|String} child 생성할 태그의 자식태그 혹은 자식텍스트
   * @return element
   */
  ,$E : function (tagName, props, child)
  {
    /**
     * @member HCG.$E
     * @method _getCheckChild
     * @param {String} child
     */
    function _getCheckChild(child)
    {
      return (typeof child in {'string':1,'number':1}) ? document.createTextNode(String(child)) : child;
    }
    var newElement = document.createElement(tagName);
    Object.extend2(newElement, props || {});
    if ( child )
    {
      if ( child instanceof Array )
      {
        for ( var n = 0, nlen = child.length; n < nlen; n++ )
        {
          newElement.appendChild(_getCheckChild(child[n]));
        }
      }
      else
      {
        newElement.appendChild(_getCheckChild(child));
      }
    }
    return newElement;
  }  
  /**
   * 버튼, 파일, input박스의 class 적용 및 버튼 권한 적용
   * @member HCG
   * @method setButtonAuth
   */
  ,setButtonAuth : function()
  {
    $("img, input, a, button, span, div, textarea").each(function (index)
    {
      var e = $(this);
      var inType = e.attr("type");
      
      if( inType == "button")  
      {
        e.focus(function(){ 
          if( e.closest(".h-search-area").length > 0 ) return; // 조회조건은 blur 제외 (ie tab)
          e.blur();
        });
        //버튼로그 관련 시작
        if(Page.PGM_BTN_LOG_YN == "Y" && Page.BUTTON_LOG_YN == "Y")
        {
          if(e.hasClass("ex") || e.val() == "DOWN")
          {
            //엑셀 다운로드인경우
            var strClick = e.attr("onclick");
            var fnClick  = e.prop("click");
            if( strClick != "" && typeof fnClick == "function")
            {
              e.attr('onclick', '').unbind('click');
              e.bind({click : function(event)
              {
                HCG.ModalUtil.open({title:HCG.getMultiLang('label', 'down_rsn', 'Download 사유'), url: "/sys/sy_com/sy_com_911_p01.jsp", param: {X_HELP_PGM_ID:'sy_com_911_p01'}}, function(rv)
                {
                  if(rv != null)
                  {
                    var strRsn = rv;
                    HCG.logProgramBtn(e.val(), strClick, S_PGM_OPEN_TIME, {S_RSN_TXT : strRsn}); // 버튼 로그 추가 20121129 W.Y.C
                    new Function(strClick)();
                  }
                });
              }}); 
            }
          }
          else
          {
            if(e.length>0 && !e.hasClass("h-icon-full") && !e.hasClass("h-btn-period"))
            {
              e[0].addEventListener("click", function()
              {
                HCG.logProgramBtn(e.val(), e.attr("onclick"), S_PGM_OPEN_TIME); // 버튼 로그 추가 20121129 W.Y.C
              });
            }
            
          }
        }
        //버튼로그 관련 끝
      
        e.parent(".btn,.btn3,.btn4").hover(function(e)
        { //btn3,btn4추가
          if(!($(this).children("INPUT").prop("disabled")))
          {
            $(this).addClass("on");
          }
        }, function(e)
        {
          $(this).removeClass("on");
        });
      }
      else if( inType == "file")  
      {
        e.hover(function(e)
        {
          if(!($(this).siblings(".btn2").children("INPUT").prop("disabled")))
          {
            $(this).siblings(".btn2").addClass("on");
          }
        }, function(e)
        {
          $(this).siblings(".btn2").removeClass("on");
        });
      }
      else if(e.closest(".GridMain").length == 0 && (inType == "text" || e[0].tagName == "TEXTAREA"))
      {
        //e.addClass("textForm");
      }
    });
  }
  /**
   * formValue객체 안에 데이터를 추가해줌
   * <br/>(formValue는 hunel Vue app에서 사용하는 데이터모델 (HCG.baseVueParam 참조))
   * @member HCG
   * @method extendForm
   * @param {Object} formValue formValue 데이터모델
   * @param {Array} data 추가할 데이터 배열
   */
  ,extendForm : function(formValue,data)
  {
    if(typeof data != "object") return Object.create(formValue);
    
    var obj  = {};
    for(var k in data)
    {
      var key = k;
      if(key && !key.substring(0,2) != "S_")
      {
        key = "S_"+key
      }
      obj[key] = data[k];
    }
    return $.extend(true, Object.create(formValue) , obj);
  }
  /**
   * 버튼을 눌렀을때 로그를 기록하는 함수
   * @member HCG
   * @method logProgramBtn
   * @param {String} button_nm 버튼명칭
   * @param {String} action_nm onClick시 호출되는 함수명
   * @param {String} open_time 버튼이 눌려진 시간
   */
  ,logProgramBtn : function (button_nm, action_nm, open_time, otherParam)
  {
    var elemName = "";
    var elemVal = "";
    var retVal = "";
    $(".search_typeA").find("input[type=text]:visible, input[type=checkbox]:visible, input[type=radio]:visible, :selected").each(function(i, elem)
    {
      $elem = $(elem);
      switch ($elem.prop("tagName"))
      {
        case "INPUT":
        {       
          switch ($elem.attr("TYPE"))
          {
            case "text":
            {
              elemName = $elem.attr("korname");
              elemVal = $elem.val();
            }
            break;
            case "checkbox":
            case "radion":
            {
              elemName = $elem.attr("korname");
              elemVal = $elem.attr("checked") ? "checked" : "unchecked";
            }
            break;
          }
        }
        break;
        case "OPTION":
        {
          elemName = $elem.parent().attr("korname");
          elemVal = $elem.text();
        }
        break;
      }
      retVal += "<" + elemName + ":" + elemVal + ">,";
    });
    
    var param = 
    {
        S_PROFILE_ID: Page.PROFILE_ID
      , S_MODULE_ID: Page.MODULE_ID
      , S_MENU_ID: Page.MENU_ID
      , S_PGM_ID: Page.PGM_ID
      , S_BTN_NM: button_nm
      , S_ACTION_NM: action_nm
      , S_SCH_COND: retVal.substring(0, retVal.length-1)
      , S_PGM_OPEN_TIME: open_time
      , S_ENC_OTP_KEY: S_ENC_OTP_KEY
    }
    if(otherParam!=undefined && otherParam!=null)
    {
      param = $.extend(param, otherParam)
    }
    
    HCG.ajaxSyncRequestXS(commonOtpVal.UserDS, commonOtpVal.logProgramBtn, param, function(xs)
    {
    });
  }
  /**
   * 공통 사원검색 컴포넌트의 사번값을 세팅
   * @member HCG
   * @method setEmpId_sy181
   * @param {Object} $empNm 컴포넌트객체 (jQuery)
   * @param {String} empId 세팅할 사번 
   * @param {Boolean} bInit 초기세팅호출여부. 임의로 호출할 경우 지정하지 않는다.
   */
  ,setEmpId_sy181 : function($empNm, empId, bInit)
  {
    var V_MODEL_EMP_ID = $empNm.attr("V_MODEL_EMP_ID");
    var V_MODEL_EMP_NM = $empNm.attr("V_MODEL_EMP_NM");
    var bUseVue = HCG.isVal(V_MODEL_EMP_ID);
    empId = bInit ? HCG.nvl($empNm.attr("INIT_EMP_ID")) : HCG.nvl(empId);
    
    if( bUseVue )
    {
      var vueInstance = $empNm.data("vue-instance");
      if( typeof vueInstance == "undefined" ) return; // 뷰에서 사용하는 엘리먼트일 경우 뷰인스턴스가 필요
      var vmPath, vmKey;
      var arrVmodel = V_MODEL_EMP_ID.split(".");
      if( arrVmodel.length == 1 )
      {
        vmPath = vueInstance;
        vmKey = V_MODEL_EMP_ID;
      }
      else
      {
        vmKey = arrVmodel.pop();
        vmPath = HCG.getObjectWithKeyString(arrVmodel, vueInstance);
      }
      
      Vue.set(vmPath, vmKey, empId);
    }
    else
    {
      $("#"+$empNm.attr("PREFIX")+"_EMP_ID").val(empId); 
    }
  }
  /**
   * 공통 사원검색 컴포넌트의 성명값을 세팅
   * @member HCG
   * @method setEmpNm_sy181
   * @param {Object} $empNm 컴포넌트객체 (jQuery)
   * @param {String} empNm 세팅할 성명 
   * @param {Boolean} bInit 초기세팅호출여부. 임의로 호출할 경우 지정하지 않는다.
   */
  ,setEmpNm_sy181 : function($empNm, empNm, bInit)
  {
    var V_MODEL_EMP_ID = $empNm.attr("V_MODEL_EMP_ID");
    var V_MODEL_EMP_NM = $empNm.attr("V_MODEL_EMP_NM");
    var bUseVue = HCG.isVal(V_MODEL_EMP_ID);
    empNm = bInit ? HCG.nvl($empNm.attr("INIT_EMP_NM")) : HCG.nvl(empNm);
    
    if( bUseVue && HCG.isVal(V_MODEL_EMP_NM) )
    {
      var vueInstance = $empNm.data("vue-instance");
      if( typeof vueInstance == "undefined" ) return; // 뷰에서 사용하는 엘리먼트일 경우 뷰인스턴스가 필요
      var vmPath, vmKey;
      var arrVmodel = V_MODEL_EMP_NM.split(".");
      if( arrVmodel.length == 1 )
      {
        vmPath = vueInstance;
        vmKey = V_MODEL_EMP_NM;
      }
      else
      {
        vmKey = arrVmodel.pop();
        vmPath = HCG.getObjectWithKeyString(arrVmodel, vueInstance);
      }
      
      Vue.set(vmPath, vmKey, empNm);
    }
    else
    {
      $("#"+$empNm.attr("PREFIX")+"_EMP_NM").val(empNm); 
    }
  }
  /**
   * 공통 조직검색 컴포넌트의 조직ID값을 세팅
   * @member HCG
   * @method setOrgId_sy182
   * @param {Object} $orgNm 컴포넌트객체 (jQuery)
   * @param {String} orgId 세팅할 조직ID
   * @param {Boolean} bInit 초기세팅호출여부. 임의로 호출할 경우 지정하지 않는다.
   */
  ,setOrgId_sy182 : function($orgNm, orgId, bInit)
  {
    var V_MODEL_ORG_ID = $orgNm.attr("V_MODEL_ORG_ID");
    var V_MODEL_ORG_NM = $orgNm.attr("V_MODEL_ORG_NM");
    var sPrefix = $orgNm.attr("PREFIX");
    var bUseVue = HCG.isVal(V_MODEL_ORG_ID);
    orgId = bInit ? HCG.nvl($orgNm.attr("INIT_ORG_ID")) : HCG.nvl(orgId);
    
    // 초기화시 콤보Set
    if( bInit && !bUseVue )
    {
      var $orgId = $("#" + sPrefix + "_ORG_ID");
      if( $orgId[0].tagName == "SELECT" )
      {
        HCG.ajaxSyncRequestXS(commonOtpVal.Sy_com_182_c01, commonOtpVal.comboAuthOrg, {S_PROFILE_ID: Page.PROFILE_ID}, function(xs){
          HCG.setCombo(xs, sPrefix + "_ORG_ID", null, "A");
        });
      }
    }
    
    if( bUseVue )
    {
      var vueInstance = $orgNm.data("vue-instance");
      if( typeof vueInstance == "undefined" ) return; // 뷰에서 사용하는 엘리먼트일 경우 뷰인스턴스가 필요
      var vmPath, vmKey;
      var arrVmodel = V_MODEL_ORG_ID.split(".");
      if( arrVmodel.length == 1 )
      {
        vmPath = vueInstance;
        vmKey = V_MODEL_ORG_ID;
      }
      else
      {
        vmKey = arrVmodel.pop();
        vmPath = HCG.getObjectWithKeyString(arrVmodel, vueInstance);
      }
      
      Vue.set(vmPath, vmKey, orgId);
    }
    else
    {
      $("#"+sPrefix+"_ORG_ID").val(orgId); 
    }
  }
  /**
   * 공통 조직검색 컴포넌트의 조직명을 세팅
   * @member HCG
   * @method setOrgNm_sy182
   * @param {Object} $orgNm 컴포넌트객체 (jQuery)
   * @param {String} orgNm 세팅할 조직명
   * @param {Boolean} bInit 초기세팅호출여부. 임의로 호출할 경우 지정하지 않는다.
   */
  ,setOrgNm_sy182 : function($orgNm, orgNm, bInit)
  {
    var V_MODEL_ORG_ID = $orgNm.attr("V_MODEL_ORG_ID");
    var V_MODEL_ORG_NM = $orgNm.attr("V_MODEL_ORG_NM");
    var bUseVue = HCG.isVal(V_MODEL_ORG_ID);
    orgNm = bInit ? HCG.nvl($orgNm.attr("INIT_ORG_NM")) : HCG.nvl(orgNm);
    
    if( bUseVue && HCG.isVal(V_MODEL_ORG_NM) )
    {
      var vueInstance = $orgNm.data("vue-instance");
      if( typeof vueInstance == "undefined" ) return; // 뷰에서 사용하는 엘리먼트일 경우 뷰인스턴스가 필요
      var vmPath, vmKey;
      var arrVmodel = V_MODEL_ORG_NM.split(".");
      if( arrVmodel.length == 1 )
      {
        vmPath = vueInstance;
        vmKey = V_MODEL_ORG_NM;
      }
      else
      {
        vmKey = arrVmodel.pop();
        vmPath = HCG.getObjectWithKeyString(arrVmodel, vueInstance);
      }
      
      Vue.set(vmPath, vmKey, orgNm);
    }
    else
    {
      $("#"+$orgNm.attr("PREFIX")+"_ORG_NM").val(orgNm); 
    }
  }
  /**
   * 공통 조직검색 컴포넌트의 조직기준일 가져오기
   * <br/>조직기준일은 별도로 지정하지 않을 경우, 오늘 날짜를 참조하게 되어 있음
   * <br/>컴포넌트 파라미터 'S_STD_YMD_ID'로 참조할 기준일 element를 임의 지정할 수 있음 
   * <br/>컴포넌트 파라미터 'V_MODEL_STD_YMD'로 Vue app일 경우 참조할 기준일 데이터를 임의 지정할 수 있음
   * @member HCG
   * @method getYmd_sy182
   * @param {Object} $orgNm 컴포넌트객체 (jQuery)
   */
  ,getYmd_sy182 : function($orgNm)
  {
    var V_MODEL_ORG_ID = $orgNm.attr("V_MODEL_ORG_ID");
    var V_MODEL_STD_YMD = $orgNm.attr("V_MODEL_STD_YMD");
    var STD_YMD_ID = $orgNm.attr("STD_YMD_ID");
    var bUseVue = HCG.isVal(V_MODEL_ORG_ID);
    
    var rv;
    if( bUseVue && HCG.isVal(V_MODEL_STD_YMD) )
    {
      var vueInstance = $orgNm.data("vue-instance");
      if( typeof vueInstance == "undefined" ) return; // 뷰에서 사용하는 엘리먼트일 경우 뷰인스턴스가 필요
      var arrVmodel = V_MODEL_STD_YMD.split(".");
      rv = HCG.getObjectWithKeyString(arrVmodel, vueInstance);
    }
    else
    {
      if( HCG.isVal(STD_YMD_ID) )
      {
        rv = $("#"+ STD_YMD_ID ).val()
      }
      else
      {
        rv = $("#" + $orgNm.attr("PREFIX") + "_SY182_YMD").val()
      }
    }
    return HCG.restoreValue(rv, "dfDateYmd");
  }
  /**
   * 공통 조직검색 컴포넌트 20권한 onchange 함수
   * @member HCG
   * @method changeOrg20_sy182
   * @param {String} sPrefix 앞첨자
   */
  ,changeOrg20_sy182 : function(sPrefix)
  {
    var $orgId = $("#" + sPrefix + "_ORG_ID");
    var $orgNm = $("#" + sPrefix + "_ORG_NM");
    if ( $orgId.prop("tagName") == 'SELECT' )
    {
      HCG.inputSetValueAuto(sPrefix + '_ORG_NM', $orgId.val());
    }
    if(eval("window."+$orgNm.attr("AFTER_FUNC"))!=undefined){
      eval($orgNm.attr("AFTER_FUNC"))();
    }
  }
  /**
   * 공통 사원검색 컴포넌트 ondata함수
   * @member HCG
   * @method setEmpInfo_sy181
   * @param {String} sPrefix 앞첨자
   */
  ,setEmpInfo_sy181 : function(sPrefix)
  {
    var obj = $("#" + sPrefix + "_EMP_NM");
    var EMP_ETC_DATA = "{BE_ORG_NM : " + "'" + obj.getEmp("ORG_NM") + "', " +
    "BE_EMP_GRADE_NM : " + "'" + obj.getEmp("EMP_GRADE_NM") + "', " + 
    "BE_DUTY_NM : " + "'" + obj.getEmp("DUTY_NM") + "', " +
    "BE_POST_NM : " + "'" + obj.getEmp("POST_NM") + "'," +
    "BE_ENTER_YMD : " + "'" + obj.getEmp("ENTER_YMD") + "'," +
    "BE_EMP_TYPE_NM : " + "'" + obj.getEmp("EMP_TYPE_NM") + "'," +
    "BE_STAT_NM : " + "'" + obj.getEmp("STAT_NM") + "'," +
    "BE_PER_NO : " + "'" + obj.getEmp("PER_NO") + "'," + 
    "BE_RETIRE_YMD : " + "'" + obj.getEmp("RETIRE_YMD") + "'" + "}";

    //$("#" + sPrefix + "_EMP_ID").val(obj.getEmp("EMP_ID"));
    HCG.setEmpId_sy181(obj, obj.getEmp("EMP_ID"));
    $("#Q_EMP_ETC_DATA").val(EMP_ETC_DATA);
    
    var EMP_ID = obj.getEmp("EMP_ID");
    obj.css("backgroundColor", ( EMP_ID ) ? "#ECF5FF" : "");

    if(eval("window."+obj.attr("AFTER_FUNC"))!=undefined){
      eval(obj.attr("AFTER_FUNC"))();
    }
  }
  /**
   * 공통 조직검색 컴포넌트 ondata함수
   * @member HCG
   * @method setOrgInfo_sy182
   * @param {String} sPrefix 앞첨자
   * @param {String} type element 유형 (input, select)
   */
  ,setOrgInfo_sy182 : function(sPrefix, type)
  {
    var ORG_NM = $("#" + sPrefix + "_ORG_NM");
    var ORG_ID = $("#" + sPrefix + "_ORG_ID");
    
    if( type == "input" )
    {
      HCG.setOrgId_sy182(ORG_NM, ORG_NM.getOrg("ORG_ID"));
      //ORG_ID.val(ORG_NM.getOrg("ORG_ID"));
      ORG_NM.css("backgroundColor", ( ORG_NM.getOrg("ORG_ID") ) ? "#ECF5FF" : "");
    }

    if(eval("window."+ORG_NM.attr("AFTER_FUNC"))!=undefined)
    {
      eval(ORG_NM.attr("AFTER_FUNC"))();
    }
  }
  /**
   * 공통 사원검색 컴포넌트의 간편검색리스트 onmouseover함수
   * @member HCG
   * @method EmpSimpleListMO
   * @param {Object} obj 사원 li 객체 (JQuery) 
   */
  ,EmpSimpleListMO : function(o) 
  {
    var pre = o.attr("PRE");
    var src = Page.SKIN_PATH + "/images/emp/" + o.attr("C_CD") + "/" + o.attr("EMP_ID") + ".jpg";
    $("#" + pre + "_si_emp_img").attr("src", src);
    $("#" + pre + "_si_emp_nm").html(o.attr("EMP_NM"));
    $("#" + pre + "_si_org_nm").html(o.attr("ORG_NM"));
    $("#" + pre + "_si_emp_grade_nm").html(o.attr("EMP_GRADE_NM"));
    $("#" + pre + "_si_duty_nm").html(o.attr("DUTY_NM"));
    $("#" + pre + "_si_post_nm").html(o.attr("POST_NM"));
    
    $("#" + pre + "_si_emp_grade_nm").css("display", !HCG.isVal( o.attr("EMP_GRADE_NM") ) ? "none" : "");
    $("#" + pre + "_si_duty_nm").css("display", !HCG.isVal( o.attr("DUTY_NM") ) ? "none" : "");
    $("#" + pre + "_si_post_nm").css("display", !HCG.isVal( o.attr("POST_NM") ) ? "none" : "");
  }
  /**
   * 공통 사원검색 컴포넌트의 간편검색리스트 선택함수
   * @member HCG
   * @method EmpSimpleListClick
   * @param {Object} obj 사원 li 객체 (JQuery) 
   */
  ,EmpSimpleListClick : function(o) 
  { 
    var pre = o.attr("PRE");
    //사원 기타정보
    var EMP_ETC_DATA = "{BE_ORG_NM : " + "'" + o.attr("ORG_NM") + "', " +
      "BE_EMP_GRADE_NM : " + "'" + o.attr("EMP_GRADE_NM") + "', " + 
      "BE_DUTY_NM : " + "'" + o.attr("DUTY_NM") + "', " +
      "BE_POST_NM : " + "'" + o.attr("POST_NM") + "'," +
      "BE_EMP_TYPE_NM : " + "'" + o.attr("EMP_TYPE_NM") + "'," +
      "BE_ENTER_YMD : " + "'" + o.attr("ENTER_YMD") + "'," +
      "BE_RETIRE_YMD : " + "'" + o.attr("RETIRE_YMD") + "'," +
      "BE_STAT_NM : " + "'" + o.attr("STAT_NM") + "'" + "}";
    
    var strETC_INFO = $("#" + pre + "_EMP_NM").attr("ETC_INFO") || "";
    strETC_INFO = strETC_INFO.replace(/ORG_NM/, o.attr("ORG_NM"));
    strETC_INFO = strETC_INFO.replace(/EMP_GRADE_NM/, o.attr("EMP_GRADE_NM"));
    strETC_INFO = strETC_INFO.replace(/DUTY_NM/, o.attr("DUTY_NM"));
    strETC_INFO = strETC_INFO.replace(/POST_NM/, o.attr("POST_NM"));
    strETC_INFO = strETC_INFO.replace(/EMP_TITLE_NM/, o.attr("EMP_TITLE_NM"));
    $("#" + pre + "_etcinfo").val(strETC_INFO);
    
    $("#Q_EMP_ETC_DATA").val(EMP_ETC_DATA);
    
    $("#" + pre + "_C_CD").val(o.attr("C_CD"));
    //$("#" + pre + "_EMP_ID").val(o.attr("EMP_ID"));
    //$("#" + pre + "_EMP_NM").val(o.attr("EMP_NM"));
    HCG.setEmpId_sy181($("#" + pre + "_EMP_NM"), o.attr("EMP_ID"));
    HCG.setEmpNm_sy181($("#" + pre + "_EMP_NM"), o.attr("EMP_NM"));
    
    $("#" + pre + "_EMP_SCH_LAYER").mouseleave();
    if(eval("window."+$("#" + pre + "_EMP_NM").attr("AFTER_FUNC"))!=undefined){
      eval($("#" + pre + "_EMP_NM").attr("AFTER_FUNC"))();
    }
  }
  /**
   * 공통 조직검색 컴포넌트의 간편검색리스트 선택함수
   * @member HCG
   * @method OrgSimpleListClick
   * @param {Object} obj 사원 li 객체 (JQuery) 
   */
  ,OrgSimpleListClick : function(o) 
  {
    var pre = o.attr("PRE");
    //$("#" + pre + "_ORG_ID").val(o.attr("ORG_ID"));
    //$("#" + pre + "_ORG_NM").val(o.attr("ORG_NM"));
    HCG.setOrgId_sy182($("#" + pre + "_ORG_NM"), o.attr("ORG_ID"));
    HCG.setOrgNm_sy182($("#" + pre + "_ORG_NM"), o.attr("ORG_NM"));
    $("#" + pre + "_ORG_SCH_LAYER").mouseleave();
    $("#" + pre + "_ORG_NM")[0].data.ORG_ID = $("#" + pre + "_ORG_ID").val();
    if($("#" + pre + "_ORG_NM").attr("ondata") != undefined)
    {
      setTimeout(function(){eval($("#" + pre + "_ORG_NM").attr("ondata"));}, 500);
    }
  }
  /**
   * 탭 기능 관련 공통 유틸
   * @member HCG
   */
  ,TabUtil :
  {
    /**
    * 탭을 제외한 탭 으로 구성된 화면에서의 스크롤이동
    * @member HCG.TabUtil
    * @method tabScroll
    * @param elem element
    * @param dir 구분자
    * @param prev 이전
    * @param next 다음
    * @return
    */
    tabScroll : function(elem, dir){
      var $tabUl = elem;
      var scrollLeft = $tabUl.scrollLeft();
      var addWidth = 0;
      $tabUl.children().each(function(idx, elem){
        addWidth +=  elem.clientWidth;
        if(dir.match(new RegExp("^prev")) && scrollLeft <= addWidth) {
          $tabUl.scrollLeft( addWidth - elem.clientWidth);
          return false;
        } else if (dir.match(new RegExp("^next")) && scrollLeft < addWidth) {
          $tabUl.scrollLeft(addWidth);
          return false;
        }
      });
      //탭 화살표의 활성화 표시
      HCG.TabUtil.tabActive($tabUl,"click");
    },

   /**
    * 활성화되어 있는 탭의 위치를 찾아간다.
    * @member HCG.TabUtil
    * @method tabAutoMove
    * @param elem element
    * @param dir 구분자
    * @param prev 이전
    * @param next 다음
    * @return
    */
    tabAutoMove : function(elem, dir){
      var $tabUl = elem;
      var displayWidth = $tabUl[0].clientWidth; //화면에 보여지는 가로
      var scrollLeft = $tabUl.scrollLeft();         //좌측길이
      var allWidth = 0;         //탭 구성영역의 전체 가로폭을 구한다.
      var selectWidth = 0;     //선택된 영역의 가로폭
      var selectStaPoint = 0;  //선택된 영역의 시작점
      $tabUl.children().each(function(idx, elem){
        if ($(this).attr("class") == "on") {
          selectStaPoint = allWidth;
          selectWidth = $(this)[0].clientWidth;
        }
        allWidth +=  $(this)[0].clientWidth;
      });

      //console.log("03 ==>  displayWidth: " , displayWidth + " /  scrollLeft :"+scrollLeft + " /  allWidth :"+allWidth + " /  selectWidth :"+selectWidth + " /  selectStaPoint :"+selectStaPoint );

      if (displayWidth <= (selectStaPoint + selectWidth)) {
        $tabUl.scrollLeft( (selectStaPoint + selectWidth) - displayWidth);
      }
      //탭 화살표의 활성화 표시
      HCG.TabUtil.tabActive($tabUl,"click");
    },

    /**
    * 탭 좌우 화살표 활성화
    * @member HCG.TabUtil
    * @method tabActive
    * @param elem element
    * @param dir 구분자
    * @param first 최초의 활성화 상태
    * @param click 버튼이 클릭된 후 화살표의 활성화 상태
    */
    tabActive : function(elem, dir) {
      var $tabUl = elem;
      var $tab = $tabUl.parent();

      //탭 구성영역의 전체 가로폭을 구한다.
      var clientWidth = 0;
      $tabUl.children().each(function(idx, elem){
        clientWidth +=  elem.clientWidth;
      });

      if (dir == "first") {
        if ($tabUl.width() <= clientWidth) {
          $tab.find(".next").addClass("on");
        }
      }

      if (dir == "click") {
        //우측에 숨겨진 폭을 구한다.
        var rightWidth = clientWidth - $tabUl.width();
        if ($tabUl.scrollLeft() > 0) {
          $tab.find(".prev").addClass("on");
        } else {
          $tab.find(".prev").removeClass("on");
        }
    
        //우측의 숨겨진 폭이 왼쪽의 폭보다 작거나 같으면 next 버튼 비활성화
        if (rightWidth <= $tabUl.scrollLeft()) {
          $tab.find(".next").removeClass("on");
        } else {
          $tab.find(".next").addClass("on");
        }
      }
    }
    /**
     * 탭 초기화, 탭 상태관련
     * @member HCG.TabUtil
     */
    ,Check :
    {
      /**
       * 탭 초기화
       * @member HCG.TabUtil.Check
       * @method init
       */
      init : function()
      {
        $(document.body).attr("ISUPDATED", false);
        var arrInputs = $("INPUT[type=text],TEXTAREA,SELECT");
        arrInputs.bind("change",function(){
          if($(this).attr("tabCheck")==undefined || ($(this).attr("tabCheck")).toUpperCase()!="FALSE")
          {
            $(document.body).attr("ISUPDATED", true);
          }
        });
      }
      /**
       * 탭 수정여부상태
       * @member HCG.TabUtil.Check
       * @method isUpdated
       * @return {Boolean} true : 탭 내 컨텐츠가 수정됨
       */
      ,isUpdated : function()
      {
        return $(document.body).attr("ISUPDATED");
      }
      /**
       * 탭 수정여부상태를 false로 변경
       * <br/>(탭 내 컨텐츠가 수정되지 않은 상태로 상태변경)
       * @member HCG.TabUtil.Check
       * @method reset
       */
      ,reset : function()
      {
        $(document.body).attr("ISUPDATED", false);
      }
      /**
       * 탭 수정여부상태를 true로 변경
       * <br/>(탭 내 컨텐츠가 수정되어 확인이 필요한 상태로 상태변경)
       * @member HCG.TabUtil.Check
       * @method update
       */
      ,update : function()
      {
        $(document.body).attr("ISUPDATED", true);
      }
    }
  }
  /**
   * 서버에서 JsonDS 클래스를 사용하여 가져온 데이터 사용 + 유효성 체크
   * @member HCG
   */
  ,JsonDS :
  {
    /**
     * default 데이터 가져오기(sheet형 데이터)
     * @member HCG.JsonDS
     * @method makeJsonDefault
     */
    makeJsonDefault : function(DS)
    {
      if( HCG.isVal(DS) && HCG.isArray(DS["default"]) )
      {
        return DS["default"];
      }
      else
      {
        return [];
      }
    }
    /**
     * Etc data 데이터 가져오기
     * @member HCG.JsonDS
     * @method makeJsonEtc
     */
    ,makeJsonEtc : function(DS)
    {
      if( HCG.isVal(DS) && HCG.isVal(DS["etc"]) )
      {
        return DS["etc"];
      }
      else
      {
        return {};
      }
    }
    ,makeJson : function(DS, mode)
    {
      if( !HCG.isVal(mode) )
      {
        return {};
      }
      else if(mode.toLowerCase() == "default")
      {
        return this.makeJsonDefault(DS);
      }
      else if(mode.toLowerCase() == "etc")
      {
        return this.makeJsonEtc(DS);
      }
      else
      {
        return {};
      }
    }
  }
  /**
   * select element 첫번째 option 선택 
   * @member HCG
   * @method selectFirstValueOption
   * @param {String|Element} select element 또는 element id
   */
  ,selectFirstValueOption : function(sel)
  {
    //$(sel).find('option:eq(0)').each(function(index, opt){
    //  opt.selected = true;
    //});
    
    sel = HCG.returnjQueryObj(sel);
    sel.find("option[value!='']:eq(0)").attr("selected", true);
  }
  /**
   * 년월의 마지막날짜 구하기
   * @member HCG
   * @method lastDay
   * @param {String} ym 년월 (yyyymm)
   * @return {String} yyyymmdd
   */
  ,lastDay : function(ym)
  {
    var ymd = HCG.addYmd(ym.substr(0, 6)+"01", "M", 1);
    return HCG.addYmd(ymd, "D", -1);
  }
  /**
   * select option text로 검색하기
   * @member HCG
   * @method getComboValueByText
   * @param {String|Element} select element 또는 element id
   * @param {String} text 키워드
   */
  ,getComboValueByText : function(combo, text)
  {
    combo = HCG.returnjQueryObj(combo);
    var option = $.protify(combo.find('option')).detect(function(option){
      return option.text == text;
    });
    return option ? option.value : null;
  }
  /**
   * select태그의 콤보문자열구하기
   * @member HCG
   * @method getComboStr
   * @param {String} comboId select element id
   */
  ,getComboStr : function(combo, b)
  {
    var combo = $("#"+combo);
    var comboStr ="";
    
    if(combo.prop("tagName") != "SELECT") return;
    
    combo.children().each(function (i,v) {
      if( (!b && i != 0) || b ) {
        comboStr += $(this).text()+"□"+$(this).val()+"■";
      }
    }); 
    return comboStr.substring(0,comboStr.length-1);
  }
  /**
   * 사번에 해당하는 사원의 발령정보 가져오기
   * @member HCG
   * @method ajaxGetEmpId
   * @param {String} empId 사번
   * @param {Function} fn 콜백함수. 발령정보는 첫번째 파라미터로 핸들링 
   */
  ,ajaxGetEmpId : function(emp_id, fn)
  {
    HCG.ajaxRequestXSProg(commonOtpVal.Sy_com_181_c01, commonOtpVal.getEmp01, {S_EMP_ID: emp_id}, function(xs)
    {
      if ( xs.RowCount() == 0 )
      {
        alert(ajaxMsg("MSG_ALERT_SEARCH_SAWON_NOTHING") + "("+emp_nm+")");
            fn({});
      }
      else
      {
        var emp = {};
        var ColCount = xs.ColCount();
        for ( var col = 0; col < ColCount; col++ )
        {
          emp[xs.ColName(col)] = xs.GetCellValue(0, col);
        }
        fn(emp);
      }
    });
  }
  /**
   * table 또는 table을 포함하는 태그를 보내면 해당 table을 엑셀로 내려받음
   * @member HCG
   * @method exportExcelByTable
   * @param {String} table element's id
   * @param {String} name of excel file
   * @param {String} other parameters
   */
  ,exportExcelByTable : function(sTableId, sTitle, parameters )
  {
    var dataAttrNm = "export_data";
    var $table = $("#"+sTableId);
    //테이블 태그가 아닌경우 자식 테이블 객체를 찾아냄
    if(!($table.length>0 && $table[0].tagName=="TABLE"))
    {
      $table = $($table.find("TABLE")[0]);
    }
    if($table.length <= 0 )
    {
      alert(sTableId+" is not a table");
      return;
    }
    
    if(parameters == null || parameters == undefined)
    {
      parameters = {};
    }
    parameters.X_MODULE_ID           =  Page.MODULE_ID;
    parameters.X_MENU_ID             =  Page.MENU_ID;
    parameters.X_PGM_URL             =  Page.PGM_URL;
    parameters.X_ENC_VAL             =  Page.ENC_VAL;
    parameters.X_PROFILE_ID          =  Page.PROFILE_ID;
    parameters.X_MENU_NM             =  sTitle;
    
    setTimeout(function(){ Progress.start(); },1);
    
    var $form = $(document.createElement("FORM"));
    
    var headercnt = 0;
    var $thtrs = $table.children("thead").children("tr");
    var $trs   = $table.children("tbody").children("tr");
    
    var nStaCol = 0;
    var nStaRow = 0;
    var nEndCol = 0;
    var nEndRow = 0;
    var arrRegion;
    var arrListRegion = [];
    var arrHeader;
    var arrHeaderList = [];
    var arrColumn = [];
    var arrCellPosList = [];
    var arrCellPos = [];
    
    //헤더처리
    for(var i=0;i<$thtrs.length;i++)
    {
      var $ths = $($thtrs[i]).children("th,td");
      
      if($thtrs.length > 0 )
      {
        headercnt++;
        
        nStaCow = 0;
        arrHeader  = [];
        arrCellPos = [];
        
        for(var h=0;h<$ths.length;h++)
        {
          var nColSpan = 1;
          var nRowSpan = 1;
          arrRegion = [];
          
          var $th = $($ths[h]);
          
          arrHeader.push( $th[0].hasAttribute(dataAttrNm) ? $th.attr(dataAttrNm) : $th.text());
          arrCellPos.push( ($th.cellPos()==undefined)?(h):$th.cellPos().left );
          
          var colspan = $th.attr("colspan"); 
          nColSpan = isNaN(colspan)?1:new Number(colspan);
          var rowspan = $th.attr("rowspan"); 
          nRowSpan = isNaN(rowspan)?1:new Number(rowspan);
          
          nEndCol = nStaCol + nColSpan - 1;
          nEndRow = nStaRow + nRowSpan - 1;
          
          //region 정보
          arrRegion.push(nStaRow);
          arrRegion.push(nStaCol);
          arrRegion.push(nEndRow);
          arrRegion.push(nEndCol);
          
          var sRegion = arrRegion.join(",");
          
          arrListRegion.push(sRegion);
          
          nStaCol = nEndCol+1;
        }
        
        arrHeaderList.push(arrHeader.join("‡"));
        arrCellPosList.push(arrCellPos.join("‡"));
      }
      else
      {
        break;
      }
      
      nStaRow++;
      
    }
    
    var $inp_header = $(document.createElement("input")).attr({name:"headers",type:"hidden", value : arrHeaderList.join("¶") });
    $form.append($inp_header );
    var $inp_cellpos = $(document.createElement("input")).attr({name:"cellpos",type:"hidden", value : arrCellPosList.join("¶") });
    $form.append($inp_cellpos );
    
    var $inp_region = $(document.createElement("input"));
    $inp_region.prop("name", "regions");
    $inp_region.prop("type", "hidden");
    $inp_region.val(arrListRegion.join("¶"));
    $form.append($inp_region);
    
    var $inp_head_cnt = $(document.createElement("input"));
    $inp_head_cnt.prop("name", "headercnt");
    $inp_head_cnt.prop("type", "hidden");
    $inp_head_cnt.val(headercnt);  
    $form.append($inp_head_cnt);
    
    //내용처리
    var $tds;
    var nRowCnt = 0;
    for(var i=0;i<$trs.length;i++)
    {
      $tds = $($trs[i]).children("th,td");
        
      $tds.each(function(idx,item)
      {
        if(i==0) //첫번째행인경우
        {
          arrColumn.push("COL"+idx);
        }
        
        var $inp_colval = $(document.createElement("input"));
        $inp_colval.prop("name","COL"+idx)
        $inp_colval.prop("type", "hidden");
        $inp_colval.val($(item)[0].hasAttribute(dataAttrNm) ? $(item).attr(dataAttrNm) : $(item).text());
        $form.append($inp_colval);
      });
      
      nRowCnt++;
    }
    
    var $inp_row_cnt = $(document.createElement("input"));
    $inp_row_cnt.prop("name","rowcnt");
    $inp_row_cnt.prop("type","hidden");
    $inp_row_cnt.prop("value", nRowCnt);
    $form.append($inp_row_cnt);
    
    var $inp_col  = $(document.createElement("input"));
    $inp_col.prop("name", "columns");
    $inp_col.prop("type", "hidden");
    $inp_col.val(arrColumn.join(","));
    $form.append($inp_col);
    
    //넘어온 파라미터도 같이 넘긴다.
    for ( var name in parameters )
    {
      var value = parameters[name];
      
      if(typeof value == "boolean")
      {
        value = String(value);
      }
      if ( $.protify(["string", "number"]).include(typeof value) )
      {
        $form.append($("<input>").attr({name: name, type: "hidden", value: value}));
      }
      else if ( typeof value == "array" )
      {
        value.each(function(v)
        {
          $form.append($("<input>").attr({name: name, type: "hidden", value: v}));
        });
      }
      else
      {
        input = $("<input>").attr({name: name, type: "hidden", value: value || ''});
        $form.append(input);
      }
    }
    
    var $ifr;
    if($("#iframe_export_to_excel").length>0)
    {
      $ifr = $("#iframe_export_to_excel");
    }
    else
    {
      $ifr = $(document.createElement("iframe"));
      $ifr.prop("id", "iframe_export_to_excel");
      $ifr.prop("name", "iframe_export_to_excel");
      $ifr.css("display","none");
      $(document.body).append($ifr);
    }
    
    var $inp_exnm = $(document.createElement("input"));
    $inp_exnm.prop("name", "excelName");
    $inp_exnm.prop("type", "hidden");
    $inp_exnm.val(sTitle);
    $form.append($inp_exnm);
    
    $form.prop("action", "/common/jsp/excelDownloadTable.jsp");
    $form.prop("method", "post");
    $form.prop("target", "iframe_export_to_excel");
    
    $form.appendTo("body").submit().remove();
    
    setTimeout( function(){ Progress.stop(); },1);
    
  }
  /**
   * 키 경로정보로 Object 탐색하기
   * <br/>ex) (keys) : ["ModalUtil", "open"]
   * <br/>    (root) : HCG
   * <br/>     => HCG.ModalUtil.open 함수
   * @member HCG
   * @method getObjectWithKeyString
   * @param {Array} keys 키 경로정보 배열
   * @param {Object} root Object root위치
   * @return {Anything}
   */
  ,getObjectWithKeyString : function(keys, root)
  {
    if( !HCG.isArray(keys) ) return null;
    if( typeof root == "undefined" || root == null )
    {
      root = window;
    }
    var _keys = ( typeof keys == "string" ) ? [keys] : keys;
    var ro = root;
    $.each(_keys, function(i, key){
      if( typeof ro[key] == "undefined" ) 
      {
        ro = null;
        return false;
      }
      else
      {
        ro = ro[key];
      }
    });
    return ro;
  }
  /**
   * 객체(to) 안에 객체배열 또는 객체(frObj)를 병합
   * @member HCG
   * @method extendForm
   * @param {Object|Array} frObj 병합될 데이터
   * @param {Object} to
   */
  ,convertParam : function ( frObj, to )
  {
    if(typeof frObj != "object"){
      alert("failed HCG.convertParam");
      return;
    }
    
    if(frObj.constructor == Array )
    {
      var arr = frObj;
      for(var a=0;a<arr.length;a++)
      {
        var obj = arr[a];
        var keys = Object.keys(obj);
        keys.forEach(function(key)
        {
          if( a == 0 || to[key] == undefined ) to[key] = [];
          to[key].push(obj[key]);
        });
        
      }
    }
    else
    {
      var obj = arr[a];
      var keys = Object.keys(obj);
      keys.forEach(function(key)
      {
        to[key] = obj[key];
      });
    }
  }
  /**
   * 나이계산
   * @member HCG
   * @method getAge
   * @param birth 생년월일 또는 주민번호
   * @param stdYmd 기준일 (default 브라우저 오늘날짜)
   * @param bKorAge false:만나이(default), true:한국식나이
   */
  ,getAge : function(birth, stdYmd, bKorAge)
  {
    if( !HCG.isVal(birth) ) return -1;
    var _birth = birth.replace(/\D/g, "");
    if( _birth.length < 8 )
    {
      alert("Cannot get age" + _birth.length);
      return -1;
    }
    
    var birthYmd;
    if( _birth.length == 8 )
    {
      birthYmd = _birth;
    }
    else
    {
      birthYmd = _birth.substr(0, 6);
      var gender = _birth.substr(6, 1);
      switch(gender)
      {
        case "1":
        case "2":
        case "5":
        case "6":
        {
          birthYmd = "19" + birthYmd;
        }  
        break;
        case "3":
        case "4":
        case "7":
        case "8":
        {
          birthYmd = "20" + birthYmd;
        }
        break;
        case "9":
        case "0":
        {
          birthYmd = "18" + birthYmd;
        }
        break;
      }
    }

    var _stdYmd;
    if( typeof stdYmd == "undefined" )
    {
      _stdYmd = new Date();
    }
    else
    {
      _stdYmd = new Date(Number(stdYmd.substr(0, 4)), Number(stdYmd.substr(4, 2))-1, Number(stdYmd.substr(6, 2)));
    }
    
    // 한국나이
    if( bKorAge )
    {
      return _stdYmd.getFullYear() - Number(birthYmd.substr(0, 4)) + 1;
    }
    // 만나이
    else
    {
      var birthday = new Date(Number(birthYmd.substr(0, 4)), Number(birthYmd.substr(4, 2))-1, Number(birthYmd.substr(6, 2)));

      var nYears  = _stdYmd.getFullYear() - birthday.getFullYear() + 1;
      var nMonths = _stdYmd.getMonth() - birthday.getMonth();
      var nDays   = _stdYmd.getDate() - birthday.getDate();
      //return Math.floor(nYears + (nMonths / 12) + (nDays / 365));
      
      if( nMonths >= 0 )
      {
        if( nDays >= 0 )
        {
          return nYears;
        }
        else
        {
          return nYears - 1;
        }
      }
      else
      {
        return nYears -1;
      }
    }
  }// getAge end
  /**
   * 객체의 길이 (하위탐색 X, Root가 가진 Key의 개수)
   * @member HCG
   * @method objectLength
   * @param {Object} obj 객체
   * @return {Number}
   */
  ,objectLength : function(obj)
  {
    if(HCG.isObject(obj))
    {
      return Object.keys(obj).length;
    }
    else
    {
      return -1;
    }
  }
  /**
   * XSS에 취약한 문자 치환
   * @member HCG
   * @method escapeHTML
   * @param {String} str 대상문자
   * @return {String}
   */
  ,escapeHTML : function(str) 
  {
      var rStr = "";
      if(str==null || str==undefined) rStr = "";
      else
        rStr = str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      return rStr;
  }
  /**
   * 라디오 값 체크해주기
   * @member HCG
   * @method checkRadio
   * @param {String|Object} radio 라디오 element의 또는 element name
   * @param {String} val 체크될 값
   * @param {Boolean} bClick onclick trigger 여부
   */
  ,checkRadio : function(radio, val, bClick)
  {
    if ( typeof radio == 'string' ) radio = document.getElementsByName(radio);
    var len = radio.length;
    if ( len )
    {
      for ( var n = 0; n < len; n++ )
      {
        if ( radio[n].value == val )
        {
          radio[n].checked = true;
          if ( bClick ) radio[n].onclick();
          return n;
        }
        else
        {
          radio[n].checked = false;
        }
      }
    }
    else
    {
      if ( radio.value == val )
      {
        radio.checked = true;
        if ( bClick ) radio.onclick();
        return 0;
      }
      else
      {
        radio.checked = false;
      }
    }
    return -1;
  }
}// HCG end

/**
 * 프로그래스 바
 * @class Progress
 */
var Progress = {
      /** 프로그래스 바 갯수 */
      count : 0,
      /** 프로그래스 바가 만들어져 있는지 여부 */
      isMade : false,
      /** 사용안함*/
      cover_elem : null,
      /** 사용안함*/
      progr_elem : null,
      /** 프로그래스 바 레이어 */
      $progLayer : null,
      /**
       * 프로그래스 바 생성
       * @method start
       * @member Progress
       * @param {Object} options 사용안함
       */
      start : function(options) {
        var prog = this;
        var target, top, left;
        
        if ($('.wBox').index() == -1)
        { 
          target = $(window);
          top = target.height();
          left = target.width();
        }
        else
        {
          target = $(".wBox")[0];
          top = target.clientHeight;
          left = target.clientWidth;
        }
        if (!prog.isMade) {
            var cente_html = "<div id=ProgressBar style='position:absolute;top:0px;left:0px;width:159px;height:62px;z-index:10000;' ><img src='/resource/images/common/loading_s_s.gif' ></div>";
            $("body").append(cente_html);
            prog.isMade = true;
        }
        prog.count++;
        
        if (prog.count == 1) {
            $("#ProgressBar").css("display","block");
          
            Progress.$progLayer = $("<div id='progressLayer' tabindex='-1' style='position:fixed; width:100%; height:100%; background-color:#000000; z-index:10000; '/>").css("opacity", "0");
            $("body").append(Progress.$progLayer);
        }
        $('#ProgressBar').css("top", (top / 2 - 31)).css("left", Math.round(left / 2 - 80));
      },
      /**
       * 프로그래스 바 삭제
       * @method stop
       * @member Progress
       */
      stop : function() {
          var prog = this;

        setTimeout(function () {
          prog.count--;
          if (prog.count == 0) {
            $("#ProgressBar").css("display","none");
            $("#progressLayer").remove();
          } else if (prog.count < 0) {
            prog.count = 0;
          }
        },0);
      }
};



if ( window.Class )
{
  /**
   * javascript에서 XML데이터를 쉽게 사용할 수 있도록 정의한 데이터타입
   * <br/>HCG.makeXSheetWithXmlText 함수로 생성할 수 있음 
   * @class XmlSheet
   * @extends Class
   */
  HCG.XmlSheet = Class.$extend({
    /**
     * 생성자
     * @constructor
     * @member XmlSheet
     * @param {Object} xdom XMLDocument
     */
    __init__ : function(xdom)
    {
      /** XMLDocument */
      this.xdom = $(xdom);
      /** data group key */
      this.data_key = "default";
      /** 현재 row index */
      this.currRowIdx = -1;
      /** 데이터를 담아놓는 배열 */
      this.meta = {};
      /** xml데이터를 meta에 담는 함수 */
      this.createMetaData();
    },
    /**
     * xml형식의 데이터를 meta배열에 json 형식으로 저장한다.
     * @member XmlSheet
     * @method createMetaData
     */
    createMetaData: function()
    {
      var dataNodes = this.xdom.find("SHEET DATA");
      var ColNameMap, NameColMap, columnName, filter, data_key, trNodes;
      for ( var n = 0, nlen = dataNodes.length; n < nlen; n++ )
      {
      data_key = $(dataNodes[n]).attr("KEY");
        filter = "@KEY='"+data_key+"'", ColNameMap = {}, NameColMap = {};
        var htrNode = $(dataNodes[n]).find("HTR");
        for ( var c = 0, clen = $(htrNode).children().length; c < clen; c++ )
        {
          if(HCG.isIE()) columnName = $(htrNode).children()[c].text;
          else columnName = $(htrNode).children()[c].childNodes[0].nodeValue;
          ColNameMap[c] = columnName;
          NameColMap[columnName] = c;
        }
        trNodes = $(dataNodes[n]).find("TR");
        this.meta[data_key] = {
          RowCount: trNodes.length,
          ColumnCount: htrNode.children().length,
          ColNameMap: ColNameMap,
          NameColMap: NameColMap,
          trNodes: trNodes
        };
      }
    },
    /**
     * 다음행이 있는지 여부
     * @member XmlSheet
     * @method next
     * @param {String} data_key 데이터 그룹을 구분하는 키
     * @return {Boolean} 행 존재 여부
     */
    next: function(data_key)
    {
      var next = this.RowCount(data_key) > this.currRowIdx + 1;
      if ( next ) this.currRowIdx++;
      return next;
    },
    /**
     * datakey setting
     * @member XmlSheet
     * @method setDataKey
     * @param {String} data_key 데이터 그룹을 구분하는 키
     */
    setDataKey: function(data_key)
    {
      data_key = HCG.nvl(data_key, "default");
      this.data_key = data_key;
    },
    /**
     * ETC-DATA를 가져온다
     * @member XmlSheet
     * @method GetEtcData
     * @param {String} key 가져올 ETC-DATA의 key값
     * @return {String} ETC-DATA 값
     */
    GetEtcData: function(key)
    {
      try
      {
        var sRtn = this.xdom.find("SHEET ETC-DATA ETC[KEY='"+key+"']").text();
        return sRtn;
      }
      catch(e)
      {
        return "";
        /*
         * alert("Error at xsheet.GetEtcData !!!"); throw e;
         */
      }
    },
    /**
     * 에러 메시지를 리턴
     * @member XmlSheet
     * @method getMessage
     * @return {String} errorMessage
     */
    getMessage: function()
    {
      var rtn ="";
      var objMessage = this.xdom.find("SHEET MESSAGE")[0];
      if(HCG.isIE()){
        rtn =objMessage.text;
      }
      else{
        if(objMessage!=null)
          rtn = objMessage.childNodes[0].nodeValue;
      }
      return rtn;
    },
    /**
     * 데이터 갯수를 리턴
     * @member XmlSheet
     * @method RowCount
     * @param {String} data_key 데이터 그룹을 구분하는 키
     * @return {Number} 데이터 행 수
     */
    RowCount: function(data_key)
    {
      if(this.meta[data_key||this.data_key]!=undefined)
      {
        return this.meta[data_key||this.data_key].RowCount;
      }else
      {
        return 0;
      }
    },
    /**
     * 조회한 컬럼의 갯수를 리턴
     * @member XmlSheet
     * @method ColCount
     * @param {String} data_key 데이터 그룹을 구분하는 키
     * @return {Number} ColumnCount
     */
    ColCount: function(data_key)
    {
      return this.meta[data_key || this.data_key].ColumnCount;
    },
    /**
     * 컬럼의 명칭을 리턴(column name by column index)
     * @member XmlSheet
     * @method ColName
     * @param {Number} col column index
     * @param {String} data_key 데이터 그룹을 구분하는 키
     * @return {String} ColumnName
     */
    ColName: function(col, data_key)
    {
      return this.meta[data_key || this.data_key].ColNameMap[col];
    },
    /**
     * 컬럼의 인덱스를 리턴(column index by colum name)
     * @member XmlSheet
     * @method CellIndex
     * @param {String} colnm column name
     * @param {String} data_key 데이터 그룹을 구분하는 키
     * @return {Number} ColumnIndex
     */
    CellIndex: function(colnm, data_key)
    {
      return this.meta[data_key || this.data_key].NameColMap[colnm];
    },
    /**
     * 조회 값을 리턴
     * @member XmlSheet
     * @method GetCellValue
     * @param {Number} row index
     * @param {String|Number} column index or column name
     * @param {String} data_key 데이터 그룹을 구분하는 키 
     * @return {String} value
     */
    GetCellValue: function(row, col, data_key)
    {
      try
      {
        row = (row == null ? this.currRowIdx : row);
        var colNum = col.constructor == Number ? col : this.meta[data_key||this.data_key].NameColMap[col];
        var rtn="";
        if(HCG.isIE()){
          rtn = $(this.meta[data_key||this.data_key].trNodes[row]).find("TD")[colNum].text;
        }else{
          if($(this.meta[data_key||this.data_key].trNodes[row]).find("TD")[colNum]!=null){
            rtn = $(this.meta[data_key||this.data_key].trNodes[row]).find("TD")[colNum].childNodes[0].nodeValue;
          };
        }
        return rtn;
      }
      catch (e)
      {
        alert("Error at xs.GetCellValue("+[row, col, data_key]+") !!!");
        throw e;
      }
    },
    /**
     * data key 존재 여부
     * @member XmlSheet
     * @method exists
     * @param {String} data_key 데이터 그룹을 구분하는 키
     * @return {Boolean}
     */
    exists: function(data_key)
    {
      return this.meta[data_key || this.data_key] != null;
    },
    /**
     * column중에 찾고자 하는 value가 있는지 체크하여 존재하는 row의 index값을 리턴
     * @member XmlSheet
     * @method FindRow
     * @param {String|Number} col 검색하려는 column의 index or name
     * @param {String} val 찾으려는 value
     * @param {Number} row 찾기를 시작하려는 행
     * @param {String} data_key 데이터 그룹을 구분하는 키
     * @return {Number} rowIndex
     */
    FindRow: function(col, val, row, data_key)
    {
      var xs = this;
      for ( var r = HCG.nvl(row, 0), rcnt = xs.RowCount(data_key); r < rcnt; r++ )
      {
        if ( xs.GetCellValue(r, col, data_key) == val ) return r;
      }
      return -1;
    },
    /**
     * startRow 로우부터 fFind 함수를 실행하여 true 인 row index를 반환
     * @member XmlSheet
     * @method FindRowWithFunction
     * @param {Function} fFind 사용자 지정 검색 함수
     * @param {Boolean} reverse 첫 row 부터 검색할지 마지막 row 부터 검색할지 여부 
     * @param {Number} startRow 검색시작 row
     * @param {String} data_key 데이터 그룹을 구분하는 키
     * @return {Number} findRow
     */
    FindRowWithFunction: function(fFind, reverse, startRow, data_key)
    {
      var findRow = -1;
      try{
        this.eachRow(function(row, xs, returnObject)
        {
          if ( fFind(xs, row) )
          {
            findRow = row;
            throw $break;
          }
        }, reverse, startRow, data_key);
      }catch(e){}
      return findRow;
    },
    /**
     * 각 로우를 돌며 함수 실행
     * @member XmlSheet
     * @method eachRow
     * @param {Function} func row별 처리 함수
     * @param {Boolean} reverse 첫 row 부터 실행할지 마지막 row 부터 실행할지 여부
     * @param {Number} startRow 실행시작 row
     * @param {String} data_key 데이터 그룹을 구분하는 키
     */
    eachRow: function(func, reverse, startRow, data_key)
    {
      var xs = this;
      reverse = !!reverse;
      var returnObject = {};

      try
      {
        if ( reverse ){
          for ( var row = HCG.nvl(startRow, xs.RowCount(data_key)-1), firstDataRow = 0; row >= firstDataRow; row-- )
          {
            func(row, xs, returnObject);
          }
        }else{
          for ( var row = HCG.nvl(startRow, 0), RowCount = xs.RowCount(data_key); row < RowCount; row++)
          {
            func(row, xs, returnObject);
          }
        }
      }
      catch(e)
      {
        if (e == $break) return returnObject.value;
        throw e;
      }
    }
  });
  
  /**
   * ScriptSheet
   * @class ScriptSheet
   * @extends XmlSheet
   */
  HCG.ScriptSheet = HCG.XmlSheet.$extend({
    /**
     * 생성자
     * @constructor
     * @member ScriptSheet
     * @param {String} so XmlText
     */
    __init__: function(so)
    {
      /** */
      this.so = so;
      this.GetEtcData = so.GetEtcData;
      this.listData = so.listData;
      this.message = so.message;
      this.data_key = "default";
      this.currRowIdx = -1;
      this.meta = {};
      this.createMetaData();
    },
    /**
     * 배열형식의 데이터를 meta배열에 json 형식으로 저장한다.
     * @member ScriptSheet
     * @method createMetaData
     */    
    createMetaData: function()
    {
      var ColNameMap, NameColMap, columnName;
      for ( var data_key in this.listData)
      {
        ColumnCount = this.listData[data_key].columnNames.length;
        ColNameMap = {}, NameColMap = {};
        for ( var c = 0, clen = ColumnCount; c < clen; c++ )
        {
          columnName = this.listData[data_key].columnNames[c];
          ColNameMap[c] = columnName;
          NameColMap[columnName] = c;
        }
        this.meta[data_key] = {
          RowCount: this.listData[data_key].data.length,
          ColumnCount: ColumnCount,
          ColNameMap: ColNameMap,
          NameColMap: NameColMap
        };
      }
    },
    /**
     * ETC-DATA를 가져온다
     * @member ScriptSheet
     * @method GetEtcData
     * @param {String} key 가져올 ETC-DATA의 key값
     * @return {String} ETC-DATA 값
     */
    GetEtcData: function(key)
    {
      return HCG.nvl(this.GetEtcData[key]);
    },
    /**
     * 에러 메시지를 리턴
     * @member ScriptSheet
     * @method getMessage
     * @return {String} errorMessage
     */
    getMessage: function()
    {
      return this.message;
    },
    /**
     * 조회 값을 리턴
     * @member ScriptSheet
     * @method CellValue
     * @param {Number} row row index
     * @param {Number|String} col column index or column name
     * @param {String} data_key 데이터 그룹을 구분하는 키 
     * @return {String} value
     */
    CellValue: function(row, col, data_key)
    {
      try
      {
        row = (row == null ? this.currRowIdx : row);
        var colNum = col.constructor == Number ? col : this.meta[data_key || this.data_key].NameColMap[col];
        return this.listData[data_key || this.data_key].data[row][colNum];
      }
      catch (e)
      {
        //alert("Error at xs.GetCellValue("+[row, col, data_key]+") !!!");
        //throw e;
      }
    }
  });
}