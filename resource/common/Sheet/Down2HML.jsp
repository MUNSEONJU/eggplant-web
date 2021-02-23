<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.io.*" %>
<%@ page import="org.apache.poi.ss.usermodel.Workbook" %>
<%@ page import="com.ibleaders.ibsheet7.ibsheet.hwpml.Down2Hml" %>
<%@ page import="com.ibleaders.ibsheet7.util.Synchronizer" %>
<%@ page import="com.ibleaders.ibsheet7.util.IBPacketParser" %>
<%


  response.setContentType("application/octet-stream");
  response.setCharacterEncoding("utf-8");
  response.setHeader("Content-Disposition", "");

  Down2Hml ibHml = new Down2Hml(request, response, "utf-8");

  //====================================================================================================
  // [ 사용자 환경 설정 #1 ]
  //====================================================================================================
  // Html 페이지의 인코딩이 EUC-KR 로 구성되어 있으면 "ibHml.setPageEncoding("EUC-KR");" 로 설정하십시오.
  // 문서의 한글이 깨지면 이 값을 ("UTF-8")으로 바꿔 보십시오. (설정하지 않는 경우에는 UTF-8로 처리됩니다.)
  //====================================================================================================
  //ibHml.setPageEncoding("EUC-KR");

  //====================================================================================================
  // [ 사용자 환경 설정 #2 ]
  //====================================================================================================
  // IBSheet의 폰트 이름, 폰트 크기를 다음에서 설정한 값으로 강제적으로 적용합니다.
  // 사용하지 않으시려면 주석처리 하세요.
  // 
  //ibHml.setFontName("함초롬돋움");
  //ibHml.setFontSize((short)10);

  //====================================================================================================
  // [ 사용자 환경 설정 #3 ]
  //====================================================================================================
  // 다운로드 시 헤더행의 글자색을 적용하고 싶은 경우에 설정하세요.
  // #3366FF 형태의 웹 컬러로 설정해주세요.
  // 설정을 원하지 않는 경우 주석처리해주세요.
  //====================================================================================================
  ibHml.setHeaderFontColor("#FF2233");

  //====================================================================================================
  // [ 사용자 환경 설정 #4 ]
  //====================================================================================================
  // 다운로드 시 헤더행의 배경색을 적용하고 싶은 경우에 설정하세요.
  // #3366FF 형태의 웹 컬러로 설정해주세요.
  // 설정을 원하지 않는 경우 주석처리해주세요.
  //====================================================================================================
  ibHml.setHeaderBackColor("#4466aa");

  //====================================================================================================
  // [ 사용자 환경 설정 #5 ]
  //====================================================================================================
  // 다운로드 시 헤더행의 폰트 Bold 스타일을 적용하고 싶은 경우에 설정하세요.
  // 설정을 원하지 않는 경우 주석처리해주세요.
  //====================================================================================================
  ibHml.setHeaderFontBold(true);

  //====================================================================================================
  // [ 사용자 환경 설정 #6 ]
  //====================================================================================================
  // 시트에 포함될 문자열 중 STX(\u0002), ETX(\u0003) 이 포함된 경우에만 설정해주세요.
  // 설정을 원하지 않는 경우 주석처리해주세요.
  // 0 : 시트 구분자로 STX, ETX 문자를 사용합니다. (기본값)
  // 1 : 시트 구분자로 변형된 문자열을 사용합니다. (시트에 설정이 되어 있어야 합니다.)
  //====================================================================================================
  //ibHml.setDelimMode(0);    
    
  boolean bToken = false;
    
  try {
    response.reset();

    // 서버에서 병행처리를 허용할 최대 동시 작업 갯수를 설정한다.
    Synchronizer.init(5);

    // 싱크 처리 객체로 부터 처리권한을 확인한다.
    // 인자를 true로 설정하는 경우 : 싱크 처리 객체에서 자원을 사용가능해질때까지 최대 30초 동안 기다렸다가 자원 사용이 가능해졌을때 권한을 할당 후 true를 반환한다.
    // 인자를 false로 설정하는 경우 : 자원 사용여부를 확인후 즉시 반환. 사용 가능하면 할당 후 true를 반환하고, 사용이 불가능한 경우 false를 반환한다.
    bToken = Synchronizer.use(false);
    //bToken = false;
        
    // 싱크 객체로 부터 권한을 정상 할당 받은 경우에만 엑셀 작업을 진행한다.
    if (bToken) {
      //HML 문서 생성
      ibHml.makeHML();

      // 다운로드 1. 생성된 문서를 바로 다운로드 받음
      ibHml.down2File();

      out.flush();
      out = pageContext.pushBody();

      // 다운로드 2. 생성된 문서 내용을 확인.
      //out.print(ibHml.down2String());

      // 엑셀 다운 완료 후 싱크 객체로 할당받은 권한을 반환한다.
      Synchronizer.release();
      bToken = false;
    } else {
      response.setContentType("text/html;charset=utf-8");
      response.setCharacterEncoding("utf-8");
      response.setHeader("Content-Disposition", "");

      out.println("<script>alert('문서 다운로드중 에러가 발생하였습니다.[Server Busy]'); </script>");
    }

  } catch (Exception e) {
    //Exception 발생 시, response 헤더 별도 설정하도록 한다. 
    response.setContentType("text/html;charset=utf-8");
    response.setCharacterEncoding("utf-8");
    response.setHeader("Content-Disposition", "");

    out.println("<script>alert('문서 다운로드중 에러가 발생하였습니다.');</script>");
    out.flush();

  } catch (Error e) {
    //Exception 발생 시, response 헤더 별도 설정하도록 한다. 
    response.setContentType("text/html;charset=utf-8");
    response.setCharacterEncoding("utf-8");
    response.setHeader("Content-Disposition", "");

    out.println("<script>alert('문서 다운로드중 에러가 발생하였습니다.');</script>");
    out.flush();
  } finally {
    //공유자원 반환이 되지 않은 상태라면, 반환 처리한다.
    if (bToken) {
      Synchronizer.release();
      bToken = false;
    }

    ibHml.setDownFinish();
  }

  // 파일 정상 다운로드시 아래 구문을 실행하지 않으면 서버 Servlet에서  java.lang.IllegalStateException 이 발생한다.
  // 파일 최 하단에서 호출하도록 하면 다운로드 에러로 인한 Exception 메시지가 출력되지 않으므로 정상 다운시에만 처리하도록 한다.
  //out.flush();
  //out = pageContext.pushBody();
%>