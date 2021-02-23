var __base_dir = '/';
  
if ( window.Page == undefined )
{
    Page =
    {
    C_CD: '10',
    LANG: "ko",
    // SKIN_PATH: "<%=mypage2.get("SKIN_PATH")%>",
    // PROFILE_ID: "<%=mypage2.get("PROFILE_ID")%>",
    // MODULE_ID: "<%=mypage2.get("MODULE_ID")%>",
    // AUTH_ADMIN_YN: "<%=ehrbean2.get("AUTH_ADMIN_YN")%>",
    // MENU_ID: "<%=mypage2.get("MENU_ID")%>",
    // PGM_ID: "<%=mypage2.get("PGM_ID")%>",
    // SQL_ID: "<%=mypage2.get("SQL_ID")%>",
    // PRS_ID: "<%=mypage2.get("PRS_ID")%>",
    // EMP_SCH_AUTH_CD: "<%=mypage2.get("EMP_SCH_AUTH_CD")%>",
    //버튼로그 관련 시작
    // BUTTON_LOG_YN: "<%=mypage2.get("BUTTON_LOG_YN")%>",
    // PGM_BTN_LOG_YN: "<%=mypage2.get("PGM_BTN_LOG_YN")%>",
    //버튼로그 관련 끝
    // NTNL_CD: "<%=ehrbean2.get("COM_NTNL_CD")%>",
    // EMP_TYPE: "<%=ehrbean2.get("EMP_TYPE")%>",
    // GEN_YN: "<%=mypage2.get("GEN_YN")%>",
    // ENC_VAL: "<%=mypage2.get("ENC_VAL")%>",
    // ENC_VAL2: "<%=mypage2.get("ENC_VAL2")%>",
    // PGM_URL: "<%=mypage2.get("PGM_URL")%>",
    // POP_URL: "<%=mypage2.get("POP_URL")%>",
    // FRAME_NAME: "<%=mypage2.get("FRAME_NAME")%>",
    // HELP_PGM_ID : "<%=mypage2.get("HELP_PGM_ID")%>",
    // HELP_MSG : "<%=hmPreparedData.get("HELP_MSG")%>"
    }
}

var S_PGM_OPEN_TIME = "";
var S_ENC_OTP_KEY   = "";
var S_CSRF_SALT     = "";
var HUNEL_DEV_TOOL_USE_YN = "N";
var _isModaless = "N"


var commonOtpVal = {
//     Sy_com_182_c01      : "<com:otp value='biz.sys.sy_com.Sy_com_182_c01'/>"
//   , Sy_com_181_c01      : "<com:otp value='biz.sys.sy_com.Sy_com_181_c01'/>"
//   , Sys_file_common     : "<com:otp value='biz.sys.Sys_file_common'/>"
//   , Sys_common          : "<com:otp value='biz.sys.Sys_common'/>"
//   , UserDS              : "<com:otp value='biz.user.UserDS'/>"
//   , CheckExcelEmpId     : "<com:otp value='CheckExcelEmpId'/>"
//   , comboAuthOrg        : "<com:otp value='comboAuthOrg'/>"
//   , logProgramBtn       : "<com:otp value='logProgramBtn'/>"
//   , setOrgInfo01        : "<com:otp value='setOrgInfo01'/>"
//   , setOrgInfo02        : "<com:otp value='setOrgInfo02'/>"
//   , search_emp01        : "<com:otp value='search_emp01'/>"
//   , searchEmp01         : "<com:otp value='searchEmp01'/>"
//   , searchEmp02         : "<com:otp value='searchEmp02'/>"
//   , searchOrg01         : "<com:otp value='searchOrg01'/>"
//   , search_org01        : "<com:otp value='search_org01'/>"
//   , searchFileCnt       : "<com:otp value='searchFileCnt'/>"
//   , get_emp_info        : "<com:otp value='get_emp_info'/>"
//   , getEmp01            : "<com:otp value='getEmp01'/>"
//   , getHelpMsg          : "<com:otp value='getHelpMsg'/>"
//   , setLoginEmp01       : "<com:otp value='setLoginEmp01'/>"
//   , popemp01            : "<com:otp value='popemp01'/>"
//   , poporg01            : "<com:otp value='poporg01'/>"
//   , saveFileLog         : "<com:otp value='saveFileLog'/>"
//   , deleteFile          : "<com:otp value='deleteFile'/>"
};

// 평가관리(pem.js)
var pemOtpVal = {
//     Pem_common2         : "<com:otp value='biz.pem.Pem_common2'/>"
//   , Pm_exec_600_m01     : "<com:otp value='biz.pem.pm_exec.Pm_exec_600_m01'/>"
//   , searchGradCd        : "<com:otp value='searchGradCd'/>"
//   , getEmpList          : "<com:otp value='getEmpList'/>"
};