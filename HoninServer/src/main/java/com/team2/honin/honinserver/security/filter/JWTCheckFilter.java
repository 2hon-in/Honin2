package com.team2.honin.honinserver.security.filter;

import com.google.gson.Gson;
import com.team2.honin.honinserver.dto.MemberDTO;
import com.team2.honin.honinserver.security.util.JWTUtil;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.util.List;
import java.util.Map;

@Log4j2
public class JWTCheckFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authHeaderStr = request.getHeader("Authorization");
        try {
            //Bearer accestoken...
            String accessToken = authHeaderStr.substring(7);
            Map<String, Object> claims = JWTUtil.validateToken(accessToken);
            log.info("JWT claims: " + claims);

            String password = (String) claims.get("password");
            String nickname = (String) claims.get("nickname");
            String email = (String) claims.get("email");
            String phone = (String) claims.get("phone");
            String profileimg = (String) claims.get("profileimg");
            String profilemsg = (String) claims.get("profilemsg");
            String provider = (String) claims.get("provider");
            String snsid = (String) claims.get("snsid");
            Date indate = (Date) claims.get("indate");
            String address1 = (String) claims.get("address1");
            String address2 = (String) claims.get("address2");
            String address3 = (String) claims.get("address3");
            String userstate = (String) claims.get("userstate");
            String zipnum = (String) claims.get("zipnum");
            List<String> roleNames = (List<String>) claims.get("roleNames");
            MemberDTO memberDTO = new MemberDTO(password, nickname, email, phone, profileimg,
                    profilemsg, provider, snsid, indate, address1, address2, address3, userstate, zipnum, roleNames);
            log.info("-----------------------------------");
            log.info("memberDTO" + memberDTO);
            log.info("추출된 권한 : " + memberDTO.getAuthorities()); // 권한 추출

            UsernamePasswordAuthenticationToken authenticationToken
                    = new UsernamePasswordAuthenticationToken(memberDTO, password, memberDTO.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            filterChain.doFilter(request, response);
        } catch (Exception e) {
            log.error("JWT Check Error..............");
            log.error(e.getMessage());
            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));
            response.setContentType("application/json");
            PrintWriter printWriter = response.getWriter();
            printWriter.println(msg);
            printWriter.close();
        }

    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        log.info("check uri.............." + path);

        if (request.getMethod().equals("OPTIONS")
                /* 회원 관리 */
                || path.startsWith("/member/loginlocal")
                || path.startsWith("/member/refresh")
                || path.startsWith("/member/sendMail")
                || path.startsWith("/member/codeCheck")
                || path.startsWith("/member/emailCheck")
                || path.startsWith("/member/nicknameCheck")
                || path.startsWith("/member/join")
                || path.startsWith("/member/fileupload")
                || path.startsWith("/member/kakaostart")
                || path.startsWith("/member/kakaoLogin")
                || path.startsWith("/member/naverstart")
                || path.startsWith("/member/naverLogin")
                || path.startsWith("/images")
                || path.startsWith("/uploads")
                || path.startsWith("/favicon.ico")
                || path.startsWith("/community/getPostList")
                || path.startsWith("/community/getCommunityCategoryList")
                || path.startsWith("/community/getPostOne")
                || path.startsWith("/notice/getNcareerList")
                || path.startsWith("/notice/getNpolicyList")
                || path.startsWith("/secondhand/getSecondhandList")
                || path.startsWith("/secondhand/getSecondHand")
                || path.startsWith("/secondhand/updateReadCount")
                || path.startsWith("/notice/getNcareer")
                || path.startsWith("/notice/getNpolicy")
        )
        {
            return true;
        }
        return false;
    }
}
